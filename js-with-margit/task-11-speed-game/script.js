let circles = document.querySelectorAll(".circle");
let displayScore = document.getElementById("score");
let displayHighscore = document.getElementById("highscore");
let overlay = document.getElementById("overlay");
let finalScore = document.getElementById("final-score");
let btnClose = document.getElementById("close");
let btnStart = document.getElementById("start");
let btnStop = document.getElementById("stop");
let audioBg, audioEnd;
let audioBgEasy = new Audio("./music/bg-easy.mp3");
let audioBgMedium = new Audio("./music/bg-medium.mp3");
let audioBgHard = new Audio("./music/bg-hard.mp3");
let audioBadEnd = new Audio("./music/bad-end.mp3");
let audioGoodEnd = new Audio("./music/good-end.mp3");
let audioGreatEnd = new Audio("./music/great-end.mp3");
let audioClick = new Audio("./music/click.mp3");

let sessionStorage = window.sessionStorage;
// Get highscore from session storage
let highscore = sessionStorage.getItem("highscore")
  ? parseInt(sessionStorage.getItem("highscore"))
  : 0;
// Display highscore
displayHighscore.textContent = highscore;

// Get sound option from session storage, unless sound is set to false, set sound on
let soundOn = sessionStorage.getItem("sound") == "false" ? false : true;

let btnSoundOn = document.getElementById("soundOn");
let btnSoundOff = document.getElementById("soundOff");

// Display volume icon matching soundOn
if (soundOn) {
  // Show sound on btn
  btnSoundOn.style.display = "block";
} else {
  // Show sound off btn
  btnSoundOff.style.display = "block";
}

// If sound is on...
btnSoundOn.addEventListener("click", () => {
  // Set sound on to false
  soundOn = false;
  // Pause bg music if playing
  if (audioBg) audioBg.pause();
  // Hide sound on btn
  btnSoundOn.style.display = "none";
  // Show sound off btn
  btnSoundOff.style.display = "block";
});

// If sound if off...
btnSoundOff.addEventListener("click", () => {
  soundOn = true;
  // Resume bg music if paused
  let audioClick = new Audio("./music/click.mp3");
  audioBg ? audioBg.play() : audioClick.play();
  // Show sound on btn
  btnSoundOn.style.display = "block";
  // Hide sound off btn
  btnSoundOff.style.display = "none";
});

let levels = document.querySelectorAll("input[type=radio]");

// Play click sound whenever level is changed if sound is on
levels.forEach((level) => {
  level.addEventListener("change", () => {
    if (soundOn) audioClick.play();
  });
});

function startGame() {
  let lastActive, active, endText, speed, minSpeed, maxSkip, speedUp, timer;
  let score = 0;
  let counter = 0;

  // Check level setting
  document.querySelectorAll("input[type=radio]").forEach((level) => {
    if (level.checked == true) levelSet = level.value;
  });

  // Set speed, minSpeed, maxSkip, bg music
  switch (levelSet) {
    case "0":
      speed = 1000;
      minSpeed = 250;
      maxSkip = 5;
      speedUp = 10;
      audioBg = audioBgEasy;
      break;
    case "1":
      speed = 1000;
      minSpeed = 200;
      maxSkip = 3;
      speedUp = 15;
      audioBg = audioBgMedium;
      break;
    case "2":
      speed = 900;
      minSpeed = 150;
      maxSkip = 0;
      speedUp = 20;
      audioBg = audioBgHard;
      break;
  }

  // Start background music if sound is on
  if (soundOn) audioBg.play();

  // Hide start button
  btnStart.style.display = "none";
  // Make stop button visible
  btnStop.style.display = "block";

  // Activate first circle
  activateCircle();

  function activateCircle() {
    // End game if counter is more than five, else increment counter
    counter > maxSkip ? showGameOver() : counter++;
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
      if (speed > minSpeed) speed -= speedUp;
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
    // Check users score, set ending audio and assign end text
    switch (true) {
      case score < 10:
        audioEnd = audioBadEnd;
        endText = "If you don't SPLASH, you won't evolve.";
        break;
      case score > 9 && score < 20:
        audioEnd = audioGoodEnd;
        endText = "HARDEN for now, things will get better.";
        break;
      case score > 19:
        audioEnd = audioGreatEnd;
        endText = "Never let your EMBER burn out.";
    }

    // Play ending audio if sound is on
    if (soundOn) audioEnd.play();

    // Display player's final score
    finalScore.textContent = `Your final score is ${score}. ${endText}`;
    // Add event listener to close button
    btnClose.addEventListener("click", () => {
      // Store sound setting
      sessionStorage.setItem("sound", `${soundOn}`);
      // Store score if it's greater than current highscore
      if (score > highscore) sessionStorage.setItem("highscore", `${score}`);
      // Reload page
      window.location.reload();
    });
  }
}

// Add event listener to start button
btnStart.addEventListener("click", startGame);

// Toggle levels setting on click
document
  .getElementById("btnSettings")
  .addEventListener("click", () =>
    document.querySelector(".levels-setting").classList.toggle("responsive")
  );
