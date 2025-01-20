export function handleBrowser(command) {
	// Commande pour ouvrir le navigateur
	if (
		command.includes("ouvrir") ||
		command.includes("ouvre") ||
		command.includes("lancer") ||
		command.includes("lance")
	) {
		alert("Le navigateur va s'ouvrir !");
		// Ouvrir Google dans un nouvel onglet
		window.open("https://www.google.com");

		// Commande pour fermer le navigateur
	} else if (
		command.includes("fermer") ||
		command.includes("ferme") ||
		command.includes("éteindre") ||
		command.includes("éteint")
	) {
		alert("Le navigateur va se fermer !");
		window.close();
	}
}
