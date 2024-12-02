const square = document.getElementById("square");
const countdownDisplay = document.getElementById("countdown");
const delayDisplay = document.getElementById("delay");
const penaltyDisplay = document.getElementById("penalty");

let currentState = "green"; // Stato iniziale
let timeout; // Timer per cambio di stato
let countdownTimer; // Timer per aggiornare il countdown
let pressDelayTimer;
let delay = 0;
let initialCountdown; // Valore iniziale del countdown
let updatedCountdown;
let remainingTime; // Tempo rimanente del countdown
let isPressed = false; // Controllo se il quadrato è premuto
let isUpdated = false;

function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

function updateCountdown(){
  if(!isUpdated){
    updatedCountdown = initialCountdown + delay;
    isUpdated = true;
    penaltyDisplay.textContent = Math.round(delay*10)/10;
    timeout = setTimeout(() => {
      penaltyDisplay.textContent = "";
    },1500);
  }
}

// Cambia stato a rosso dopo un tempo casuale
function switchToRed() {
  timeout = setTimeout(() => {
    square.style.backgroundColor = "red";
    currentState = "red";
    initialCountdown = Math.floor(getRandomTime(3000, 11000) / 1000);
    countdownDisplay.textContent = Math.round(initialCountdown*10)/10;;
    remainingTime = initialCountdown;
    waitForTouch();
  }, getRandomTime(1000, 4000));
}

function waitForTouch() {
  if(!isPressed){
    pressDelayTimer = setInterval(() => {
      delay += 0.1;
      delayDisplay.textContent = Math.round(delay*10)/10;
    }, 100);
  }
}

function clearDelay() {
  updateCountdown();
  delayDisplay.textContent = "";
  clearInterval(pressDelayTimer);
}

// Gestisce il countdown quando il quadrato è premuto
function startCountdown() {
  if (currentState === "red" && !isPressed) {
    clearDelay();
    isPressed = true;
    remainingTime = updatedCountdown;
    countdownDisplay.textContent = Math.round(remainingTime*10)/10;
    countdownTimer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime -= 0.1;
        countdownDisplay.textContent = Math.round(remainingTime*10)/10;
      } else {
        clearInterval(countdownTimer);
        square.style.backgroundColor = "green";
        delay = 0;
        delayDisplay.textContent = "0";
        currentState = "green";
        isPressed = false; // Resetta lo stato premuto
        resetToRed();
      }
    }, 100);
  }
}

// Reset del countdown se il quadrato viene rilasciato
function resetCountdown() {
  if (isPressed) {
    isPressed = false; // Segna che il quadrato è stato rilasciato
    clearInterval(countdownTimer); // Ferma il countdown
    remainingTime = updatedCountdown; // Ripristina il valore iniziale
    countdownDisplay.textContent = Math.round(remainingTime*10)/10;; // Aggiorna il display
  }
}

function resetToRed() {
  clearTimeout(timeout);
  switchToRed();
  isUpdated = false;
}

// Eventi mouse e touch per gestire la pressione e il rilascio
square.addEventListener("mousedown", startCountdown, clearDelay);
square.addEventListener("mouseup", resetCountdown);
square.addEventListener("mouseleave", resetCountdown);
square.addEventListener("touchstart", (event) => {
  event.preventDefault(); // Previene il comportamento di default
  startCountdown();
});
square.addEventListener("touchend", (event) => {
  event.preventDefault();
  resetCountdown();
});
square.addEventListener("touchcancel", (event) => {
  event.preventDefault();
  resetCountdown();
});

// Inizializza il ciclo
switchToRed();




