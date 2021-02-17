class Player {
    constructor(number) {
        this.number = number;
    }
    //a method to keep track of sum, bonus and total
    playerSumBonusAndTotal() {
        //variables to access selected player row
        let outputSum = document.getElementById(`sum-player-${this.number}`);
        let playerTotal = document.getElementById(`total-player-${this.number}`);
        let playerBonus = document.getElementById(`player-${this.number}-bonus`);

        //converts HTMLcollection to array
        let playerArray = Array.from(
            document.getElementsByClassName(`player-${this.number}`)
        );

        //.map gives us an array with the values as numbers
        let playerSecondArray = playerArray.map((element) => {
            return Number(element.value);
        });

        //.reduce gives us the total of all given numbers
        let total = playerSecondArray.reduce((acc, currValue) => {
            return acc + currValue;
        }, 0);

        let sum = 0;

        //for loop to separate the 1's through 6's from the rest of the row
        for (let i = 0; i < 6; i++) {
            sum += playerSecondArray[i];
        }

        //if sum is larger than or equal to 63 selected player is given a 50 point bonus
        let bonus = sum >= 63 ? 50 : "";

        //outputs all results
        outputSum.innerHTML = sum <= 0 ? "" : sum;
        playerBonus.innerHTML = bonus;
        playerTotal.textContent = total <= 0 ? "" : total + bonus;
    }
}
