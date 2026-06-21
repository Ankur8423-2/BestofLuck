const studyTips = [
  "Biology: revise NCERT diagrams and examples before solving MCQs.",
  "Physics: practice 45-minute mixed sets to improve speed and stamina.",
  "Chemistry: keep one-page reaction map for daily 20-minute recall.",
  "After every mock, write top 5 mistakes and revisit them in 24 hours.",
  "Use Pomodoro blocks: 50 minutes study + 10 minutes recovery.",
  "Bahuuutt accha karoge aap, no worries."
];

const notes = ["Revise now", "Solve MCQs", "Trust prep", "Stay calm", "Finish strong"];
const colors = ["#ff7f32", "#39d8b4", "#9be15d", "#4bb4ff", "#ffd166"];

const canvas = document.querySelector("#confettiCanvas");
const ctx = canvas.getContext("2d");
const fortune = document.querySelector("#fortune");
const meterFill = document.querySelector("#meterFill");
const meterText = document.querySelector("#meterText");
const launchWish = document.querySelector("#launchWish");
const shuffleWish = document.querySelector("#shuffleWish");
const charms = document.querySelectorAll(".charm");
const specialWish = "Bahuuutt accha karoge aap, no worries.";

let confetti = [];
let focus = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setTip(text) {
  fortune.textContent = text;
  fortune.animate(
    [
      { transform: "translateY(4px)", opacity: 0.7 },
      { transform: "translateY(0)", opacity: 1 }
    ],
    { duration: 260, easing: "ease-out" }
  );
}

function chargeFocus(amount) {
  focus = Math.min(100, focus + amount);
  meterFill.style.width = `${focus}%`;
  meterText.textContent = `Luck charged: ${focus}%`;

  if (focus === 100) {
    setTip("Focus maxed out. Attempt a full-length NEET mock now.");
  }
}

function burstConfetti(count = 90) {
  for (let i = 0; i < count; i += 1) {
    confetti.push({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(-40, window.innerHeight * 0.45),
      size: randomBetween(4, 9),
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: randomBetween(1.5, 4),
      drift: randomBetween(-1.2, 1.2),
      spin: randomBetween(0, Math.PI),
      rotation: randomBetween(-0.16, 0.16)
    });
  }
}

function createFloatingNote() {
  const note = document.createElement("span");
  note.className = "floating-note";
  note.textContent = pickRandom(notes);
  note.style.setProperty("--x", `${randomBetween(10, 84)}vw`);
  document.body.append(note);
  note.addEventListener("animationend", () => note.remove());
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confetti = confetti.filter((piece) => piece.y < window.innerHeight + 20);
  confetti.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.spin += piece.rotation;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.spin);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
    ctx.restore();
  });

  requestAnimationFrame(animateConfetti);
}

launchWish.addEventListener("click", () => {
  setTip(specialWish);
  chargeFocus(24);
  burstConfetti(90);

  for (let i = 0; i < 5; i += 1) {
    setTimeout(createFloatingNote, i * 150);
  }
});

shuffleWish.addEventListener("click", () => {
  setTip(pickRandom(studyTips));
  chargeFocus(14);
});

charms.forEach((charm) => {
  charm.addEventListener("click", () => {
    setTip(charm.dataset.wish);
    chargeFocus(18);
    burstConfetti(45);
  });
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animateConfetti();
