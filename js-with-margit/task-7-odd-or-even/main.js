function oddOrEven () {
    // Get user number
    let userNum = Number(document.getElementById("userNum").value);

    if (isPositive(userNum)) {
        // When number is positive, check if number is divisible by 2
        (userNum % 2 === 0)
        ? answer.textContent = "That's an even number."
        : answer.textContent = "That's an odd number.";
    } else {
        // When number is 0 or negative
        answer.textContent = "Please follow instructions."
    }
}

// Determine if a number is positive or not
const isPositive = (num) => num > 0 ? 1 : 0;