<script>
  import { onMount } from "svelte";
  import LogementCard from "./LogementCard.svelte";
  /** @type {any[]} */
  let logements = [];
  /** @type {string | null} */
  let error = null;
  /** @type {boolean} */
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
      const res = await fetch(`/api/logements/${id}`, { method: "DELETE" });
      if (res.ok) {
        logements = logements.filter(logement => logement.id !== id && logement._id !== id);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  {#if loading}
    <p>Chargement en cours...</p>
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