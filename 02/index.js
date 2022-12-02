const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false,
});

const inputArray = [];

file.on('line', (line) => {
    inputArray.push(line);
});

file.on('close', () => {
    const points = {
        rock: 1,
        paper: 2,
        scissors: 3,
        win: 6,
        draw: 3,
        lose: 0
    }


    // first Part
    const inputMap = {
        A: 'rock',
        B: 'paper',
        C: 'scissors',
        X: 'rock',
        Y: 'paper',
        Z: 'scissors'
    }

    const result = inputArray.reduce((acc, value) => {
        const [opponent, my] = value.split(' ');
        const opponentMove = inputMap[opponent];
        const myMove = inputMap[my];
        acc += points[myMove];

        if (myMove === opponentMove) {
            acc += points.draw;
        } else if (myMove === 'rock' && opponentMove === 'scissors' || myMove === 'paper' && opponentMove === 'rock' || myMove === 'scissors' && opponentMove === 'paper') {
            acc += points.win;
        } else {
            acc += points.lose;
        }
        return acc;
    }, 0);
    console.log(result);

    // second Part
    const inputMap2 = {
        A: 'rock',
        B: 'paper',
        C: 'scissors',
        X: 'lose',
        Y: 'draw',
        Z: 'win'
    }
    const result2 = inputArray.reduce((acc, value) => {
        const [opponent, resultKey] = value.split(' ');
        const opponentMove = inputMap2[opponent];
        const result = inputMap2[resultKey];
        acc += points[result];

        if (result === 'draw') {
            acc += points[opponentMove];
        } else if (result === 'lose'){
            acc += opponentMove === 'rock' ? points.scissors : opponentMove === 'paper' ? points.rock : points.paper;
        } else {
            acc += opponentMove === 'rock' ? points.paper : opponentMove === 'paper' ? points.scissors : points.rock;
        }
        return acc;
    }, 0);

    console.log(result2);
});