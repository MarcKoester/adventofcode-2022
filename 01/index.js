const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false,
});

const inputArray = [];

file.on('line', (line) => {
    inputArray.push(parseInt(line));
});

file.on('close', () => {
    const entryPerElf = inputArray.reduce(
        (acc, value) => {
            if (value) {
                acc[acc.length - 1] += value;
            } else {
                acc.push(0);
            }
            return acc;
        },
        [0]
    );

    // First part
    console.log(Math.max(...entryPerElf));

    //Second part
    const topThree = entryPerElf.sort((a, b) => b - a).slice(0, 3);
    console.log(topThree.reduce((a, b) => a + b, 0));
});
