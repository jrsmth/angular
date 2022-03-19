let str1 = 'abc';
let endsWithC = str1.endsWith('c');
// TypeScript is comfortable that Str1 is a string
    // hence it suggests string methods that we can call

let any1;
any1 = 'abc';
let endsWithD = str1.endsWith('d'); // no string method suggestion
 
// We can use Type Assertions to enforce 'any1' as a string when we want to access type methods
let endsWithE = (<string> message).endsWith('e');
let alternativeEndsWithE = (message as string).endsWith('e');