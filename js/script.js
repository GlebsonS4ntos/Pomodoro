const players = document.querySelectorAll(".material-symbols-outlined");
const pomodoroTime = 25;
const breakTime = 5;
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const buttonPomodoro = document.querySelector(".pomodoro");
const buttonBreak = document.querySelector(".break");


let totalSeconds = 0; 
let timerInterval; 
let play = true;
let pomodoroOrBreak = true; //caso seja true é um pomodoro caso seja false um break


function PlayPause(){
    if (play) { //caso seja play vai ser iniciado o timer 
        players[0].style.opacity = 0;
        players[1].style.opacity = 1;
        pomodoroOrBreak ? GoTimer("pomodoro") : GoTimer("break");
        play = !play;
    } else {
        players[0].style.opacity = 1;
        players[1].style.opacity = 0;
        GoTimer(true);
    }    
} 

function GoTimer(stopOrInit) {
    if (typeof stopOrInit === "string" && totalSeconds == 0) {
        //Se não for para parar e o tempo total é zero, inicializa o tempo total baseado no pomodoro ou break
        totalSeconds = (stopOrInit === "pomodoro") ? pomodoroTime * 60 : breakTime * 60 - 1;
    }

    clearInterval(timerInterval);

    timerInterval = setInterval(updateTimer, 1000); //Atualiza o temporizador a cada segundo

    function updateTimer() {
        //Verifica se o tempo acabou ou se a contagem deve ser parar
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            PlayPause();
        } else if (stopOrInit === true) {
            clearInterval(timerInterval);
            play = !play;
        } else {
            totalSeconds--;
        }

        const minutesLeft = Math.floor(totalSeconds / 60);
        const secondsLeft = totalSeconds % 60;

        // Adiciona no span ja formatado tanto os minutos quanto os segundos com zero a esquerda quando for numero com 1 digito
        minutes.textContent = String(minutesLeft).padStart(2, "0");
        seconds.textContent = String(secondsLeft).padStart(2, "0");
    }
}

buttonPomodoro.addEventListener('click', () => {
    pomodoroOrBreak = true;
    minutes.textContent = "25";
    seconds.textContent = "00";
    //reseta o contador
    clearInterval(timerInterval);
    totalSeconds = 0;
    if (!play) {
        PlayPause();
        play = !play;
    } 
});

buttonBreak.addEventListener('click', () => {
    pomodoroOrBreak = false;
    minutes.textContent = "05";
    seconds.textContent = "00";
    //reseta o contador
    clearInterval(timerInterval);
    totalSeconds = 0;
    if (!play) {
        PlayPause();
        play = !play;
    } 
});