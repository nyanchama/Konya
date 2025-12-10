const modal = document.getElementById("modalBackdrop");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
//const mainContent = document.getElementById("mainContent");
const modalText = document.getElementById("modalText");

const tvScreen = document.getElementById("tvScreen");
const tvStatic = document.getElementById("tvStatic");
const tvMessage = document.getElementById("tvMessage");
const tvBed = document.getElementById("tvBed");

const cosmicStage = document.getElementById("cosmicStage");

const alertSound = document.getElementById("alert");
const clickSound = new Audio("src/sounds/click.wav");
const startSound = new Audio("src/sounds/start.mp3");
const errorSound = new Audio("src/sounds/error.mp3");
const staticShort = new Audio("src/sounds/static.mp3");

const cosmicMusic = new Audio("src/music/soundtrack4.mp3");
cosmicMusic.loop = true;
cosmicMusic.volume = 0.9;

clickSound.preload = "auto";
startSound.preload = "auto";
errorSound.preload = "auto";
alertSound.preload = "auto";


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
  // alertSound.currentTime = 0;
  // alertSound.play().catch(() => {});
     modal.style.display = "flex";
    typeText(
      "are you the most beautiful man ever in the whole world?",
      modalText
    );
}

// NO
btnNo.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  errorSound.currentTime = 0;
  errorSound.play();

  alert("⛔ jaribu tena...");
  modal.style.display = "none";

  setTimeout(showModal, 400);
});

// YES
btnYes.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  alert("yes, you are my beautiful love! 💖");

  startSound.currentTime = 0;
  startSound.play();

  modal.style.display = "none";

  tvScreen.classList.remove("hidden");
  //showIntroMessage();
  staticShort.currentTime = 0;
  staticShort.loop = true;
  staticShort.play();

  tvMessage.textContent = "baby, here's a little place i dreamed up for you";
  tvBed.classList.remove("hidden");
});


tvBed.addEventListener("click", () => {
 clickSound.currentTime = 0;
  clickSound.play();

  // turn off static
tvStatic.classList.add("static-off");

 // turn off static sound
  staticShort.pause();
  staticShort.currentTime = 0;

typeText("tuning...", tvMessage, () => {
    setTimeout(() => {
      revealCosmicWorld();
    }, 600);
  });
});

// typeText("Tuning…", tvMessage, 50, () => {
//     setTimeout(() => {
//       alert("Cosmic sequence starting…");
//       // Next phase would show cosmicStage
//     }, 800);
//   });
// });

function revealCosmicWorld() {
  tvScreen.classList.add("hidden");

  cosmicStage.classList.remove("hidden");

  // trigger fade-in animation
  setTimeout(() => {
    cosmicStage.classList.add("active");
  }, 50);

  // music when world is fully visible
  setTimeout(() => {
    cosmicMusic.currentTime = 0;
    cosmicMusic.play().catch(()=>{});
  }, 1800);
}

// poem element
const cosmicPoemLine = document.getElementById("cosmicPoemLine");

// Hafiz poem (line by line)
const poemLines = [
  "i'm still scarce of words",
  "so, i've decided to have the courage",
  'to let "i love you."',
  "stand on its own",
  '',
  "i love you.",
  '',
  "here's a poem",
  "one of my favourite poems",
  "What Happens, by Daniel Ladinsky:",
  "what happens when your soul",
  "begins to awaken",
  "your eyes",
  "and your heart",
  "and the cells of your body",
  "to the great Journey of Love?",
  "first there is wonderful laughter",
  "and probably precious tears",
  "and a hundred sweet promises",
  "and those heroic vows",
  "no one can ever keep.",
  "but still God is delighted and amused",
  "you once tried to be a saint.",
  "what happens when your soul",
  "begins to awake in this world",
  "to our deep need to love",
  "and serve the Friend?",
  "o the Beloved",
  "will send you",
  "one of His wonderful, wild companions –",
  "like Hafiz.",
  '',
  "i love you always, baby.",
  "thank you for being here",
  '',
  "may your paths always be peace.",
];


let timings = [];
const startPercent = 0.05;   
const endPercent   = 0.75;   
const totalLines   = poemLines.length;

// generate evenly spaced percentages
for (let i = 0; i < totalLines; i++) {
  timings.push(startPercent + (i / (totalLines - 1)) * (endPercent - startPercent));
}

let poemIndex = 0;
let lineLocked = false;

cosmicMusic.addEventListener("loadedmetadata", startPoemTiming);

function startPoemTiming() {
  
    cosmicMusic.ontimeupdate = () => {
      if (poemIndex >= poemLines.length) return;
      if (lineLocked) return;
      
      const duration = cosmicMusic.duration;
      const t = cosmicMusic.currentTime;

      if (t >= duration * timings[poemIndex]) {
        lineLocked = true;

        // set poem text
        cosmicPoemLine.textContent = poemLines[poemIndex];

        // fade-in
        cosmicPoemLine.classList.add("show");

        // stay visible 6s → fade out
        setTimeout(() => {
          cosmicPoemLine.classList.remove("show");

          setTimeout(() => {
            poemIndex++;
            lineLocked = false;
          }, 2000);

        }, 7000);
      }
    };
}

const exitBtn = document.getElementById("exitBtn");


function showExitButton() {
  setTimeout(() => {
    exitBtn.classList.remove("hidden");
  }, 2000);
}

//detect when poem ends
function startPoemTiming() {
  cosmicMusic.ontimeupdate = () => {
    if (poemIndex >= poemLines.length) {
      // Poem finished - show exit button
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
        }, 1200);

      }, 3000);
    }
  };
}

exitBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  // Fade out music
  const fadeOut = setInterval(() => {
    if (cosmicMusic.volume > 0.05) {
      cosmicMusic.volume -= 0.05;
    } else {
      cosmicMusic.pause();
      clearInterval(fadeOut);
    }
  }, 50);

  // Fade out cosmic stage
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

window.addEventListener("load", () => {
  showModal();
});


// function showIntroMessage() {
//   const message = `Baby, here's a small world I dreamed up for you 🛌🏿`;
  
//   setTimeout(() => {
//     typeText(message, introText, () => {
      
//       const bed = document.createElement("span");
//       bed.textContent = "🛌🏿";
//       bed.classList.add("bed-link");

//       bed.addEventListener("click", () => {
//         clickSound.currentTime = 0;
//         clickSound.play();
//         startFirstExperience();
//       });

//       bedLinkContainer.appendChild(bed);

//     });
//   }, 1200); 
// }


