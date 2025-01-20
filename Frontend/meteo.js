function handleCommand(command) {
	// Commande pour ouvrir le navigateur
	if (
		command.includes("navigateur") &&
		(command.includes("ouvrir") ||
			command.includes("ouvre") ||
			command.includes("lancer") ||
			command.includes("lance"))
	) {
		alert("Le navigateur va s'ouvrir !");
		// Exemple : Ouvrir Google dans un nouvel onglet
		window.open("https://www.google.com");

		// Commande pour la météo
	} else if (command.includes("météo")) {
		alert("Récupération de votre position pour afficher la météo...");

		// Utiliser l'API de géolocalisation pour récupérer les coordonnées
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

					// Construire l'URL pour ouvrir l'application météo web
					const weatherAppUrl = `https://openweathermap.org/weathermap?lat=${lat}&lon=${lon}&zoom=10`;

					// Ouvrir l'application météo web ou native
					window.open(weatherAppUrl, "_blank");
				},
				(error) => {
					alert(
						"Impossible d'obtenir votre position. Vérifiez les permissions."
					);
					console.error(error);
				}
			);
		} else {
			alert("La géolocalisation n'est pas supportée par votre navigateur.");
		}

		// Commande pour fermer le navigateur
	} else if (
		command.includes("navigateur") &&
		(command.includes("fermer") ||
			command.includes("ferme") ||
			command.includes("éteindre") ||
			command.includes("éteint"))
	) {
		alert("Le navigateur va se fermer !");
		window.close();
	} else {
		alert("Commande inconnue.");
	}
}

export default handleCommand;
