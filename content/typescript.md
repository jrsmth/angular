## TypeScript
* TypeScript is a wrapper around JavaScript that offers additional features that are not supported by the vanilla JavaScript that you can run in the browser. 
    * This includes:
        * Strong / Static Typing - optional, easier to read code and debug
        * OOP features - classes, constructors, interfaces, access modifiers, generics
        * Catch errors at compile time - not just at runtime
        * Access to additional tools (great support)
* TypeScript is a superset of JavaScript - all JS is valid TypeScript.
* Browsers cannot understand TypeScript; when we compile our application, we 'transpile' TypeScript into JavaScript so that the browser can interpret it.
* Install: ```npm i -g typescript```
* Compile (TypeScript -> JS): ```tsc main.ts```
    * When we run ```ng serve```, ```tsc``` (TypeScript Compile) is called automatically.
        * use ```--target ES5``` to compile to JS ES5, etc
* Run: ```node main.js```
* Variable Declarations:
    * ```let```
        * a variable declared with ```let``` is scoped to the nearest code block. 
    * ```var```
        * a variable declared with ```var``` is scoped to the nearest function.
    * We should use ```let``` whenever possible.
        * JS ES5 is supported by all browsers; ```let``` was introduced in JS ES6 (2015).
        * When we run ```tsc main-varDec.ts``` and encounter compile time errors as a result of using ```let```, the compiler with flag the error but still transpile the TypeScript to JS and replace the declaration with ```var```.
* Types
    * In JS, variables are weakly/dynamically typed; TypeScipt enforces strong typing but will permit weak typing at compilation because JS allows it
        * example:
            * ```let count = 5; count = 'a';``` 
                * JS won't complain about this
                * TypeScript will complain that ```count``` is of type ```number```
    * In TypeScript, when we declare a variable but do not initialise it, the type is set to ```any```.
        * As a result, it seems we can change the type on the fly because 'any' permits any type.
        * example:
            * ```let condition; condition = true; condition = 0; ```
            * TypeScript doesn't mind that we changed the type as ```condition``` is of type ```any```
    * When we don't know the value of a variable ahead of time, we should use Type Annotations
        * ```let a: number;```
        * ```let b: boolean;```
        * ```let c: string;```
        * ```let d: any;```
        * ```let e: number[];```
        * ```let f: any[] = [1, true, 'a', 0.99];```
    * Enum
        * a useful way of storing a group of related constants
        * example:
            * define: ```enum Color {Red, Green, Blue}```
            * access: ```let backgroundColor = Color.Green```
            * a better way to define:
                * ```enum Color { Red = 0, Green = 1, Blue = 2};```
                * using indexed values is better as it can prevent code breaking if the order of elements in the enum changes in the future (enum values are assigned an index automatically but manually doing improves readability)
    * Type Assertions
        * example:
            * ```let str1 = 'abc'; let endsWithC = str1.endsWith('c'); ```
                * TypeScript is comfortable that ```str1``` is a ```string```; so it suggests string methods that we can call (```.endsWith()```)
            * ```let any1; any1 = 'abc'; let endsWithD = str1.endsWith('d'); // no string method suggestion ```
                * We can use Type Assertions to enforce ```any1``` as a ```string``` when we want to access type methods
                    * method 1: ``` let endsWithE = (<string> message).endsWith('e'); ```
                    * method 2: ``` let alternativeEndsWithE = (message as string).endsWith('e'); ```
* Arrow Functions 
    * Arrow Functions give us a clean way to define functions
    * example
        * ``` let log = function(message) { console.log(message);} // standard JS ```
        * ``` let doLog = (message) => { console.log(message);} // using TypeScript ```
* Classes & Interfaces
    * Classes allow us to group togther variables (propeties) and functions (methods) that are highly related.
        * Constructors - we cannot have multiple constructors, like we do in Java-land; instead we get round this by having optional parameters (```?```).
            * Once you have declared a parameter as optional (```?```), all other following parameters in the method signature must also be optional.
                * ```a required parameter cannot follow an optional parameter```
    * Interfaces are similar to Classes but they can only be used to declare the fields and methods - they cannot be used to define the implementation
        * example:
            * see ```../exercises/ts-hello/main-interfaces.ts```
* Access Modifiers
    * ```public```
        * the default setting, ```public``` means that our variable in accessible from anywhere in our program - we should avoid this where possible to get the benefits of encapsulation. 
    * ```protected```
    * ```private```
        * restricts the variable scope to within the class itself - access to a field is then done through public getters and setters (and constructor).
    * We can use access modifiers in the constructor in order to define them in a shorthand form.
        * example:
            * ``` class Coordinate { constructor(private x?: number, private y?: number) {} } ```
                * here we avoid declaring our fields at the top of the class and also the typical way of initialising them in the constructor (```this.x = x```) - TypeScript does this for you. 
            * ```constructor(public x?: number, public y?: number) {} ```
                * In order to get this shortcut from TypeScript, we must explicitly specify the access modifier - therefore, we need to use ```public``` in this instance.
* Properties
    * Properties are features of a class that give us getter and setter methods, that behave like fields - it gives us cleaner syntax for enabling encapsulation: we can make access to our fields read-only or we can add validation for setting them.
        * TLDR: a Property looks like a field from the outside but is really a method within the class.
        * example:
            * ``` get y() { return this._y; } ```
                * a getter method that behaves as a field: ``` console.log(coord.x) ```
            * ``` set y(value) { this._y = value; } } ```
                * a setter method that behaves as a field: ``` coord.x = 1 ```
            * ```constructor(private _x?: number, private _y?: number) {}``` 
                * ```_varName``` is used in the constructor to free up ```varName``` for use in the Property
* Modules
    * TypeScript modules are segments of code that we import into another file
    * example:
        * see ```../exercises/ts-hello/main-modules.ts```
* Facebook Example Exercise:
    * see ```../exercises/ts-hello/exercise-facebook.ts``` for my initial solution
    * see ```../exercises/ts-hello/exercise-facebook-soln.ts``` for Mosh's better solution
* String Formatting
    * ```console.log(`likesCount: ${likeButton.likesCount}, isSelected: ${likeButton.isSelected}`)```
        * ensure that you use backticks instead of ```'' or ""```
* Ternary Operator
    * ``` condition ? exprIfTrue : exprIfFalse ```