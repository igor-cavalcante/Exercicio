const themeMap = {
    dark: "light",
    light: "dark"
};

const theme = localStorage.getItem('theme') ||
    (tmp = Object.keys(themeMap)[0],
    localStorage.setItem('theme', tmp),
    tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;

document.addEventListener("DOMContentLoaded", () => {
    const circularProgressBar = document.querySelector("#circularProgressBar");
    const circularProgressBarNumber = document.querySelector("#circularProgressBar .progress-value");
    // const audio = new Audio('Alarm.mp3');

    const pomodoroTimerInSeconds = 30;
    const TIMER_TYPE_POMODORO = 'POMODORO';

    let progressInterval;
    let timerValue = pomodoroTimerInSeconds;
    let multiplierFactor = 360 / timerValue;
    let isPaused = false;
    let timerEnded = false;

    const exercicios = [
        {name: 'Bridge', src: 'assets/bridge.gif'},
        {name: 'Extensão da Perna', src: 'assets/extensaoperna3.gif'},
        {name: 'Lombar Deitado', src: 'assets/lombardeitado.gif'},
        {name: 'Alongamento Coluna Lado', src: 'assets/alongamentocolunalado.gif'},
        {name: 'Alongamento Perna Trás', src: 'assets/alongamentopernatraz.gif'},
        {name: 'Alongamento Perna Frente', src: 'assets/alongamentopernafrente5.gif'},
        {name: 'Rotação', src: 'assets/rotacao.gif'},
        {name: 'Rotação Direita', src: 'assets/rotacaodireita.gif'},
        {name: 'Alongamento Ombro', src: 'assets/alongamentoombro.gif'},
        {name: 'Braço Baixo', src: 'assets/bracobaixo.gif'},
        {name: 'Alongamento Tríceps', src: 'assets/alongamentotriceps.gif'},
        {name: 'Braço Cima', src: 'assets/bracocima.gif'},
        {name: 'Coluna Sentado', src: 'assets/colunasentado3.gif'},
       
    ];

    let currentExerciseIndex = 0;

    function formatNumberInStringMinute(number) {
        const minutes = Math.trunc(number / 60).toString().padStart(2, '0');
        const seconds = Math.trunc(number % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    function setInfoCircularProgressBar() {
        if (timerValue === 0) {
            stopTimer();
            audio.play();
            timerEnded = true;
        }
        circularProgressBarNumber.textContent = formatNumberInStringMinute(timerValue);
        circularProgressBar.style.background = `conic-gradient(var(--special) ${timerValue * multiplierFactor}deg, var(--bg-secondary) 0deg)`;
    }

    function startTimer() {
        progressInterval = setInterval(() => {
            if (timerValue > 0) {
                timerValue--;
                setInfoCircularProgressBar();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(progressInterval);
    }

    const pausePlayButton = document.querySelector("#pause-play");
    if (pausePlayButton) {
        pausePlayButton.addEventListener("click", () => {
            if (isPaused) {
                startTimer();
                pausePlayButton.classList.remove("fa-play");
                pausePlayButton.classList.add("fa-pause");
            } else {
                stopTimer();
                pausePlayButton.classList.remove("fa-pause");
                pausePlayButton.classList.add("fa-play");
            }
            isPaused = !isPaused;
        });
    } else {
        console.error("Elemento #pause-play não encontrado.");
    }

    function updateExerciseImageAndTitle() {
        console.log("Atualizando imagem e título:", exercicios[currentExerciseIndex]);
        const exerciseImage = document.getElementById("exercicio-imagem");
        const exerciseTitle = document.getElementById("exercicio-title");
        if (exerciseImage && exerciseTitle) {
            exerciseImage.src = exercicios[currentExerciseIndex].src;
            exerciseTitle.textContent = exercicios[currentExerciseIndex].name;
        } else {
            console.error("Elemento #exercicio-imagem ou #exercicio-title não encontrado.");
        }
    }

    function showCompletionModal() {
        const fade = document.getElementById("completion-fade");
        const modal = document.getElementById("completion-modal");
        fade.style.display = "flex";
        modal.style.display = "flex";
    }

    function hideCompletionModal() {
        const modal = document.getElementById("completion-modal");
        modal.style.display = "none";
    }

    function passarItem() {
        const nextExerciseButton = document.querySelector("#next-exercise");
        const previousExerciseButton = document.querySelector("#previous-exercise");

        if (nextExerciseButton) {
            nextExerciseButton.addEventListener("click", () => {
                if (timerEnded) {
                    if (currentExerciseIndex < exercicios.length - 1) {
                        currentExerciseIndex++;
                    } else {
                        showCompletionModal();
                        stopTimer();
                    }
                    updateExerciseImageAndTitle();
                    timerEnded = false; 
                    timerValue = pomodoroTimerInSeconds; 
                    setInfoCircularProgressBar(); 
                    startTimer();
                } else {
                    window.alert("Você só pode passar para o próximo exercício quando o timer acabar.");
                }
            });
        } else {
            console.error("Elemento #next-exercise não encontrado.");
        }

        if (previousExerciseButton) {
            previousExerciseButton.addEventListener("click", () => {
                if (timerEnded) {
                    if (currentExerciseIndex > 0) {
                        currentExerciseIndex--;
                    } else {
                        currentExerciseIndex = exercicios.length - 1;
                    }
                    updateExerciseImageAndTitle();
                    timerEnded = false; 
                    timerValue = pomodoroTimerInSeconds; 
                    setInfoCircularProgressBar(); 
                    startTimer();
                } else {
                    window.alert("Você só pode passar para o exercício anterior quando o timer acabar.");
                }
            });
        } else {
            console.error("Elemento #previous-exercise não encontrado.");
        }
    }

    passarItem();
    updateExerciseImageAndTitle();
    setInfoCircularProgressBar();
    startTimer();
});

document.addEventListener("DOMContentLoaded", () => {
    const exercicioDivs = document.querySelectorAll('#btn-voltar');
  
    exercicioDivs.forEach(div => {
      div.addEventListener('click', () => {
        window.location.href = '../Planos/index.html';
      });
    });
});
