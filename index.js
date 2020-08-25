const readline = require('readline');
const Utils = require('./utils');
const uts = new Utils();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numberArray;
let dataArray = [];

function makeProduct() {
    console.log(`The Array is => ${dataArray.join(', ')}`);

    console.time('RunApp timing');
    var product = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < dataArray.length - 1; i++) {
        if (dataArray[i] * dataArray[i + 1] > product) {
            product = dataArray[i] * dataArray[i + 1];
        }
    }
    console.log(`The product is ${product}`);
    rl.close();
    console.timeEnd('RunApp timing');
};

function checkSizeArray() {
    if (dataArray.length >= numberArray) {
        makeProduct();
    } else {
        rl.question(`Please enter the ${uts.suffixPosition(dataArray.length + 1)} array value: `, (answer) => {
            if (uts.isNumeric(answer)) {

                const checkNumber = uts.inRange(answer, -1000, 1000);
                if (checkNumber === true) {
                    dataArray.push(answer);
                    checkSizeArray();
                } else {
                    console.log('The allowed range is -1000 to 1000, retry again');
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
            if (numberArray >= 2 && numberArray <= 10) {
                checkSizeArray();
            } else {
                console.log('The minimal length array is 2 and maximum length is 10, retry again');
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