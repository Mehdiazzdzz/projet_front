<script>
  import Router from "svelte-spa-router";
  import Liste from "./Liste.svelte";
  import AjouterLogement from "./AjouterLogement.svelte"; 
  import './app.css';

  const routes = {
    "/": Liste,
    "/ajouter": AjouterLogement
  };
</script>

<div class="flex flex-col min-h-screen">
  
  <header class="flex flex-col md:flex-row justify-between items-center p-4 from-gray-300 to-white bg-gradient-to-b">
    
    <a href="#/" class="flex items-center gap-2 cursor-pointer group">
        <img src="/logo.svg" alt="Logo Ski-Location" class="h-20 w-auto" />
    </a>

    <div class="flex flex-wrap justify-center gap-2 md:gap-4">
        <a href="#/ajouter" class="border border-green-500 text-green-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-green-50 transition-colors">
            + Ajouter
        </a>
        
        <button class="border border-blue-500 text-blue-500 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-blue-50 transition-colors">S'inscrire</button>
        <button class="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-600 transition-colors">Se connecter</button>
    </div>
    
  </header>
  <section class="bg-gradient-to-b from-white to-gray-300 p-8 text-center">
      <h1 class="text-xl font-bold mb-4">Rechercher une destination</h1>
      <div class="flex justify-center gap-4">
          <input type="text" class="border p-2 rounded-lg w-full md:w-1/2" placeholder="Où voulez-vous aller ?" />
          <button class="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold">Chercher</button>
    </div>
  </section>
  <main class="flex-grow p-4">
    <Router {routes} />
  </main>

  <footer class="p-4 from-white to-gray-300 bg-gradient-to-b text-center text-gray-600 mt-auto">
    <p>&copy; 2026 - Plateforme de location</p>
  </footer>
</div>