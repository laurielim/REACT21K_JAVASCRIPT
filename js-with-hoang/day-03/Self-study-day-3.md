## Introduction
For this exercise. You will need to utilize the concept of Array, and While loop.

## Short introduction - Array
Array is a common concept in programming languages that is used for storing related information within a ***list*** where information are ***indexed starting from 0***.
Information storing in a Javascript array can be of the same type, or mixed type

A new array can be declared using one of the following 2 approaches: 
1. `let a = [1,2,3,4]` **square brackets approach**
2. `let b = new Array(1,2,3,4)` **Object Oriented Approach, create a new instance of class Array**

Accessing a stored information within an array can be done with the syntax 
`name-of-the-array[index-of-the-element]`

**example**
`let firstArray = [];` **declare a new empty array, that has no member**
`let secondArray = [1,2,3,4,5];` 
***declare a new array with 5 members, first member (1) is indexed as 0***
That means 
`secondArray[0]` will return 1
`secondArray[1]` will return 2
`secondArray[2]` will return 3
`secondArray[3]` will return 4
`secondArray[4]` will return 5

`let thirdArray = ['one', 2, '3', false];`
That means:
`thirdArray[0]` will return **string** `one`
`thirdArray[1]` will return **number** `2`
`thirdArray[2]` will return **string** `3`
`thirdArray[3]` will return **boolean** `false`

## Short introduction - While loop
While loop could be understood as the **if condition** that got stuck in a loop
Consider the following if statement in `pseudocode`:

`if (currentHour is 10:00) { doSomething }`

The if statement above will perform the `doSomething` task if the evaluation of the condition `currentHour is 10:00` is indeed **true**. The main point here is this code will only get evaluated **once** so unless that expression is run at exactly 10:00, `doSomething` will never happen.

Consider the following example of the `While loop`

`while (currentHour is 10:00) { doSomething }`

The while loop behaves a differently from the if statement so that the evaluation of that condition will be stuck in a loop, it will continuously check if the currentHour is 10:00 **forever** unless, one decides to stop the while loop with a `break` statement once certain condition has been met

`while (currentHour is 10:00) {` 
    `doSomething`
    `if (today is Monday) {` 
        `break; `
    `}` 
`}`

# Here are the reading materials for details:
1. While and do loops
[https://eloquentjavascript.net/02_program_structure.html] Chapter 2: Program structure

2. Arrays
[https://eloquentjavascript.net/04_data.html] Chapter 4: Data structures: Array & Objects

## Practice exercises

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
11. If the jackpot prize was 30000 EUR, how much profit/loss do you make? 

