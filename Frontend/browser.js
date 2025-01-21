export function handleBrowser(command) {
	// Commande pour ouvrir le navigateur
	if (
		command.includes("ouvrir") ||
		command.includes("ouvre") ||
		command.includes("lancer") ||
		command.includes("lance") ||
		command.includes("recherche") ||
		command.includes("cherche")
	) {
		const keyword = "recherche";
		const index = command.indexOf(keyword);

		if (index !== -1) {
			// Extraire tout ce qui se trouve après "recherche"
			const result = command.slice(index + keyword.length).trim();

			window.open("https://www.google.com/search?q=" + result);
		} else {
			// Ouvrir Google dans un nouvel onglet
			setTimeout(() => {
				window.open("https://www.google.com");
				return;
			}, 1000);

			console.log("Le mot 'recherche' n'a pas été trouvé dans la chaîne.");
		}
		// Commande pour fermer le navigateur
	} else if (
		command.includes("fermer") ||
		command.includes("ferme") ||
		command.includes("éteindre") ||
		command.includes("éteint")
	) {
		// alert("Le navigateur va se fermer !");
		window.close();
	}
}
