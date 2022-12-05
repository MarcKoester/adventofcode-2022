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

    // first part
    const fullyOverlap = inputArray.filter(inputLine => {
        const [first, second] = inputLine.split(',');
        const [firstStart, firstEnd] = first.split('-').map(Number);
        const [secondStart, secondEnd] = second.split('-').map(Number);

        return firstStart <= secondStart && firstEnd >= secondEnd || secondStart <= firstStart && secondEnd >= firstEnd;
    })

    console.log(fullyOverlap.length);

    // second part
    const partlyOverlap = inputArray.filter(inputLine => {
        const [first, second] = inputLine.split(',');
        const [firstStart, firstEnd] = first.split('-').map(Number);
        const [secondStart, secondEnd] = second.split('-').map(Number);

        return firstStart <= secondStart && firstEnd >= secondStart || secondStart <= firstStart && secondEnd >= firstStart;
    })

    console.log(partlyOverlap.length);
});