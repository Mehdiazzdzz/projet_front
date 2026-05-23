<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  /** @type {{ id: string }} */
  export let params;

  let nom = "";
  let ville = "";
  let prix = 0;
  let imageUrl = "";
  let capacite = 1;
  let description = "";
  
  /** @type {string | null} */
  let erreur = null;
  let loading = true;

  onMount(async () => {
    try {
      const res = await fetch(`/api/logements/${params.id}`);
      if (res.ok) {
        const logement = await res.json();
        nom = logement.nom;
        ville = logement.ville;
        prix = logement.prix;
        imageUrl = logement.imageUrl;
        capacite = logement.capacite;
        description = logement.description;
      } else {
        erreur = "Impossible de récupérer les informations de ce logement.";
      }
    } catch (error) {
      console.error("Erreur de chargement :", error);
      erreur = "Erreur de connexion au serveur.";
    }
    loading = false;
  });

  async function handleSubmit() {
    erreur = null;
    const logementModifie = {
      nom, ville, prix, capacite, description, imageUrl,
      proprietaireId: "69f8b01a50b9a786a524fd2d"
    };

    try {
      const res = await fetch(`/api/logements/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logementModifie)
      });

      if (res.ok) {
        push("/");
      } else {
        erreur = "Erreur lors de la modification du logement. Vérifiez les données.";
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      erreur = "Impossible de contacter le serveur. Vérifiez votre connexion.";
    }
  }
</script>

<div class="max-w-xl mx-auto p-8 mt-10 bg-white border rounded-lg shadow">
  <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Modifier le logement</h2>
  
  {#if loading}
    <p class="text-center text-gray-500 font-semibold">Récupération des données du chalet...</p>
  {:else}
    {#if erreur}
      <div class="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700">
        {erreur}
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label for="nom" class="font-semibold text-gray-700">Nom du logement</label>
        <input type="text" id="nom" bind:value={nom} required class="border p-2 rounded-lg" />
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex flex-col gap-1 flex-1 min-w-0">
          <label for="ville" class="font-semibold text-gray-700">Ville</label>
          <input type="text" id="ville" bind:value={ville} required class="border p-2 rounded-lg w-full" />
        </div>

        <div class="flex flex-col gap-1 flex-1 min-w-0">
          <label for="prix" class="font-semibold text-gray-700">Prix / nuit (€)</label>
          <input type="number" id="prix" bind:value={prix} required min="1" class="border p-2 rounded-lg w-full" />
        </div>

        <div class="flex flex-col gap-1 flex-1 min-w-0">
          <label for="capacite" class="font-semibold text-gray-700">Capacité</label>
          <input type="number" id="capacite" bind:value={capacite} required min="1" class="border p-2 rounded-lg w-full" />
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <label for="description" class="font-semibold text-gray-700">Description</label>
        <textarea id="description" bind:value={description} required class="border p-2 rounded-lg min-h-[100px]"></textarea>
      </div>

      <div class="flex flex-col gap-1">
        <label for="imageUrl" class="font-semibold text-gray-700">URL de l'image</label>
        <input type="url" id="imageUrl" bind:value={imageUrl} required class="border p-2 rounded-lg" />
      </div>

      <div class="flex gap-4 mt-4">
        <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-600 transition-colors" on:click={() => push("/")}>
          Annuler
        </button>
        <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-yellow-600 transition-colors">
          Enregistrer les modifications
        </button>
      </div>
    </form>
  {/if}
</div>