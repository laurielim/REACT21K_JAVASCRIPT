let circles = document.querySelectorAll(".circle");
let displayScore = document.getElementById("score");
let overlay = document.getElementById("overlay");
let finalScore = document.getElementById("final-score");
let btnClose = document.getElementById("close");
let btnStart = document.getElementById("start");
let btnStop = document.getElementById("stop");
let audioBg = new Audio("./music/bg-easy.mp3");
let audioBadEnd = new Audio("./music/bad-end.mp3");
let audioGoodEnd = new Audio("./music/good-end.mp3");
let audioGreatEnd = new Audio("./music/great-end.mp3");

function startGame() {
  let lastActive, active, endText;
  let score = 20;
  let speed = 1000;
  let timer;
  let counter = 0;
  // Star background music
  audioBg.play();

  // Hide start button
  btnStart.style.display = "none";
  // Make stop button visible
  btnStop.style.display = "block";

  // Activate first circle
  activateCircle();

  function activateCircle() {
    // End game if counter is more than five, else increment counter
    counter > 5 ? showGameOver() : counter++;
    // Get random number between 0 and 3
    active = Math.floor(Math.random() * 4);
    if (lastActive === active) {
      // If last active and new active are the same, increase active by 1 if active is not 3, else set active to 0
      active != 3 ? active++ : (active = 0);
    }

    // If this is not the first time that activateCircle has been called
    if (lastActive != undefined) {
      // Make last circle inactive
      circles[lastActive].classList.toggle("inactive");
    }
    // Make new circle active
    circles[active].classList.toggle("inactive");
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
      score++;
      // Adjust speed to increase difficulty
      if (speed > 250) speed -= 10;
      // Reset counter to 0;
      counter = 0;
      // Update score display
      displayScore.textContent = `${score}`;
    } else {
      // If player clicked the wrong circle, trigger game over
      showGameOver();
    }
  }

  // Add event listener to stop button, if player click "stop", trigger game over
  btnStop.addEventListener("click", showGameOver);

  function showGameOver() {
    // Stop background music
    audioBg.pause();
    // Stop timeout
    clearTimeout(timer);
    // Make overlay visible
    overlay.style.visibility = "visible";
    // Check users score, play ending audio and assign end text
    switch (true) {
      case score < 10:
        audioBadEnd.play();
        endText = "If you don't SPLASH, you won't evolve.";
        break;
      case score > 9 && score < 20:
        audioGoodEnd.play();
        endText = "HARDEN for now, things will get better.";
        break;
      case score > 19:
        audioGreatEnd.play();
        endText = "Never let your EMBER burn out.";
    }

    // Display player's final score
    finalScore.textContent = `Your final score is ${score}.\n${endText}`;
    // Add event listener to close button
    btnClose.addEventListener("click", () => {
      // Reload page
      window.location.reload();
    });
  }
}

// Add event listener to start button
btnStart.addEventListener("click", startGame);
