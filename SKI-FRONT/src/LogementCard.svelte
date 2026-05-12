<script>
  export let sejour;
  export let handleDelete;
  
</script>

<div class="card">
  <img src={sejour.imageUrl} alt={sejour.nom} />
  <div class="container">
    <h3>{sejour.nom}</h3>
    <p><b>Ville :</b> {sejour.ville}</p>
    <div class="footer-card">
      <p class="price">{sejour.prix} € / nuit</p>
      <button class="btn-supprimer" on:click={handleDelete}>Supprimer</button>
      <button class="btn-modifier" on:click={handleDelete}>modifier</button>
    </div>
  </div>
</div>

<style>
  .card {
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0,0,0,0.15);
  }

  img {
    width: 100%;
    height: 50%;
    object-fit: cover;
  }

  .container {
    padding: 15px;
    font-family: sans-serif;
  }

  .footer-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }

  .price {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1.2em;
    margin: 0;
  }

  .btn-modifier,
  .btn-supprimer {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
  }

  .btn-modifier:hover,
  .btn-supprimer:hover {
    background-color: #c0392b;
  }
</style>