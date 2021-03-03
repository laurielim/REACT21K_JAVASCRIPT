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
// Initialize variable to record result of calculation;
let total = 0;
// Initialize variable to track last user input
let lastUserInput = "";
// Initialize variable to track calculation
let userCalc = "";

/******************** Numbers ********************/

// Add event listeners for numbers div and et user number input
btnNumbers.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (lastUserInput === "operator") {
      // Reset current number
      currentNumber = "";
    } else if (lastUserInput === "equal") {
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
      currentNumber += userInput;
      // Update display with current number
      updateDisplay(currentNumber);
      // Update user input tracker
      lastUserInput = "number";
    }
  });
});

/******************** Operators ********************/

// Add event listeners for operators div and get user operator input
btnOperators.forEach((btn) => {
  btn.addEventListener("click", function () {
    // If this is the first input
    if (lastUserInput === "") {
      // Stored number is 0
      storedNumber = 0;
      // Record the new operator input
      currentOperator = this.textContent;
      // Add operation to calculation tracker
      userCalc += `${storedNumber}${currentOperator}`;
      // If last user input was a number
    } else if (lastUserInput === "number") {
      // If this is the first calculation
      if (storedNumber === "") {
        storedNumber = currentNumber;
      } else {
        // Compute total if there is a number that is stored
        computeNumbers();
        // Update display
        updateDisplay(total);
      }
      // Record the new operator input
      currentOperator = this.textContent;
      // Add operation to calculation tracker
      userCalc += `${currentNumber}${currentOperator}`;
      // If last user input was an operator
    } else if (lastUserInput === "operator") {
      // Record the new operator input
      currentOperator = this.textContent;
      // If last user input is an operator, change the operator in calculation tracker
      userCalc = userCalc.slice(0, userCalc.length - 1) + currentOperator;
    } else if (lastUserInput === "equal") {
      // Record the new operator input
      currentOperator = this.textContent;
      // Add new operation to calculation tracker
      userCalc = `${storedNumber}${currentOperator}`;
    }
    // Update calc display with user calculation
    updateCalcDisplay(userCalc);

    // Update user input tracker
    lastUserInput = "operator";
  });
});

/******************** Equal Btn ********************/

// Add event listener for the equal button
btnEqual.addEventListener("click", function () {
  // Compute numbers if last input was number
  if (lastUserInput === "number" || lastUserInput === "operator") {
    //  Add current number to calculation tracker
    userCalc += `${currentNumber}=`;
  } else if (lastUserInput === "equal") {
    if (currentOperator !== "") {
      // If current operator is not emptydd new operation to calculation tracker
      userCalc = `${storedNumber}${currentOperator}${currentNumber}=`;
    }
  }
  // Compute total
  computeNumbers();
  // Update display will calculated total
  updateDisplay(total);
  // Update calc display with user calcuation
  updateCalcDisplay(userCalc);

  // Update user input tracker
  lastUserInput = "equal";
});

/******************** Clear Btn ********************/

// Add event listener for the clear button which resets everything
btnClear.addEventListener("click", resetCalc);

/******************** Functions ********************/

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
  if (!currentOperator || !storedNumber) {
    // If there is no stored number or operator, total is currentNumber
    total = currentNumber;
  } else {
    // Otherwise, calculate total;
    total = calculate(
      parseFloat(storedNumber),
      currentOperator,
      parseFloat(currentNumber)
    );
  }
  storedNumber = total;
}

/**
 * Updates calculator display with given number
 * @param {String} number number to show user
 * @return {void}
 */
function updateDisplay(number) {
  display.textContent = number;
}

function updateCalcDisplay(text) {
  displayCalc.textContent = text;
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
  userCalc = "";
  lastUserInput = "";
  clearNumbers();
  clearOperator();
}

/******************** Bonus ********************/

// Trigger click event if a key is pressed on keyboard
document.body.addEventListener("keypress", (event) => {
  switch (event.keyCode) {
    case 13:
      btnEqual.click();
      break;
    case 42:
      btnOperators[2].click();
      break;
    case 43:
      btnOperators[0].click();
      break;
    case 44:
      btnNumbers[10].click();
      break;
    case 45:
      btnOperators[1].click();
      break;
    case 46:
      btnNumbers[10].click();
      break;
    case 47:
      btnOperators[3].click();
      break;
    case 48:
      btnNumbers[9].click();
      break;
    case 49:
      btnNumbers[6].click();
      break;
    case 50:
      btnNumbers[7].click();
      break;
    case 51:
      btnNumbers[8].click();
      break;
    case 52:
      btnNumbers[3].click();
      break;
    case 53:
      btnNumbers[4].click();
      break;
    case 54:
      btnNumbers[5].click();
      break;
    case 55:
      btnNumbers[0].click();
      break;
    case 56:
      btnNumbers[1].click();
      break;
    case 57:
      btnNumbers[2].click();
      break;
    case 99:
      btnClear.click();
      break;
  }
});
