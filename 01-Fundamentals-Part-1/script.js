/*
let js = "amazing";
console.log(40 + 8 + 23 - 10);


let javascriptIsFun = true;
console.log(javascriptIsFun);

//console.log(typeof true)
console.log(typeof javascriptIsFun);
//console.log(typeof 23)
//console.log(typeof 'Jonas');

javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);

let year; // undefined value
console.log(year);
console.log(typeof year); //undefined type of

year = 1991; //changing the value of the year variable
console.log(typeof year);

// bug in js for data type null...the console of the browser should return null as both the type but it returns object, this is  bug not corrected for legacy reason
console.log(typeof null);


//declaring variables in css

let age = 30;
age = 31; //mutated variable

const birthYear = 1991;
// birthYear = 1990; //immutable variable...changing it doesnt work
//const job; //constant variable cannot be empty.

var job = "programmer"; //old way of declaring variable...never use var
job = "teacher";
*/
// lastName = "zane";
// console.log(lastName); //asign a const to the variable if not u get an initialization error in the console.



//lesson 13 Opertors...it allows us transform values or combine multiple values..types of operators..logical,comparison,assignment,mathematical operators.

//mathematical opertors
/*
let now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah); //logging multiple variables at once
console.log(ageJonas * 2, ageJonas / 10, 2 ** 3); // the console  will work on the variables as insturcted using operators inside the console
// 2 ** 3 means 2 rise to power of 3...

//concatinating/merging strings using the + operator.
const firstName = "Jonas";
const lastName = "Schmedtmann";
console.log(firstName + lastName); //to concatenate strings i.return two strings to one big string in the console...the console will render the result as one string i.e JonasSchedtmann in the browser console.
console.log(firstName + " " + lastName); // to create  space and make the console render 2 sting instead of one combined string...we used an empty space...a better way to do this is a template string.


// assignment operators
let x = 10 + 5; //15
x += 10; //meaning x = x + 10 = 25
x *= 4; //x= x * 4 = 100
x++; //x = x + 1 ---x++ means add 1,x-- means subtract 1
x--; // x = x - 1
x--;
console.log(x);

// //comparison operators....its result is a boolean value because it compares the values of two or more variables holding a true or false result for its comparison
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;
console.log(isFullAge);

console.log(now - 1991 > now - 2018);
console.log(ageJonas > ageSarah);
*/


// lesson 14: operator precedence........the hierarchy of how js solves/operates eqautions-check mdn website js oerator precedence study it and understand it
// in your command, the operations are solved by js according to the ranking of the signs in the precedence table, sign with higher ranking are first solve according to their rule i.e left to right or right to left, before moving to igns with lower table ranking
// let now = 2037;
// const ageJonas = now - 1991;
// const ageSarah = now - 2018;

// console.log(now - 1991 > now - 2018);

// let x, y;
// x = y = 25 - 10 - 5;
// console.log(x, y);
// x=y=10, y=10, then x=10..we solved right to left in a logical manner..js solves minus operator first from left to right which gives 10,
//then = operator from right to left. if the = operator works from left to right, then x=y will be treated first which will give us an undefined value as seen in the declaration, then y=10

// using group/parenthesis/bracket operators
// const averageAge = (ageJonas + ageSarah) / 2;
// console.log(ageJonas, ageSarah, averageAge);
//we had to use bracket here bcos without it js will fist divide ageSarah then add agejonas which give a wrong average age,bcos division has a higher precedence to addition,
//so with bracket addition is solved first as the bracket has the highest precedence,and js forced to solve the bracket bfor division

//coding challenge 1...1st attempt
//task 1 data 1
// const markHeight = "1.69";
// const markWeight = "78";
// const johnHeight = "1.95";
// const johnWeight = "92";
//data 2
// const markHeight = "1.88";
// const markWeight = "95";
// const johnHeight = "1.76";
// const johnWeight = "85";
// console.log(markHeight, markWeight, johnHeight, johnWeight);

// //task 2
// const markBMI = markWeight / markHeight ** 2;
// console.log(markBMI);

