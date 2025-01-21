export default function handleCommand(command) {
    if (command.includes("météo")) {
        alert("Récupération de votre position pour afficher la météo...");
        handleMeteo(command);
    }
}

export function handleMeteo(command) {
    console.log("Commande météo reçue :", command);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const weatherAppUrl = `https://openweathermap.org/weathermap?lat=${lat}&lon=${lon}&zoom=10`;
                window.open(weatherAppUrl, "_blank");
            },
            (error) => {
                alert("Impossible d'obtenir votre position. Vérifiez les permissions.");
                console.error(error);
            }
        );
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}
