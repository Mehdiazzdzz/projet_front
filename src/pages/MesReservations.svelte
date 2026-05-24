<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  /** @type {any | null} */
  let user = null;
  /** @type {any[]} */
  let mesReservations = [];
  let loading = true;
  /** @type {string | null} */
  let error = null;

  onMount(async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      push("/connexion");
      return;
    }
    user = JSON.parse(storedUser);

    try {
      const res = await fetch("/api/logements");
      if (res.ok) {
        const logements = await res.json();
        let reservationsTrouvees = [];

        for (let logement of logements) {
          if (logement.reservations && logement.reservations.length > 0) {
            for (let reservation of logement.reservations) {
              if (reservation.locataireId === user.id) {
                reservationsTrouvees.push({
                  ...reservation,
                  logementNom: logement.nom,
                  logementVille: logement.ville,
                  logementImage: logement.imageUrl
                });
              }
            }
          }
        }
        mesReservations = reservationsTrouvees;
      } else {
        error = "Impossible de récupérer les données.";
      }
    } catch (e) {
      error = "Erreur de connexion au serveur.";
    }
    loading = false;
  });

  /** @param {string} dateString */
  function formaterDate(dateString) {
    if (!dateString) return "Date inconnue";
    return new Date(dateString).toLocaleDateString("fr-FR");
  }
</script>

<div class="max-w-4xl mx-auto p-4 md:p-8 mt-6">
  <div class="flex justify-between items-center mb-8 border-b pb-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Mes Réservations</h1>
      {#if user}
        <p class="text-gray-500 mt-1">Compte : {user.email}</p>
      {/if}
    </div>
    <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition" on:click={() => push("/")}>
      Retour Accueil
    </button>
  </div>

  {#if loading}
    <p class="text-center text-gray-500 font-semibold">Recherche de vos réservations...</p>
  {:else if error}
    <p class="text-red-500 text-center bg-red-50 p-4 rounded-lg">{error}</p>
  {:else if mesReservations.length === 0}
    <div class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
      <p class="text-gray-500 text-lg font-semibold mb-2">Vous n'avez aucune réservation pour le moment.</p>
      <button class="text-blue-600 font-bold hover:underline" on:click={() => push("/")}>Explorer les chalets</button>
    </div>
  {:else}
    <div class="grid grid-cols-1 gap-6">
      {#each mesReservations as res (res.id)}
        <div class="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row gap-4 p-4 items-center transition-all hover:shadow-md relative">
          <img src={res.logementImage} alt={res.logementNom} class="w-full sm:w-32 sm:h-32 h-48 object-cover rounded-lg" />
          <div class="flex-1 w-full flex flex-col justify-between h-full">
            <div>
              <h3 class="font-bold text-xl text-gray-800 mb-1">{res.logementNom}</h3>
              <p class="text-sm text-gray-500 mb-3">{res.logementVille}</p>
            </div>
            <div class="text-sm bg-blue-50 border border-blue-100 text-blue-700 px-3 py-2 rounded-lg w-full text-center sm:text-left">
                Du <strong>{formaterDate(res.dateArrivee || res.dateDebut)}</strong> au <strong>{formaterDate(res.dateDepart || res.dateFin)}</strong>
            </div>
        </div>
          
        </div>
      {/each}
    </div>
  {/if}
</div>