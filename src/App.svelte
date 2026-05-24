<script>
  import Router from "svelte-spa-router";
  import Liste from "./pages/Liste.svelte";
  import AjouterLogement from "./pages/AjouterLogement.svelte";
  import Detail from "./pages/Detail.svelte";
  import ModifierLogement from "./pages/ModifierLogement.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import MesReservations from "./pages/MesReservations.svelte";
  import './app.css';

  const routes = {
    "/": Liste,
    "/logements/add": AjouterLogement,
    "/logements/:id": Detail,
    "/logements/edit/:id": ModifierLogement,
    "/connexion": Login,
    "/mes-reservations": MesReservations,
    "/inscription": Register,
    "*": NotFound
  };
</script>

<div class="flex flex-col min-h-screen">
  <header class="flex flex-col md:flex-row justify-between items-center p-4 from-gray-300 to-white bg-gradient-to-b">
    <a href="#/" class="flex items-center gap-2 cursor-pointer group">
        <img src="/logo.svg" alt="Logo Ski-Location" class="h-20 w-auto" />
    </a>
    <div class="flex flex-wrap justify-center gap-2 md:gap-4">
        <a href="#/logements/add" class="border border-green-500 text-green-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-green-50 transition-colors">
            + Ajouter
        </a>
        <a href="#/inscription" class="border border-blue-500 text-blue-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-blue-50 transition-colors">
            S'inscrire
        </a>
        <a href="#/connexion" class="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-600 transition-colors">
            Se connecter
        </a>
    </div>
  </header>

  <main class="flex-grow p-4">
    <Router {routes} />
  </main>

  <footer class="p-4 from-white to-gray-300 bg-gradient-to-b text-center text-gray-600 mt-auto">
    <p>&copy; 2026 - Plateforme de location</p>
  </footer>
</div>