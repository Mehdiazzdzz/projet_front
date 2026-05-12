<script>
  import { onMount } from "svelte";
  import LogementCard from "./LogementCard.svelte";

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

<div class="layout">
  <header>
    <div class="logo-container">
      <img src="/logo.svg" alt="Logo" class="logo" />
      <h1>Ski-Location</h1>
    </div>
    <div class="header-actions">
    <button class="btn" type="button">+ Ajouter</button>
    <button class="btn" type="button"> Se connecter </button>
</div>
  </header>

  <main>
    <div class="grid">
      {#if loading}
        <p>Chargement des logements en cours...</p>
      {:else if error}
        <p style="color: red;">{error}</p>
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

  <footer>
    <p>&copy; 2026 - Plateforme de location de ski</p>
  </footer>
</div>
<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    background-color: #8d84ce;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo {
    height: 70px;
  }

  header h1 {
    margin: 0;
    font-size: 1.4rem;
    color: #111827;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* --- Style unifié pour les boutons --- */
  .btn {
    background-color: #111827;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    padding: 10px 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    gap: 8px;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .btn:hover {
    background-color: #374151;
    transform: translateY(-2px);
  }

  main {
    flex-grow: 1;
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  footer {
    text-align: center;
    padding: 20px;
    background-color: white;
    color: #6b7280;
    font-size: 0.9rem;
  }
</style>