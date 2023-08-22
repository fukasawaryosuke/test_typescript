"use strict";
console.log("Hello World!");
let x;
x = ["hello", 10];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let c = Color.Green;
console.log(c);
let unknownValue = 10;
if (typeof unknownValue === "string") {
    let str = unknownValue;
    console.log(str);
}
function error(message) {
    throw new Error(message);
}
//# sourceMappingURL=app.js.map