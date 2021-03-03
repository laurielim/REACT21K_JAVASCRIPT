/**
 *  Practice exercise
 * 1. Go through the following documentation to learn about Fetch API in Javascript: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * 2.Make an API call to the following end point https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000
 * 3.Upon receival of the API response, remember to parse JSON
 * 4.Once you have managed to format the response in JSON (Javascript object format), display a anchor tag element with the name of each pokemon
 * 5.When user clicks on each of the pokemon name, make another API call to retrieve that pokemon information and show it on the screen, use the front_default value under sprites of each pokemon as the display image
 */

// Make API call
fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
  // Parse JSON
  .then((response) => response.json())
  .then((data) => {
    // Assign array of pokemonts to a variable
    let pokemons = data.results;
    // Iterate through each Pokemon to display them
    pokemons.forEach((pokemon) => addPokemonName(pokemon.name));

    // Add event listener to each pokemon
    document.querySelectorAll("a").forEach((anchor) => {
      anchor.addEventListener("click", function () {
        // When user clicks on pokemon name, make another API call to retrieve that pokemon information
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.innerHTML}`)
          // Parse JSON
          .then((response) => response.json())
          .then((data) => {
            // Display pokemon sprite on screen
            showPokemon(this.innerHTML, data.sprites.front_default);
          });
      });
    });
  });

/**
 * Given a name, it will add it to poke-list as an anchor tag.
 * @param {String} name
 */
const addPokemonName = (name) => {
  // Create new div for pokemon
  let pokemon = document.createElement("div");
  // Add an anchor tag inside div with pokemon name
  pokemon.innerHTML = `<a href = "#${name}">${name}</a>`;
  // Append anchor to poke-list section
  document.getElementById("poke-list").appendChild(pokemon);
};

/**
 * Given a name and a url to the pokemon sprite, displays the the pokemon sprite
 * @param {String} name pokemon name
 * @param {String} link url to pokemon sprite
 */
const showPokemon = (name, link) => {
  // Check if there is an existing sprite
  if (document.querySelectorAll("#poke-info > img").length > 0) {
    // Remove any existing sprite
    document.getElementById("poke-info").innerHTML = "";
  }
  // Create a new "img" element
  let image = document.createElement("img");
  // Add given link as the image source
  image.src = link;
  // Add alt text, including pokemon name
  image.alt = `Default front sprite of ${name}`;
  // Append image to poke-info section
  document.getElementById("poke-info").appendChild(image);
};
