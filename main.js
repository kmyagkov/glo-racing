const userScore       = document.querySelector('.score');
const gameStartButton = document.querySelector('.game__start');
const gameArea        = document.querySelector('.game-area');
const car             = document.createElement('div');
car.classList.add('car');

const keys = {
    arrowUp: false,
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false
};

const settings = {
    start: false,
    score: 0,
    speed: 3
};

const startGame = () => {
    gameStartButton.classList.add('hidden');
    settings.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
};

const playGame = () => {
    console.log('Play game');
    if (settings.start) {
        requestAnimationFrame(playGame);
    }
};

const moveStart = (evt) => {
    evt.preventDefault();
    keys[evt.key] = true;
};

const moveStop = (evt) => {
    evt.preventDefault();
    keys[evt.key] = false;
};

gameStartButton.addEventListener('click', startGame);
document.addEventListener('keydown', moveStart);
document.addEventListener('keydown', moveStop);