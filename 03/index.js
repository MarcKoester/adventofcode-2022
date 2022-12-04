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
    const AAsciiCode = 'A'.charCodeAt(0);
    const aAsciiCode = 'a'.charCodeAt(0);
    const numberOfLetters = 26;

    // first part
    const result = inputArray.reduce((acc, value) => {
        let half = Math.floor(value.length / 2)
        const first = [...value.slice(0, half)];
        const second = [...value.slice(half)];
        const intersect = first.find(value => second.includes(value));

        if(intersect.toLowerCase() === intersect) {
            acc += intersect.charCodeAt(0) - aAsciiCode + 1;
        } else {
            acc += intersect.charCodeAt(0) - AAsciiCode + numberOfLetters + 1;
        }
        return acc;
    }, 0);
    console.log(result);

    // second part
    const groupsOfThree = inputArray.reduce((acc, value, index) => {
        if(index % 3 === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(value);
        return acc;
    }, [])

    const result2 = groupsOfThree.reduce((acc, value) => {
        const first = [...value[0]];
        const second = [...value[1]];
        const third = [...value[2]];
        const intersect = first.find(value => second.includes(value) && third.includes(value));
        if(intersect.toLowerCase() === intersect) {
            acc += intersect.charCodeAt(0) - aAsciiCode + 1;
        } else {
            acc += intersect.charCodeAt(0) - AAsciiCode + numberOfLetters + 1;
        }
        return acc;
    }, 0)
    console.log(result2);
});