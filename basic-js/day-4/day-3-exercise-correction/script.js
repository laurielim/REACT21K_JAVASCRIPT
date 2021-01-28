// 7. Create a while loop that will run the above application for an undefinite number of time, and only break out of the loop if the jackpot prize is won.
// 8. Create a variable to keep track of many rounds have been played in order to win the jackpot
// 9. If each round costs 50 cents, run the above program 5 times, either manually or use a while loop to help you, in order to learn the average amount of money you have to spend on winning a jackpot 😄
// 10. Increase the random number range to be any number between 0 - 5, run the program on number 9 again to see how much money you would actually have to spend to win a jackpot
let winningStatus = false;
let roundPlayed = 0;
let jackpotCounter = 0;

const COST_OF_ONE_ROUND = 0.5;
const RANDOMIZE_RANGE = 6;
const JACKPOT_TO_BE_WON = 1000;

while (jackpotCounter < JACKPOT_TO_BE_WON) {
  jackpotCounter++;

  winningStatus = false;
  // Game logic here to win jackpot
  // If Boolean(winningStatus === false) === true then KEEP doing the following
  while (winningStatus === false) {
    roundPlayed++;

    // Code logic goes here
    // 1. Create an **array of 5 elements**, each element is a random number of either 1 or 0
    let chosenNumbers = [];

    let counter = 0;

    while (counter < 5) {
      chosenNumbers[counter] = Math.floor(Math.random() * RANDOMIZE_RANGE);
      counter++;
    }

    // console.log("The value of the counter after the creation loop: " + counter); // 5
    // 2. Create a while loop, that goes through each element in the array, check if they are 1 or 0
    // 3. Also create a counter variable to keep track of the number of 1 and 0 values in the array

    let oneCounter = 0;
    let zeroCounter = 0;

    // Reverser counter
    while (counter) {
      counter--;

      if (chosenNumbers[counter] === 1) {
        oneCounter++;
      } else if (chosenNumbers[counter] === 0) {
        zeroCounter++;
      }
    }

    // console.log(`Found ${oneCounter} ones and ${zeroCounter} zeroes.`);

    // 4. If the number of 1s is 5, announce the jackpot prize
    // 5. If the number of 0s is 5, announce the congrat message
    // 6. If the number of 1s is 3 < x < 5, announce smaller prize

    if (oneCounter === 5) {
      console.log("Jackpot");
      winningStatus = true;
      // } else if (zeroCounter === 0) {
      //   console.log("No win but very luck");
      // } else if (oneCounter > 3 && oneCounter < 5) {
      //   console.log("Smaller prize");
      // } else {
      //   console.log("No win");
    }
  }
}

console.log(
  `${roundPlayed} rounds have been played until ${JACKPOT_TO_BE_WON} jackpots are won`
);
console.log(
  `${
    roundPlayed * COST_OF_ONE_ROUND
  } EUR was spend to win that ${JACKPOT_TO_BE_WON} jackpot`
);
console.log(
  `${
    (roundPlayed * COST_OF_ONE_ROUND) / JACKPOT_TO_BE_WON
  } EUR was spent on average to win a single jackpot`
);
