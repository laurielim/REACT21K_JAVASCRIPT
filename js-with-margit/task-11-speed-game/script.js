let circles = document.querySelectorAll(".circle");
let displayScore = document.getElementById("score");
let overlay = document.getElementById("overlay");
let finalScore = document.getElementById("final-score");
let btnClose = document.getElementById("close");
let btnStart = document.getElementById("start");
let btnStop = document.getElementById("stop");
// Requested feature
let goat = new Audio("https://www.fesliyanstudios.com/play-mp3/6535");

function startGame() {
  let lastActive, active;
  let score = 0;
  let speed = 1000;
  let timer;

  // Disable start button once game has started
  btnStart.disabled = true;

  // Activate first circle
  activateCircle();

  function activateCircle() {
    // Get random number between 0 and 3
    active = Math.floor(Math.random() * 4);
    if (lastActive === active) {
      // If last active and new active are the same, increase active by 1 if active is not 3, else set active to 0
      active != 3 ? active++ : (active = 0);
    }

    // If this is not the first time that activateCircle has been called
    if (lastActive != undefined) {
      // Make last circle inactive
      circles[lastActive].classList.remove("active");
    }
    // Make new circle active
    circles[active].classList.add("active");
    // Update last active

    lastActive = active;

    // Activate new circle
    timer = setTimeout(() => {
      activateCircle();
    }, speed);
  }

  // Add event listener to each circle
  circles.forEach((circle) => {
    circle.addEventListener("click", checkClicked);
  });

  function checkClicked() {
    // Check that the value of circle is the same as active
    if (this.value == active) {
      goat.play();
      score++;
      // Update score display
      displayScore.textContent = `${score}`;
    } else {
      // If player clicked the wrong circle, trigger game over
      showGameOver();
    }
    // Adjust speed to increase difficulty
    if (speed > 250) speed -= 10;
  }

  // Add event listener to stop button, if player click "stop", trigger game over
  btnStop.addEventListener("click", showGameOver);

  function showGameOver() {
    // Stop timeout
    clearTimeout(timer);
    // Make overlay visible
    overlay.style.visibility = "visible";
    // Display player's final score
    finalScore.textContent = `Your final score is ${score}`;
    // Add event listener to close button
    btnClose.addEventListener("click", () => {
      // Reload page
      window.location.reload();
    });
  }
}

// Add event listener to start button
btnStart.addEventListener("click", startGame);
