const players = document.querySelectorAll(".material-symbols-outlined");
const pomodoroTime = 25;
const breakTime = 5;
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const buttonPomodoro = document.querySelector(".pomodoro");
const buttonBreak = document.querySelector(".break");


let totalSeconds = 0; 
let timerInterval; 
let play = true; //verifica se e play com true, false é se for pause
let pomodoroOrBreak = true; //caso seja true é um pomodoro caso seja false um break


function PlayPause(){
    if (play) { //caso seja play vai ser iniciado o timer 
        players[0].style.opacity = 0;
        players[1].style.opacity = 1;
        pomodoroOrBreak ? GoTimer("pomodoro") : GoTimer("break"); 
    } else {
        players[0].style.opacity = 1;
        players[1].style.opacity = 0;
        GoTimer(true);
    }
    play = !play;    
} 

function GoTimer(stopOrInit) {
    if (typeof stopOrInit === "string" && totalSeconds == 0) {
        //Se não for para parar e o tempo total é zero, inicializa o tempo total baseado no pomodoro ou break
        totalSeconds = (stopOrInit === "pomodoro") ? pomodoroTime * 60 : breakTime * 60;
    }

    clearInterval(timerInterval);

    timerInterval = setInterval(updateTimer, 1000); //Atualiza o temporizador a cada segundo

    function updateTimer() {
        //Verifica se o tempo acabou ou se a contagem deve ser parar
        if (totalSeconds <= 0) {
            const audio = document.querySelector("audio");
            audio.play();
            PlayPause();
            clearInterval(timerInterval);
        } else if (stopOrInit === true) {
            clearInterval(timerInterval);
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
    if(pomodoroOrBreak == false){ //so muda o valor e chama a animacao quandor um break for o ultimo chamado
        pomodoroOrBreak = true;
        AnimationRotate();
    }
    setTimeout(() => { //valor vai ser alterado no meio da animacao de rotacao
        minutes.textContent = "25";
        seconds.textContent = "00";
    }, 500);
    if (!play) { //caso tiver um temporizador em execucao mandar parar
        PlayPause();
    } 
    clearInterval(timerInterval);
    totalSeconds = 0;
});

buttonBreak.addEventListener('click', () => {
    if (pomodoroOrBreak == true){ //so muda o valor e chama a animacao quandor um pomodoro for o ultimo chamado
        pomodoroOrBreak = false;
        AnimationRotate();
    }
    setTimeout(() => { //valor vai ser alterado no meio da animacao de rotacao
        minutes.textContent = "05";
        seconds.textContent = "00";
   }, 500);
    if (!play) {
        PlayPause();
    } 
    clearInterval(timerInterval);
    totalSeconds = 0;
});

function AnimationRotate(){
    const circle = document.querySelector(".circle");
    const stopwatch = document.querySelector(".stopwatch");

    circle.classList.add("classeAnimationFlip");
    setTimeout(() => {
        circle.classList.remove("classeAnimationFlip");
    }, 1000); //remove a classe dps de 1s que é o tempo de ocorrer a animacao
    if(pomodoroOrBreak){
        setTimeout(() => {
            circle.style.boxShadow = "-1px 0px 10px 4px #33ba33";
            stopwatch.style.border = "solid 5px #ce4320";    
        }, 500);
    }else{
        setTimeout(() => {
            circle.style.boxShadow = "-1px 0px 10px 4px #3586a3";
            stopwatch.style.border = "solid 5px #0b1153";
        }, 500);
    }
}