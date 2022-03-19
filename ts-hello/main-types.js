var count = 5;
count = 'a';
// In JS, variables are weakly/dynamically typed
// TypeScipt enforces strong typing
// but will permit weak typing at compilation because JS allows it
var condition;
// By declaring but not initialising a variable, TypeScript allows the type to be 'any'
// As a result, it seems we can change the type on the fly because 'any' permit any type
condition = true;
condition = 0; // TypeScript doesn't mind that we changed the type
// When we don't know the value of a variable ahead of time, we should use Type Annotations
var a;
var b;
var c;
var d;
var e;
var f = [1, true, 'a', 0.99];
// Enum
var Colour;
(function (Colour) {
    Colour[Colour["Red"] = 0] = "Red";
    Colour[Colour["Green"] = 1] = "Green";
    Colour[Colour["Blue"] = 2] = "Blue";
})(Colour || (Colour = {}));
;
var backgroundColour = Colour.Green;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
// using indexed values is a better way to declare enums 
// to avoid code breaking if the order of elements in the enum changes