// const johnBMI = johnWeight / johnHeight ** 2;
// console.log(johnBMI);

// //task 3
// const markhigherBMI = markBMI > johnBMI;
// console.log(markhigherBMI);

// //jonas solution
// const massMark = 78;
// const heightMark = 1.69; // meters
// const massJohn = 92;
// const heightJohn = 1.95;

// const BMIMark = massMark / (heightMark * heightMark);
// const BMIJohn = massJohn / (heightJohn * heightJohn);

// const markHigherBMI = BMIMark > BMIJohn;
// console.log(BMIMark, BMIJohn, markHigherBMI);



//lesson 17 strings and temperate literals...u can use the plus opeation to buildstrings or use the temperate literal.
/* 
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;
*/

// making a string i.e combining multiple values to one be value/sentence in the console.
/*
method 1: concatination(+)
const jonas =
"I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
console.log(jonas);
//method 2: (``) and place holders
temperte literals, u use ${variables} placeholder here
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

method 3: `` and direct typing withou no placeholder.
console.log(`Just a regular string...`);
const jonasNew = `I'm Jonas, a 46 year old teacher!` //simpler, use this method
console.log(jonasNew);
*/


//writing multiple strings...there are two ways using the old js method or using backticks:
// old method..using linebreaks \n\
/*
console.log('string with \n\
multiple \n\
lines');  //oldway, u create line breaks using the \n\

console.log(`String with 
multiple
lines`); //new simpler way, use `` and enter key to create line breaks/multiple string
*/



//lesson 18...taking decisions...if/else statements
/*
if () {

  } else {

}.............

*/

/*
if (condition - boolean value) {
console.log(execute code if condition is true, if condition is false no result is returned on the browser console); 
}
*/

/*
const age = 19;
const isOldEnough = age >= 18 // isOldenough value here is either 18 or higher

if (isOldEnough) {
    console.log('Sarah can start driving lincense 🚗');
}
//in practice the condition is written directly and not declared as a const first, thus
const age = 19;

if (age >= 18) {
    console.log('Sarah can start driving lincense 🚗');
}
*/

//adding and else function where condition is not true...this instructs the console to execute the else function in place of the if function....if true console execute, else condition is false console execute else
 
/* 
const age = 15;

if (age>= 18) {
    console.log('Sarah can start driving lincense 🚗');
} else {
    const yearsLeft = 18 - age; //defining the value of the placeholder in the console string
    console.log(`Sarah is too young. Wait another ${yearsLeft} years:)`);  
}
the if else statement seen above is called a control structure...bcos it controls js on hw it should run the code, instead of line by line running js only runs the code that satifies the set condition... 
*/

//2nd example,...instead of console logging the result of the ifelse statement we stored the result in a varable and we let the browser console return the value of the variable(if/else statement)..ie instead of writing console log inside the if else funtion we took it outside by first declaring a variable that will store the if else value then we console log. both he variable and the consolelog should be out of the if else statement block..note the example below.

//the console ruturns the value of the variable in the browser, so instead of console logging a string value inside the if else statement we created an empty variable and assigned the value of the statement to this variable then console log the variable outside the statement which will make the browser console return it...

// first, define the variable u want to console with an empty value outside the code block / function always

//always define variables u declare inside the if else statemnt code block outside of the block first bcos any declared inside of the block cannot be reached outisde of the block by the console log function
/*
const birthYear = 2012;
let century; 
if (birthYear <= 2000) {
    century = 20;
} else{
    century = 21;
}
console.log(century);
*/



//lesson 20 type conversion(manual, by u...explicitly) and coercion(automatic, by js..hidden)...conversion can be to number, string and boolean only.

//example...converting string to number...take notes of the data type colors in the console log...string is white, number is purple
//tpe conversion,i.e, manual
// const inputYear = '1991'
// console.log(inputYear + 18); //js will concatenate this and the browser console will read 199118 bcos the input year is a string...to convert the value from string to  number and let js add them up....
// console.log(Number(inputYear) + 18,); ..the original value is still a string...note, the string is only converted in the console function.

