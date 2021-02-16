let car = {
  // Properties
  type: "Audi",
  year: 2000,
  ownerName: "Laurie",
  city: "Helsinki",
  // Method
  calcAge: function () {
    let currentYear = new Date().getFullYear();
    car.age = currentYear - car.year;
    return car.age;
  },
  // Arrow function does not support "this" keyword !!Not recommended
  calcAge2: () => {
    let currentYear = new Date().getFullYear();
    car.age = currentYear - car.year;
    return car.age;
  },
};

console.log(car);
console.log(car.year);
console.log(car.city);
// Change existing property
car.city = "Espoo";
console.log(car.city);

// Add new property
car.color = "Red";
console.log(car);

// Remove a property !!Avoid using
delete car.city;
console.log(car);

// Cannot display an object to HTML directly
let text = document.querySelector("p");
// text.textContent = car;

// But properties can be displayed
text.textContent = `The ${car.color} ${car.type} is ${car.calcAge()} years old`;

// Object constructor
function Car(type, year, owner, city) {
  this.type = type;
  this.year = year;
  this.ownerName = owner;
  this.city = city;
}

// Object made by through constructor
let margitsCar = new Car("Mercedes", 2021, "Margit", "Helsinki");
console.log(margitsCar);
let manolosCar = new Car("Honda", 2013, "Manolo", "Barcelona");
console.log(manolosCar);
