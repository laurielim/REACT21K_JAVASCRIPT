/**
 *  Practice exercise
 * 1. Go through the following documentation to learn about Fetch API in Javascript: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * 2.Make an API call to the following end point https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000
 * 3.Upon receival of the API response, remember to parse JSON
 * 4.Once you have managed to format the response in JSON (Javascript object format), display a anchor tag element with the name of each pokemon
 * 5.When user clicks on each of the pokemon name, make another API call to retrieve that pokemon information and show it on the screen, use the front_default value under sprites of each pokemon as the display image
 */

let pokemons;
// Make API call
fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000")
  // Parse JSON
  .then((response) => response.json())
  // Assign array of pokemonts to a variable
  .then((data) => (pokemons = data));

/**
 * Given a name, it will add it to poke-list as an anchor tag.
 * @param {String} name
 */
const addPokemonName = (name) => {
  // Create new anchor tag
  let anchor = document.createElement("a");
  anchor.innerHTML = name;
  anchor.href = `#${name}`;
  document.getElementById("poke-list").appendChild(anchor);
};
