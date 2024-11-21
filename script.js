const square = document.getElementById("square");
const countdownDisplay = document.getElementById("countdown");

let currentState = "green"; // Stato iniziale
let timeout; // Timer per i cambi di stato
let countdownTimer; // Timer per il countdown
let initialCountdown; // Valore iniziale del countdown
let remainingTime; // Tempo rimanente del countdown
let isPressed = false; // Controllo se il quadrato è premuto

// Genera un tempo casuale tra min e max (in millisecondi)
function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

// Cambia stato a rosso dopo un tempo casuale
function switchToRed() {
  timeout = setTimeout(() => {
    square.style.backgroundColor = "red";
    currentState = "red";
    initialCountdown = Math.floor(getRandomTime(3000, 15000) / 1000); // Tempo casuale tra 3 e 15 secondi
    countdownDisplay.textContent = initialCountdown;
    remainingTime = initialCountdown;
  }, getRandomTime(2000, 5000)); // Tempo casuale tra 2 e 5 secondi
}

// Gestisce il countdown quando il quadrato è premuto
function startCountdown() {
  if (currentState === "red") {
    isPressed = true; // Segna che il quadrato è premuto
    countdownTimer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime -= 1;
        countdownDisplay.textContent = remainingTime;
      } else {
        clearInterval(countdownTimer);
        square.style.backgroundColor = "green";
        currentState = "green";
        resetToRed();
      }
    }, 1000);
  }
}

// Reset del countdown se il quadrato viene rilasciato
function resetCountdown() {
  if (isPressed) {
    isPressed = false; // Segna che il quadrato è stato rilasciato
    clearInterval(countdownTimer); // Ferma il countdown
    remainingTime = initialCountdown; // Ripristina il valore iniziale
    countdownDisplay.textContent = remainingTime; // Aggiorna il display
  }
}

// Cambia stato a verde dopo un tempo casuale (dopo il completamento del countdown)
function resetToRed() {
  clearTimeout(timeout);
  timeout = setTimeout(switchToRed, getRandomTime(2000, 10000)); // Tempo casuale tra 2 e 10 secondi
}

// Eventi mouse e touch per gestire la pressione e il rilascio
square.addEventListener("mousedown", startCountdown);
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



