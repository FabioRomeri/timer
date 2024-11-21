const square = document.getElementById("square");

let currentState = "green"; // Stato iniziale
let timeout; // Per gestire i cambi di stato

// Genera un tempo casuale tra min e max (in millisecondi)
function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

// Cambia stato a rosso dopo un tempo casuale
function switchToRed() {
  timeout = setTimeout(() => {
    square.style.backgroundColor = "red";
    currentState = "red";
    waitForPress();
  }, getRandomTime(2000, 5000)); // Tempo casuale tra 2 e 5 secondi
}

// Aspetta che l'utente prema il quadrato
function waitForPress() {
  square.addEventListener("click", handlePress, { once: true });
}

// Gestisce il click quando il quadrato è rosso
function handlePress() {
  if (currentState === "red") {
    currentState = "green";
    square.style.backgroundColor = "green";
    resetToRed();
  }
}

// Cambia stato a verde dopo un tempo casuale (dopo il click)
function resetToRed() {
  clearTimeout(timeout);
  timeout = setTimeout(switchToRed, getRandomTime(2000, 10000)); // Tempo casuale tra 2 e 10 secondi
}

// Inizializza il ciclo
switchToRed();

