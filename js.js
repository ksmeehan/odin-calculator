//if a number happens when it's uneditable, it will be cleared.
let uneditable = false;

function t1() {
    Calc.placeDigit("2");
    Calc.placeDigit("2");
    Calc.placeOperator("+");
    Calc.placeDigit("4");
    let result = Calc.eval();
    console.log(`result: ${result}`);
    if (Calc.left === 22 && Calc.right === 4 && Calc.operator === "+" && result === 26) {
        console.log("t1 pass!");
    } else { console.log("t1 failed!") }
}

let Calc = {
    left: null,
    right: null,
    operator: null,
    freezeScreen: false,
    showAnswer: false,
    getBtnType: function (str) { //digit, equals, operator, clear, point
        if (str === "Clear") return "clear";
        if (str.length != 1) {
            console.warn("ERROR! invalid value.");
            return undefined;
        }
        if ("1234567890".includes(str)) return "digit";
        if (str === "=") return "equals";
        if ("+-*/".includes(str)) return "operator";
        if (str === ".") return "point"
    },
    placeDigit: function (digit) {
        if (this.left === null) this.left = Number(digit);
        else if (this.operator === null) this.left = Number(String(this.left) + digit);
        else if (this.right === null) this.right = Number(digit);
        else this.right = Number(String(this.right) + digit);
        console.log(this.getEq());
    },
    placeOperator: function (operator) {
        this.operator = operator;
        console.log(this.getEq());
    },
    getEq: function () {
        let eqText = (this.left === null ? "" : this.left) + " " +
            (this.operator === null ? "" : this.operator) + " " +
            (this.right === null ? "" : this.right)
        // console.log(eqText);
        return eqText;
    },
    clear: function () {
        this.left = null;
        this.operator = null;
        this.right = null;
    },
    eval: function () {
        if (this.left === null || this.operator === null || this.right === null) {
            console.warn(`Invalid eval: attempted "${this.left}" "${this.operator}" "${this.right}"`);
            return false;
        }
        switch (this.operator) {
            case "+":
                this.showAnswer = true;
                return this.left + this.right;
                break;
            case "-":
                this.showAnswer = true;
                return this.left - this.right;
                break;
            case "*":
                this.showAnswer = true;
                return this.left * this.right;
                break;
            case "/":
                if (this.left === 0) {
                    console.warn("attempted divide by zero.");
                    return false;
                }
                return this.left / this.right;
        }
    },
}



document.querySelector("#calculator").addEventListener("click", (event) => {
    //hide divide by zero msg if exists
    const msg = document.querySelector(".zero").style.display = "none";

    //console.log(event.target);
    let input = event.target.innerText;
    let screenNode = document.querySelector(".screen");

    let btnType = Calc.getBtnType(input);

    switch (btnType) {
        case "digit":
            if(Calc.showAnswer === true) {
                Calc.clear();
                Calc.showAnswer = false;
            }
            Calc.placeDigit(input);
            screenNode.innerText = Calc.getEq();
            break;
        case "clear":
            Calc.clear();
            Calc.showAnswer = false;
            screenNode.innerText = Calc.getEq();
            break;
        case "operator":
            if(Calc.left === null){
                //do nothing.
            }
            else if(Calc.right === null){

                Calc.placeOperator(input);
                Calc.showAnswer = false;
                screenNode.innerText = Calc.getEq();

            } else { //there is content on the right of the calculator, evaluate.
                let ans = Calc.eval();
                Calc.clear()
                Calc.left = ans;
                screenNode.innerText = Calc.getEq();     
                Calc.showAnswer = true;
           
            }

            break;
        case "equals":
            let ans = Calc.eval();
            Calc.clear()
            Calc.left = ans;
            screenNode.innerText = Calc.getEq();
            Calc.showAnswer = true;
            break;
    }
});
