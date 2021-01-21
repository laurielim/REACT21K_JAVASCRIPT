/* Practice exercise
Create a software that generate 1 random number between 0 - 1000
Create a software that will translate that number into text in FINNISH
Example:
10 - ten, 11 - eleven, 12 - twelve
25 - twenty five
122 - one hundred and twenty two, etc. */

// Generate 1 random number between 0 - 100
let randomNum = Math.round(Math.random()*1000);

/* 
let randomNum = 0;
Tested the following numbers:
0, 10, 100, 1000, 12, 75, 106, 110, 132, 310, 591 
*/

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
    secondDigit = ((randomNum % 100) - (randomNum % 10)) / 10;
    thirdDigit = (randomNum - (randomNum % 100)) / 100;

console.log(thirdDigit, secondDigit, firstDigit)

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
        case 0:
            secondDigit = "";
            break;
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

if (randomNum > 100) {
    switch (thirdDigit) {
        case 0:
            thirdDigit = "";
            break;
        case 1:
            thirdDigit = one;
            break;
        case 2:
            thirdDigit = two;
            break;
        case 3:
            thirdDigit = three;
            break;
        case 4:
            thirdDigit = four;
            break;
        case 5:
            thirdDigit = five;
            break;
        case 6:
            thirdDigit = six;
            break;
        case 7:
            thirdDigit = seven;
            break;
        case 8:
            thirdDigit = eight;
            break;
        case 9:
            thirdDigit = nine;
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
} else if (randomNum === 1000) {
    console.log("tuhat");
} else {
    // Assemble text based on each digit
    let finn = firstDigit;

    // for randomNum > 10    
    if (secondDigit == one && firstDigit == "") {
        // If first two digit make number 10
        finn += "kymmenen"; 
    } else if (secondDigit == one) {
        // if first two digit make a number between 11 - 19
        finn += "toista";
    } else if (secondDigit == "") {
        // Do nothing if digit is zero; prevents "kymmentä" from being added
    } else {
        // if first two digit make a number between 20 - 99
        finn = secondDigit + "kymmentä" + finn;
    }

    // For randomNum > 100
    if (thirdDigit == one) {
        // For numbers between 101 - 199
        finn = "sata" + finn;
    } else if (thirdDigit == "") {
        // Do nothing if digit is zero; prevents "sataa" from being added
    } else {
        // For numbers between 200 - 999
        finn = thirdDigit + "sataa" + finn;
    }
    console.log(finn)
}


