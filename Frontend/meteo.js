export function handleMeteo(command) {
	if (
		command.includes("météo") ||
		command.includes("temps") ||
		command.includes("prévisions") ||
		command.includes("météorologiques")
	) {
		alert("Récupération de votre position pour afficher la météo...");
		console.log("Commande météo reçue :", command);

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
