
// Elementi della pagina
const square = document.getElementById("square");
const ball = document.getElementById("ball"); 
const countdownDisplay = document.getElementById("countdown");

let ballSize = 50; // Dimensione iniziale della pallina (in pixel)
let lastClickTime = null; // Tempo dell'ultimo clic
let increment = 7;

let countdown = 3;
let countdownTimer;

let state;
let activated = false;

// Funzione per gestire il clic sul quadrato
function handleClick() {
    const now = Date.now();

    if (lastClickTime) {
        //const timeDiff = (now - lastClickTime) / 1000; // Differenza in secondi
        //const frequency = Math.min(10, 1 / timeDiff); // Frequenza in clic al secondo (massimo 10)
        //const increment = frequency * 2; // Calcola l'incremento proporzionale alla frequenza

        // Aggiorna la dimensione della pallina
        ballSize = Math.min(ballSize + increment, 250); // Limita la dimensione massima
        ball.style.width = `${ballSize}px`;
        ball.style.height = `${ballSize}px`;
    }

    lastClickTime = now;
}

// Funzione per far tornare lentamente la pallina alla dimensione base
function handleBall() {
    const gravity = 0.5; // Velocità di riduzione (in pixel)
    const baseSize = 50; // Dimensione base della pallina

    setInterval(() => {
        if (ballSize > baseSize) { // Riduci la dimensione fino alla base
            ballSize = Math.max(ballSize - gravity, baseSize);
            ball.style.width = `${ballSize}px`;
            ball.style.height = `${ballSize}px`;
        }
        if(ballSize > 200) {
            state = true;
            ball.style.background = "red";
            startCountdown();
        } else {
            state = false;
            ball.style.background = "rgb(238, 106, 209)";
            resetCountdown();
        }
    }, 50);
}

function startCountdown() {
    if(state && !activated){
        activated = true;
        countdownDisplay.textContent = Math.round(countdown*10)/10;
        countdownTimer = setInterval(() => {
            if(countdown > 0){
                countdown -= 0.1;
                countdownDisplay.textContent = Math.round(countdown*10)/10;
            }else{
                clearInterval(countdownTimer);
                countdownDisplay.textContent = Math.round(countdown*10)/10;
                setTimeout(() =>{
                    setInterval(() => {
                        if(ball.style.background != "whtie"){
                            ball.style.background = "white";
                        }  
                        else{
                            ball.style.background = "red";
                        }
                    },1000);
                },1000);
            }
        }, 100);
    }
}

function resetCountdown() {
    activated = false;
    clearInterval(countdownTimer);
    countdown = 3;
    countdownDisplay.textContent = Math.round(countdown*10)/10;
}

// Inizializza gli eventi
square.addEventListener("click", handleClick);
handleBall();
