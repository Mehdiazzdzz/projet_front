<script>
  import LogementCard from "./LogementCard.svelte";

  /** @type {any[]} */
  let logements = [];

  const getLogements = async () => {
    const res = await fetch("/api/logements");
    logements = await res.json();
  };

  getLogements();

  async function ajouterLogement() {
    const nouveauLogement = {
      nom: "Nouveau Chalet",
      ville: "Courchevel",
      prix: 250,
      capacite: 4,
      description: "Superbe chalet avec vue",
      imageUrl: "https://picsum.photos/600/400?7"
    };

    try {
      const res = await fetch("/api/logements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nouveauLogement)
      });

      if (res.ok) {
        const logementCree = await res.json();
        logements = [...logements, logementCree];
      } else {
        console.error("L'API a refusé l'ajout.");
      }
    } catch (error) {
      console.error("Erreur réseau lors de l'ajout :", error);
    }
  }

  // 2. Supprimer un logement 
  /** @param {string} id */
  async function supprimerLogement(id) {
    try {
      const res = await fetch(`/api/logements/${id}`, {
        method: "DELETE" // Méthode pour supprimer
      });

      if (res.ok) {
        logements = logements.filter(logement => logement.id !== id && logement._id !== id);
      } else {
        console.error("L'API n'a pas pu supprimer ce logement.");
      }
    } catch (error) {
      console.error("Erreur réseau lors de la suppression :", error);
    }
  }
</script>

<div class="layout">
  <header>
    <div class="logo-container">
      <img src="/logo.svg" alt="Logo" class="logo" />
      <h1>Ski-Location</h1>
    </div>
    <button class="btn-ajouter" on:click={ajouterLogement}>+ Ajouter</button>
  </header>

  <main>
    <div class="grid">
      {#each logements as logement (logement.id)}
        <LogementCard 
          sejour={logement} 
          on:delete={() => supprimerLogement(logement.id)} 
        />
      {/each}
    </div>
  </main>

  <footer>
    <p>&copy; 2026 - Plateforme de location de ski</p>
  </footer>
</div>

<style>
  /*style de la page*/
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    background-color: #52489C;
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

  .btn-ajouter {
    background-color: #111827;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }

  .btn-ajouter:hover {
    background-color: #374151;
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