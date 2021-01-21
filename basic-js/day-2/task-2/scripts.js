/* Practice exercise
Create a software that generate 1 random number between 0 - 100
Create a software that will translate that number into text in FINNISH
Example:
10 - ten, 11 - eleven, 12 - twelve
25 - twenty five
122 - one hundred and twenty two, etc. */

// Generate 1 random number between 0 - 100
let randomNum = Math.round(Math.random()*100);

// Create dictionary
const one = "yksi",
    two = "kaksi",
    three = "kolme",
    four = "neljä",
    five = "viisi",
    six = "kuusi",
    seven = "seitsemän",
    eight = "kahdeksan",
    nine = "yhdeksän";

// Split digits
let firstDigit = randomNum % 10,
    secondDigit = (randomNum - (randomNum % 10)) / 10;

// Assign strings to numbers
switch (firstDigit) {
    case 0:
        firstDigit = "";
        break;
    case 1:
        firstDigit = one;
        break;
    case 2:
        firstDigit = two;
        break;
    case 3:
        firstDigit = three;
        break;
    case 4:
        firstDigit = four;
        break;
    case 5:
        firstDigit = five;
        break;
    case 6:
        firstDigit = six;
        break;
    case 7:
        firstDigit = seven;
        break;
    case 8:
        firstDigit = eight;
        break;
    case 9:
        firstDigit = nine;
        break;
}

if (randomNum > 10) {
    switch (secondDigit) {
        case 1:
            secondDigit = one;
            break;
        case 2:
            secondDigit = two;
            break;
        case 3:
            secondDigit = three;
            break;
        case 4:
            secondDigit = four;
            break;
        case 5:
            secondDigit = five;
            break;
        case 6:
            secondDigit = six;
            break;
        case 7:
            secondDigit = seven;
            break;
        case 8:
            secondDigit = eight;
            break;
        case 9:
            secondDigit = nine;
            break;
    }
}

// Show user the number
console.log(randomNum)

// Show user the text form in Finnish
if (randomNum === 0) {
    console.log("nolla");
} else if (randomNum === 10) {
    console.log("kymmenen");
} else if (randomNum === 100) {
    console.log("sata");
} else if (randomNum < 10) {
    console.log(firstDigit);
} else if (randomNum < 20) {
    console.log(firstDigit + "toista");
} else {
    console.log(secondDigit + "kymmentä" + firstDigit);
}

