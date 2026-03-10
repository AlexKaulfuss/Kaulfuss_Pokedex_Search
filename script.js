async function fetchData() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response   = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data          = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement    = document.getElementById("pokemonSprite");

    imgElement.src           = pokemonSprite;
    imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}
const searchBtn = document.getElementById("searchBtn");
const nameInput = document.getElementById("pokemonName");
const errorDisplay = document.getElementById("errorMessage");
const spriteImg = document.getElementById("pokemonSprite");

function handleSearch() {
    const value = nameInput.value.trim(); 
    const nameRegex = /^[a-zA-Z-]+$/;  

    errorDisplay.textContent = "";
    spriteImg.style.display = "none";

    if (value === "") {
        errorDisplay.textContent = "Please enter a Pokémon name.";
        return; 
    }

    if (value.length > 30) {
        errorDisplay.textContent = "Name is too long (max 30 characters).";
        return;
    }

    if (!nameRegex.test(value)) {
        errorDisplay.textContent = "Only letters and hyphens are allowed.";
        return;
    }

    fetchData();
}

searchBtn.addEventListener("click", handleSearch);