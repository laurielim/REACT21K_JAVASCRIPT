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

    console.log(cityName);
  }
})();