// console.log(Number('Jonas')); //gives NaN i.e invalid number...js produces Not a Number (NAN) whenever we use the number function to carryout an conversion operation on a string that does not contain a number...it cannot convert such.

// console.log(typeof NaN); //to show NaN is a number in console log..invalid number.
// console.log(String(23), 23); //converted from number to string in the browser console.

/*..clean code
const inputYear = '1991'
console.log(inputYear + 18);
console.log(Number(inputYear) + 18,, inputYear);
console.log(Number(inputYear) + 18,);

console.log(Number('Jonas'));
console.log(typeof NaN); 

console.log(String(23), 23);
*/

// //type coercion i.e, automated datatype conversion by js...it happens when an operator deals with two values that are of different types,the js converts one to the other to make the operation work.
// console.log('I am ' + 23 + 'years old'); // here number and string combine...the console results in a string sentence. the + operation changes the number to string...same aplies in temperate literal i.e converts numbers to string..

// console.log('23' - '10' - 3);  //results in 10...a number, the minus operator converts from string to number
// console.log('23' + '10' + 3);  //results in 23103-a concatenated string, the plus operator converts the number to a string
// console.log('23' * '2'); //results in 46-a number the multiplication operator converts strings to numbers
// console.log('23' / '2'); //results in 11.5-a number the division operator converts strings to numbers.

// let n = '1' + 1; //results in the string '11'...number to concatenated string
// n = n - 1;  //results in 10 i.e '11'-1....string to number
// console.log(n);

// //2+3+4+'5'='95', '10'-'4'-'3'-2+'5'= '15'.....+converts to string..note

/*clean code
console.log('I am ' + 23 + 'years old');
console.log('23' - '10' - 3);
console.log('23' + '10' + 3);
console.log('23' * '2'); 
console.log('23' / '2');

let n = '1' + 1;
n = n - 1;
console.log(n);
*/



//lesson 21...truthy and falsy logic
//falsy values are values that originally not false but will turn false when the value is coverted to a boalean type...there are 5 falsy values viz: 0, ''(empty string), undefined, null,NaN....it is done automated by js in 2 situations...when we use the if and else functions and when using logical operators...boolean conversion is mostly done by js itself i.e coercion.

// console.log(Boolean(0));  //results false...any number not 0 = true
// console.log(Boolean(undefined)); //results false...the variable has not been defined yet so logically its value at that point is false
// console.log(Boolean('Jonas')); //results true...any string not empty coverted = true
// console.log(Boolean({})); //results true..empty object converted to boolean = true
// console.log(Boolean('')); //results false...empty string converted to boolean = false
// //in the above 0, undefined, jonas, {}, '', are all not false values i.e boolean values but they resulted in a true or false value(boolean datatype) when converted to boolen type.

// //if else operation...here the condition operator coverts the variable value to either a truthy or falsy value then executes the function it got
// //0 is falsy ... the operator-(money) will convert the value of the money variable to a truthy or falsy value then execute the false (else) function...we changed  the value to 100 later...the if function will be runned bcos the number is a true result.
// const money = 100;
// if (money) {
//     console.log("Dont't spend it all")
// } else {
//     console.log('You should get a job!');
// }

// let height = 0; //falsy...condition converts the undefined value to Boolean type..which is a false value..so the opeator runs the else function....same applies to height; i.e undefined
// if (height) {
//     console.log('YAY! Height is defined');
// } else {
//     console.log('Height is UNDEFINED')
// }
//note: the if function is supposed to be runned and not else function bcos 0 is a valid number for height...js should have read 0 as a number and run the true/if funtion...this wasnt done bcos of a bug in the js application...in this situaion we use logical opeartors to solve it.

/*..clean code
console.log(Boolean(0));
console.log(Boolean(undefined)); 
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean('')); 

const money = 100;
if (money) {
   console.log("Dont't spend it all")
} else {
    console.log('You should get a job!');
}

let height = 0;
if (height) {
   console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED')

} 
*/



