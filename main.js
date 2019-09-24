const userScore       = document.querySelector('.score');
const gameStartButton = document.querySelector('.game__start');
const gameArea        = document.querySelector('.game-area');
const car             = document.createElement('div');
car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

const settings = {
    start: false,
    score: 0,
    speed: 5,
    traffic: 2
};

const getElementsQuantity = (height) => {
    return document.documentElement.clientHeight / height + 1;
};

const startGame = () => {
    gameStartButton.classList.add('hidden');
    gameArea.classList.add('visible');

    for (let i = 0; i < getElementsQuantity(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${i * 100}px`;
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getElementsQuantity(100 * settings.traffic); i++) {
        const opponent = document.createElement('div');
        opponent.classList.add('opponent');
        opponent.y = -100 * settings.traffic * (i + 1);
        opponent.style.top = `${opponent.y}px`;
        opponent.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50 - 20 - 20 + 1) + 20)}px`;
        gameArea.appendChild(opponent);
    }

    settings.start = true;
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

const playGame = () => {
    if (settings.start) {
        moveRoad();
        moveTraffic();

        if (keys.ArrowLeft && settings.x > 20) {
            settings.x -= settings.speed;
        }

        if (keys.ArrowRight && settings.x < gameArea.offsetWidth - car.offsetWidth - 20) {
            settings.x += settings.speed;
        }

        if (keys.ArrowUp && settings.y > 20) {
            settings.y -= settings.speed;
        }

        if (keys.ArrowDown && settings.y < gameArea.offsetHeight - car.offsetHeight) {
            settings.y += settings.speed;
        }

        car.style.left = `${settings.x}px`;
        car.style.top  = `${settings.y}px`;

        requestAnimationFrame(playGame);
    }
};

const moveRoad = () => {
    const lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += settings.speed;
        line.style.top = `${line.y}px`;

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
};

const moveTraffic = () => {
    const traffic = document.querySelectorAll('.opponent');
    traffic.forEach((opponent) => {
        opponent.y += settings.speed / 2;
        opponent.style.top = `${opponent.y}px`;

        if (opponent.y >= document.documentElement.clientHeight) {
            opponent.y = -100 * settings.traffic;
            opponent.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50 - 20 - 20 + 1) + 20)}px`;
        }
    });
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
document.addEventListener('keyup', moveStop);