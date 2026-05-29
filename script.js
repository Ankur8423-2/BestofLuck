const wishes = [
  "Best of luck, Juhiii. You are going to do beautifully.",
  "Your hard work has already started speaking for you.",
  "Walk in with courage. Walk out with a proud smile.",
  "Today is ready for you, Juhiii. Go make it yours.",
  "Small breath. Bright mind. Full power."
];

const notes = ["You got this", "Deep breath", "Shine on", "Full power", "Calm wins", "Juhiii magic"];
const colors = ["#ff6f61", "#ffc857", "#42d6a4", "#4267ff", "#ff9bb3"];

const canvas = document.querySelector("#confettiCanvas");
const ctx = canvas.getContext("2d");
const fortune = document.querySelector("#fortune");
const meterFill = document.querySelector("#meterFill");
const meterText = document.querySelector("#meterText");
const launchWish = document.querySelector("#launchWish");
const shuffleWish = document.querySelector("#shuffleWish");
const charms = document.querySelectorAll(".charm");

let confetti = [];
let luck = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function setWish(text) {
  fortune.textContent = text;
  fortune.animate(
    [
      { transform: "scale(0.98)", opacity: 0.65 },
      { transform: "scale(1)", opacity: 1 }
    ],
    { duration: 260, easing: "ease-out" }
  );
}

function chargeLuck(amount) {
  luck = Math.min(100, luck + amount);
  meterFill.style.width = `${luck}%`;
  meterText.textContent = `Luck charged: ${luck}%`;

  if (luck === 100) {
    setWish("Luck fully charged for Juhiii. Go win the moment.");
  }
}

function burstConfetti(count = 120) {
  for (let i = 0; i < count; i += 1) {
    confetti.push({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(-40, window.innerHeight * 0.45),
      size: randomBetween(5, 10),
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: randomBetween(1.5, 4.5),
      drift: randomBetween(-1.4, 1.4),
      spin: randomBetween(0, Math.PI),
      rotation: randomBetween(-0.18, 0.18)
    });
  }
}

function createFloatingNote() {
  const note = document.createElement("span");
  note.className = "floating-note";
  note.textContent = notes[Math.floor(Math.random() * notes.length)];
  note.style.setProperty("--x", `${randomBetween(8, 82)}vw`);
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
  setWish("Best of luck, Juhiii. The universe has officially been notified.");
  burstConfetti();
  chargeLuck(34);

  for (let i = 0; i < 5; i += 1) {
    setTimeout(createFloatingNote, i * 180);
  }
});

shuffleWish.addEventListener("click", () => {
  setWish(wishes[Math.floor(Math.random() * wishes.length)]);
  burstConfetti(45);
  chargeLuck(17);
});

charms.forEach((charm) => {
  charm.addEventListener("click", () => {
    setWish(charm.dataset.wish);
    burstConfetti(70);
    chargeLuck(23);
    charm.animate(
      [
        { transform: "translateY(-3px) rotate(-1deg)" },
        { transform: "translateY(-3px) rotate(1deg)" },
        { transform: "translateY(-3px) rotate(0deg)" }
      ],
      { duration: 360, easing: "ease-in-out" }
    );
  });
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animateConfetti();
setTimeout(() => burstConfetti(60), 500);
