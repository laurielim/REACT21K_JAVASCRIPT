let expectedResult;
/**
 * Task 1: You are provided with 2 arrays, firstArray, and secondArray
 * Make a new thirdArray, that contains elements of the firstArray, followed by
 * elements of the secondArray.
 * Please don't do it manually :)
 */

let firstArray = [1, 2, 3, 4, "a", true, false];
let secondArray = ["hello", "I", "am", "not", "an", "array", "jkd"];

expectedResult = [
  1,
  2,
  3,
  4,
  "a",
  true,
  false,
  "hello",
  "I",
  "am",
  "not",
  "an",
  "array",
  "jkd",
];

let thirdArray = firstArray.concat(secondArray);
console.log(thirdArray);
console.log(expectedResult);
/**
 * Task 2: You are provided with an array of numbers
 * create another array that contains elements of the provided array, but in reverse order
 * do not use .reverse() method
 * Please don't do it manually :)
 */

let fourthArray = [1, 500, 10000, 123456, 234, 500, 10000, 12345, 20000];

expectedResult = [20000, 12345, 10000, 500, 234, 123456, 10000, 500, 1];

let reversedArray = [];
fourthArray.forEach((num) => reversedArray.unshift(num));
console.log(reversedArray);
console.log(expectedResult);
/**
 * Task 3: You are provided with an array that contains some duplicated elements
 * create another array that contains ONLY unique elements of the given array
 * the order of the new array isn't important
 * Please don't do it manually :)
 */

let fifthArray = [
  1,
  500,
  10000,
  "world",
  "yeah",
  "bye bye",
  123456,
  234,
  500,
  10000,
  12345,
  20000,
  true,
  true,
  false,
  "hello",
  "world",
];

expectedResult = [
  1,
  500,
  10000,
  "world",
  "yeah",
  "bye bye",
  123456,
  234,
  12345,
  20000,
  true,
  false,
];

let uniqueArray = [];
fifthArray.forEach((el) => {
  if (!uniqueArray.includes(el) && uniqueArray.indexOf(el) === -1) {
    uniqueArray.push(el);
  }
});

console.log(uniqueArray);
console.log(expectedResult);

/**
 * Task 4: You are provided 2 arrays
 * write a logic that will compare elements of the 2 arrays to find out if they contain same elements
 * it is possible that the one of the array is a sub array of the other, in which case they shouldn't be considered as containing same elements
 * the order of elements in each array can be different
 * Please don't do it manually :)
 */

// sixthArray and seventhArray should be considered as being similar
let sixthArray = [1, 2, 3, "hello", true, false];
let seventhArray = ["hello", false, 1, 3, true, 2];

// eighthArray and ninthArray are not
let eighthArray = [1, 2, true, false, "hello", 3, "moi moi"];
let ninthArray = [];

// function that takes in 2 parameters (2 arrays)
/**
 * Compares 2 array and state whether the elements contain the same elements, regardless of the order of the elements
 * @param {array} arrayOne
 * @param {array} arrayTwo
 */
const compareArrays = (arrayOne, arrayTwo) => {
  // Compare arrays only if they have the same lenght
  if (arrayOne.length === arrayTwo.length) {
    // Sort both arrays
    arrayOne.sort();
    arrayTwo.sort();
    // Assume both array match
    let match = true;
    // Check that every element match
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        // If elements do not match, set variable to false
        match = false;
      }
    }
    match
      ? // If match is true, both arrays contain the same elements
        console.log("Arrays contain the same elements")
      : // Else there are some differences between the arrasys
        console.log("Arrays do not contain the same elements");
  } else {
    console.log("Arrays do not contain the same elements");
  }
};

compareArrays(sixthArray, seventhArray);
compareArrays(eighthArray, ninthArray);

/**
 * Task 5: The following array is nested (having array inside array)
 * you need to create a new array that will deconstruct the nested array so that it is no longer nested
 * the order isn't important
 * Please don't do it manually :)
 */

let tenthArray = [
  "one",
  "two",
  "three",
  1,
  2,
  3,
  false,
  "false",
  [["oh oh"], [[["tom"]], "jerry"], ["not", "again", ["yes", "whynot?", true]]],
];

