const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = "fr-FR";
recognition.onresult = (event) => {
	const transcript = event.results[0][0].transcript;
	document.getElementById("transcription").innerText = transcript;

	// Envoyer au backend
	fetch("/api/voice", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ text: transcript }),
	})
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("response").innerText = data.reply;
		});
};

document.getElementById("start-button").onclick = () => {
	recognition.start();
};
