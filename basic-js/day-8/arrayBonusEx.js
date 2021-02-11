const band = {
  members: {
    current: [
      { name: "Sascha", age: 59, plays: ["vocals", "synth", "guitar", "bass"] },
      { name: "Lucia", age: 49, plays: ["vocals", "synth"] },
      { name: "Jules", age: 53, plays: ["guitar", "bass", "synth"] },
      { name: "Steve", age: 55, plays: ["guitar"] },
    ],
    past: [
      { name: "Raymond", age: 57, plays: ["vocals", "synth"] },
      { name: "En", age: 52, plays: ["vocals", "drums", "guitar", "synth"] },
      { name: "Gunter", age: 57, plays: ["guitar", "synth"] },
    ],
  },
};

const expected = {
  members: {
    // current: no changes
    current: [
      { name: "Sascha", age: 59, plays: ["vocals", "synth", "guitar", "bass"] },
      { name: "Lucia", age: 49, plays: ["vocals", "synth"] },
      { name: "Jules", age: 53, plays: ["guitar", "bass", "synth"] },
      { name: "Steve", age: 55, plays: ["guitar"] },
    ],
    // past: no changes
    past: [
      { name: "Raymond", age: 57, plays: ["vocals", "synth"] },
      { name: "En", age: 52, plays: ["vocals", "drums", "guitar", "synth"] },
      { name: "Gunter", age: 57, plays: ["guitar", "synth"] },
    ],
    // ORDER MATTERS!
    // 1. Sort age first by DESC
    // 2. then sort name by ASC
    // 3. lowercase all the names
    all: ["sascha", "gunter", "raymond", "steve", "jules", "en", "lucia"],
  },
  // plays order doesn't matter
  plays: {
    // name order doesn't matter
    // but show the name in lowercase
    vocals: ["sascha", "lucia", "raymond", "en"],
    synth: ["sascha", "lucia", "jules", "raymond", "en", "gunter"],
    guitar: ["sascha", "jules", "steve", "en", "gunter"],
    bass: ["sascha", "jules"],
    drums: ["en"],
  },
};

/**                PART 1                 */

// Make a copy of current members and a copy of past members
let currentMembers = [...band.members.current];
let pastMembers = [...band.members.past];
// Create a new array with all members by adding currentMembers and pastMembers
let allMembers = currentMembers.concat(pastMembers);

/**
 * Goes through an array of object, sort the array and return an array containing the values of the name property in lowercase
 * @param {array} arrayOfObj
 */
const getNames = (arrayOfObj) => {
  // Sort array by age (desc) then by name (asc)
  arrayOfObj.sort((a, b) => {
    // Check if they are the same age
    let diff = a.age - b.age;
    if (diff) {
      // If they are different age, sort by age by DESC
      return b.age - a.age;
    } else {
      // If they are the same age, sort by name by ASC
      return a.name - b.name ? 1 : -1;
    }
  });

  // Iterate through each object inside the array and return the value in lowercase of the name property inside the object
  return arrayOfObj.map((obj) => obj.name.toLowerCase());
};

// Get the array of names and assign it to a new "all" property inside of members
band.members.all = getNames(allMembers);

/**                PART 2                 */
// Create the "plays" property inside of band which contains an object
band.plays = {};

console.log(band);

// Loop through all members
allMembers.forEach((obj) => {
  // Loop through the instruments each member plays
  obj.plays.forEach((el) => {
    // Check if instrument is already listed
    if (!band.plays.hasOwnProperty(el)) {
      // If it is not, add the new property which will contain an array
      band.plays[el] = [];
      // Add the name of the member inside the new array
      band.plays[el].push(obj.name.toLowerCase());
    } else {
      // If it is listed, add the name of the member to the array
      band.plays[el].push(obj.name.toLowerCase());
    }
  });
});
