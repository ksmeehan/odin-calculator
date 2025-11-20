console.log("js script attached")

let leftVariable = {
    value: undefined,
};

let operator = {
    value: undefined,
};

let rightVariable = {
    value: undefined,
};



let operations = {
        validOperations : "*+-/",//
        "*" : function (a,b) {return a*b},
        "+" : function (a,b) {return a+b},
        "-" : function (a,b) {return a-b},
        "/" : function (a,b) {return a/b},
    }

function calculation(a, operation, b){
    if(!operations.validOperations.includes(operation)) return "ERROR!";
    return operations[operation](a,b);
}

module.exports = {
    operations,
    calculation,
}