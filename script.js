const missions = [
  ["🧃", "Drink a glass of water like you're accepting an award.", "Hydration level: suspiciously responsible."],
  ["🕵️", "Walk into another room and investigate why you came here.", "Your memory has entered stealth mode."],
  ["🧠", "Rename one file on your computer to something dramatically mysterious.", "Example: FINAL_FINAL_REAL_THIS_TIME.txt"],
  ["🪑", "Sit in a different chair for exactly three minutes.", "Furniture diversity is important."],
  ["🎧", "Listen to the next song without skipping. Trust the algorithm.", "Your DJ has diplomatic immunity."],
  ["🦆", "Give the nearest object a name. Keep it forever.", "Dave has been chosen. Dave is not pleased."],
  ["📦", "Open a random folder and delete one file you haven't needed in a year.", "Digital archaeology begins now."],
  ["🌱", "Look out a window and find the strangest thing you can see.", "Nature is running a side quest."],
  ["😎", "Put on your most unnecessary accessory for the next hour.", "Style has no measurable KPI."],
  ["🧹", "Clean exactly one tiny thing. Not two. Do not get ambitious.", "Micro-productivity detected."],
  ["📸", "Take a photo of the most boring object near you.", "Congratulations. It's art now."],
  ["🧊", "Get something cold from the fridge and hold it like a science experiment.", "Peer-reviewed? Absolutely not."],
  ["🔮", "Predict your next notification before checking your phone.", "The prophecy demands data."],
  ["🐸", "Make your best frog sound. Quietly, if civilization is nearby.", "Amphibian credentials pending."],
  ["🚶", "Take 30 unnecessary steps, then return exactly where you started.", "A journey with no plot. Excellent."],
  ["💻", "Close one browser tab you have been keeping open for absolutely no reason.", "A small sacrifice for tab sanity."],
  ["🍪", "Find a snack and rate it like a Michelin inspector.", "Presentation, texture, emotional support: all count."],
  ["🎲", "Choose the number 1–6 in your head. Roll imaginary dice. Respect the result.", "Probability has become vibes."]
];

const predictions = [
  "Before sunset, you will encounter an object that is exactly where you expected it to be.",
  "A stranger will perform an entirely normal action with suspiciously perfect timing.",
  "Your next mildly annoying task will become weirdly easy.",
  "You will remember something important approximately four minutes after you stop needing it.",
  "A notification will arrive at the exact moment you think, 'I wonder if my phone is dead.'",
  "You are about to win an argument in the shower that you will never have in real life.",
  "A beverage is going to taste 12% better than expected. Science refuses to explain this.",
  "Someone will say a word that you have not heard in months. The coincidence will feel illegal.",
  "Your next typo will accidentally improve the sentence.",
  "There is a 94% chance you will open the same app twice within ten minutes."
];

const vibes = [
  "Chaotic Neutral",
  "Suspiciously Lucky",
  "Goblin Mode",
  "Main Character",
  "Mildly Powerful",
  "Cosmically Distracted",
  "Overclocked",
  "Unreasonably Calm"
];

const $ = (id) => document.getElementById(id);

let events = Number(localStorage.getItem("chaosEvents") || 0);
let lastIndex = -1;

function pickDifferent(list, previous) {
  let index;

  do {
    index = Math.floor(Math.random() * list.length);
  } while (list.length > 1 && index === previous);

  return index;
}

function generateChaos() {
  const button = $("chaosButton");

  const missionIndex = pickDifferent(missions, lastIndex);
  lastIndex = missionIndex;

  const [emoji, title, hint] = missions[missionIndex];

  const chaos = Math.floor(Math.random() * 91) + 10;
  const luck = Math.floor(Math.random() * 101);

  const prediction =
    predictions[Math.floor(Math.random() * predictions.length)];

  const vibe =
    vibes[Math.floor(Math.random() * vibes.length)];

  $("mission").textContent = title;
  $("missionHint").textContent = hint;
  $("missionEmoji").textContent = emoji;

  $("chaosLevel").textContent = `${chaos}%`;
  $("chaosMeter").style.width = `${chaos}%`;

  $("luck").textContent = `${luck}%`;
  $("vibes").textContent = vibe;

  $("prediction").textContent = prediction;

  events += 1;
  localStorage.setItem("chaosEvents", events);

  $("counter").textContent = `Chaos events: ${events}`;

  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("shuffle");

    // Restart CSS animation
    void card.offsetWidth;

    card.classList.add("shuffle");
  });

  button.blur();
}

async function copyFate() {
  const fate = [
    `Mission: ${$("mission").textContent}`,
    `Chaos level: ${$("chaosLevel").textContent}`,
    `Luck: ${$("luck").textContent}`,
    `Vibe: ${$("vibes").textContent}`,
    `Prediction: ${$("prediction").textContent}`
  ].join("\n");

  try {
    await navigator.clipboard.writeText(fate);

    showToast("Your fate has been copied.");
  } catch {
    showToast("Clipboard access was blocked. Fate remains on screen.");
  }
}

let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);

  const toast = $("toast");

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

// Generate chaos when button is clicked
$("chaosButton").addEventListener("click", generateChaos);

// Copy current result
$("copyButton").addEventListener("click", copyFate);

// Press SPACE to generate chaos
window.addEventListener("keydown", (event) => {
  if (
    event.code === "Space" &&
    !event.repeat &&
    document.activeElement?.tagName !== "BUTTON"
  ) {
    event.preventDefault();
    generateChaos();
  }
});

// Restore event counter
$("counter").textContent = `Chaos events: ${events}`;