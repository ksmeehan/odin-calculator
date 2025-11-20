document.querySelector("#calculator").addEventListener("click", (event) => {
            //hide divide by zero msg if exists
            const msg = document.querySelector(".zero");
            msg.style.display = "none";
            //console.log(event.target);
            let value = event.target.innerText;
            let screenObj = document.querySelector(".screen");

            let digits = "0987654321";

            if(digits.includes(value)){
                //add the next digit to the screen.
                console.log(value);
                screenObj.innerText += value;

            } else if (operations.validOperations.includes(value)) {
                //if the user input an operator

                //check for if there's one already?
                if(operations.hasOp(screenObj.innerText)){
                    // there is one!

                    if(doesStrEndInOp(screenObj.innerText)){
                        //last input character is an operation
                        //then replace it with the new operaiton!
                        screenObj.innerText = switchLastChar(screenObj.innerText, value)

                    } else {
                        //input is not last, time to...
                        evaluate();
                        screenObj.innerText += value;
                    }
                   // console.log(lastChar);

                }else {
                    //there is no operator in the the text already
                    screenObj.innerText +=value;
                }
                
            } else if(value === "="){
                evaluate();
            } else if(value === "Clear"){
                refreshScreen();
            } else if(value === "."){
                let eq = getEquationParts(screenObj.innerText);
                if(eq.left && !eq.operation) {
                    if(!eq.left.includes(".")){
                        screenObj.innerText += value;
                    }
                } else if (eq.right){
                    if(!eq.right.includes(".")){
                        screenObj.innerText += value;
                    }
                }
            }

        })

function getEquationParts(string){
    let opIndex = operations.getOpIndex(string);
    if(opIndex === -1){
        return {
            left: string,
            right: null,
            operation: null
        }
    }
    let left = string.slice(0, opIndex);
    let right = string.slice(opIndex+1, string.length);
    let operation = string.at(opIndex);
    if(right === '') right = null;
    return ({
        left: left,
        right: right,
        operation: operation,
    })
}

function evaluate(){
    //if string is well-formed
    let input = document.querySelector(".screen").innerText;
    console.log(input);
    if(doesStrEndInOp(input) || !operations.hasOp(input)){
        console.warn("Error: String is not correctly formed!");
        return false;
    }
    let eq = getEquationParts(input);

    //check for divide by zero
    if(eq.operation =="/" && eq.right == 0){
        console.error("Divide by zero.");
        //show divide by zero msg
        const msg = document.querySelector(".zero");
        msg.style.display = "flex";
        return false;
    }

    let ans = operations[eq.operation](+eq.left, +eq.right);
    console.log(`"${eq.left}" "${eq.operation}" "${eq.right}" = ${ans}`);
    refreshScreen(ans);
}

function refreshScreen(newValue = ""){
    document.querySelector(".screen").innerText = newValue;
}

/**
 * Replaces the last character in a string with a given character
 *
 * @param {string} str - The string to be edited
 * @param {string} char - The character to replace the last character of the string
 * @returns {string} The edited string
 */
function switchLastChar(str, char){
    let arr = str.split('');
    arr[arr.length-1] = char;
    return arr.join('');
}

/**
 * checks if string ends in operation
 *
 * @param {string} str - The string to be checked
 * @returns {boolean} Whether the string ends in an operation
 */
function doesStrEndInOp(str){
    //puts the final character of the string into the hasOp function.
    let result = operations.hasOp(str.slice(str.length-1));
    console.log("string ends in op?"+result);
    return result;
}


let operations = {
        validOperations : "*+-/",//
        "*" : function (a,b) {return this.toPrecision(a*b)},
        "+" : function (a,b) {return this.toPrecision(a+b)},
        "-" : function (a,b) {return this.toPrecision(a-b)},
        "/" : function (a,b) {return this.toPrecision(a/b)},
        /**
         * rounds number to 5 precision
         *
         * @param {string} num - The number to be rounded
         * @returns {boolean} the rounded number
         */
        toPrecision(num){
            num = num * 100000;
            num = Math.floor(num);
            num = num/100000
            return num;
        },
        hasOp : function(str) {
            for(let i = 0; i < this.validOperations.length; i++){
                if (str.includes(this.validOperations.at(i))) return true;
            } return false;
        },
        getOpIndex : function(str){
            for(let i = 0; i < this.validOperations.length; i++){
                let currentOp = this.validOperations.at(i);
                if (str.indexOf(currentOp) != -1){
                    return str.indexOf(currentOp);
                }
            } return -1;
        }
    }

function calculation(a, operation, b){
    if(!operations.validOperations.includes(operation)) return "ERROR!";
    return operations[operation](a,b);
}
let module = {}
module.exports = {
    operations,
    calculation,
}