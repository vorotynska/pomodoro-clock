let output = document.getElementById("break-length");
const keys = document.querySelectorAll('.btn');
const demo = document.querySelector("#session-length")

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
                console.log(output.innerText)
            }
            if (action === 'break-decrement') {
                result = Number(output.innerText) - 1;
                if (result <= 0) {
                    result = 1
                }
                output.innerText = result;
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

            }

        }
    })
})







/*const greeting = delay =>
    setTimeout(() => {
        console.log('Hello. ' + delay);
        if (delay < 4)
            greeting(delay + 1)
    }, delay * 1000);
greeting(1);*/