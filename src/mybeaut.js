const modal = document.getElementById("modalBackdrop");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
//const mainContent = document.getElementById("mainContent");
const modalText = document.getElementById("modalText");

const tvScreen = document.getElementById("tvScreen");
const tvStatic = document.getElementById("tvStatic");
const tvMessage = document.getElementById("tvMessage");
const tvBed = document.getElementById("tvBed");



const alertSound = document.getElementById("alert");

const introScreen = document.getElementById("introScreen");
const introText = document.getElementById("introText");
const bedLinkContainer = document.getElementById("bedLinkContainer");



const clickSound = new Audio("src/sounds/click.wav");
const startSound = new Audio("src/sounds/start.mp3");
const errorSound = new Audio("src/sounds/error.mp3");
const staticShort = new Audio("src/sounds/static_short.mp3");

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

   
  tvMessage.textContent = "BABY, HERE'S A PLACE I DREAMED UP FOR YOU ";
  tvBed.classList.remove("hidden");

});



tvBed.addEventListener("click", () => {
  clickAudio.play();
  startAudio.play();

  // turn off static
tvStatic.classList.add("static-off");

typeText("Tuning…", tvMessage, 50, () => {
    setTimeout(() => {
      alert("Cosmic sequence starting…");
      // Next phase would show cosmicStage
    }, 800);
  });
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



