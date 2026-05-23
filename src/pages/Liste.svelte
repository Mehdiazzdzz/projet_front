<script>
  import { onMount } from "svelte";
  import LogementCard from "../components/LogementCard.svelte";
  /** @type {any[]} */
  let logements = [];
  /** @type {string | null} */
  let error = null;
  let loading = true;

  let recherche = "";

  $: logementsFiltres = logements.filter(logement =>
    logement.ville.toLowerCase().includes(recherche.toLowerCase()) ||
    logement.nom.toLowerCase().includes(recherche.toLowerCase())
  );

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

<section class="bg-gradient-to-b from-white to-gray-100 p-8 text-center mb-6 rounded-xl shadow-sm border border-gray-200">
  <h1 class="text-xl font-bold mb-4 text-gray-800">Rechercher une destination</h1>
  <div class="flex justify-center gap-4 max-w-2xl mx-auto">
      <input
        type="text"
        bind:value={recherche}
        class="border p-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Chercher par ville ou nom"
      />
      <button class="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-md">
        Chercher
      </button>
  </div>
</section>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {#if loading}
    <p class="text-center text-gray-500 col-span-full font-semibold">Chargement des chalets en cours...</p>
  {:else if error}
    <p class="text-red-500 text-center col-span-full bg-red-50 p-4 rounded-lg">{error}</p>
  {:else}
    
    {#each logementsFiltres as logement (logement.id ?? logement._id)}
      <LogementCard
        sejour={logement}
        handleDelete={() => supprimerLogement(logement.id ?? logement._id)}
      />
    {:else}
      <div class="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <p class="text-gray-500 font-semibold mb-2 text-lg">Aucun logement trouvé.</p>
        <p class="text-sm text-gray-400">Essayez de chercher une autre ville ou modifiez vos critères.</p>
      </div>
    {/each}

  {/if}
</div>