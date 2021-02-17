//function to count how many throws are left for current player
function counter(count, playerCounter, inputArray) {
  let button = document.getElementById("throw-dice");
  let playerName = document.querySelectorAll(".playerName");
  let currentPlayerNumber = inputArray[playerCounter].number;

  //green color is set to player
  playerName[currentPlayerNumber].parentElement.style.backgroundColor = "#76A08A";

  //when count hits zero color is set to default and next player is selected
  if (count === 0) {
    button.innerHTML = "Nästa spelare: kasta tärningarna (3 kast kvar)";
    playerName[currentPlayerNumber].parentElement.style.backgroundColor = "#DBB165";
  } else {
    button.innerHTML = count + " kast kvar";
  }
}

//function to control amount of players
function amountOfPlayers() {
  let players = Array.from(document.getElementsByClassName("playerName"));
  //let playersArray = Array.from(players);

  //returns a string from
  let playersArrayStrings = players.map((element) => {
    return String(element.value);
  });

  let outputArray = [];

  for (let i = 0; i < playersArrayStrings.length; i++) {
    if (playersArrayStrings[i] != "") {
      outputArray.push(i);
    }
  }
  return outputArray;
}

// a function that creates the needed amount of player objects
function createPlayers(inputArray) {
  //let amount = inputArray.length;
  let createdPlayersArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    createdPlayersArray.push(new Player(inputArray[i]));
  }
  enableCells(inputArray);
  console.log(createdPlayersArray);
  return createdPlayersArray;
}
// a function that disables all cells
function disableCells() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 15; j++) {
      let playerCells = document.getElementsByClassName(`player-${i}`);

      playerCells[j].disabled = true;
      playerCells[j].parentElement.classList.add("black-cells");
    }
  }
}
// a function that enables all cells
function enableCells(inputArray) {
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < 15; j++) {
      let playerCells = document.getElementsByClassName(`player-${inputArray[i]}`);
      playerCells[j].disabled = false;
      playerCells[j].parentElement.classList.remove("black-cells");
    }
  }
}
// a function to call the method playerSumBonusAndTotal for all players
function outPutCalcSum(players) {
  for (let i = 0; i < players.length; i++) {
    players[i].playerSumBonusAndTotal();
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  let reloadStart = document.getElementById("reload-start");
  let start = document.getElementById("start-button");
  let dices = new Dice();
  let wholeForm = document.getElementById("whole-form");
  let activePlayers = [];
  let throwButton = document.getElementById("throw-dice");
  let count = 2;
  let playerCounter = 0;

  disableCells();

  start.addEventListener("click", function (e) {
    start.remove();

    let reload = document.createElement("input");
    reload.setAttribute("type", "button");
    reload.setAttribute("value", "Börja om");
    reloadStart.appendChild(reload);
    document.getElementById("start-reload-label").innerHTML = "Ny runda?";

    reload.addEventListener("click", function (e) {
      location.reload();
    });

    activePlayers = createPlayers(amountOfPlayers()); //creating an object for each player
    throwButton.addEventListener("click", function (e) {
      counter(count, playerCounter, activePlayers);
      dices.userThrow();
      dices.calculateDiceValues();
      dices.diceValues();
      if (count === 0) {
        dices.uncheck();
        count = 3;
        playerCounter++;
        if (playerCounter === activePlayers.length) {
          playerCounter = 0;
        }
      }
      count--;
    });
  });

  wholeForm.addEventListener("change", function (e) {
    outPutCalcSum(activePlayers);
  });

  //Skapar eventlyssnare som kollar knapptryck för kast

  //Chatinput
  document.querySelector("#chat-btn").addEventListener("click", function (e) {
    //Creats variable that has the input field as refferencse
    let chatInput = document.getElementById("chat_input");
    let chatInputName = document.getElementById("chat_name_input");
    //Creats variable with the chat area as refference
    let chatbox = document.querySelector(".text-mock");
    //Creating new elements/nodes
    let nameInputSpan = document.createElement("span");
    let chatSpan = document.createElement("span");
    //Setting created Element property to user input value
    nameInputSpan.innerHTML = "<br>" + chatInputName.value + ": ";
    chatSpan.innerHTML = chatInput.value;
    //Setting new class attribute
    nameInputSpan.setAttribute("class", "user");
    //Giving chatbox childNodes, will now be shown in chatbox ".text-mock"
    chatbox.appendChild(nameInputSpan);
    chatbox.appendChild(chatSpan);
  });
});