//lesson 22...equality operators, == vs ===
// == (i.e loose equality operator...performs type coercion...it coverts string to numbers,)
// ===(i.e strict equality opertor...returns condition as true if varable value exactly equals the condition...it does not perform type coercion/conversion...only checks if condition satisfies declared value )
//18===18....true
//18===19....flase
// '18'===18...false
// '18 == 18...true.


//if the condition is exactly equal to the declared value js executes the true function in the console...ie the condition is true as 18 === 18
//const age = 18;
//if (age === 18) console.log('You just became an adult:D');  //u can omit the function sign-curly brace where the condition operator is just one i.e either just if or else statement is written and not both at the same time...

// '8' == 8, boolen type in console is true which means == has converted the string to number so both the string and number are the same i.e numbers when opearte by the loose opeartor. '8' === 8, boolean type in console false i.e the string is not converted to a number so they are not the same or exactly equal to each other. === does not convert string to numbers. with loose operator u can declare in string and set condition to number and the true function will be executed i.e the condition will convert the string to number then execute. this will not work for strict operator
// const age = '18';
// if (age === 18) console.log('You just became an adult:D(strict)'); //=== does not convert string to number so it does not run the true function nd thus gives no result in the console...i.e the value of the operation is false.
// if (age == 18)console.log('You just became an adult:D(loose)'); //the == operator converts the declared value-string to number then run it as true i.e '18'==18...gives  true result in the console


/*
 const favourite = prompt('What is your favourite number?'); //the declared value is inputed through the webpage prompt input..note the '' which will mke the input a string...we converted from string to number using Number(('string'))
/console.log(favourite); //'23'
console.log(typeof favourite) //displays data type in console log i.e string

//if condtions loosely equals prompt value execute function
if (favourite == 23) {
    console.log('Cool! 23 is an amazing number!'); //'23'==23, using === wont work so we had to manually convert '23' to a number ....alwys use ===.
}
*/


/*
//converting the prompt string to number manually  in order to use ===
const favourite = Number(prompt('What is your favourite number?')); //prompt in number data type
console.log(typeof favourite)

if (favourite === 23) {
    console.log('Cool! 23 is an amazing number!')
}
*/

//creating multiple if functions bfor else...here js first check if any(all) of the true condition is met bfor executing else function.
/*
const favourite = Number(prompt('What is your favourite number?')); //prompt in number data type
console.log(typeof favourite)

if (favourite === 23) {
    console.log('Cool! 23 is an amazing number!')
} else if (favourite === 7) {
    console.log('Cool! 7 is an amazing number!')
} else if (favourite === 9) {
    console.log('Cool! 9 is an amazing number!')
} else {
    console.log('Number is not 23 or 7 or 9')
}
if (favourite !== 23) console.log('Why not 23?');
*/
 //i.e favourite is strictly different from 23 console executes why not 23. if prompt is 23, then console wont execute this function.
//the different operator..it pplies to both the loose operator(!=) and strict operator(!==)




//lesson 23...basic boolean logic...the and(&&), or(||), not(!) operator...logical operators in js

//if a is true, not a is false,
//if a is true, b is true, and will be true.....and will be false if any of both variable is false
//if either a or b is true, or is true.......or is true if both variable is true....orisfalse only if both a and b is false together

// const hasDriversLincense = true; //A
// const hasGoodVision = true; //B

// console.log(hasDriversLincense && hasGoodVision);
// console.log(hasDriversLincense || hasGoodVision);
// console.log(!hasDriversLincense); //renders true as false and false as true...not operator

// //creating a model using the above input
// /*
// if (hasDriversLincense && hasGoodVision) {
//     console.log('Sarah is able to drive!');
// } else {
//     console.log('Someone else should drive...')
// } //where the if condition/2 variables are true execute if in d console, where any of the 2 variable declared is false execute else..
// */


// const isTired = false; // C
// console.log(hasDriversLincense && hasGoodVision && isTired);

// if (hasDriversLincense && hasGoodVision && !isTired) {
//     console.log('Sarah is able to drive');
// } else {
//     console.log('Someone else should drive')
// }




