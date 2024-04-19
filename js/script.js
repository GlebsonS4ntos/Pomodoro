const players = document.querySelectorAll(".material-symbols-outlined");
const pomodoroTime = 1;
const breakTime = 5;

let totalSeconds = 0; // Variável global para armazenar o tempo restante
let timerInterval; // Variável global para armazenar o intervalo do temporizador

function AlterarPlayer(){
    if (players[0].style.opacity == "1") {
        players[0].style.opacity = 0;
        players[1].style.opacity = 1;
        GoTimer("pomodoro");
    } else {
        players[0].style.opacity = 1;
        players[1].style.opacity = 0;
        GoTimer(true);
    }    
} 

function GoTimer(stopOrInit) {
    if (typeof stopOrInit === "string" && totalSeconds === 0) {
        // Se não for para parar e o tempo total é zero, inicialize o tempo total baseado em pomodoroTime ou breakTime
        totalSeconds = (stopOrInit === "pomodoro") ? (pomodoroTime * 60) - 1 : (breakTime * 60) - 1;
    }
    const minutes = document.querySelector(".minutes");
    const seconds = document.querySelector(".seconds");

    clearInterval(timerInterval);

    timerInterval = setInterval(updateTimer, 1000); // Atualiza o temporizador a cada segundo

    function updateTimer() {
        console.log("Inicio 1: ", totalSeconds);
        const minutesLeft = Math.floor(totalSeconds / 60);
        const secondsLeft = totalSeconds % 60;

        // Formata os minutos e segundos com zero à esquerda, se necessário
        const formattedMinutes = String(minutesLeft).padStart(2, "0");
        const formattedSeconds = String(secondsLeft).padStart(2, "0");

        console.log("Antes de Formatar 2: ",totalSeconds);

        // Atualiza os elementos HTML com os valores formatados
        minutes.textContent = formattedMinutes;
        seconds.textContent = formattedSeconds;

        console.log("Formatado 3: ", totalSeconds);

        // Verifica se o tempo acabou ou se a contagem deve ser interrompida
        if (totalSeconds <= 0) {
            clearInterval(timerInterval); // Para o temporizador
            AlterarPlayer();
        } else if (stopOrInit === true) {
            clearInterval(timerInterval); // Para o temporizador
        } else {
            totalSeconds--; // Decrementa o total de segundos
            console.log("Decrementado 4: ", totalSeconds);
        }
    }
}