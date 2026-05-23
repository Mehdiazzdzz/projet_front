<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  /** @type {{ id: string }} */
  export let params;
  /** @type {any | null} */
  let logement = null;
  let loading = true;
  /** @type {string | null} */
  let error = null;
  let showModal = false;
  let dateDebut = "";
  let dateFin = "";
  let resLoading = false;
  /** @type {string | null} */
  let resMessage = null;
  let isResError = false;

  const getLogementDetail = async () => {
    loading = true;
    error = null;
    try {
      const res = await fetch(`/api/logements/${params.id}`);
      if (res.ok) {
        logement = await res.json();
      } else {
        error = "Impossible de trouver les détails de ce logement.";
      }
    } catch (e) {
      error = "Erreur lors de la connexion au serveur.";
    }
    loading = false;
  };

  onMount(() => {
    getLogementDetail();
  });

  async function handleReservation() {
    resLoading = true;
    resMessage = null;
    isResError = false;

    const payload = {
      logementId: params.id,
      dateDebut: dateDebut,
      dateFin: dateFin
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        isResError = false;
        resMessage = "Réservation confirmée avec succès !";
        
        setTimeout(() => {
          showModal = false;
          resMessage = null;
          dateDebut = "";
          dateFin = "";
        }, 2500);

      } else {
        isResError = true;
        resMessage = "Erreur : Ce logement est peut-être déjà réservé à ces dates.";
      }
    } catch (e) {
      isResError = true;
      resMessage = "Impossible de contacter le serveur de réservation.";
    }
    
    resLoading = false;
  }
</script>

<div class="max-w-4xl mx-auto p-4 md:p-8 relative">
  
  {#if loading}
    <p class="text-center text-gray-500 font-semibold">Chargement des détails en cours...</p>
  {:else if error}
    <div class="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700">{error}</div>
  {:else if logement}
    
    <div class="bg-white border rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div class="h-64 md:h-full min-h-[300px]">
        <img src={logement.imageUrl} alt={logement.nom} class="w-full h-full object-cover" />
      </div>

      <div class="p-6 flex flex-col justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold mb-2 text-gray-800">{logement.nom}</h1>
          <p class="text-gray-500 text-lg mb-4">{logement.ville}</p>
          
          <div class="flex gap-4 mb-6">
            <span class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-200">
              {logement.prix}€ / nuit
            </span>
          </div>

          <p class="text-gray-600 leading-relaxed mb-6 break-words whitespace-normal">{logement.description}</p>
        </div>

        <div class="flex flex-col gap-3">
          <button
            class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            on:click={() => showModal = true}
          >
            Réserver ce logement
          </button>

          <div class="flex gap-3">
            <button class="bg-gray-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-gray-600 transition-colors shadow-md flex-1 text-sm" on:click={() => push("/")}>
              Retour
            </button>
            <button class="bg-yellow-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors shadow-md flex-1 text-sm" on:click={() => push(`/logements/edit/${params.id}`)}>
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>

    {#if showModal}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        
        <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Réserver : {logement.nom}</h2>
          
          {#if resMessage}
            <div class="mb-4 p-3 rounded-lg text-sm font-semibold {isResError ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}">
              {resMessage}
            </div>
          {/if}

          <form on:submit|preventDefault={handleReservation} class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <label for="dateDebut" class="font-semibold text-gray-700 text-sm">Date d'arrivée</label>
              <input type="date" id="dateDebut" bind:value={dateDebut} required class="border p-2 rounded-lg" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="dateFin" class="font-semibold text-gray-700 text-sm">Date de départ</label>
              <input type="date" id="dateFin" bind:value={dateFin} required class="border p-2 rounded-lg" />
            </div>

            <div class="flex gap-3 mt-4">
              <button type="button" class="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg w-full hover:bg-gray-300 transition-colors" on:click={() => { showModal = false; resMessage = null; }}>
                Annuler
              </button>
              
              <button type="submit" disabled={resLoading} class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                {resLoading ? 'Envoi...' : 'Confirmer'}
              </button>
            </div>
          </form>
        </div>

      </div>
    {/if}
  {/if}
</div>