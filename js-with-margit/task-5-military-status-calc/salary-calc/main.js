function calculate () {
    // Get user input
    let salaryPerHour = Number(document.getElementById("salaryPerHour").value);
    let dailyHours = Number(document.getElementById("dailyHours").value);

    // Initialize variable for total salary
    let totalSalary = 0;

    if (dailyHours <= 7) {
        // When user works 7 hours at most
        totalSalary += salaryPerHour * dailyHours;
    } else {
        // Calculate salary first 7 hours
        totalSalary += salaryPerHour *  7;
        // Calculate extra hours worked
        let extraHours = dailyHours - 7;
        if (extraHours <= 2) {
            // When user works 2 extra hours at most
            totalSalary += salaryPerHour * extraHours * 1.5;
        } else {
            // Calculate salary for first 2 extra hours
            totalSalary += salaryPerHour * 2 * 1.5;
            // Calculate salary for remaining hours
            let remainingHours = extraHours - 2;
            totalSalary += salaryPerHour * remainingHours * 2;
        }
    }
    answer.textContent = `Your daily salary is ${totalSalary} EUR.`
}