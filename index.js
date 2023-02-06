let output = document.getElementById("break-length");
const keys = document.querySelectorAll('.btn');
const demo = document.querySelector("#session-length")

const mainButton = document.getElementById('start_stop')


keys.forEach((btn) => {
    btn.addEventListener('click', e => {
        const key = e.target;
        const action = key.dataset.action;
        console.log(action)
        if (e.target.matches('button')) {

            if (action === 'break-increment') {
                let result = Number(output.innerText) + 1;
                if (result > 60) {
                    result = 60;
                }
                output.innerText = result;
                let wor = Number(output.innerText);

            }
            if (action === 'break-decrement') {
                result = Number(output.innerText) - 1;
                if (result <= 0) {
                    result = 1
                }
                output.innerText = result;
                let wor = Number(output.innerText);
            }
            if (action === 'session-increment') {
                let result1 = Number(demo.innerText) + 1;
                if (result1 > 60) {
                    result1 = 60;
                }
                demo.innerText = result1;

            }
            if (action === 'session-decrement') {
                result1 = Number(demo.innerText) - 1;
                if (result1 <= 0) {
                    result1 = 1;
                }
                demo.innerText = result1;


            }
            if (action === 'reset') {
                result = 5;
                result1 = 25;
                demo.innerText = result1;
                output.innerText = result;
                switchMode('pomodoro');

            }
            if (action === 'start') {
                startTimer();
            }
            if (action === 'stop') {
                stopTimer();
            }
        }
    })

})
const timer = {
    pomodoro: 1,
    break: 5
};
let interval;
let wor;



function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;

    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
        total,
        minutes,
        seconds,
    };
}

function startTimer() {
    let {
        total
    } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'stop';
    mainButton.classList.add('active');

    interval = setInterval(function () {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();

        total = timer.remainingTime.total;
        if (total < 0) {
            clearInterval(interval);

            switch (timer.mode) {
                case 'pomodoro':
                    switchMode('break');
                    break;
                default:
                    switchMode('pomodoro');
            }
            document.querySelector('#beep').play();
            startTimer();
        }
    }, 1000);
}


function stopTimer() {
    clearInterval(interval);

    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');
}

function updateClock() {
    const {
        remainingTime
    } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');


    let text = document.getElementById('timer-label');
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;
    text.innerText = timer.mode === 'pomodoro' ? 'Session' : 'Break';
}


function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
    };
    updateClock();
}
document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro');
});





/*let interval;

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            // timer = duration; // uncomment this line to reset timer automatically after reaching 0
        }
    }, 1000);
}

window.onload = function () {
    var time = 60 / 2 // your time in seconds here
    display = document.querySelector('#time-left');

};*/