function calcBMI () {
    // Get user input
    let height = Number(document.querySelector("#height").value);
    let mass = Number(document.querySelector("#mass").value);

    // Compute user BMI
    let userBMI = bmi(height, mass);

    // Initialize variable to print
    let text = `Your BMI is ${userBMI}, you are `;

    // Add text to variable depending on BMI
    switch (true) {
        case (userBMI < 18.5):
            text += "underweight.";
            break;
        case (userBMI < 25):
            text += "a healthy weight.";
            break;
        case (userBMI < 30):
            text += "overweight.";
            break;
        default:
            text += "obese."
            break;
    }
    // Print text
    answer.textContent = text;
}

// Calculates user BMI
const bmi = (h, m) => (m / (h / 100)**2).toFixed(1);