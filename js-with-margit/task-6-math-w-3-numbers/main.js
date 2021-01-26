function math() {
    // Get user numbers
    let numOne = Number(document.querySelector("#number1").value);
    let numTwo = Number(document.querySelector("#number2").value);
    let numThree = Number(document.querySelector("#number3").value);  
    
    //Initialize variable for final output
    let text;
    // Determine how many numbers are positive
    let total = isPositive(numOne) + isPositive(numTwo) + isPositive(numThree);

    if (total > 0) {
        // When at least 1 positive number
        text = "Sum of the three numbers is " + sum(numOne,numTwo,numThree);
        if (total === 3) {
            // When all numbers are positive
            text += " and their Multiplication is " + multiply(numOne,numTwo,numThree); 
        }
    } else {
        // When all numbers are negative
        text = "Only negatives";
    }
    // Print out result
    answer.textContent = text;
}

// Determine if a number is positive or not
const isPositive = (num) => num >= 0 ? 1 : 0;
// Calculate sum of 3 numbers
const sum = (a,b,c) => a + b + c;
// Multiply 3 numbers with each other
const multiply = (a,b,c) => a * b * c;