<script>
  import { push } from "svelte-spa-router";
</script>

<div class="flex flex-col items-center justify-center py-20 text-center">
  <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
  <h2 class="text-2xl font-semibold text-gray-700 mb-6">Oups ! Page introuvable.</h2>
  <p class="text-gray-500 mb-8 max-w-md mx-auto">
    La page que vous cherchez n'existe pas ou a été déplacée.
  </p>
  <button
    class="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-md"
    on:click={() => push("/")}
  >
    Retourner à l'accueil
  </button>
</div>