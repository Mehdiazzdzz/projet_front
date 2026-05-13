<script>
  import { onMount } from "svelte";
  import LogementCard from "./LogementCard.svelte";
  import AjouterLogement from "./AjouterLogement.svelte"; 
  import './app.css';

  /** @type {any[]} */
  let logements = [];
  
  /** @type {string | null} */
  let error = null;
  let loading = true; 

  let pageActuelle = "accueil"; 

  function allerVersAjout() {
    pageActuelle = "ajouter";
  }

  function allerVersAccueil() {
    pageActuelle = "accueil";
  }

  /** @param {any} nouveauLogement */
  function gererAjout(nouveauLogement) {
    if (nouveauLogement) {
      logements = [nouveauLogement, ...logements];
    }
    pageActuelle = "accueil";
  }

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
  
  <header class="flex flex-col md:flex-row justify-between items-center p-4 from-gray-300 to-white bg-gradient-to-b">
    
    <button type="button" on:click={allerVersAccueil} class="flex items-center gap-2 cursor-pointer group">
        <img src="/logo.svg" alt="Logo Ski-Location" class="h-20 w-auto" />
    </button>

    <div class="flex flex-wrap justify-center gap-2 md:gap-4">
        <button on:click={allerVersAjout} class="border border-green-500 text-green-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-green-50 transition-colors">
            + Ajouter
        </button>
        
        <button class="border border-blue-500 text-blue-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-blue-50 transition-colors">
            S'inscrire
        </button>
        
        <button class="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-600 transition-colors">
            Se connecter
        </button>
    </div>
  </header>

  {#if pageActuelle === "accueil"}
    
    <section class="bg-gradient-to-b from-white to-gray-300 p-8 text-center">
      <h1 class="text-xl font-bold mb-4">Rechercher une destination</h1>
      
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
          {#each logements as logement (logement.id ?? logement._id)}
            <LogementCard 
              sejour={logement} 
              handleDelete={() => supprimerLogement(logement.id ?? logement._id)} 
            />
          {/each}
        {/if}
      </div>
    </main>

  {:else if pageActuelle === "ajouter"}
    
    <main class="flex-grow p-4">
      <AjouterLogement onAjoute={gererAjout} onAnnule={allerVersAccueil} />
    </main>

  {/if}

  <footer class="p-4 from-white to-gray-300 bg-gradient-to-b text-center text-gray-600 mt-auto">
    <p>&copy; 2026 - Plateforme de location</p>
    <div class="flex justify-center gap-4 mt-2">
        <a href="#contact" class="hover:text-blue-500">Contact</a>
        <a href="#privacy" class="hover:text-blue-500">Privacy Policy</a>
    </div>
  </footer>

</div>