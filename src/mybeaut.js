const modal = document.getElementById("modalBackdrop");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const modalText = document.getElementById("modalText");

const alertSound = document.getElementById("alert");
const clickSound = new Audio("src/sounds/click.wav");
const startSound = new Audio("src/sounds/start.mp3");
const errorSound = new Audio("src/sounds/error.mp3");

clickSound.preload = "auto";
startSound.preload = "auto";
errorSound.preload = "auto";
alertSound.preload = "auto";

const cosmicMusic = new Audio("src/music/soundtrack4.mp3");
cosmicMusic.loop = false;
cosmicMusic.volume = 0.9;
cosmicMusic.preload = "auto";

const tvScreen = document.getElementById("tvScreen");
const tvMessage = document.getElementById("tvMessage");
const tvBed = document.getElementById("tvBed");

const cosmicStage = document.getElementById("cosmicStage");
const cosmicPoemLine = document.getElementById("cosmicPoemLine");
const exitBtn = document.getElementById("exitBtn");

const poemLines = [
  "baby,",
  "i'm still scarce of words",
  "so, i've decided to have the courage",
  'to let "i love you."',
  "stand on its own",
  "",
  "",
  "i love you.",
  "",
  "",
  "hata kama maneno yangu yamekosekana, kuna ya wengine...",
  "ningependa kukuzawadi shairi",
  "",
  "yes, here's a poem",
  "",
  "one of my most beloved poems",
  "",
  "",
  "What Happens, by Daniel Ladinsky",
  "",
  "* * *",
  "",
  "What happens when your soul",
  "Begins to awaken",
  "Your eyes",
  "And your heart",
  "And the cells of your body",
  "To the great Journey of Love?",
  "",
  "First there is wonderful laughter",
  "And probably precious tears",
  "",
  "And a hundred sweet promises",
  "And those heroic vows",
  "No one can ever keep.",
  "",
  "But still God is delighted and amused",
  "You once tried to be a saint.",
  "",
  "What happens when your soul",
  "Begins to awake in this world",
  "",
  "To our deep need to love",
  "And serve the Friend?",
  "",
  "O the Beloved",
  "Will send you",
  "One of His wonderful, wild companions –",
  "",
  "Like Hafiz.",
  "* * *",
  "",
  "i love you always, baby.",
  "thank you for being here",
  "may your paths always be peace.",
];

let timings = [];
const startPercent = 0.05;   
const endPercent = 0.5231;   
const totalLines = poemLines.length;

for (let i = 0; i < totalLines; i++) {
  timings.push(startPercent + (i / (totalLines - 1)) * (endPercent - startPercent));
}

let poemIndex = 0;
let lineLocked = false;

function typeText(text, element, callback) {
  element.textContent = "";
  let i = 0;
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  element.appendChild(cursor);

  function type() {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(type, 40);
    } else {
      callback && callback();
    }
  }
  type();
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

function showModal() {
  modal.style.display = "flex";
  typeText(
    "are you the most beautiful man ever in the whole world?",
    modalText
  );
}

btnNo.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  errorSound.currentTime = 0;
  errorSound.play();

  alert("⛔ jaribu tena...");
  modal.style.display = "none";

  setTimeout(showModal, 400);
});

btnYes.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  alert("yes, you are my beautiful love! 💖");

  startSound.currentTime = 0;
  startSound.play();

  modal.style.display = "none";

  tvScreen.classList.remove("hidden");

  tvMessage.textContent = "baby, here's a little place i dreamed up for you...";
  tvBed.classList.remove("hidden");
});

tvBed.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  tvBed.classList.add("hidden");

  typeText("tuning...", tvMessage, () => {
    setTimeout(() => {
      revealCosmicWorld();
    }, 600);
  });
});

function revealCosmicWorld() {
  tvScreen.classList.add("hidden");
  cosmicStage.classList.remove("hidden");

  setTimeout(() => {
    cosmicStage.classList.add("active");
  }, 50);

  setTimeout(() => {
    cosmicMusic.currentTime = 0;
    cosmicMusic.play().catch(() => {});
  }, 1800);
}

function startPoemTiming() {
  cosmicMusic.ontimeupdate = () => {
    if (poemIndex >= poemLines.length) {
      if (!exitBtn.classList.contains("hidden")) return;
      showExitButton();
      return;
    }
    if (lineLocked) return;
    
    const duration = cosmicMusic.duration;
    const t = cosmicMusic.currentTime;

    if (t >= duration * timings[poemIndex]) {
      lineLocked = true;

      cosmicPoemLine.textContent = poemLines[poemIndex];
      cosmicPoemLine.classList.add("show");

      setTimeout(() => {
        cosmicPoemLine.classList.remove("show");

        setTimeout(() => {
          poemIndex++;
          lineLocked = false;
        }, 2000);

      }, 5000);
    }
  };
}

cosmicMusic.addEventListener("loadedmetadata", startPoemTiming);

function showExitButton() {
  setTimeout(() => {
    exitBtn.classList.remove("hidden");
  }, 2000);
}

exitBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  const fadeOut = setInterval(() => {
    if (cosmicMusic.volume > 0.05) {
      cosmicMusic.volume -= 0.05;
    } else {
      cosmicMusic.pause();
      clearInterval(fadeOut);
    }
  }, 50);

  cosmicStage.classList.remove("active");
  
  setTimeout(() => {
    cosmicStage.classList.add("hidden");
    cosmicMusic.volume = 0.9;
    poemIndex = 0;
    lineLocked = false;
    exitBtn.classList.add("hidden");
    cosmicPoemLine.textContent = "";
    
    showModal();
  }, 1800);
});

showModal();