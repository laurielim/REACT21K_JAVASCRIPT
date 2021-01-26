function statuscalc() {
    let userAge = document.getElementById("age").value;
    if (userAge < 18) {
        answer.textContent = "You're too young.";
    } else if ( userAge < 27) {
        answer.textContent = "Right age for military service.";
    } else if ( userAge < 41) {
        answer.textContent = "You are in reserve.";
    } else if ( userAge < 55) {
        answer.textContent = "You are in backup reserve.";
    } else {
        answer.textContent = "You are too old for the military.";
    }
}