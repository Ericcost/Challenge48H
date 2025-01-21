/**
 *
 * SPOTIFY API CONTROLLERS
 *
 */
import { stringify } from "querystring";
import { post } from "axios";

const spotifyController = {
	async oAuthLogin(req, res) {
		const username = req.username;
		const scopes =
			"user-read-private user-read-email user-top-read user-library-read user-read-playback-state user-modify-playback-state playlist-modify-public playlist-modify-private user-read-currently-playing";

		res.redirect(
			"https://accounts.spotify.com/authorize" +
				"?response_type=code" +
				"&client_id=" +
				process.env.CLIENT_ID +
				(scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
				"&redirect_uri=" +
				encodeURIComponent(process.env.REDIRECT_URI)
		) +
			"&state=" +
			username;
	},

	async oAuthCallback(req, res) {
		const code = req.query.code || null;
		const username = req.query.state || null;

		try {
			const response = await post(
				"https://accounts.spotify.com/api/token",
				stringify({
					code: code,
					redirect_uri: process.env.REDIRECT_URI,
					grant_type: "authorization_code",
				}),
				{
					headers: {
						Authorization:
							"Basic " +
							Buffer.from(
								process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
							).toString("base64"),
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);

			const access_token = response.data.access_token;
			spotifyController._storeSpotifyToken(username, access_token);
			res.send("Access Token: " + access_token);
		} catch (error) {
			console.error(error);
			res.status(500).send("Error while getting the Spotify token");
		}
	},
};

export default spotifyController;
