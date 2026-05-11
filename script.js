const container = document.querySelector("#liste-logements");
const zoneDetails = document.querySelector("#affichage-details");

const sejours = [
    { localisation: "Calais", station: "Les flaires", prix: 500 },
    { localisation: "Lille", station: "punta cana", prix: 600 },
    { localisation: "Dunkerque", station: "kan ban", prix: 700 },
];

sejours.forEach(sejour => {
    const div = document.createElement("div");
    
    div.textContent = sejour.station;
    
    div.addEventListener("click", () => {
        afficherDetails(sejour);
    });

    container.appendChild(div);
});

function afficherDetails(sejour) {
    zoneDetails.innerHTML = `
        <div style="padding: 20px; color: white;">
            <h2>${sejour.station}</h2>
            <p><strong>Localisation :</strong> ${sejour.localisation}</p>
            <p><strong>Prix :</strong> ${sejour.prix} €</p>
            <button style="margin-top: 10px; ">Réserver maintenant</button>
        </div>
    `;
}