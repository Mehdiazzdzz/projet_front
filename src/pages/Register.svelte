<script>
  import { push } from "svelte-spa-router";

  let prenom = "";
  let nom = "";
  let email = "";
  let password = "";
  /** @type {string | null} */
  let erreur = null;

  async function handleRegister() {
    erreur = null;
    const user = { prenom, nom, email, password };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      if (res.ok) {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        push("/connexion");
      } else {
        erreur = "L'inscription a échoué. Vérifiez vos informations.";
      }
    } catch (e) {
      erreur = "Erreur de connexion au serveur.";
    }
  }
</script>

<div class="max-w-md mx-auto p-8 mt-10 bg-white border rounded-xl shadow-lg">
  <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Créer un compte</h2>
  
  {#if erreur}
    <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{erreur}</div>
  {/if}

  <form on:submit|preventDefault={handleRegister} class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="prenom" class="text-sm font-semibold text-gray-600">Prénom</label>
        <input type="text" id="prenom" bind:value={prenom} required class="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="nom" class="text-sm font-semibold text-gray-600">Nom</label>
        <input type="text" id="nom" bind:value={nom} required class="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label for="email" class="text-sm font-semibold text-gray-600">Email</label>
      <input type="email" id="email" bind:value={email} required class="border p-2 rounded-lg" placeholder="exemple@mail.com" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="password" class="text-sm font-semibold text-gray-600">Mot de passe</label>
      <input type="password" id="password" bind:value={password} required class="border p-2 rounded-lg" />
    </div>

    <button type="submit" class="mt-2 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
      S'inscrire
    </button>
  </form>

  <p class="mt-6 text-center text-sm text-gray-500">
    Déjà un compte ? <a href="#/connexion" class="text-blue-500 font-bold hover:underline">Se connecter</a>
  </p>
</div>