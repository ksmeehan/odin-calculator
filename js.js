console.log("js script attached")

function sum(a,b){return a+b;}
function sub(a,b){return a-b;}
function product(a,b) {return a*b;}
function divide(a,b) {return a/b;}

module.exports = {
    sum, 
    sub,
    product,
    divide,
}