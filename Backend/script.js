const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Backend is running!");
});

app.post("/api/voice", (req, res) => {
	const userInput = req.body.text;

	// Logique ou appel API tiers
	const reply = processInput(userInput);

	res.json({ reply });
});

const processInput = (input) => {
	// Exemple de logique simple
	if (input.includes("hello")) return "Hi there!";
	return "I did not understand that.";
};

app.listen(3000, () => console.log("Server is running on port 3000"));
