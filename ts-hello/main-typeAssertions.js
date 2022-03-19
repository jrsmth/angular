var str1 = 'abc';
var endsWithC = str1.endsWith('c');
// TypeScript is comfortable that Str1 is a string
// hence it suggests string methods that we can call
var any1;
any1 = 'abc';
var endsWithD = str1.endsWith('d'); // no string method suggestion
// We can use Type Assertions to enforce 'any1' as a string when we want to access type methods
var endsWithE = message.endsWith('e');
var alternativeEndsWithE = message.endsWith('e');
