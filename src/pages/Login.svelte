<script>
  import { push } from "svelte-spa-router";

  let email = "";
  let password = "";
  /** @type {string | null} */
  let erreur = null;

  async function handleLogin() {
    erreur = null;

    try {
      const res = await fetch("/api/logements");
      
      if (!res.ok) {
        erreur = "Erreur de connexion à l'API.";
        return;
      }

      const logements = await res.json();
      let userTrouve = null;

      for (let logement of logements) {
        if (logement.proprietaire && logement.proprietaire.email === email) {
          userTrouve = logement.proprietaire;
          break;
        }
      }

      if (userTrouve) {
        localStorage.setItem("user", JSON.stringify(userTrouve));
        push("/mes-reservations");
      } else {
        erreur = "Email introuvable. Essayez jean.dupont@mail.com";
      }

    } catch (e) {
      erreur = "Impossible de contacter le serveur.";
    }
  }
</script>

<div class="max-w-md mx-auto p-8 mt-10 bg-white border rounded-xl shadow-lg">
  <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h2>
  
  {#if erreur}
    <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
      {erreur}
    </div>
  {/if}

  <form on:submit|preventDefault={handleLogin} class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="email" class="text-sm font-semibold text-gray-600">Email</label>
      <input type="email" id="email" bind:value={email} required class="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ex: jean.dupont@mail.com" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="password" class="text-sm font-semibold text-gray-600">Mot de passe</label>
      <input type="password" id="password" bind:value={password} required class="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
      <span class="text-xs text-gray-400">Le mot de passe n'est pas vérifié dans cette simulation.</span>
    </div>

    <button type="submit" class="mt-2 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
      Se connecter
    </button>
  </form>

  <p class="mt-6 text-center text-sm text-gray-500">
    Pas encore de compte ? <a href="#/inscription" class="text-blue-500 font-bold hover:underline">Créer un compte</a>
  </p>
</div>