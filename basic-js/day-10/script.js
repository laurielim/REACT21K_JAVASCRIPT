/**
 *  Practice exercise
 * 1. Go through the following documentation to learn about Fetch API in Javascript: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * 2.Make an API call to the following end point https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000
 * 3.Upon receival of the API response, remember to parse JSON
 * 4.Once you have managed to format the response in JSON (Javascript object format), display a anchor tag element with the name of each pokemon
 * 5.When user clicks on each of the pokemon name, make another API call to retrieve that pokemon information and show it on the screen, use the front_default value under sprites of each pokemon as the display image
 */

// Wrap script inside self calling function
(function () {
  document.addEventListener("DOMContentLoaded", executeScript);

  function executeScript() {
    // Make API call
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000")
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
                showPokemon(this.innerHTML, data);
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
     * @param {Object} data object containing pokemon data
     */
    const showPokemon = (name, data) => {
      // Check if there is an existing sprite
      if (document.querySelectorAll("#poke-info > div").length > 0) {
        // Remove any existing sprite
        document.getElementById("poke-info").innerHTML = "";
      }
      let sprite = data.sprites.front_default;
      let types = data.types.map((type) => type.type.name);
      // Create a new "div" element
      let card = document.createElement("div");
      // Add elements to card
      card.innerHTML = `
      <img src="${sprite}" alt="Default front sprite of ${name}">
      <h1>${name.toUpperCase()}</h1>
      <h2>Type(s): ${types.join(", ")}</h2>
      `;
      // Append card to poke-info section
      document.getElementById("poke-info").appendChild(card);
    };
  }
})();
