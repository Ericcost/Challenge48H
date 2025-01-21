// Fonction pour gérer les commandes musicales
export function handleMusic(command) {
	if (
		command.includes("lance") ||
		command.includes("lancer") ||
		command.includes("jouer") ||
		command.includes("joue") ||
		command.includes("mets") ||
		command.includes("mettre")
	) {
		if (command.includes("rock")) {
			alert("Lancement d'une playlist Rock !");
			playSpotifyPlaylist("37i9dQZF1DWWSuZL7uNdVA");
			return;
		} else if (command.includes("jazz")) {
			alert("Lancement d'une playlist Jazz !");
			playSpotifyPlaylist("37i9dQZF1DXbITWG1ZJKYt");
			return;
		} else {
			alert("Lecture de musique par défaut !");
			window.open(
				`https://open.spotify.com/intl-fr/album/0KGBW1MQtC2aFPCDUdAkdJ?si=8kO0jtx-REC4fF0E-I9KFw`,
				"_blank"
			);
			return;
		}
	} else {
		alert("Commande musicale inconnue.");
		return;
	}
}

// Fonction pour lancer une playlist Spotify via l'API backend
function playSpotifyPlaylist(playlistId) {
	window.open(`https://open.spotify.com/playlist/${playlistId}`, "_blank");
}
