const timerArea = document.getElementById("timerArea");
const timerDisplay = document.getElementById("timerDisplay");

let timer;
let startTime;

timerArea.addEventListener("mousedown", () => {
  startTime = new Date();
  timer = setInterval(() => {
    const elapsed = ((new Date() - startTime) / 1000).toFixed(1);
    timerDisplay.textContent = elapsed;
  }, 100);
});

timerArea.addEventListener("mouseup", () => {
  clearInterval(timer);
});

timerArea.addEventListener("mouseleave", () => {
  clearInterval(timer);
});
