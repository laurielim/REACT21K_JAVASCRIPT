// Define what we're looking for
let form = document.querySelector("form");

// Getting values needed
let colorOne = document.querySelector("#first-color");
let colorTwo = document.querySelector("#second-color");
let direction = document.querySelectorAll("input[name='direction'");

// Where to print code
let text = document.querySelector("#result");

const setGradient = (event) => {
  event.preventDefault();
  let selectedDirection;

  for (const v of direction) {
    if (v.checked) {
      selectedDirection = v.value;
    }
  }

  console.log(colorOne.value);
  console.log(colorTwo.value);

  document.body.style.backgroundImage = `linear-gradient(${selectedDirection}, ${colorOne.value}, ${colorTwo.value})`;

  text.textContent = `background-image: linear-gradient(${selectedDirection}, ${colorOne.value}, ${colorTwo.value})`;

  console.log(text.textContent);
};

// Define what event to pay attention to (for radio button, change is better than click)
form.addEventListener("submit", setGradient);

// Additional functionality: Copy text to clipboard by clicking on it
const copyToClipboard = () => {
  let range = document.createRange();
  let selection = window.getSelection();
  range.selectNodeContents(text);

  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
};

text.addEventListener("click", copyToClipboard);
