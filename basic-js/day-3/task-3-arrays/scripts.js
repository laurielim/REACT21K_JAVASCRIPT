/* Practice exercises

1. Create an **array of 5 elements**, each element is a random number of either 1 or 0
2. Create a while loop, that goes through each element in the array, check if they are 1 or 0
3. Also create a counter variable to keep track of the number of 1 and 0 values in the array
4. If the number of 1s is 5, announce the jackpot prize
5. If the number of 0s is 5, announce the congrat message
6. If the number of 1s is 3 < x < 5, announce smaller prize
7. Create a while loop that will run the above application for an undefinite number of time, and only break out of the loop if the jackpot prize is won. 
8. Create a variable to keep track of many rounds have been played in order to win the jackpot
9. If each round costs 50 cents, run the above program 5 times, either manually or use a while loop to help you, in order to learn the average amount of money you have to spend on winning a jackpot 😄 
10. Increase the random number range to be any number between 0 - 5, run the program on number 9 again to see how much money you would actually have to spend to win a jackpot
11. If the jackpot prize was 30000 EUR, how much profit/loss do you make? */

// Set number of program run and track total spending
let game = 5,
    totalSpending = 0;

// Run program a number of times and add spending per game to total spending
while (game != 0 ) {
    totalSpending += jackpot();
    game--;
}

// Calculate average spending to win jackpot
let averageSpending = totalSpending / game;
console.log(`You need on average ${averageSpending.toFixed(2)} EUR to win the jackpot.`)

// Run the jackpot program and returns total spending
function jackpot () {

    // Track number of rounds until jackpot
    let round = 1;
    
    // Loop until the jackpot prize is won;
    while (true) {
        // Create an array of 5 elements
        let myNumbers = []
        for (let i = 0; i < 5; i++) {
            /* // Generate random number of either 1 or 0
            let randomNum = Math.round(Math.random()); */
            // Generate random number between 0 or 5
            let randomNum = Math.round(Math.random() * 5);
            // Add number to array
            myNumbers.push(randomNum)
        }
        
        // Initialize counters
        let index = 0,
            zeroCounter = 0,
            oneCounter = 0;
        
        // Loop through array
        while (index < 5) {
            if (myNumbers[index] === 0) {
                // When number is 0
                zeroCounter++;
            } else if (myNumbers[index] === 1) {
                // When number is 1
                oneCounter++;
            }
            // Go to next number in the array
            index++
        }
        
        if (oneCounter === 5) {
        // If the number of 1s is 5, announce the jackpot prize
            console.log("Congratulation! You've won the Jackpot of 30,000 EUR!");
        // Stop the loop
            console.log(`It only took ${round} rounds.`)
            break;
        } else if (zeroCounter === 5) {
            // If the number of 0s is 5, announce the congrat message
            console.log(`Congratulation, although you won nothing, chances or getting 5 zeros is ${1 / 2**5}.`);
        } else if (oneCounter === 4) {
        // If the number of 1s is 3 < x < 5 (which is just 4), announce smaller prize
            console.log("Congrats, you did not win the jackpot but you won the smaller prize.");
        }
        // Track next round
        round++;
    }
    
    // Calculate total amount spent if each round costs 50 center
    let spendings = round * 0.5;
    // Check how much profit / loss the user made
    let profit = 30000 - spendings;

    if (profit > 0) {
        // For making a profit
        console.log(`You made a profit of ${profit.toFixed(2)} EUR.`)
    } else if (profit < 0) {
        // For making a loss
        console.log(`You made a loss of ${profit.toFixed(2)} EUR.`)
    } else {
        // For breaking even
        console.log("You made zero profit or loss.")
    }
    // Give out total spending for this game
    return spendings
}



