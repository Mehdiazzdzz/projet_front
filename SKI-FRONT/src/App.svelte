<script>
  import { onMount } from "svelte";
  import LogementCard from "./LogementCard.svelte";
  import './app.css';

  /** @type {any[]} */
  let logements = [];
  
  /** @type {string | null} */
  let error = null;
  let loading = true; 

  const getLogements = async () => {
    loading = true;
    error = null;
    
    try {
      const res = await fetch("/api/logements");
      logements = await res.json();
    } catch (e) {
      error = "Impossible de charger les logements";
    }
    
    loading = false;
  };

  onMount(() => {
    getLogements();
  });

  /** @param {string} id */
  async function supprimerLogement(id) {
    try {
      const res = await fetch(`/api/logements/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        logements = logements.filter(logement => logement.id !== id && logement._id !== id);
      } else {
        console.error("L'API n'a pas pu supprimer ce logement.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
</script>

<div class="flex flex-col min-h-screen">
  <header class="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
    <div class="px-4">
        <div class="flex items-center justify-between">
            
            <div class="flex shrink-0">
                <a aria-current="page" class="flex items-center gap-3" href="/">
                    <img class="h-8 md:h-10 w-auto" src="/logo.svg" alt="Logo Ski-Location">
                    <h1 class="m-0 text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">Ski-Location</h1>
                </a>
            </div>

            <!-- Zone des boutons d'action -->
            <div class="flex items-center justify-end gap-3">
                <button type="button" class="hidden items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex">
                    + Ajouter
                </button>
                <button type="button" class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Se connecter
                </button>
            </div>

        </div>
    </div>
  </header>

  <!-- Nouvelle Section Hero avec l'image de fond ajoutée ici -->
  <section class="w-full">
    <div class="w-full h-[520px] bg-[url('../src/assets/hero-back')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center">
        <div class="w-full mx-auto">
            <form>
                <div class="xl:w-1/2 lg:w-[60%] sm:w-[70%] w-[90%] mx-auto flex gap-2 md:mt-6 mt-4 mx-4">
                    <input type="text" class="border border-gray-400 w-full p-2 rounded-md text-xl pl-2" placeholder="Rechercher une destination..." />
                    <button type="submit" class="px-[10px] bg-blue-500 text-lg text-white rounded-md font-semibold">Search</button>
                </div>
            </form>
        </div>
    </div>
  </section>

  <!-- Contenu Principal avec la grille des logements -->
  <main class="flex-grow py-10 px-5 max-w-[1200px] mx-auto w-full">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      {#if loading}
        <p>Chargement des logements en cours...</p>
      {:else if error}
        <p class="text-red-500">{error}</p>
      {:else}
        {#each logements as logement (logement.id)}
          <LogementCard 
            sejour={logement} 
            handleDelete={() => supprimerLogement(logement.id)} 
          />
        {/each}
      {/if}
    </div>
  </main>

  <footer class="bg-gray-200 text-white py-4 px-3 mt-auto">
    <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8 mx-auto">
      <ul class="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
        <li><a href="#contactUs" class="text-gray-500 hover:text-gray-800 transition-colors">Contact</a></li>
        <li class="mx-4"><a href="/privacy" class="text-gray-500 hover:text-gray-800 transition-colors">Privacy Policy</a></li>
      </ul>
    </div>
  </footer>
</div>