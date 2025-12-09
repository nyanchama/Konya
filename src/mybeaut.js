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
const staticShort = new Audio("src/sounds/static_short.mp3");

const cosmicMusic = new Audio("src/music/soundtrack4.mp3");
cosmicMusic.loop = true;
cosmicMusic.volume = 1.11;

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
  staticShort.play();

   
  tvMessage.textContent = "baby, here's a small place i dreamed up for you";
  tvBed.classList.remove("hidden");
});

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

tvBed.addEventListener("click", () => {
 clickSound.currentTime = 0;
  clickSound.play();

  // turn off static
tvStatic.classList.add("static-off");

typeText("Tuning…", tvMessage, () => {
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



