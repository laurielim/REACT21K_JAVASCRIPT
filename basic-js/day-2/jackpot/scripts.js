/* Practice exercise
- Create a software that generate 5 random numbers of either 0 or 1
- Let the user knows which are the 5 random numbers that they have gotten with console.log or alert
- If the user get all five 1s, congrat the user because he/she has won a jackpot prize. 
- Also show them what has been the chance of winning the jackpot by performing a calculation of the winning probability (basically 1/2^5)
- If the user get all five 0s, congrat them anyway because it is as hard as winning the jackpot except he/she didn’t win anything */

// Create 5 random numbers
let numOne = Math.round(Math.random());
let numTwo = Math.round(Math.random());
let numThree = Math.round(Math.random());
let numFour = Math.round(Math.random());
let numFive = Math.round(Math.random());

// Show user the random numbers
console.log(numOne, numTwo, numThree, numFour, numFive);

// Congratulate user for five 1s
if (numOne + numTwo + numThree + numFour + numFive === 5) {
    console.log("Congratulation, you hit the jackpot!")
    // Let them know the chances of winning the jackpot
    console.log("The probability of winning is", 1/2**5)
} 
// Congratulate them for five 0s
else if (numOne + numTwo + numThree + numFour + numFive === 0) {
    console.log("Congratulation, you got 5 zeros, which is as hard as winning the jackpot except you win nothing!")
}


