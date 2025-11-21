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
    leftPoint: false,
    right: null,
    rightPoint: false,
    operator: null,
    freezeScreen: false,
    showAnswer: false,
    getMultiplyer: function (num) {
        let decimalPlaces = (String(num).length - 1) - String(num).indexOf(".");
        let m = "1";
        for (let i = 0; i < decimalPlaces; i++) {
            m += "0";
        }
        return Number(m);
    },
    sum: function (num1, num2) {
        return this.pointSafeAddSubtract(num1, num2, (a,b)=>a+b)
    },
    subtract: function (num1, num2) {
        if (String(num1).includes(".") || String(num2).includes(".")) {
            return this.pointSafeAddSubtract(num1, num2, (a, b) => a - b);
        }
        else return a - b;
    },
    multiply: function (num1, num2) {
        // if (String(num1).includes(".") || String(num2).includes(".")) {
        //     return this.pointSafe(num1, num2, (a, b) => a * b);
        // }
        return num1 * num2;
    },
    divide: function (num1, num2) {
        // if (String(num1).includes(".") || String(num2).includes(".")) {
        //     return this.pointSafe(num1, num2, (a, b) => a / b);
        // }
        // else
             return num1 / num2;
    },
    pointSafeAddSubtract: function (num1, num2, func) {
        if(!(String(num1).includes(".")) && !(String(num2).includes("."))) return func(num1, num2);
        let num1Multiplyer = this.getMultiplyer(num1);
        let num2Multiplyer = this.getMultiplyer(num2);
        let multiplyer = num1Multiplyer > num2Multiplyer ? num1Multiplyer : num2Multiplyer;

        num1 = num1 * multiplyer;
        num2 = num2 * multiplyer;
        let ans = func(num1, num2);
        ans = ans/multiplyer;
        return ans;
    },
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
                return this.sum(this.left, this.right);
                break;
            case "-":
                this.showAnswer = true;
                return this.subtract(this.left, this.right);
                break;
            case "*":
                this.showAnswer = true;
                return this.multiply(this.left, this.right);
                break;
            case "/":
                if (this.left === 0) {
                    console.warn("attempted divide by zero.");
                    return false;
                }
                return this.divide(this.left, this.right);
        }
    },
    placePoint() {
        if (this.left === null) this.left = "0."
        else if (this.left !== null && this.operator === null) {
            if (String(this.left).includes(".")) { } // do nothing
            else {
                this.left = this.left + ".";
            }
        }
        else if (this.operator !== null && this.right === null) this.right = "0.";
        if (this.right !== null) {
            if (String(this.right).includes(".")) { } // do nothing
            else {
                this.right = this.right + ".";
            }
        }
    }
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
            if (Calc.showAnswer === true) {
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
            if (Calc.left === null) {
                //do nothing.
            }
            else if (Calc.right === null) {
                Calc.showAnswer = false;
                Calc.placeOperator(input);
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
        case "point":
            console.log("point btn pressed");
            Calc.placePoint();
            screenNode.innerText = Calc.getEq();
    }
});
