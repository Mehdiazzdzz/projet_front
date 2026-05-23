<script>
  let { sejour, handleDelete } = $props();
</script>

<div class="p-4 border rounded-lg shadow bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-2 flex flex-col h-full">
  
  <img src={sejour.imageUrl} alt={sejour.nom} class="w-full h-48 object-cover rounded-lg mb-4" />
  
  <h2 class="text-lg font-bold">{sejour.nom}</h2>
  <p class="text-gray-500 text-sm mb-1">{sejour.ville}</p>
  
  <p class="text-gray-600 text-sm mb-3 line-clamp-2" title={sejour.description}>
    {sejour.description}
  </p>

  <p class="text-blue-500 font-semibold mb-4">{sejour.prix}€ / nuit</p>
  
  <div class="mt-auto flex flex-wrap gap-2">
    <a
      href="#/logements/{sejour.id ?? sejour._id}"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg flex-grow text-center font-semibold hover:bg-blue-600 transition-colors block">
      Voir détail
    </a>
    
    <a
      href="#/logements/edit/{sejour.id ?? sejour._id}"
      class="bg-yellow-500 text-white px-4 py-2 rounded-lg flex-grow text-center font-semibold hover:bg-yellow-600 transition-colors block">
      Modifier
    </a>

    <button class="bg-red-500 text-white px-4 py-2 rounded-lg flex-grow hover:bg-red-600 transition-colors" onclick={() => handleDelete()}>
      Supprimer
    </button>
  </div>
</div>