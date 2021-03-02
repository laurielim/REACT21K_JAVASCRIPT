// Bind DOM elements to variables
let result = document.getElementById("result");
let displayEvent = document.getElementById("event");
let buttonSubmit = document.getElementById("button-submit");
let buttonReset = document.getElementById("reset");
let countdown = document.getElementById("countdown");

/****************************** Bonus step ******************************/
/* let currentYear = new Date();
let holidays;
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
  }); */

// For testing purpose, get array containing the holidays for 2021;
holidays = getHolidays();

/**
 * Calculates number of days between a start date and an end date
 * @param {*} event refresh page on submit
 */
const calcDays = (e) => {
  // Stop refresh
  e.preventDefault();

  /****************************** First & Third step: Calender Days ******************************/
  let startDate, endDate, eventName, displayStart, displayEnd;

  // Get user input
  eventName = document.getElementById("event-name");
  endDate = document.getElementById("end-date").value;
  // If no start date given, make today the start date
  startDate = document.getElementById("start-date").value
    ? new Date(document.getElementById("start-date").value)
    : new Date();

  // Reset hours to compare dates only
  startDate.setHours(0, 0, 0, 0);

  // Check that user input an end date
  if (endDate === "") {
    alert("Please enter End date");
    return;
  } else {
    endDate = new Date(endDate);
  }

  // Check that end date has not passed already
  if (endDate < startDate) {
    alert("End date has already passed");
    return;
  }

  // Check that user input event name
  if (eventName.value === "") {
    alert("Please enter Event name");
    return;
  }

  // Calculate difference between dates
  let diff = endDate - startDate;
  // Convert results which are in miliseconds to days
  let daysDiff = convertMiliseconds(diff, "d");

  /****************************** Second step: Business Days ******************************/

  // Initialize currentDay by making a copy of startDate
  let currentDay = new Date(JSON.parse(JSON.stringify(startDate)));
  // Set to -1 to exclude endDate
  let dayCount = -1;

  while (currentDay < endDate) {
    // If currentDay is not Sunday or Saturday, add 1 to day counter
    if (currentDay.getDay() !== 0 && currentDay.getDay() !== 6) {
      dayCount++;
    }
    // Make currentDay = next day
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Check for number of bank holidays
  let holidayCount = checkForBankHolidays(startDate, endDate, holidays);

  // Convert/Format start day to a string
  displayStart = `${startDate.getDate().toString().padStart(2, "0")}/${(
    startDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${startDate.getFullYear()}`;
  // Convert/Format end day to a string
  displayEnd = `${endDate.getDate().toString().padStart(2, "0")}/${(
    endDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${endDate.getFullYear()}`;

  // Display result on screen
  result.textContent = `${daysDiff} Calender days and ${
    dayCount - holidayCount
  } Business days between ${displayStart} and ${displayEnd}`;

  /****************************** Fourth step: Countdown Timer ******************************/

  // Display original countdown
  let update = new Date();
  // Calculate the new difference
  let newDiff = endDate - update;
  // Convert miliseconds into days, hours, minutes and seconds
  let liveDiff = convertMiliseconds(newDiff);
  // Display/Update result on screen
  countdown.textContent = `
      ${liveDiff["d"].toString()} Days 
      ${liveDiff["h"].toString().padStart(2, "0")} Hours 
      ${liveDiff["m"].toString().padStart(2, "0")} Minutes 
      ${liveDiff["s"].toString().padStart(2, "0")} Seconds`;

  // setInterval after every second
  let timer = setInterval(() => {
    // Get the new time/date
    update = new Date();
    // Calculate the new difference
    newDiff = endDate - update;
    // Convert miliseconds into days, hours, minutes and seconds
    liveDiff = convertMiliseconds(newDiff);
    // Display/Update result on screen
    countdown.textContent = `
      ${liveDiff["d"].toString()} Days 
      ${liveDiff["h"].toString().padStart(2, "0")} Hours 
      ${liveDiff["m"].toString().padStart(2, "0")} Minutes 
      ${liveDiff["s"].toString().padStart(2, "0")} Seconds`;

    // Stop interval once countdown has reached 0
    if (liveDiff <= 0) {
      clearInterval(timer);
    }
    // Set interval for every second
  }, 1000);

  // Add event listener if reset button is clicked to clear interval and display
  buttonReset.addEventListener("click", () => {
    clearInterval(timer);
    clearDisplay();
  });
  // Add event listener if submit button is clicked to clear interval
  buttonSubmit.addEventListener("click", () => {
    clearInterval(timer);
  });

  // Display Event name on Screen
  displayEvent.textContent = `until ${eventName.value}`;
};

// Add event listener to submit button
buttonSubmit.addEventListener("click", calcDays);

/**
 * Reset displays
 */
const clearDisplay = () => {
  countdown.textContent = "0 days 00 hours 00 minutes 00 seconds";
  displayEvent.textContent = "";
  result.textContent = "";
};

/**
 * Given 2 dates, returns the number of holidays between the 2 dates
 * @param {Date} start
 * @param {Date} end
 * @param {Array} holidays array of objects detailing holiday information
 * @return {Number}
 */
const checkForBankHolidays = (start, end, holidays) => {
  let holidayCounter = 0;
  let bankHolidays = holidays.filter((holiday) =>
    holiday.type.indexOf("National holiday" !== -1)
  );
  let holidayDate = bankHolidays.map((holiday) => {
    return new Date(holiday.date.iso);
  });
  // Iterate through the current year's holiday
  for (date of holidayDate) {
    if (
      // Add holiday to counter if it is between the given start and end dates
      date > start &&
      date < end &&
      // and if it is not a saturday or sunday
      date.getDay() !== 0 &&
      date.getDay() !== 6
    ) {
      holidayCounter++;
    }
    if (date > end) {
      // To avoid going through all holidays, break once end date has been passed
      break;
    }
  }
  return holidayCounter;
};

// Function from https://gist.github.com/flangofas/714f401b63a1c3d84aaa
/**
 * Format miliseconds into seconds, minutes, hours and days
 * @param {Number} miliseconds a number of miliseconds
 * @param {String} format "s" - second, "m" - minutes, "h" - hours, "d" - days, empty - all four
 * @return {Number or Object}
 */
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

/**
 * @return array of objects with holiday info for Finland in 2021
 */
const getHolidays = () => {
  return [
    {
      name: "New Year's Day",
      date: { iso: "2021-01-01", datetime: { year: 2021, month: 1, day: 1 } },
      type: ["National holiday"],
    },
    {
      name: "Epiphany",
      date: { iso: "2021-01-06", datetime: { year: 2021, month: 1, day: 6 } },
      type: ["National holiday"],
    },
    {
      name: "Good Friday",
      date: { iso: "2021-04-02", datetime: { year: 2021, month: 4, day: 2 } },
      type: ["National holiday"],
    },
    {
      name: "Easter Monday",
      date: { iso: "2021-04-05", datetime: { year: 2021, month: 4, day: 5 } },
      type: ["National holiday"],
    },
    {
      name: "May Day",
      date: { iso: "2021-05-01", datetime: { year: 2021, month: 5, day: 1 } },
      type: ["National holiday"],
    },
    {
      name: "Ascension Day",
      date: { iso: "2021-05-13", datetime: { year: 2021, month: 5, day: 13 } },
      type: ["National holiday"],
    },
    {
      name: "Midsummer Eve",
      date: { iso: "2021-06-25", datetime: { year: 2021, month: 6, day: 25 } },
      type: ["National holiday"],
    },
    {
      name: "Midsummer",
      date: { iso: "2021-06-26", datetime: { year: 2021, month: 6, day: 26 } },
      type: ["National holiday"],
    },
    {
      name: "All Saints' Day",
      date: { iso: "2021-11-06", datetime: { year: 2021, month: 11, day: 6 } },
      type: ["National holiday"],
    },
    {
      name: "Independence Day",
      date: { iso: "2021-12-06", datetime: { year: 2021, month: 12, day: 6 } },
      type: ["National holiday"],
    },
    {
      name: "Christmas Eve",
      date: { iso: "2021-12-24", datetime: { year: 2021, month: 12, day: 24 } },
      type: ["National holiday", "Christian"],
    },
    {
      name: "Christmas Day",
      date: { iso: "2021-12-25", datetime: { year: 2021, month: 12, day: 25 } },
      type: ["National holiday"],
    },
    {
      name: "Boxing Day",
      date: { iso: "2021-12-26", datetime: { year: 2021, month: 12, day: 26 } },
      type: ["National holiday"],
    },
  ];
};
