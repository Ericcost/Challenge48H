const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// Endpoint pour initier la connexion Spotify
app.get("/api/spotify/login", (req, res) => {
	const scope =
		"user-read-private user-read-email playlist-read-private user-read-currently-playing";
	const state = Math.random().toString(36).substring(2, 15);

	const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
		scope
	)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`;

	res.redirect(authUrl);
});

// Endpoint pour gérer le callback de Spotify
app.get("/api/spotify/callback", async (req, res) => {
	const { code, state } = req.query;

	if (!code) {
		return res.status(400).json({ error: "Code manquant dans la requête" });
	}

	try {
		// Échanger le code contre un token
		const tokenResponse = await axios.post(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				code: code,
				redirect_uri: REDIRECT_URI,
				grant_type: "authorization_code",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${Buffer.from(
						`${CLIENT_ID}:${CLIENT_SECRET}`
					).toString("base64")}`,
				},
			}
		);

		const { access_token, refresh_token, expires_in } = tokenResponse.data;

		// Redirigez l'utilisateur ou retournez un token
		res.json({ access_token, refresh_token, expires_in });
	} catch (error) {
		console.error(
			"Erreur lors de l'obtention du token Spotify :",
			error.response.data
		);
		res
			.status(500)
			.json({ error: "Erreur lors de l'obtention du token Spotify" });
	}
});

// Endpoint pour récupérer le token d'accès Spotify
app.get("/api/spotify/token", async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(400).json({ error: "Token manquant" });
	}

	// Validation de votre token si nécessaire

	// Retourner le token à l'appelant
	res.json({ access_token: token });
});

// Endpoint pour récupérer la chanson en cours
app.get("/api/spotify/current", async (req, res) => {
	const { token } = req.query;

	if (!token) {
		return res.status(400).json({ error: "Token manquant" });
	}

	try {
		const response = await axios.get(
			"https://api.spotify.com/v1/me/player/currently-playing",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		res.json(response.data);
	} catch (error) {
		console.error(
			"Erreur lors de l'obtention des informations de lecture :",
			error.response.data
		);
		res.status(500).json({
			error: "Erreur lors de l'obtention des informations de lecture",
		});
	}
});

app.get("", (req, res) => {
	res.send("Bonjour !");
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
	console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
