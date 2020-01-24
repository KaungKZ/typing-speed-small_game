const quoteAPI_URL = "https://api.quotable.io/random";
const quoteHTML = document.querySelector(".random-quote");
const startBtns = document.querySelectorAll(".start-btn");
const textArea = document.querySelector(".input textarea");
const finishDiv = document.querySelector(".finish");
let timer = document.querySelector(".timer");
let startTime;

async function getRandomQuote() {
  // init features

  quoteHTML.style.opacity = "1";
  finishDiv.classList.remove("active");
  textArea.value = "";
  textArea.disabled = false;
  textArea.focus();

  // send request to api

  const res = await fetch(quoteAPI_URL);
  const data = await res.json();
  const randomQuote = data.content;
  quoteHTML.innerHTML = "";

  randomQuote.split("").forEach(one => {
    const span = document.createElement("span");
    span.innerText = one;
    quoteHTML.appendChild(span);
  });

  correctAllandTimer();
}
// validate characters from input vs letters

function matchChar() {
  let isCorrectAll = true;
  const spans = quoteHTML.querySelectorAll("span");
  const inputValue = this.value.split("");

  spans.forEach((one, index) => {
    if (inputValue[index] == null) {
      one.classList.remove("correct");
      one.classList.remove("incorrect");
      isCorrectAll = false;
    } else if (inputValue[index] === one.innerText) {
      one.classList.add("correct");
      one.classList.remove("incorrect");
    } else {
      one.classList.remove("correct");
      one.classList.add("incorrect");
      isCorrectAll = false;
    }
  });
  if (isCorrectAll) correctAllandTimer(isCorrectAll);
}
// timer function and the features if all letters are correct

function correctAllandTimer(isCorrectAll) {
  if (isCorrectAll) {
    const finishContent = document.querySelector(".content p");
    finishContent.innerText = `Congratulation ! You finish in ${timer.innerText}s`;
    finishDiv.classList.add("active");
    timer.style.display = "none";
  } else {
    timer.style.display = "block";
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
      timer.innerText = Math.floor((new Date() - startTime) / 1000);
    }, 1000);
  }
}
// event listeners

startBtns.forEach(btn => btn.addEventListener("click", getRandomQuote));
textArea.addEventListener("input", matchChar);
