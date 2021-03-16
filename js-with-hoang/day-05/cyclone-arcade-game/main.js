// 1.Create a number of bulbs and store them in an array
// 2.Turn them all off by default
// 3.Select the first one to turn on
// 4.Switch off the previous one and turn on the next bulb after a specified time interval
// 5.When reaching the end of the array, start again from the first bulb
// 6.Add a button to stop the interval upon click
// 7.Style the bulbs in a circle with the given stylesheet and Javascript snippet
// 8.Bonus points:
// Adjustable time interval (with a slider input maybe?)
// Adjustable number of Bulbs

/**        START OF EXTRA CODE TO STYLE BULBS        */
/**
 * You don't have to care about this fn unless you want to
 * @param {NodeList} nodes the list of elements to be arranged in a circle
 * @return {void}
 */
const arrangeBulbsInACircle = (nodes) => {
  const radius = "12em",
    start = -90,
    $els = [...nodes], // turn nodelist into a real array
    numberOfEls = $els.length,
    slice = 360 / numberOfEls,
    index = 0;

  $els.forEach((el, index) => {
    const rotate = slice * index + start;
    const rotateReverse = rotate * -1;

    el.style.transform = `rotate(${rotate}deg) translate(${radius}) rotate(${rotateReverse}deg)`;
  });
};
/**        END OF EXTRA CODE           */

// Game code
const cycloneArcade = () => {
  // Prevent start button from being pressed again
  document.getElementById("start-btn").disabled = true;
  // Allow user to press the stop button
  document.getElementById("stop-btn").disabled = false;

  // Get user input
  const NUMBER_OF_BULBS = document.querySelector("#bulb-num").value;
  const BLINKING_SPEED = document.querySelector("#blink-speed").value;
  // Randomly select winning bulb
  const CHOSEN_BULB_INDEX = Math.round(Math.random() * NUMBER_OF_BULBS);

  let counter = 0;
  let bulbContainer = document.querySelector("#bulbs");

  // Create bulbs
  while (counter < NUMBER_OF_BULBS) {
    // Create a bulb
    const newBulb = document.createElement("div");
    // Assign class bulb to newly created div
    newBulb.className = "bulb";
    // Add bulb to bulbs div
    bulbContainer.appendChild(newBulb);
    // Move on to next bulb
    counter++;
  }

  // Assign list of bulbs to a variable
  const bulbs = document.querySelectorAll(".bulb");
  // invoke the fn on the class bulb elements to create the effect
  arrangeBulbsInACircle(bulbs);
  // Select chosen bulb
  bulbs[CHOSEN_BULB_INDEX].classList.add("chosen");
  // Reset counter
  counter = 0;
  //Switch on first bulb
  bulbs[counter].classList.add("active");

  const startInterval = setInterval(() => {
    // switch off the current bulb
    bulbs[counter].classList.remove("active");

    // Go to next bulb until last bulb index is reached then reset counter
    counter < NUMBER_OF_BULBS - 1 ? counter++ : (counter = 0);

    // Switch on current bulb
    bulbs[counter].classList.add("active");
  }, BLINKING_SPEED);

  const stopInterval = () => {
    // Stops blinking
    clearInterval(startInterval);

    // Announce results if current bulb has both class chosen and active
    // Alternative solutions as seen in class:
    // if (document.querySlector(".chosen.active") {
    // if ( counter === CHOSEN_BULB_INDEX) {
    if (bulbs[counter].classList.value == "bulb chosen active") {
      alert("Congratulation, you won!");
    } else {
      alert("Sorry, you lose!");
    }
    location.reload();
  };

  // Stop interval when stop button is pressed
  document.getElementById("stop-btn").addEventListener("click", stopInterval);
};

// Start game code when start button is pressed
document.getElementById("start-btn").addEventListener("click", cycloneArcade);
