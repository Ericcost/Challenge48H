const client_id = "a92a4ceb98674ff4bd841d20a7cfa77b";
const client_secret = "55e95fc961e84a58a1452fa18344f054";
const redirect_uri = "http://localhost:8080/access-spotify";

const app = require("express");

app.get("/login", function (req, res) {
	var state = generateRandomString(16);
	var scope = "user-read-private user-read-email  user-library-read";

	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: "state",
			})
	);
});

export function handleMusic(command) {
	if (
		command.includes("lancer") ||
		command.includes("lance") ||
		command.includes("jouer") ||
		command.includes("joue")
	) {
		if (command.includes("rock")) {
			alert("Lancement d'une playlist Rock !");
			const spotifyPlaylistUrl =
				"https://open.spotify.com/playlist/37i9dQZF1DWWSuZL7uNdVA?si=6e488143a66e4834";
			window.open(spotifyPlaylistUrl, "_blank");
		} else if (command.includes("jazz")) {
			alert("Lancement d'une playlist Jazz !");
			const spotifyPlaylistUrl =
				"https://open.spotify.com/playlist/{playlist_id}";
			window.open(spotifyPlaylistUrl, "_blank");
		} else {
			alert("Lancement d'une chanson par défaut !");
			const spotifyTrackUrl = "https://open.spotify.com";
			window.open(spotifyTrackUrl, "_blank");
		}
	} else {
		alert("Commande inconnue.");
	}
}
