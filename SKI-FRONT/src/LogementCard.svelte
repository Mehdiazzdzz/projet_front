<script>
  export let sejour;
  export let handleDelete;
  export let handleEdit = () => {}; 
</script>

<div class="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
  
  <!-- Image avec coins arrondis en haut -->
  <img 
    src={sejour.imageUrl} 
    alt={sejour.nom} 
    class="h-64 w-full object-cover rounded-t-xl" 
  />
  
  <!-- Conteneur des informations -->
  <div class="px-4 py-3 w-full">
    <!-- Ville (à la place de la Marque) -->
    <span class="text-gray-400 mr-3 uppercase text-xs font-semibold tracking-wider">
      {sejour.ville}
    </span>
    
    <!-- Nom du logement (à la place du Nom du produit) -->
    <h3 class="text-lg font-bold text-black truncate block capitalize m-0 mt-1">
      {sejour.nom}
    </h3>
    
    <!-- Ligne du Prix et des Boutons -->
    <div class="flex items-center mt-3 mb-1">
      
      <!-- Prix -->
      <p class="text-lg font-semibold text-black cursor-auto my-0">
        {sejour.prix} € <span class="text-sm text-gray-500 font-normal">/ nuit</span>
      </p>
      
      <!-- Actions (à la place de l'icône du panier) -->
      <div class="ml-auto flex gap-2">
        <!-- Bouton Modifier (Style discret) -->
        <button 
          class="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-3 rounded-lg border-none cursor-pointer text-xs font-bold transition-colors" 
          on:click={handleEdit}
        >
          Modifier
        </button>

        <!-- Bouton Supprimer (Style Alerte) -->
        <button 
          class="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded-lg border-none cursor-pointer text-xs font-bold transition-colors" 
          on:click={handleDelete}
        >
          Supprimer
        </button>
      </div>

    </div>
  </div>
</div>