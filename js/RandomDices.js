class Dice {
  constructor() {
    this.dice = [0, 0, 0, 0, 0];
    this.dice_values = [0, 0, 0, 0, 0, 0, 0];
    this.checkboxes = Array.from(document.getElementsByClassName("checkBox"));
  }

  userThrow() {
    for (let i = 0; i < 5; i++) {
      if (!this.checkboxes[i].checked) {
        this.dice[i] = new Die(i);
      }
    }
  }
  uncheck() {
    for (let checkbox of this.checkboxes) {
      checkbox.checked = false;
    }
  }

  calculateDiceValues() {
    this.dice_values = [0, 0, 0, 0, 0, 0, 0]; //*För att kolla händerna/
    console.log(this.dice);
    this.dice.map((currentValue) => {
      this.dice_values[currentValue.value]++;
      console.log(this.dice_values);
    });
  }

  diceValues() {
    let countValues = this.dice_values;
    let twoPairs = [];
    if (countValues.includes(5)) {
      //checks for yatzy
      console.log("Yatzy!");
      let sum = 50;
      console.log(sum);
    }
    if (
      //checks for large straight
      countValues[2] >= 1 &&
      countValues[3] >= 1 &&
      countValues[4] >= 1 &&
      countValues[5] >= 1 &&
      countValues[6] >= 1
    ) {
      console.log("Stor Stege!");
      let sum = 20;
      console.log(sum);
    }
    if (
      // checks for small straight
      countValues[1] >= 1 &&
      countValues[2] >= 1 &&
      countValues[3] >= 1 &&
      countValues[4] >= 1 &&
      countValues[5] >= 1
    ) {
      console.log("Liten Stege!");
      let sum = 15;
      console.log(sum);
    }
    if (countValues.includes(2) && countValues.includes(3)) {
      //checks for full house
      console.log("KåK!");
      let sum = countValues.indexOf(3) * 3 + countValues.indexOf(2) * 2;
      console.log(sum);
    }
    if (countValues.includes(4)) {
      //checks for four of a kind
      console.log("Fyrtal!");
      let sum = countValues.indexOf(4) * 4;
      console.log(sum);
    }
    if (countValues.includes(3)) {
      // checks for three of a kind
      console.log("Triss!");
      let sum = countValues.indexOf(3) * 3;
      console.log(sum);
    }
    if (countValues.includes(2)) {
      // checks for pair and two pair
      console.log("Par!");

      let sum = countValues.indexOf(2) * 2;
      console.log(sum);
      twoPairs = countValues.filter((element) => element == 2);
      if (twoPairs.length > 1) {
        console.log("två par!");
      }
    }
  }
}

class Die {
  constructor(name) {
    this.name = name;
    this.value = this.throw_die();
    this.diceImg(this.value);
  }
  //this method sets
  diceImg(args) {
    let temp = document.querySelectorAll(".diceArray");
    temp[this.name].setAttribute("src", "dices/dice" + args + ".webp");
  }
  throw_die() {
    let randomDice = Math.floor(Math.random() * (7 - 1) + 1);
    return randomDice;
  }
}
