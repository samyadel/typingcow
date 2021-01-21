/***************DOM SELECTORS***************/

const mainContent = document.querySelector("main header");
const time = document.querySelector("#timer");
const text = document.getElementById("text");
const textArr = text.textContent.split("");
const correctText = document.getElementById("correct-text");
const wpm = [...document.querySelectorAll(".wpm")];
const cpm = document.getElementById("cpm");
const acc = [...document.querySelectorAll(".acc")];
const results = document.getElementById("results");
const keys = [...document.querySelectorAll("input[type='button']")];
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

/***************VARIABLES***************/

let keypressed = false;
let timeUp = false;

let correctWords = [];
let words = [
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "from",
  "they",
  "about",
  "which",
  "however",
  "believe",
  "consequence",
  "actually",
  "never",
];

let temp = false;

let wrong = 0;

let selectedTime;

/***************FUNCTIONS***************/

const restart = () => {
  // console.log(textArr);
  text.textContent = correctWords.join("") + text.textContent;
  mainContent.style.display = "flex";
  results.style.display = "none";
  timeUp = false;
  // temp = false;
  keypressed = false;
  wrong = 0;
  correctWords = [];
  wpm.forEach((el) => (el.textContent = "0"));
  time.textContent = "0";
  temp = true;
};

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

document.addEventListener("keypress", (e) => {
  if (!keypressed) {
    setInterval(() => {
      if (time.textContent !== "0") {
        time.textContent = +time.textContent - 1;
        temp = false;
      } else {
        timeUp = true;

        if (!temp) {
          console.log(
            wpm.forEach(
              (
                el // (el) => (el.textContent = +el.textContent * (60 / selectedTime))
              ) => selectedTime
            )
          );

          mainContent.style.display = "none";
          results.style.display = "flex";
          footer.style.display = "none";

          temp = true;
        }
      }
    }, 1000);
  }

  keypressed = true;

  if (!timeUp) {
    if (e.key === textArr[0]) {
      correctWords.push(textArr[0]);
      textArr.shift();

      if (correctWords[correctWords.length - 1] === " ") {
        wpm.forEach((el) => (el.textContent = +el.textContent + 1));
        textArr.push(`${words[Math.floor(Math.random() * words.length)]} `);
      }

      cpm.textContent = +cpm.textContent + 1;
    } else {
      wrong++;
    }

    if ((100 / +cpm.textContent) * (+cpm.textContent - wrong) >= 0) {
      acc.forEach(
        (el) =>
          (el.textContent = `${(
            (100 / +cpm.textContent) *
            (+cpm.textContent - wrong)
          ).toFixed(
            +el.textContent === 100 || +el.textContent === 0 ? 0 : 2
          )}%`)
      );
    } else {
      acc.forEach((el) => (el.textContent = "0%"));
    }

    text.textContent = textArr.join("");
  }
});

document.addEventListener("keydown", (e) => {
  keys.forEach((key) => {
    if (e.key.toLowerCase() === key.id) {
      key.classList.add("pressed");
    }
  });
});

document.addEventListener("keyup", (e) => {
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
