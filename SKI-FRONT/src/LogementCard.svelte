<script>
  export let nom;
  export let ville;
  export let prix;
  export let imageUrl;
  export let description;
  export let capacite;
</script>

<div class="card">
  <img src={imageUrl} alt={nom} />
  <div class="container">
    <h3>{nom}</h3>
    <p><b>Ville :</b> {ville}</p>
    <p>{description}</p>
    <p><b>Capacité :</b> {capacite} personnes</p>
    <p class="price">{prix} € / nuit</p>
  </div>
</div>

<style>
  .card {
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .container {
    padding: 15px;
    font-family: sans-serif;
  }

  .price {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1.2em;
  }
</style>