expectedResult = [
  "one",
  "two",
  "three",
  1,
  2,
  3,
  false,
  "false",
  "oh oh",
  "tom",
  "jerry",
  "not",
  "again",
  "yes",
  "whynot?",
  true,
];

/**
 * Takes in an array and returns an array without any nested array
 * @param {array} originalArray
 */
const deconstructArray = (originalArray) => {
  // Initialize array to contain result
  let result = [];
  // Recursive function to check for nested arrays
  const checkNestedArray = (newArray) => {
    // Loop through given array
    newArray.forEach((el) => {
      // Check if element is an array
      if (!Array.isArray(el)) {
        // If not an array, add to result
        result.push(el);
      } else {
        // Check array element for nested array
        checkNestedArray(el);
      }
    });
  };
  // Check originalArray for nested arrays
  checkNestedArray(originalArray);
  // Return array without any nested array
  return result;
};

let deconstructedArray = deconstructArray(tenthArray);

console.log(deconstructedArray);
console.log(expectedResult);

// Simplest solution provided by Heli, using the .flat() method
let flatArray = tenthArray.flat(10);
console.log(flatArray);

/**
 * Task 6: The array you are given contains all kinds of personal information
 * Filter out all email addresses into a separate array
 * Filter out all phone numbers into a separate array
 * Please don't do it manually :)
 */

let peopleInfo = [
  "ron",
  "044 123 345",
  "lonelyspider@email.com",
  "hermione",
  "0123-414-443",
  "hermione@email.com",
  "harry",
  "(0123) 123 4324",
  "ginnyforever@email.com",
];

let expectedNamesArray = ["ron", "hermione", "harry"];
let expectedPhones = ["044 123 345", "0123-414-443", "(0123) 123 4324"];
let expectedEmails = [
  "lonelyspider@email.com",
  "hermione@email.com",
  "ginnyforever@gmail.com",
];

let phonesArray = peopleInfo.filter((el) => {
  // Splits string element into an array and return element if some of the elements inside the array is a number
  return el.split("").some((x) => Number.isInteger(Number(x)));
});

let phonesArray2 = peopleInfo.filter((el) => {
  // Check if element contains digits using regular expression
  let regex = /\d/;
  if (regex.test(el)) {
    return el;
  }
});
console.log(phonesArray);
console.log(expectedPhones);

let emailsArray = peopleInfo.filter((el) => {
  // Returns element if element contain "@"
  return el.includes("@");
});

let emailsArray2 = peopleInfo.filter((el) => {
  // Email validation as per https://www.w3resource.com/javascript/form/email-validation.php
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (regex.test(el)) {
    // If element is in the format of an email, return element
    return el;
  }
});

console.log(emailsArray);
console.log(expectedEmails);

let namesArray = peopleInfo.filter((el) => {
  // Returns the element if it is not a number AND not an email
  return (
    !el.includes("@") && !el.split("").some((x) => Number.isInteger(Number(x)))
  );
});

let namesArray2 = peopleInfo.filter((el) => {
  // Check for all letters as per https://www.w3resource.com/javascript/form/all-letters-field.php
  let regex = /^[A-Za-z]+$/;
  return el.match(regex);
});

console.log(namesArray);
console.log(expectedNamesArray);
/**
 * Task 7: The current array contains a sample text
 * use the .split(' ') method to split the paragraph to an array of words
 * iterate through the array of words, check if each word contain the letter 'o'
 * if it does, store a value of 1 to a newArray, otherwise 0
 * Please don't do it manually :)
 * Example:
 * sample = ['Lorem', 'ipsum', 'dolor', 'sit']
 * result = [1, 0, 1, 0]
 *
 */

const sample =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod, soluta debitis reiciendis recusandae necessitatibus consequatur. Et odit quas quis, nulla sequi voluptatem, impedit optio, illo nihil at distinctio aliquid.";

let resultTask7 = [];
let sampleTask7 = sample.split(" ");
// Using forEach(), loop through each word
sampleTask7.forEach((word) => {
  word.includes("o") ? resultTask7.push(1) : resultTask7.push(0);
});
console.log(resultTask7);
// Using map(), producing a new array directly
let resultTask72 = sampleTask7.map((word) => (word.includes("o") ? 1 : 0));
console.log(resultTask72);
