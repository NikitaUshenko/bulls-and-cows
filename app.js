"use strict";

const results_output = document.getElementById("results_output");
const win = document.getElementById("win");
const computerNumber = getRandomInt();
const numberField = document.getElementById("guess_number");
const form = document.getElementById("form");
let winner = 0;

console.log(computerNumber);
form.addEventListener("submit", (event) => calculate(computerNumber, event));
numberField.addEventListener("input", () => validateDigits(numberField.value));

function validateDigits(field) {
    numberField.value = field.replace(/[^0-9]/g, '');
}

function calculate(computerNumber, event) {
    event.preventDefault();
    const playersNumber = numberField.value;

    if (playersNumber !== computerNumber) {
        if (
            isNumber(playersNumber) &&
            playersNumber.length === computerNumber.length
        ) {
            let cows = calculateCows(playersNumber, computerNumber);
            let bulls = calculateBulls(playersNumber, computerNumber);

            let li = document.createElement("li");
            li.innerHTML = `Cows 🐮: ${cows} and bulls 🐂: ${bulls}`;

            results_output.appendChild(li);
            document.getElementById("guess_number").value = '';
        } else {
            let li = document.createElement("li");
            li.innerHTML = `Input error, try it again!`;

            results_output.appendChild(li);
        }
    } else {
        if (!winner) {
            results_output.innerHTML = "";
            let h2 = document.createElement("h2");
            h2.className += "animated heartBeat duration-2s";
            h2.innerHTML = `Winner!`;

            win.appendChild(h2);
        }
        winner = 1;
    }
}

function calculateCows(playersNumber, computerNumber) {
    let count = "";

    for (let i = 0; i < playersNumber.length; i++) {
        if (
            computerNumber.indexOf(playersNumber[i]) !== -1 &&
            count.indexOf(playersNumber[i]) === -1 &&
            playersNumber[i] !== computerNumber[i]
        ) {
            count += playersNumber[i];
        }
    }
    return count.length;
}

function calculateBulls(playersNumber, computerNumber) {
    let count = 0;
    for (let i = 0; i < playersNumber.length; i++) {
        if (playersNumber[i] === computerNumber[i]) {
            count += 1;
        }
    }
    return count;
}

function isNumber(n) {
    return n !== null && isFinite(n);
}

function getRandomInt() {
    let key = "";
    while (key.length < 4) {
        let randomNumber = Math.floor(Math.random() * 10);

        if (key.indexOf(randomNumber) === -1) {
            key += randomNumber;
        }
    }
    return key;
}
