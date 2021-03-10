/**
 * In this lesson you are expected to study the technical documentation of the the OpenWeatherMap API, and create an application that will allow users to enter a city name where they would like to query weather information for, then application will then construct the API call, and display to the user temperature information in Celcius. This API will require an API Key to work, and you will need to look around the documentation for instruction of how to acquire such key. Have fun coding!
 */

(function () {
  // Wait for user to press submit button
  document.querySelector("button").addEventListener("click", function (event) {
    // Stop page from refreshing
    event.preventDefault();
    executeScript();
  });

  function executeScript() {
    // Get user input
    let cityName = document.getElementById("city").value;
    // If user did not input anything
    if (!cityName) {
      // Ask user to add input
      alert("Please enter a city name");
      // Exit function
      return;
    }
    // Make API call to OpenWeather
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.API_TOKEN}&units=metric`
    )
      .then((response) => {
        // Check if city exist in database
        if (response.ok) {
          // Parse JSON
          return response.json();
        } else {
          // Reject fetch promise if no city found
          return Promise.reject("City not Found. Please check spelling.");
        }
      })
      // retrieve temperature data and pass it into showTemperature fn
      .then((data) => showTemperature(data.main.temp, cityName))
      // Inform user that city wasn't found
      .catch((err) => alert(err));
  }

  function showTemperature(temp, cityName) {
    // Round temperature number
    temp = Math.ceil(temp);
    // Update text inside result
    document.getElementById(
      "result"
    ).textContent = `It is currently ${temp}°C in ${cityName}`;
  }
})();
