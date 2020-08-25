const readline = require('readline');
const Utils = require('./utils');
const uts = new Utils();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numberArray;
let dataArray = [];

function makeSequence() {
    console.log(`The Array is => ${dataArray.join(', ')}`);

    console.time('RunApp timing');

    console.log('Result Sequence is ' + almostIncreasingSequence(dataArray));

    rl.close();
    console.timeEnd('RunApp timing');

};

function almostIncreasingSequence(sequence) {
    if (isIncreasingSequence(sequence)) {
        return true;
    }

    for (var i = 0; i < sequence.length > 0; i++) {
        var tmpSequence = sequence.slice(0);

        tmpSequence.splice(i, 1);
        if (isIncreasingSequence(tmpSequence)) {
            return true;
        }
    }

    return false;
}

function isIncreasingSequence(sequence) {
    for (var i = 0; i < sequence.length - 1; i++) {
        if (sequence[i] >= sequence[i + 1]) {
            return false;
        }
    }

    return true;
}

function checkSizeArray() {
    if (dataArray.length >= numberArray) {
        makeSequence();
    } else {
        rl.question(`Please enter the ${uts.suffixPosition(dataArray.length + 1)} array value: `, (answer) => {
            if (uts.isNumeric(answer)) {

                const checkNumber = uts.inRange(answer, -105, 105);
                if (checkNumber === true) {
                    dataArray.push(answer);
                    checkSizeArray();
                } else {
                    console.log('The allowed range is -105 to 105, retry again');
                    rl.prompt();
                    rl.on('line', (answer) => {
                        if (uts.isNumeric(answer)) {
                            checkSizeArray();
                        } else {
                            rl.setPrompt(`Your input ${answer} is not a valid number\n`);
                            rl.prompt();
                        }
                    });
                }
            } else {
                console.log('That is not a valid number, retry again.');
                rl.prompt();
                rl.on('line', (answer) => {
                    if (uts.isNumeric(answer)) {
                        dataArray.push(answer);
                        checkSizeArray();
                    } else {
                        rl.setPrompt(`Your input ${answer} is not a valid number\n`);
                        rl.prompt();
                    }
                });
            }
        });
    }
};

(function askHowManyArray() {
    rl.question('How many size Array?\n', (answer) => {
        numberArray = parseInt(answer);
        if (uts.isNumeric(numberArray)) {
            if (numberArray >= 2 && numberArray <= 105) {
                checkSizeArray();
            } else {
                console.log('The minimal length array is 2 and maximum length is 105, retry again');
                rl.prompt();
                rl.on('line', (answer) => {
                    if (uts.isNumeric(answer)) {
                        askHowManyArray();
                    } else {
                        rl.setPrompt(`Your input ${answer} is not a valid number\n`);
                        rl.prompt();
                    }
                });
            }
        } else {
            console.log('That is not a valid number, retry again.');
            askHowManyArray();
        }
    });
}());