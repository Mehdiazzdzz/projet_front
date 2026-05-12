<script>
  export let sejour;
  export let handleDelete;
  export let handleEdit = () => {}; 
</script>

<div class="p-4 border rounded-lg shadow bg-white">
  
  <img 
    src={sejour.imageUrl} 
    alt={sejour.nom} 
    class="w-full h-48 object-cover rounded-lg mb-4" 
  />
  
  <h2 class="text-lg font-bold">{sejour.nom}</h2>
  
  <p class="text-gray-600">{sejour.ville}</p>
  
  <p class="text-blue-500 font-semibold mb-4">{sejour.prix}€ / nuit</p>
  
  <div class="flex gap-2">
    <button 
      class="bg-gray-500 text-white px-4 py-2 rounded-lg w-full" 
      on:click={handleEdit}
    >
      Modifier
    </button>

    <button 
      class="bg-red-500 text-white px-4 py-2 rounded-lg w-full" 
      on:click={handleDelete}
    >
      Supprimer
    </button>
  </div>
</div>