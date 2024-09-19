
// a value is a piece of Data...it is the most fundamental unit of information in programming...a value is the smallest unit of information in javascript..we store values in variables sowe can use these values over and over again without having to write the values out each time...we u sotre a value to a variable it is said that u have assigned the value to a variable.

//methods of declaring variables;
// camocase notation: let firstNamePerson...standard
// let first_Name_Person...other programming language
// rules for declaring variabes:
// do not start a variable with a number e.g let 3years = 3.
//variable names can only contain letters underscore numbers and the dollar sign.
//variable names cannot contain reserve keys words like new, function, name(legal..could be used but may cause mix up so use with other words or add a sign at the beginning ) etc..
//do not start a variable name with cap except on specific use case programming like object programming..
//variables all in uppercase are reserve for constance that will never change e.g let PI = '3.115'
//variable name should suffciently describe describe its value...readers should be able to makesense of the variable and its value.

//values can be classified into 7 different data type:
/*...it is the value that holds d datatype
there are 2 data types viz:
1. objects
2. primitive (others)..there are 7 primitive data types viz: Number,strings...
*/

//number data type: in js all numbers are one and same i.e intergers and decimals constitute numbers in js...so what we have in js is called floating point numbers, all numbers have decimals.
/* 
strings are sequence of characters...it is use for text...always put them in quotes, double or single...so that js donot read themas variables

boolean...it is a data type that takes either true or false as its value.it is used for decision making in js....the console registers it pink/purple in the browser

undefined value...it is a data type for variables that have not yet been defined. it is an empty value. it exist whenever we declare an undefined variable(one without a value)...both its value in the console and its typeof on the console are both undefined i.e it is both the value and the typeof of the value...e.g let children;
it is different from all other data type in this respect

null...it is also an empty value but used when undefined is not used('').

Symbol...it is a value that is unique and cannot be changed/altered.

BigInt...number values/intergers that are too large for the number datatype to hold...it is just another type of number.

js determines the data type of the values declared for variables automtically, we do not manully define it i.e dynamic typing
*/

//typeof operator...it is used to instruct the console on the data type to display based on the declaration made or if no declaration is made, just input any legal value and the console will display the data type ...to use it you log it, then inside the log u define the operator typeof then the value made in the declaration you wish the console to display the data type for you): type...console.log(typeof value)

/* 
let jsisfun = true;...declaration (data type-boolean)
console.log(jsisfun);...register variable in console,onsole will display value i.e true
console.log(typeof true)..opertor instruct console to display the data type of true (value)...
result from console should be:
true
boolean
*/

/*
changing the value of a variable: (e.g changing the value of sex from male to female)
1. declare the initial value of the variable in a declaration
2. change the variable value   
e.g
let sex = 'male' [declred new vrible with new value]

sex = 'female' [declared new value for existing variable thus changing the varibles value]

let bfc = "messi";
bfc = "cr";

console.log(bfc);

console displyed cr.

also note if the values are of different data type, when we use typeof operator the console will only display the data type of the new value.
the typeof operator when used on a value gives us a string value which represents the datatype of the value the operator acts on.

*/

//declaring variables in js...there re 3 wys to do this
/*
const, let, var
const is the modern way of declaring variable...use const wen the value of the variable will likely not change in ur program, its value is immuteable or unchangeable 
var is the old way of declaring variable it works like 'let' as u can change its value later,  
we use let when we wnat to change the value of the variable later...it is a modern way of declaring variable too.
*/

//opertors...it allows us transform values or combine multiple values...
/*
types of operators;
arithmetic/mathematical operators;













*/
