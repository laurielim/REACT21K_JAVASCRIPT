let startDate, endDate, eventName, holidays;
let result = document.getElementById("result");
let buttonSubmit = document.getElementById("button-submit");
let countdown = document.getElementById("countdown");

/*************** Bonus step ***************/
let currentYear = new Date();
currentYear = currentYear.getFullYear();
// Get bank holiday information from https://calendarific.com
const api = `https://calendarific.com/api/v2/holidays?&api_key=775f045d9091420ca9a7ede8070aa6f9e38a011c&country=FI&year=${currentYear}`;

// Use api following tutorial by Dev Ed https://www.youtube.com/watch?v=wPElVpR1rwA
fetch(api)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    holidays = data.response.holidays;
    console.log(holidays);
  });

/**
 * Calculates number of days between today and an end date
 * @param {*} event refresh page on submit
 */
const calcDays = (event) => {
  // Stop refresh
  event.preventDefault();

  /*************** First & Third step ***************/

  // Get user input
  eventName = document.getElementById("event-name");
  endDate = new Date(document.getElementById("end-date").value);
  // If no start date given, make today the start date
  startDate = document.getElementById("start-date").value
    ? new Date(document.getElementById("start-date").value)
    : new Date();
  // Calculate difference between dates
  let diff = endDate - startDate;
  // Convert results which are in miliseconds to days
  let daysDiff = convertMiliseconds(diff, "d");

  /*************** Second step ***************/

  // Initialize currentDay and day counter
  let currentDay = new Date(JSON.parse(JSON.stringify(startDate)));
  // Set to -1 to exclude endDate
  let dayCount = 0;

  while (currentDay < endDate) {
    // Make currentDay = next day
    currentDay.setDate(currentDay.getDate() + 1);
    // If currentDay is not Sunday or Saturday, add 1 to day counter
    if (currentDay.getDay() !== 0 && currentDay.getDay() !== 6) {
      dayCount++;
    }
  }

  let holidayCount = checkForHolidays(startDate, endDate);

  // Display result on screen
  result.textContent = `${daysDiff} days and ${
    dayCount - holidayCount
  } Business days until ${eventName.value}`;

  /*************** Fourth step ***************/
  // setInterval after every second
  let timer = setInterval(() => {
    // Get the new time/date
    let update = new Date();
    // Calculate the new difference
    let newDiff = endDate - update;
    // Convert miliseconds into days, hours, minutes and seconds
    let liveDiff = convertMiliseconds(newDiff);
    // Display/Update result on screen
    countdown.textContent = `
      ${liveDiff["d"].toString().padStart(2, "0")} days 
      ${liveDiff["h"].toString().padStart(2, "0")} hours 
      ${liveDiff["m"].toString().padStart(2, "0")} minutes 
      ${liveDiff["s"].toString().padStart(2, "0")} seconds `;

    // Stop interval once countdown has reached 0
    if (liveDiff <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

buttonSubmit.addEventListener("click", calcDays);

const checkForHolidays = (start, end) => {
  let holidayCounter = 0;
  let holidayDate = holidays.map((holiday) => {
    return new Date(holiday.date.iso);
  });

  console.log(start);
  console.log(end);

  for (date of holidayDate) {
    console.log(date);
    if (
      date > start &&
      date < end &&
      date.getDay() !== 0 &&
      date.getDay() !== 6
    ) {
      console.log(holidayCounter);
      holidayCounter++;
    }
  }
  console.log(holidayCounter);
  return holidayCounter;
};

// Function from https://gist.github.com/flangofas/714f401b63a1c3d84aaa

function convertMiliseconds(miliseconds, format) {
  let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  switch (format) {
    case "s":
      return total_seconds;
    case "m":
      return total_minutes;
    case "h":
      return total_hours;
    case "d":
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
}
