// Period Tracker Calculation
document.getElementById("calculate-btn").addEventListener("click", () => {
  const cycleLength = parseInt(document.getElementById("cycle-length").value);
  const lastPeriod = document.getElementById("last-period").value;

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "";

  if (!cycleLength || cycleLength < 20 || cycleLength > 45) {
    resultDiv.textContent = "Please enter a valid cycle length (20-45 days)!";
    return;
  }
  if (!lastPeriod) {
    resultDiv.textContent = "Please select the start date of your last period!";
    return;
  }

  const lastDate = new Date(lastPeriod);
  if (isNaN(lastDate)) {
    resultDiv.textContent = "Invalid date!";
    return;
  }

  // Next period date = last period + cycle length days
  const nextPeriodDate = new Date(lastDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

  // Fertile window: 14 days before next period, lasting 5 days
  const fertileStart = new Date(nextPeriodDate);
  fertileStart.setDate(fertileStart.getDate() - 19); // 14 + 5 days before next period start
  const fertileEnd = new Date(fertileStart);
  fertileEnd.setDate(fertileEnd.getDate() + 5);

  // Format dates to readable
  const options = { month: "short", day: "numeric" };
  const npStr = nextPeriodDate.toLocaleDateString(undefined, options);
  const fStartStr = fertileStart.toLocaleDateString(undefined, options);
  const fEndStr = fertileEnd.toLocaleDateString(undefined, options);

  resultDiv.innerHTML = `
    <p>✨ Your next period is expected on <strong>${npStr}</strong>.</p>
    <p>🌸 Fertile window: <strong>${fStartStr}</strong> to <strong>${fEndStr}</strong>.</p>
  `;
});

// Self-Care Journal: Save to localStorage
document.getElementById("save-journal").addEventListener("click", () => {
  const journalText = document.getElementById("journal").value.trim();
  const feedback = document.getElementById("journal-feedback");

  if (!journalText) {
    feedback.textContent = "Write something before saving, cutie!";
    return;
  }

  // Save with timestamp key
  const timestamp = new Date().toISOString();
  localStorage.setItem("journal_" + timestamp, journalText);

  feedback.textContent = "Your self-care journal entry is saved! 💖";
  document.getElementById("journal").value = "";
});

// Mental Health Rant: Save to localStorage
document.getElementById("save-rant").addEventListener("click", () => {
  const rantText = document.getElementById("rant").value.trim();
  const feedback = document.getElementById("rant-feedback");

  if (!rantText) {
    feedback.textContent = "Gotta vent something before saving, princess!";
    return;
  }

  const timestamp = new Date().toISOString();
  localStorage.setItem("rant_" + timestamp, rantText);

  feedback.textContent = "Your rant has been saved. Stay strong, queen! 👑";
  document.getElementById("rant").value = "";
});

// Fun bubble words on clicks
const bubbleWords = ["BBG 💖", "Cutiee 🥰", "Princess 👑", "Pookie 🐰", "Queen 👸", "Babe 💕", "Slayyiinnn "];

function spawnBubbleWord(x, y) {
  const word = document.createElement("div");
  word.className = "bubble-word";
  word.textContent = bubbleWords[Math.floor(Math.random() * bubbleWords.length)];
  word.style.left = x + "px";
  word.style.top = y + "px";

  document.body.appendChild(word);

  setTimeout(() => {
    word.remove();
  }, 3000);
}

// Bubble word on button click (period tracker button)
document.getElementById("calculate-btn").addEventListener("click", (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;

  spawnBubbleWord(x, y);
});

// Bubble words on anywhere else click
document.body.addEventListener("click", (e) => {
  if (e.target.id !== "calculate-btn" && e.target.id !== "save-journal" && e.target.id !== "save-rant") {
    spawnBubbleWord(e.clientX, e.clientY);
  }
});