// the switch statement....used when we want to run different options/conditions for just one same variable value...it compares the case to the variable value, then strictly execute case function where true i.e case =value.... if not switch to next cases executing any that === value, where no case strictly equals value, the default case function will be executed....note how d syntax for switch sttement is different from if and or statement

// const day = 'friday';

// switch (day) {
//     case 'monday': //day === 'monday'
//         console.log('Plan course structure');
//         console.log('Go to coding meetup');
//         break;
//     case 'tuesday':
//         console.log('prepare theory videos');
//         break;
//     case 'wednesday':
//     case 'thursday':
//         console.log('write code examples');
//         break;
//     case 'friday':
//         console.log('record videos');
//         break;
//     case 'saturday':
//     case 'sunday':
//         console.log('Enjoy the weekend :D');
//         break;
//     default:
//         console.log('Not a valid day!');
// }
   

//const day = 'friday';

// if (day === 'monday') {//use strict equality for switch.
//     console.log('Plan course structure')
//     console.log('Go to coding meetup')
// } else if (day === 'tuesday') {
//     console.log('prepare theory videos');
// } else if (day === 'wednesday'|| day==='thursday') {
//     console.log('write code examples');
// } else if (day === 'friday') {
//     console.log('record videos');
// } else if (day === 'saturday' || day==='sunday') {
//     console.log('Enjoy the weekend :D');
// } else {
//     console.log('Not a valid day!');
// }




//...statements and expression
// an expression is a piece of code that will produced a value by js when executed
// statement is a bigger piece of code that does not produce a value on itself when run by js. the bigger piece of code may contain expression but it cannot be executed by js to produce a value. e.g

// if (23 > 10) {
//     const statement = '23 is bigger'
// }...by declaring avariable inside the operator function we change thefunction from and expression to a statement.

//...this is a statement as the console browser will contain no value.
// statements helps us instruct js on the program to perform...statemnts end in semi colon.
// the console only accepts expression. it never accepts statement bcos statements do not produced values wen executed. only expressions produce value when executed by js.

// NOTE VERY IMPORTANT...statements are also declarations. JS CONSOLE LOG DOES NOT EXECUTE DECLARATION.
// AN operator/operation is a expression. operators produce value when executed by js.



//the conditional (Ternary) Operator...it allows us write codes similar to if statements but in one line. the state will have one condition, a question mark (true), a column (false) two console log with js executing the console log that satisfies the condition and value declared..either true or false...the operator has 3 part,the condition, the if(true, ?),and the else(false, :) part...this operator originally is an expression as it returns a value by itself when console log.

//const age = 23;
//age >= 18 ? console.log('I like to drink wine ..🍷') : console.log('I like to drink water 💦');...here we directly return the value of the operator to the broswer console as the operator is an expression...

//changing the ternary operation from expression to statemnt/declaration...here we first store the value of the ternary operation to a declared variable[if or else], then we console log the variable which will then return the stored value of the operation...but everything is simply given as this single line of code...the power of ternary operation.
// const age = 23;
// const drink = age >= 18 ? 'wine 🍷' : 'water 💦'; //drink stores the operation value
// console.log(drink); //drink returns the value stored.

// step one, declare the age variable, then write the ternary operation (value) ..line 422 & 428
// age >= 18 ? 'wine 🍷' : 'water 💦'; //ternary operator
//step 2, change the operation to a statement by adding a new variable to the ternary operator thus forming a declaration...
//const drink = age >= 18 ? 'wine 🍷' : 'water 💦'; // transformed statement
//step 3, we console the variable in the transformed statement to produce a value...
//console.log(drink);


//using if statement it would have been...this method is longer

const age = 23;
if (age >= 18) {
   drink = 'wine 🍷'
} else {
    drink = 'water 💦'
}
console.log(drink)

//since the console log only execute value we can place the ternary statment in it and js will execute using the placeholder ${}...placing if statemnts inside the placeholder does not work bcos if statements are not expressions i.e produce values by itself...i.e using the ternary condition  on template leteral...line 143
// const age = 23;
// console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💦' }`); //notice the `` key.

//use operationl operators where u need short line of Code..check assignment.js line 99

