// Array of registered cars
let registeredCars = [];

let registerForm = document.querySelector("#register-form");
let searchForm = document.querySelector("#search-form");

// Car object constructor
function Car(license, owner, make, model, price, color) {
  this.license = license;
  this.owner = owner;
  this.make = make;
  this.model = model;
  this.price = price;
  this.color = color;
  this.discount = function () {
    if (this.price > 20000) {
      return this.price * 0.75;
    } else if (this.price < 5000) {
      return this.price * 0.9;
    } else {
      return this.price * 0.85;
    }
  };
}

// Function to check if license plate is registered
const checkLicense = (license) => {
  // Get number of cars registered
  let carNum = registeredCars.length;
  if (carNum) {
    // Track if license was found
    let isFound = false;
    // Go through array, checking license plates
    for (let i = 0; i < carNum; i++) {
      // if license plate is found, set isFound to true and exit for loop
      if (registeredCars[i].license === license) {
        isFound = true;
        break;
      }
    }
    return isFound;
  } else {
    // If there is no cars in the array yet, return false
    return false;
  }
};

// Function to register car
const registerCar = (event) => {
  // Prevent page from refreshing
  event.preventDefault();
  // Get user input for license
  let license = document.querySelector("#register-license");
  // Check if license is already registered
  if (!checkLicense(license.value)) {
    // Get remaining user input
    let owner = document.querySelector("#owner"),
      make = document.querySelector("#make"),
      model = document.querySelector("#model"),
      price = document.querySelector("#price"),
      color = document.querySelector("#color");

    // Create new car object
    let newCar = new Car(
      license.value,
      owner.value,
      make.value,
      model.value,
      price.value,
      color.value
    );

    // Add new car object to registered array
    registeredCars.push(newCar);
    // Display registered cars in a table
    console.table(registeredCars);
    // Inform user that
    alert("Car Registered");
    // Reset form
    registerForm.reset();
  } else {
    alert("This license plate has already been registered");
  }
};

// Function to look for car with matching license
const searchCar = (event) => {
  // Prevent page from refreshing
  event.preventDefault();

  // Get user input for license
  let license = document.querySelector("#search-license");
  // Check if license is registered
  if (checkLicense(license.value)) {
    // Go through registeredCars
    for (let i = 0; i < registeredCars.length; i++) {
      if (registeredCars[i].license === license.value) {
        // Once car is found, display result and exit for loop
        let car = registeredCars[i];
        let text = document.querySelector("#result");
        let discount = document.querySelector("#discount");
        text.textContent = `The car make is ${car.make} and the model is ${car.model}.`;
        discount.textContent = `The discounted price is ${car.discount()} EUR`;
        break;
      }
    }
  } else {
    // Inform user that license plate was not found
    alert("This license plate is not registered");
  }
};

// Register button event listener
registerForm.addEventListener("submit", registerCar);
searchForm.addEventListener("submit", searchCar);
