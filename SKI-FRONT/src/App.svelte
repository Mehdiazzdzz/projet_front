<script>
  import LogementCard from "./LogementCard.svelte";

  let logements = [
    {
      "id": "69f8b0d950b9a786a524fd37",
      "nom": "Studio Centre Lille",
      "ville": "Lille",
      "prix": 55.5,
      "capacite": 2,
      "description": "Studio moderne proche gare",
      "imageUrl": "https://picsum.photos/600/400?1"
    },
    {
      "id": "69f8b0e050b9a786a524fd38",
      "nom": "Appartement Parisien",
      "ville": "Paris",
      "prix": 120,
      "capacite": 4,
      "description": "Appartement lumineux avec balcon",
      "imageUrl": "https://picsum.photos/600/400?2"
    },
    {
      "id": "69f8b0e950b9a786a524fd39",
      "nom": "Maison familiale Lyon",
      "ville": "Lyon",
      "prix": 180,
      "capacite": 6,
      "description": "Grande maison avec jardin",
      "imageUrl": "https://picsum.photos/600/400?3"
    },
    {
      "id": "69f8b0ef50b9a786a524fd3a",
      "nom": "Loft moderne",
      "ville": "Bordeaux",
      "prix": 95,
      "capacite": 3,
      "description": "Loft industriel rénové",
      "imageUrl": "https://picsum.photos/600/400?4"
    },
    {
      "id": "69f8b0f550b9a786a524fd3b",
      "nom": "Appartement mer",
      "ville": "Nice",
      "prix": 150,
      "capacite": 5,
      "description": "Vue mer exceptionnelle",
      "imageUrl": "https://picsum.photos/600/400?5"
    },
    {
      "id": "69f8b0fd50b9a786a524fd3c",
      "nom": "Chalet montagne",
      "ville": "Chamonix",
      "prix": 200,
      "capacite": 8,
      "description": "Chalet au pied des pistes",
      "imageUrl": "https://picsum.photos/600/400?6"
    }
  ];
</script>

<header>
  <h1>Ski-Location</h1>
  <nav>
    <a href="/">Accueil</a>
    <a href="/proposer">ajouter un logement</a>
  </nav>
</header>

<main>
  <h1>Plateforme de location au ski</h1>

  <div class="logements-list">
    {#each logements as logement}
      <LogementCard 
        nom={logement.nom}
        ville={logement.ville}
        prix={logement.prix}
        imageUrl={logement.imageUrl}
        description={logement.description}
        capacite={logement.capacite}
      />
    {/each}
  </div>
</main>

<footer>
  <p>&copy; 2026 - Plateforme de location de ski</p>
</footer>

<style>
  .logements-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  h1 {
    text-align: center;
    font-family: sans-serif;
  }
  header {
    background-color: #52489C;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  footer {
    background-color: #EBEBEB;
    color: #666;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
    border-top: 1px solid #ddd;
  }
</style>