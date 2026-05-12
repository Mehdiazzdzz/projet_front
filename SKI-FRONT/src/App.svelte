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
  
  <header class="flex justify-between items-center p-4 bg-white shadow">
    <div class="flex items-center gap-2">
        <h1 class="text-2xl font-bold">Ski-Location</h1>
    </div>

    <div class="flex gap-4">
        <button class="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg">
            + Ajouter
        </button>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Se connecter
        </button>
    </div>
  </header>

  <section class="bg-gray-100 p-8 text-center">
    <h2 class="text-2xl font-bold mb-4">Rechercher une destination</h2>
    
    <div class="flex justify-center gap-4">
        <input type="text" class="border p-2 rounded-lg w-full md:w-1/2" placeholder="Où voulez-vous aller ?" />
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold">Chercher</button>
    </div>
  </section>

  <main class="flex-grow p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

  <footer class="p-4 bg-gray-200 text-center text-gray-600 mt-auto">
    <p>&copy; 2026 - Plateforme de location de ski</p>
    <div class="flex justify-center gap-4 mt-2">
        <a href="#contact" class="hover:text-blue-500">Contact</a>
        <a href="#privacy" class="hover:text-blue-500">Privacy Policy</a>
    </div>
  </footer>

</div>