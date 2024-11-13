const timerArea = document.getElementById("timerArea");
const timerDisplay = document.getElementById("timerDisplay");

let timer;
let startTime;

function startTimer() {
  startTime = new Date();
  timer = setInterval(() => {
    const elapsed = ((new Date() - startTime) / 1000).toFixed(1);
    timerDisplay.textContent = `${elapsed} secondi`;
  }, 100);
}

function stopTimer() {
  clearInterval(timer);
}

// Eventi per desktop
timerArea.addEventListener("mousedown", startTimer);
timerArea.addEventListener("mouseup", stopTimer);
timerArea.addEventListener("mouseleave", stopTimer);

// Eventi per dispositivi mobili
timerArea.addEventListener("touchstart", (event) => {
  event.preventDefault(); // Previene lo scroll indesiderato
  startTimer();
});
timerArea.addEventListener("touchend", stopTimer);
timerArea.addEventListener("touchcancel", stopTimer);
