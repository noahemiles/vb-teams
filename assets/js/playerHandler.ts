import { Player } from "./Player.js";
const sliderCheckbox = document.getElementById("slider"),
    submitButton = document.getElementById("addPlayerButton"),
    nameInput = <HTMLInputElement>document.getElementById("nameInput"),
    genderSelect = <HTMLSelectElement>document.getElementById("genderDropdown"),
    tallCheckbox = <HTMLInputElement>document.getElementById("tallCheckbox"),
    playerList = document.getElementById("playerList");


// Retrieve player data from localStorage if available
let savedPlayers = JSON.parse(localStorage.getItem("players")) || [];

// Render existing players from localStorage
renderPlayers(savedPlayers);

sliderCheckbox.addEventListener("click", function () {
  sliderCheckbox.classList.toggle("checked");
});

submitButton.addEventListener("click", () => {
  const name = nameInput.value;
  const gender = genderSelect.selectedOptions[0].value;
  const tall = tallCheckbox.checked;

  if (name && name.length > 0) {
    const newPlayer = new Player(name, gender, tall);
    const playerInfo = newPlayer.playerToObject();

    savedPlayers.push(playerInfo);
    localStorage.setItem("players", JSON.stringify(savedPlayers));

    renderPlayer(playerInfo);

    // Clear the input fields
    nameInput.value = "";
    genderSelect.selectedIndex = 0;
    tallCheckbox.checked = false;
  }
});

function renderPlayers(players) {
  players.forEach((playerInfo) => {
    renderPlayer(playerInfo);
  });
}

function renderPlayer(playerInfo) {
  const playerContainer = createPlayerContainer(playerInfo);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    // Remove the player from the list
    const index = savedPlayers.findIndex((player) => player.name === playerInfo.name);
    if (index > -1) {
      savedPlayers.splice(index, 1);
      localStorage.setItem("players", JSON.stringify(savedPlayers));
    }

    // Remove the player container from the DOM
    playerContainer.remove();
  });

  playerContainer.appendChild(removeButton);
  playerList.appendChild(playerContainer);
}

function createPlayerContainer(playerInfo) {
  const playerContainer = document.createElement("div");
  playerContainer.classList.add("player-info");

  const playerName = document.createElement("p");
  playerName.textContent = `Name: ${playerInfo.name}`;
  playerContainer.appendChild(playerName);

  const playerGender = document.createElement("p");
  playerGender.textContent = `Gender: ${playerInfo.gender}`;
  playerContainer.appendChild(playerGender);

  const playerTall = document.createElement("p");
  playerTall.textContent = `Tall: ${playerInfo.tall ? "Yes" : "No"}`;
  playerContainer.appendChild(playerTall);

  return playerContainer;
}