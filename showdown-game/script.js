var body     = document.querySelector("body");
var app      = document.querySelector("#app");
var bg       = document.querySelector("#bg")
var modal    = document.querySelector("#modal")
var startBtn = document.querySelector("#startBtn");
var message  = document.querySelector("#message");
var par  = document.querySelector("p");

var startSound = new Audio('audio/start.m4a');
var failSound = new Audio('audio/fail.mp3');
var shootSound = new Audio('audio/shoot.m4a');

var strtTimeout;

function waitForIt() {
    body.classList.remove("fido");
    body.classList.remove("rex");
    body.classList.add("neutral");
    modal.classList.add("hidden");
    par.classList.add("hidden");
    strtTimeout = setTimeout(startGame, randomStart());
    body.addEventListener("keydown", fail = e => {
        var theKey = e.key;
        failPress(theKey);
    });
}

function failPress(theKey) {
    app.classList.remove("gameOn");
        if (theKey == "q") {
            lose("fido");
        }
        else if (theKey == "p") {
            lose("rex");
        }
}

function randomStart() {
    return Math.ceil(Math.random() * 6 + 2) * 1000;
}

function startGame() {
    body.removeEventListener("keydown", fail);
    startSound.play();
    body.addEventListener("keydown", itPressed = e => {
        var theKey = e.key;
        keyPressed(theKey);
    });
}

function keyPressed(theKey) {
    app.classList.remove("gameOn");
        if (theKey == "q") {
            win("fido");
        }
        else if (theKey == "p") {
            win("rex");
        }
}

function lose(loser) {
    body.removeEventListener("keydown", fail);
    modal.classList.remove("hidden");
    message.innerHTML = "Bad bad dog " + loser + "!";
    failSound.play();
    endGame();
}

function win(winner) {
    body.removeEventListener("keydown", itPressed);
    modal.classList.remove("hidden");
    body.classList.add(winner);
    message.innerHTML = "Good boy " + winner + "!";
    shootSound.play();
    endGame();
}

function endGame(){
    startBtn.innerHTML = "Play Again?";
    clearTimeout(strtTimeout);
}

startBtn.addEventListener("click", waitForIt);