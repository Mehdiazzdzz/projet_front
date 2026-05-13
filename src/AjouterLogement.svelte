<script>
  import { push } from "svelte-spa-router";


  let nom = "";
  let ville = "";
  let prix = 0;
  let imageUrl = "";
  let capacite = 1; 
  let description = "";
  /** @type {string | null} */
  let erreur = null;

  async function handleSubmit() {
    erreur = null;
    const nouveauLogement = { 
      nom, ville, prix, capacite, description, imageUrl,
      proprietaireId: "69f8b01a50b9a786a524fd2d" 
    };

    try {
      const res = await fetch("/api/logements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveauLogement)
      });

      if (res.ok) {
        push("/");
      } else {
        erreur = "Erreur lors de l'ajout du logement. Vérifiez les informations et réessayez.";
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      erreur = "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.";
    }
  }
</script>

<div class="max-w-xl mx-auto p-8 mt-10 bg-white border rounded-lg shadow">
  <h2 class="text-2xl font-bold mb-6 text-center">Ajouter un nouveau logement</h2>
  {#if erreur}
    <div class="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700">
      {erreur}
    </div>
  {/if}
  <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="nom" class="font-semibold text-gray-700">Nom du logement</label>
      <input type="text" id="nom" bind:value={nom} required class="border p-2 rounded-lg" placeholder="Ex: Chalet des Neiges" />
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <label for="ville" class="font-semibold text-gray-700">Ville</label>
        <input type="text" id="ville" bind:value={ville} required class="border p-2 rounded-lg w-full" placeholder="Ex: Chamonix" />
      </div>

      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <label for="prix" class="font-semibold text-gray-700">Prix / nuit (€)</label>
        <input type="number" id="prix" bind:value={prix} required min="1" class="border p-2 rounded-lg w-full" />
      </div>

      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <label for="capacite" class="font-semibold text-gray-700">Capacité</label>
        <input type="number" id="capacite" bind:value={capacite} required min="1" class="border p-2 rounded-lg w-full" placeholder="Nb pers." />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label for="description" class="font-semibold text-gray-700">Description</label>
      <textarea id="description" bind:value={description} required class="border p-2 rounded-lg min-h-[100px]" placeholder="Décrivez le logement..."></textarea>
    </div>

    <div class="flex flex-col gap-1">
      <label for="imageUrl" class="font-semibold text-gray-700">URL de l'image</label>
      <input type="url" id="imageUrl" bind:value={imageUrl} required class="border p-2 rounded-lg" placeholder="https://..." />
    </div>

    <div class="flex gap-4 mt-4">
      <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-600 transition-colors" on:click={() => push("/")}>
        Annuler
      </button>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-green-600 transition-colors">
        Enregistrer
      </button>
    </div>
  </form>
</div>