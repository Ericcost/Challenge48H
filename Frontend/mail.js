export function handleMail(command) {
	// Commande pour ouvrir le navigateur
	if (
		command.includes("ouvrir") ||
		command.includes("ouvre") ||
		command.includes("lancer") ||
		command.includes("lance") ||
		command.includes("envoyer") ||
		command.includes("envoie")
	) {
		setTimeout(() => {
			openGmail();
			return;
		}, 1000);

		// Commande pour fermer le navigateur
	} else if (
		command.includes("fermer") ||
		command.includes("ferme") ||
		command.includes("éteindre") ||
		command.includes("éteint")
	) {
		// alert("Le mail va se fermer !");
		window.close();
	}
}

// Fonction pour ouvrir Gmail avec un destinataire, un sujet et un corps de message
function openGmail() {
	const recipient = "ynov@ynov.com";
	const subject = "Sujet important";
	const body = "Bonjour,\n\nVoici le contenu de mon message.";

	const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
		recipient
	)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	window.open(gmailUrl, "_blank");
}
