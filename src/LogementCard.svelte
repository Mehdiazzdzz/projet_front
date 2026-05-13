<script>
  let { sejour, handleDelete, handleEdit = () => {} } = $props();
</script>

<div class="p-4 border rounded-lg shadow bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-2 flex flex-col h-full">
  
  <img src={sejour.imageUrl} alt={sejour.nom} class="w-full h-48 object-cover rounded-lg mb-4" />
  
  <h2 class="text-lg font-bold">{sejour.nom}</h2>
  <p class="text-gray-500">{sejour.ville}</p>
  <p class="text-blue-500 font-semibold mb-4">{sejour.prix}€ / nuit</p>
  
  <div class="mt-auto flex flex-wrap gap-2">
    <button 
      class="bg-yellow-500 text-white px-4 py-2 rounded-lg flex-grow hover:bg-yellow-600 transition-colors" onclick={()=> handleEdit()}>
      Modifier
    </button>

    <button class="bg-red-500 text-white px-4 py-2 rounded-lg flex-grow hover:bg-red-600 transition-colors" onclick={()=> handleDelete()}>
      Supprimer
    </button>
  </div>
</div>