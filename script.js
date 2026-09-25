const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");
const quickQuestions = document.querySelectorAll(".quick-question");

const responses = [
	{ keywords: ["vegetable", "fruit", "produce"], answer: "Vegetable and fruit waste can be chopped into smaller pieces and added to a compost mix. Balance it with dry leaves or other dry material, and keep the mix lightly moist." },
	{ keywords: ["food scrap", "kitchen"], answer: "Food scraps such as peels and leftovers can be collected separately for composting. Avoid mixing them with plastic, glass or other non-organic materials." },
	{ keywords: ["eggshell"], answer: "Rinse and crush eggshells before adding them to a compost mix. They break down slowly, so small pieces help them blend into the material." },
	{ keywords: ["dry leaf", "garden waste", "garden"], answer: "Dry leaves and garden waste are useful carbon-rich material for compost. Mix them with wetter green materials, such as fresh plant trimmings, rather than making one thick layer." },
	{ keywords: ["compost"], answer: "To make compost, combine a mix of green materials and dry brown materials, keep the pile lightly moist, and allow air to move through it. Turn it occasionally and wait for the material to become dark and crumbly." },
	{ keywords: ["vermicompost", "worm"], answer: "Vermicomposting uses composting worms to help process suitable organic scraps in a moist, ventilated container. It is a small-scale option that needs shade and regular care." },
	{ keywords: ["biogas", "digestion", "digester"], answer: "Biogas is a fuel-rich gas made when microorganisms break down organic material without oxygen in a controlled digester. The process can also leave a nutrient-rich material for further use." },
	{ keywords: ["organic waste", "biodegradable"], answer: "Organic or biodegradable waste comes from living materials and can break down naturally over time. Separating it from non-biodegradable waste makes treatment and possible reuse easier." },
];

function getResponse(question) {
	const normalizedQuestion = question.toLowerCase();
	const match = responses.find((item) => item.keywords.some((keyword) => normalizedQuestion.includes(keyword)));
	return match ? match.answer : "I can help with vegetable waste, fruit waste, food scraps, eggshells, dry leaves, garden waste, composting, vermicomposting, biogas and biodegradable waste. What would you like to explore?";
}

function addMessage(text, type) {
	const message = document.createElement("div");
	message.className = `message ${type}-message`;
	const avatar = type === "bot" ? '<div class="avatar" aria-hidden="true">🌱</div>' : "";
	message.innerHTML = `${avatar}<div class="bubble"><p></p><time>Now</time></div>`;
	message.querySelector("p").textContent = text;
	chatMessages.appendChild(message);
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

function submitQuestion(question) {
	const trimmedQuestion = question.trim();
	if (!trimmedQuestion) return;
	addMessage(trimmedQuestion, "user");
	chatInput.value = "";
	window.setTimeout(() => addMessage(getResponse(trimmedQuestion), "bot"), 350);
}

chatForm.addEventListener("submit", (event) => {
	event.preventDefault();
	submitQuestion(chatInput.value);
});

quickQuestions.forEach((button) => {
	button.addEventListener("click", () => {
		submitQuestion(button.dataset.question);
	});
});
