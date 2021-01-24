/***************DOM SELECTORS***************/

// const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const mainContent = document.querySelector("main header");
const time = document.querySelector("#timer");
const text = document.getElementById("text");
const textArr = text.textContent.split("");
const correctText = document.getElementById("correct");
const wpm = [...document.querySelectorAll(".wpm")];
const cpm = document.getElementById("cpm");
const acc = [...document.querySelectorAll(".acc")];
const results = document.getElementById("results");
const keys = [...document.querySelectorAll(".wrapper div")];
const logo = document.getElementById("logo");
const timeChoices = [...document.querySelectorAll("input[type='radio']")];
const leaderboardBtn = document.getElementById("leaderboardBtn");
const settingsBtn = document.getElementById("settingsBtn");
const profileBtn = document.getElementById("profileBtn");
const leaderboard = document.getElementById("leaderboard");
const settings = document.getElementById("settings");
const profile = document.getElementById("profile");
const overlay = document.getElementById("overlay");
const footer = document.querySelector("footer");
const userInput = document.getElementById("user-input");
const capslock = document.getElementById("capslock");

userInput.focus();

/***************VARIABLES***************/

let keypressed = false;
let timeUp = false;
let selectedTime = 15;
let mistakes = 0;
let numCharsWritten = 0;
let wrong = false;

let correctWords = [];
let incorrectWords = [];
let temp = false;

/***************FUNCTIONS***************/

const startTimer = () => {
  setInterval(() => {
    if (time.textContent !== "0") {
      time.textContent = +time.textContent - 1;
    } else {
      showResults();
    }
  }, 1000);
};

const getRandomQuote = () => {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
};

const displayRandomQuote = async () => {
  const quote = await getRandomQuote();
  userInput.value = null;
  text.textContent = "";

  quote.split("").forEach((char) => {
    const span = document.createElement("span");

    span.innerText = char;

    text.appendChild(span);
  });
};

function showResults() {
  mainContent.style.display = "none";
  results.style.display = "flex";
  footer.style.display = "none";
}

displayRandomQuote();

/***************EVENT LISTENERS***************/

leaderboardBtn.addEventListener("click", () => {
  leaderboard.style.display = "flex";
  overlay.style.display = "block";
});

settingsBtn.addEventListener("click", () => {
  settings.style.display = "flex";
  overlay.style.display = "block";
});

profileBtn.addEventListener("click", () => {
  profile.style.display = "flex";
  overlay.style.display = "block";
});

overlay.addEventListener("click", () => {
  leaderboard.style.display = "none";
  settings.style.display = "none";
  profile.style.display = "none";
  overlay.style.display = "none";
});

timeChoices.forEach((choice) => {
  choice.addEventListener("change", () => {
    time.textContent = choice.id;
    selectedTime = choice.id;
  });
});

userInput.addEventListener("input", (e) => {
  const quoteArr = text.querySelectorAll("span");
  const userInputArr = userInput.value.split("");

  let allCorrect = true;
  let once = false;
  let finished = false;

  numCharsWritten++;

  quoteArr.forEach((char, index, arr) => {
    if (userInputArr[index] == null) {
      char.classList.remove("correct");
      char.classList.remove("incorrect");
      allCorrect = false;
    } else if (userInputArr[index] === char.textContent) {
      char.classList.add("correct");
      char.classList.remove("incorrect");

      if (!once) {
        cpm.textContent = +cpm.textContent + 1 * (60 / +selectedTime);
        if (e.data === " ") {
          wpm.forEach((el) => {
            el.textContent = +el.textContent + 1 * (60 / +selectedTime);
          });
        }

        once = true;
      }
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
      allCorrect = false;
      mistakes++;
      console.log("ok");
    }

    if (userInputArr[arr.length - 1] != null) finished = true;
  });

  if (!keypressed) {
    startTimer();

    keypressed = true;
  }

  if (finished) displayRandomQuote();

  acc.forEach(
    (el) =>
      (el.textContent = `${(
        (numCharsWritten - mistakes) *
        (100 / numCharsWritten)
      ).toFixed(2)}%`)
  );
});

document.addEventListener("keydown", (e) => {
  keys.forEach((key) => {
    if (e.key.toLowerCase() === key.id) {
      key.classList.add("pressed");
    }
  });
});

document.addEventListener("keyup", (e) => {
  if (e.getModifierState("CapsLock")) {
    capslock.style.visibility = "visible";
  } else {
    capslock.style.visibility = "hidden";
  }

  keys.forEach((key) => {
    if (e.key.toLowerCase() === key.id) {
      key.classList.remove("pressed");
    }
  });
});

logo.addEventListener("click", () => {
  // restart();
  window.location.reload();
});

// document.addEventListener("keypress", (e) => {
//   if (!keypressed) {
//     setInterval(() => {
//       if (time.textContent !== "0") {
//         time.textContent = +time.textContent - 1;
//         temp = false;
//       } else {
//         timeUp = true;

//         if (!temp) {
//           mainContent.style.display = "none";
//           results.style.display = "flex";
//           footer.style.display = "none";

//           temp = true;
//         }
//       }
//     }, 1000);
//   }

//   keypressed = true;

//   if (!timeUp) {
//     if (e.key === textArr[0]) {
//       correctWords.push(textArr[0]);
//       textArr.shift();

//       if (correctWords[correctWords.length - 1] === " ") {
//         wpm.forEach(
//           (el) => (el.textContent = +el.textContent + 1 * (60 / +selectedTime))
//         );

//         textArr.push(`${words[Math.floor(Math.random() * words.length)]} `);
//       }

//       cpm.textContent = +cpm.textContent + 1;
//     } else {
//       wrong++;
//     }

//     if ((100 / +cpm.textContent) * (+cpm.textContent - wrong) >= 0) {
//       acc.forEach(
//         (el) =>
//           (el.textContent = `${(
//             (100 / +cpm.textContent) *
//             (+cpm.textContent - wrong)
//           ).toFixed(
//             +el.textContent === 100 || +el.textContent === 0 ? 0 : 2
//           )}%`)
//       );
//     } else {
//       acc.forEach((el) => (el.textContent = "0%"));
//     }

//     text.textContent = textArr.join("");
//   }
// });
