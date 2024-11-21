const square = document.getElementById("square");
const countdownDisplay = document.getElementById("countdown");

let currentState = "green";
let timeout; // Per gestire i cambi di stato
let countdownTimer; // Per aggiornare il countdown
let initialCountdown; // Valore iniziale del countdown
let remainingTime; // Tempo rimanente del countdown

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
    waitForPress();
  }, getRandomTime(2000, 5000)); // Tempo casuale tra 2 e 5 secondi
}

// Aspetta che l'utente prema il quadrato
function waitForPress() {
  square.addEventListener("mousedown", startCountdown, { once: true });
  square.addEventListener("touchstart", startCountdown, { once: true, passive: false });
}

// Gestisce il countdown quando il quadrato è premuto
function startCountdown() {
  remainingTime = initialCountdown;
  countdownTimer = setInterval(() => {
    remainingTime -= 1;
    countdownDisplay.textContent = remainingTime;

    if (remainingTime <= 0) {
      clearInterval(countdownTimer);
      currentState = "green";
      square.style.backgroundColor = "green";
      resetToRed();
    }
  }, 1000);

  // Gestisce il rilascio del mouse o del tocco
  square.addEventListener("mouseup", resetCountdown);
  square.addEventListener("mouseleave", resetCountdown);
  square.addEventListener("touchend", resetCountdown, { passive: false });
  square.addEventListener("touchcancel", resetCountdown, { passive: false });
}

// Reset del countdown se il quadrato viene rilasciato
function resetCountdown() {
  clearInterval(countdownTimer);
  countdownDisplay.textContent = initialCountdown;
  waitForPress(); // Aspetta di nuovo il prossimo click
}

// Cambia stato a verde dopo un tempo casuale (dopo il completamento del countdown)
function resetToRed() {
  clearTimeout(timeout);
  timeout = setTimeout(switchToRed, getRandomTime(2000, 10000)); // Tempo casuale tra 2 e 10 secondi
}

// Inizializza il ciclo
switchToRed();


