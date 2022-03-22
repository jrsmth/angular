
let count = 5;
count = 'a'; 
// In JS, variables are weakly/dynamically typed
// TypeScipt enforces strong typing
    // but will permit weak typing at compilation because JS allows it

let condition; 
// By declaring but not initialising a variable, TypeScript allows the type to be 'any'
// As a result, it seems we can change the type on the fly because 'any' permits any type
condition = true;
condition = 0; // TypeScript doesn't mind that we changed the type

// When we don't know the value of a variable ahead of time, we should use Type Annotations
let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[];
let f: any[] = [1, true, 'a', 0.99];

// Enum
enum Colour { Red, Green, Blue};
let backgroundColour = Colour.Green;

enum Color { Red = 0, Green = 1, Blue = 2}; 
// using indexed values is a better way to declare enums 
    // to avoid code breaking if the order of elements in the enum changes


