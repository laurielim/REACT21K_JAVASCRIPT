// Initialize variables for all buttons of calculator
let btnNumbers = document.querySelectorAll(".numbers > div:not(#clear)");
let btnOperators = document.querySelectorAll(".operators > div");
let btnEqual = document.getElementById("result");
let btnClear = document.getElementById("clear");
// Initialize variable for calculator display
let display = document.getElementById("input");
let displayCalc = document.getElementById("calculation");

// Initialize variable to record current number and operator;
let currentNumber = "";
let storedNumber = "";
let currentOperator = "";
// Initialize variable to record calculation;
let total = 0;
// Initialize a variable to track user input
let lastUserInput = "";

// Add event listeners for numbers div and et user number input
btnNumbers.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Compute numbers if an operator has previously selected
    if (lastUserInput === "operator") {
      // Call fn that handles all calculations
      computeNumbers();
      // Reset current number for new input
      currentNumber = "";
    }

    if (lastUserInput === "equal") {
      // Reset current number for new input
      resetCalc();
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
      // Update user input tracker
      lastUserInput = "number";
    }
  });
});

// Add event listeners for operators div and get user operator input
btnOperators.forEach((btn) => {
  btn.addEventListener("click", function () {
    /*  // If this is the first operator, pass current number on to total
    if (currentOperator === "" && currentNumber !== "") {
      storedNumber = parseFloat(currentNumber);
    }

    if (lastUserInput === "equal") {
      currentNumber = total;
    } */
    storedNumber = currentNumber;

    // Record the new operator input
    currentOperator = this.textContent;
    // Indicate that this was the last user input
    lastUserInput = "operator";
  });
});

// Add event listener for the equal button
btnEqual.addEventListener("click", function () {
  // Compute numbers if last input was number or the equal sign
  if (lastUserInput === "equal") {
    computeNumbers();
  }
  // Update display will calculated total
  updateDisplay(total);
  // Update user input tracker
  lastUserInput = "equal";
});

// Add event listener for the clear button which resets everything
btnClear.addEventListener("click", resetCalc);

/**
 * This functions handles the arithmetics of the calculator
 */
function computeNumbers() {
  // Stop user from dividing by zero
  if (currentOperator === "÷" && currentNumber === "0") {
    // Inform user of error
    display.textContent = "Cannot divide by 0";
    // Reset all variables
    resetCalc();
    return;
  }
  // Assume current number is 0 if user did not input anything yet
  currentNumber === "" ? (currentNumber = 0) : "";
  // If user has made a previous operator input, update total
  console.log(storedNumber, currentOperator, currentNumber);
  total = calculate(
    parseFloat(storedNumber),
    currentOperator,
    parseFloat(currentNumber)
  );
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
  storedNumber = "";
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
 * Reset calculator
 * @return {void}
 */
function resetCalc() {
  display.textContent = "0";
  displayCalc.textContent = "";
  lastUserInput = "";
  clearNumbers();
  clearOperator();
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
