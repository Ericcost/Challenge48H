import { handleMusic } from "./music.js";
import { handleBrowser } from "./browser.js";
import { handleMail } from "./mail.js";
import { handleMeteo } from "./meteo.js";

// Initialisation de la reconnaissance vocale
const recognition = new (window.SpeechRecognition ||
	window.webkitSpeechRecognition)();

if (recognition === undefined) {
	alert("La reconnaissance vocale n'est pas supportée par votre navigateur.");
} else {
	console.log("Reconnaissance vocale supportée !");

	recognition.lang = "fr-FR";
	recognition.interimResults = false;
	recognition.continuous = false;

	const SpeechGrammarList =
		window.SpeechGrammarList || window.webkitSpeechGrammarList;
	if (SpeechGrammarList) {
		console.log("Support de SpeechGrammarList détecté !");
		const grammar =
			"#JSGF V1.0; grammar verbes; public <verbe> = ouvrir | ouvre | lancer | lance | jouer | joue | fermer | ferme | éteindre | éteint | envoyer | envoie;";
		const grammarList = new SpeechGrammarList();
		grammarList.addFromString(grammar, 1);
		recognition.grammars = grammarList;
	} else {
		console.warn(
			"SpeechGrammarList n'est pas pris en charge par ce navigateur."
		);
	}

	// Bouton pour lancer la reconnaissance
	document.getElementById("start-button").addEventListener("click", () => {
		recognition.start();
		console.log("Reconnaissance vocale démarrée...");
	});

	// Bouton pour arrêter la reconnaissance
	document.getElementById("stop-button").addEventListener("click", () => {
		recognition.stop();
		console.log("Reconnaissance vocale arrêtée.");
	});

	// Traitement des résultats
	recognition.onresult = (event) => {
		console.log("Résultat détecté");
		const transcript = event.results[0][0].transcript;
		console.log("Texte reconnu :", transcript);
		document.getElementById("text").innerText = transcript;

		if (transcript.includes("musique")) {
			handleMusic(transcript);
		} else if (transcript.includes("navigateur")) {
			handleBrowser(transcript);
		} else if (transcript.includes("mail")) {
			handleMail(transcript);
		} else if (transcript.includes("météo")) {
			handleMeteo(transcript);
		}
	};

	// Gestion des erreurs
	recognition.onerror = (event) => {
		console.error("Erreur de reconnaissance vocale :", event.error);

		// En cas d'erreur, demande à l'utilisateur s'il veut effectuer une recherche Google
		if (event.error === "no-speech" || event.error === "audio-capture") {
			alert("Aucun son détecté ou problème avec le micro.");
		} else {
			alert(
				"Erreur de reconnaissance vocale. Lancement d'une recherche Google..."
			);
			const query =
				event.results?.[0]?.[0]?.transcript || "Recherche non définie";
			performGoogleSearch(query);
		}
	};

	function performGoogleSearch(query) {
		const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
			query
		)}`;
		console.log("Recherche Google pour :", query);
		window.open(googleUrl, "_blank"); // Ouvre la recherche dans un nouvel onglet
	}
}
