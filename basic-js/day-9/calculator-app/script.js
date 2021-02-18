// Initialize variables for all buttons of calculator
let btnNumbers = document.querySelectorAll(".numbers > div:not(#clear)");
let btnOperators = document.querySelectorAll(".operators > div");
let btnEqual = document.getElementById("result");
let btnClear = document.getElementById("clear");
// Initialize variable for calculator display
let display = document.getElementById("input");

// Initialize variable to record current number and operator;
let currentNumber = "";
let currentOperator = "";
// Initialize variable to record calculation;
let total = 0;
// Initialize a switch for when a number need to be calculated
let shouldCompute = false;
let wasComputed = true;

// Add event listeners for numbers div and et user number input
btnNumbers.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Compute numbers if an operator has previously selected
    if (shouldCompute) {
      // Call fn that handles all calculations
      computeNumbers();
      // Turn off switch
      shouldCompute = false;
      // Reset current number for new input
      currentNumber = "";
    }

    // Get user input
    let userInput = this.textContent;
    // Checks if there is already a decimal
    if (userInput === "." && currentNumber.indexOf(userInput) !== -1) {
      return;
    } else {
      // Add input to current number
      currentNumber = recordInput(currentNumber, userInput);
      // Update display with current number
      updateDisplay(currentNumber);
    }
  });
});

// Add event listeners for operators div and get user operator input
btnOperators.forEach((btn) => {
  btn.addEventListener("click", function () {
    // If this is the first operator, pass current number on to total
    if (currentOperator === "" && currentNumber !== "") {
      total = parseFloat(currentNumber);
    }
    // Record the new operator input
    currentOperator = this.textContent;
    // Turn on switch
    shouldCompute = true;
  });
});

// Add event listener for the equal button
btnEqual.addEventListener("click", function () {
  // Call fn that handles all calculations
  updateDisplay(total);
});

// Add event listener for the clear button which resets everything
btnClear.addEventListener("click", () => {
  clearNumbers();
  clearDisplay();
  clearOperator();
});

/**
 * This functions handles the calculations of the calculator
 */
function computeNumbers() {
  // Stop user from dividing by zero
  if (currentOperator === "÷" && currentNumber === "0") {
    // Inform user of error
    clearDisplay();
    display.textContent = "Cannot divide by 0";
    // Reset all variables
    clearNumbers();
    clearOperator();
    return;
  }
  // Assume current number is 0 if user did not input anything yet
  currentNumber === "" ? (currentNumber = 0) : "";
  // If user has made a previous operator input, update total
  console.log(total, currentOperator, currentNumber);
  total = calculate(total, currentOperator, parseFloat(currentNumber));
  console.log("hola");
}

/**
 * Concatenate 2 given strings
 * @param {String} existingInput the input in currentNumber
 * @param {String} newInput the new user input
 * @return {String} combined strings
 */
function recordInput(existingInput, newInput) {
  return existingInput + newInput;
}

/**
 * Add, subtrack, multiply, divide number one with number two
 * @param {Number} numOne first number
 * @param {String} operator operation to carry out
 * @param {Number} numTwo second number
 * @return {Number} total of numOne and numTwo
 */
function calculate(numOne, operator, numTwo) {
  switch (operator) {
    case "+":
      numOne += numTwo;
      break;
    case "-":
      numOne -= numTwo;
      break;
    case "×":
      numOne *= numTwo;
      break;
    case "÷":
      numOne /= numTwo;
      break;
  }
  return numOne;
}

/**
 * Updates calculator display with given number
 * @param {String} number number to show user
 * @return {void}
 */
function updateDisplay(number) {
  display.textContent = number;
}
/**
 * Reset all number variables
 * @return {void}
 */
function clearNumbers() {
  currentNumber = "";
  total = 0;
}
/**
 * Reset the clearOperator variable
 * @return {void}
 */
function clearOperator() {
  currentOperator = "";
}
/**
 * Reset display
 * @return {void}
 */
function clearDisplay() {
  display.textContent = "0";
}

// Trigger click event if a number is pressed on keyboard
document.body.addEventListener("keypress", (event) => {
  switch (event.keyCode) {
    case 49:
      btnNumbers[6].click();
      break;
    case 50:
      btnNumbers[7].click();
      break;
    case 51:
      btnNumbers[8].click();
      break;
  }
});
