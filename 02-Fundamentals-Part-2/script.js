///////////////////////////////////////////////////////////
///////////////////****lESSON 33*****//////////////////////

//FUNCTION DECLARATION.
/*
functions.....a function is a reuseable line of code applicable in different parts of the js file...the function syntax consist of:
1.function keyword,
2.the function name,
3.function parameters/()[a parameter is a variable specific to the function...they represent the input data of the function...when defined their values are called variable arguements...they are defined when u give the function name values at the point of invoking the function... and
4.the function buddy(the line of code to be executed when the function is run)...
NB: to reuse / invoke / call / run the function simply rewrite the function name and input the values we want procesed for the parameter...we use the function name to invoke/call/execute the function at a later time.
*/

/*
function logger() {
  console.log('My name is Jonas');
}

//calling the function will simply make js run the function buddy and return the value inside it.
logger();
logger();
logger();
*/

//THE BASIC IDEA OF FUNCTION IS THAT YOU CAN WRITE MANY LINES OF STATEMENT YET YOU WILL GET A SINGLE VALUE WHICH COMBINES THESE DIFFERENT STATEMENTS....
//personal example to understand function
//steps: write function key, write function name, set parameters, write the function buddy, then call the function...
//personal example:
/*
function fruitProcessor (sammy, zane) {
  const juice = `Juice with ${sammy} sammy and ${zane} zane.`; //
  return juice
}
const applejuice = fruitProcessor(5, 0)
console.log(fruitProcessor(5, 8));
*/

//now we simply made the function more complex by adding parameters, placeholders...
/*
function fruitProcessor(apples, oranges) {  //the parameters are the input, this input will be set or defined at the point of calling  the function.
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`; //the processor
  return juice; //to make the juice string value the result of calling the function...we could have returned any of the placeholder as the value of calling the string too...
}

fruitProcessor(5, 0); //the processor/juice function will process the string value but only with the parameter arguements...so the final output/value/result of the function will be a blend of the juice value and the parament arguement...
const appleJuice = fruitProcessor(5, 0); //assign the final output/value of the function to a variable which represent the whole function process...
console.log(appleJuice) //console log this variable to enable the browser display the result....method 1
//console.log(juice)//...this is the result of assigning the final value to the juice variable and logging the juice variable to the console. this makes the console register it...check video
console.log(fruitProcessor(5,0))//...this is the result of logging the function into the console directly...method 2
*/

//clean code for this function topic. just go through top to understand the concept. its not well arranged up there.
//simple function without parameter and return...i.e the function has no value. we make use of this kind of empty function where there is a block of code we want to reuse at intervals..we do not save empty functions(function without parameters) to variables unlike the applejuice for the fruitprocessor function bcos empty function produces no value... we log the code inside the function body and call it when necessary like the string below
/*
//empty function
function logger() {
  console.log('My name is Jonas');
}
logger();
logger();
logger();
*/

/*
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);...everything above is a function which produces a value. we store this value in the applejuice variable then log the variable.
console.log(appleJuice);
const appleOrangeJuice = fruitProcessor(5, 8);
console.log(appleOrangeJuice);
*/
//explaining the clean code logically....very simple to understand the steps:..input, function-body, output.
// step 1...function key, function name and parameter(input)...
//step 2...{
// create the function body...(its string value incoporates the parameter arguement to provide the final value of the processor..., return juice(let js produce the final value of the process)
//}
//step 3...console log the final value of the function to the browser, setting the desired input value for the parameter here.

/*
//personal example
function propertyProcessor(houses, cars) { //set function nme and input prmeter...
  const property = `I have ${houses} houses and ${cars} cars!.`;  // declare process..
  return property; //...return the value of the process
}
console.log(propertyProcessor(3, 4));
console.log(propertyProcessor(10, 25));
*/
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
///////////////////****lESSON 34*****//////////////////////
//LESSON 34. Functional declaration vs functional expression...u can call a function in f.d before u define the function(place the calling function on top of the called function)...but in f.e u must first define the expression bfor u call the function.

//using functional declaration to determine present age
/*
const age1 = calcAge1(1991); //calling the function...

function calcAge1(birthYear) { //called function...calAge1 will hold the final value of this function....
const age = 2037 - birthYear; // the processor
return age;
}
// or 
function calcAge1(birthYear) { //called function...calAge1 will hold the final value of this function.
  return 2037 - birthYear //this simply gives us the final value of the process.here we did not store the value of the processor in any variable.the function names(calcAge1) stores it directly.
}
// console.log(age1); //
*/

// //functional expression..this is a function without a function name ...it is an anonymous function...it has almost the same syntax with functional declaration but it uses the equal to sign. this makes it an expression...in using it just make a normal variable declaration...the variable is 'the function name' and the value of the variable will be function key, parameters and {the return command}i.e the whole process...
/* syntax of function expression...
const variable = value/function expression which produce a value.
*/

//using functional expression to determine current age...
/*
//called function
const calcAge2 = function (birthYear) { // variable declaration and value
  return 2037 - birthYear; //return command
}
const age2 = calcAge2(1991); //the variable calling the function
console.log(age2); //returning the calling function.
*/

// clean code
/*
const age1 = calcAge1(1991); //place the variable taht calls the function first.

//function declaration...called function
function calcAge1 (birthYear) {
 return 2037 - birthYear;
}
// console.log(age1);
// or
// console.log(age1);

// //function expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear
}
const age2 = calcAge2(1991);
console.log(age1, age2);
*/
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
///////////////////****lESSON 35*****//////////////////////

//...arrow function...a shorter form of function expression...it is a special form of function expression which is faster to write.it has a const variable and a value which is the function and its return happen implicitly...u do not have to write it out. the function result returns itself. all this aplies to simple arrow function.

//simplest form of arrow function... one line of code...one parameter..u can omit the bracket of the parameter if it is just one parameter only
/*
const calcAge3 = birthYear => 2037 - birthYear; //called function
const age3 = calcAge3(1991)//the age3 variable calling the function..
console.log(age3);
*/

//calculating how many years a person has left before retirement..u first need to ascertain age, then retirement age less age.
/*
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear; // get age ...46
  const retirement = 65 - age;  // get retirement age left
  // return retirement; //return the retirement age left...yearsUntilRetirement variable will hold whatever is returned as the final value of the processor.
  return `${firstName} retire in ${retirement} years` //return gives us the message that will be in the broswer console.
}
console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));
console.log(yearsUntilRetirement(1991)); //here we did not declare a variable to store the value of the function bcos we used an arrow function which already has a variable that store its function value, we simply console log this variable..
*/
//note: we can decide to console log the function variable/function name directly to the browser console or we can decide to store the function variable/function name to a new variable then console log that variable to the browser...but we just have to know that the function name/variable holds the returned value of the function process.

//lesson 35 function calling other function...note a function  can call on another function, likewise a variable declared can call on a function as its value(bcos a function is essentially a value itself.)...thus using the value of the called function as its value....check assignment line 155
/*
//called function
function cutPieces(fruit) { //the parameter arguement of the calling function is the set parameter/input data for the called function each time it is called...
  return fruit * 4; //the value of this called function process is 4 times its set parameter
}

//calling function
function fruitProcessor(apple, orange) { //the parameter arguements 2,3...the function name stores whatever is returned as the value of the function process
  const applePieces = cutPieces(apple);//1st arguement the called function parameter will take the set parameter value of the calling function and process it each time it is called.
  const orangePieces = cutPieces(orange);//invoking the called funtion with the second arguement...

  const juice = `juice with ${applePieces} peice of apple and ${orangePieces} pieces of orange`; //the placeholder represents the value stored in the variables as set in the calling function
  return juice;
}
console.log(fruitProcessor(2, 3));//final value of the fruit processor (string+placeholder value)...
*/
//how function calling function work...it works from the bottom to top then top to bottom...the parameter arguement set the input data of the calling function parameter, the called parameter then takes up this data and processes it then returns a value that the called function name stores...the calling function variables then store this value...the calling function returns the string value which combines the placeholders and the set text...the placeholders holds the value the calling function variable stores...the calling function is console logged and it displays the return...

/*
note: you can decide to return the juice string directly instead of first storing string to a juice variable first, then returning that variable...i, e u can say:
return `juice with ${applePieces} peice of apple and ${orangePieces} pieces of orange`; instead of 
const juice = `juice with ${applePieces} peice of apple and ${orangePieces} pieces of orange`; //the placeholder represents the value stored in the variables as set in the calling function
return juice;
*/
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
///////////////////****lESSON 36*****//////////////////////

//function review...
//  const yearsUntilRetirement = (birthYear, firstName) => {
//     const age = 2037 - birthYear; // get age ...46
//     const retirement = 65 - age;  // get retirement age left
//    // return retirement; //return the retirement age left...i.e the result of the process
//     return `${firstName} retires in ${retirement} years`
// }

//converting the arrow function above to normal function expression...
//we broke the arrow function to functon calling another function

/*
// called function
const calcAge = function (birthYear) {
  return 2037 - birthYear;
}

//calling function
const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear)
  const retirement = 65 - age;  // get retirement age left
        
  if (retirement > 0) { //if retirement is from 1 to any positive number...not retired
    console.log(`${firstName} retires in ${retirement} years`); //this is a function which produces a string that will be displayed in the console were the if condition is true...
    return retirement; //return the retirement age left...i.e the result of the process..we applied true or false condition to determine the final value the function process will bring
  } else {
    console.log(`${firstName} has already retired!.`); //this is a function which produces a string that will be displayed in the console were the if condition is false...
    return -1; //-1 represents any negative retirement number
  }
  
}
console.log(yearsUntilRetirement(1991, 'Jonas'));// this displays the final value of the whole function process which in this case is a number
console.log(yearsUntilRetirement(1950, 'Zane'));
*/
//in the above we introduced conditional statement inside the calling function. bfor either of the 2 function value is returned the set condtion is considered...also in the broswer console a string sentence is returned and a number value is returned as the final value of the calling function.

//the parameter arguement of the calling function will be the set parameter of the called function...the variable of the called function stores it final value and this will be the value of the age variable in the calling function...always place the temperate literal on top of/ before the the return value when u use if or else statement inside a function declaration. this is because js will read the whole function and stop immediately it processes the if statement and returns the value of the conditonal statement that satisfies the value of the declared variable. if the temperate literal line of code is after the return command then js will fail to process it. so always place the temperate literal before the if statement in this situation....

// // challenge 5
// const calcAverage = (a, b, c) => (a + b + c)/3;  // no curly braces no return command.
// console.log(calcAverage(3, 4, 5));

// //creating two variables which call on the arrow function to get their values..this variablle value will be called on as the parameter arguements for the checkwinner function...
// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolphins, scoreKoalas);

// const checkWinner = function (avgDolphins, avgKoalas) {
//     if (avgDolphins >= 2 * avgKoalas) {
//         console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//     } else if (avgKoalas >= 2 * avgDolphins) {
//         console.log(`Koalas wins (${angKoalas} vs. ${avgDolphins})`);
//     } else {
//         console.log(`No team wins...`);
//     }
// }

// checkWinner(scoreDolphins, scoreKoalas);//instead of using any average numbers as parameter arguements, we first created a function that calculates averages, then we declared 2 variables that calls on this function with sets of numbers whose average we wanted...the called function processed the number and returned an average as intended and the variables then holds the calculated average as its value...we then placed the declared variable which now holds the average as the arguement for the checkwinner function.
// checkWinner(576, 111);

// //test 2
// scoreDolphins = calcAverage(85, 54, 41);
// scoreKoalas = calcAverage(23, 34, 27);
// console.log(scoreDolphins, scoreKoalas);
// checkWinner(scoreDolphins, scoreKoalas);
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
///////////////////****lESSON 39*****//////////////////////
// // intro to arrays...an array contains data with their ranking starting from 0 to 1 to 2 and so.....
/*
// const friend1 = 'Michael';
// const friend2 = 'Steven';
// const friend = 'Peter';

//creating arrays...method 1 ...using []

const friends = ['Michael', 'Steven', 'Peter']; //creating the array...string comma space...literal syntax
console.log(friends);

//method 2...using new Array()
const y = new Array(1991, 1984, 2008, 2020);
console.log(y);
//taking out/retrieving a value from the array...we use the  square bracket.
console.log(friends[0]);//the console will display only the first value in the friends array.
console.log(friends[2]);//the console will display the third value in the array.
*/

/*
//to get the number of values/items in an array...this number does not start from zero, note.
console.log(friends.length); //the .length gives us the total number of items inside d array

//u can retrieve the last item in the array without knowing the number of items in it...
console.log(friends[friends.length - 1]); // total rank less 1 gives rank of last item rank/position...the 2 content of the squared bracket are expressions which returns last rank of jonas array...only expression go in there...

//replacing items in the arrays with new values...chaning/mutating the array
friends[2] = 'Jay'; //Jay should replace the 3rd item in the friends array...
console.log(friends);

//an array value is not a primative value so it can be changed even if the array was declared using const...we cannot replace all the items in an array at once
//friends =['Bob', 'Alice'];...cannot work as this will make all items in the arrray change.


//array can hold values of different data type at the same time..
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends]; //variable, string, operator, string, array.
console.log(jonas);
console.log(jonas.length); //the number of items in the jonas array
*/

/*
//Array Exercise...

//we have an array of birthyear, and we want to calculate ages for some of them and save these ages to a new array..
//step 1..create a function that calculates age, this function will be called later by the calling/calcAge function that has age as its variable. this calcAge function with sets its parameter
const calcAge = function (birthYear) {
  return 2037 - birthYear;
}

//to calculate age we need to declare a variable(age) which calls on the above function. the age variable will use the array item rank as its arguement, so that wen it calls, the function will use the array value chosen as its input for birthYear.

const years = [1990, 1967, 2002, 2010, 2018]; //array of birthYear

//a function with variable age, it calls on the caLcAge function to get its value..its arguement is a value stored in an array..this looks like the checkWinner function in challenge 5.
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]); //getting the age of the last item.
//we cannot carryout operations on the array as a whole but we can calculate using each individual array item at a time...we can get each age at a time like above but not all the ages with one function calling on all the values/items of the array all at the same time.

console.log(age1, age2, age3);

//we want to place the calculated ages is a new array, but the array cannot accept the age variable, so we must use an expression. the value of the age variable is...so we used it. the array will compute and give us the final age in the console...i.e we placed function calls into the array

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])]; 
console.log(ages);
*/
//////////////////////////////////////////////////
////////////////////////////////////////////////

///////////////////////////////////////////////////////////
///////////////////****lESSON 40*****//////////////////////
//.basic array operations...array method involves building functions u will apply directly on an array....there are different array methods..

//methods for adding array items/elements to an existing array
//1. push method..this is a method used to add an additional item which occupies the LAST position of an existing/called array)...
const friends = ["Michael", "Steven", "Peter"];
const newLength = friends.push("Jay"); //we used the push function to call the friends array and placed the Jay item/value in the array. since the push is a function/expression we can place a call function inside its placeholder...e.g friends.push('calcAge(years[0])'); we declared  its variable bcos this variable stores the length of the mutated array.
console.log(friends);
console.log(newLength); //to display the number of items in the new friends array...the variable of the push function stores the new array length value. so we had to console log it.

//2. unshift method..this is use to add new array item to the BEGINNING of the existing/called array.

friends.unshift("John");
console.log(friends);
// to know the length of the mutated array we save the unshift function to a variable and then console log it like above...

//removing array items/elements
//pop method......it removes the last element/item of the array....the pop functiom returns the remove element, to see this removed element/item we declare a variable for pop and log it...see above....pop.()-empty bracket
friends.pop();
const popped = friends.pop(); //repeating it twice removes the last two items in the array
console.log(friends); //to see the array beore it was popped.
console.log(popped); //to know length of new array after deleting the last item

//shift method...removes the first item/element in the array...empty bracket
friends.shift();
console.log(friends);

//indexOf function call...tells us the position an element/item is in the array...
console.log(friends.indexOf("Steven")); //displays the rank of steven in the array on the console....if we call an item that is not in the array we will get -1 as the return in the console....e.g
console.log(friends.indexOf("Bob"));

// includes function call...it affirms or denies the existence of an item/element in the Array. it returns a boolean value(true if the element exist inside the array and false if it doesn't..)...its uses strict equality rule.only recognises value of the same data type as true otherwise false.
friends.push(23); //add an element to the array..
console.log(friends.includes("Steven")); //does the friends array possess steven as a value? if yes return true else false.
console.log(friends.includes("Bob"));
console.log(friends.includes(23)); //if the placeholder value is the same data type as the value which it tries to confirm its existence it will return true otherwise false. check video.

// we can use the include method to run conditional statements and display a string value based on if the condition is true or not.. but not the true or false values...
if (friends.includes(`Peter`)) {
  console.log(`You have a friend called Peter`);
} //where the condition is not met(false), the string value will not be returned in the console unless we set an else statement. nothing will.

//personal example in the lesson...
if (friends.includes(`Steven`)) {
  console.log(`You have a friend called Steven`);
} //meets condtion...the string value in the console will be returned.

if (friends.includes(`Peter`)) {
  console.log(`You have a friend called Peter`);
} else {
  console.log(`you do not have a friend called Peter`);
} //does not meet condition, i.e false...the false string will be returned.

/*
//challenge...a and b are same...b is arrow function the other (a) is function expression

//method a....creating the machine/processor using function expression
calcTip = function (bill) {
 return bill >= 50 && bill <= 300 ? bill  * 0.15 : bill * 0.2; // return 0.15 or 0.2 of bill
} //returns the calctip value if the condition is met, notice the arguement is called using the bills array item ..i.e return tip for each array item(bill value)....we built a simple machine here which calculates tips. this machine will produce the value for each tip item in the array when the tip variable calls it..

// method b....creating the machine/processor using arrow function..
const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;//...we built a simple machine here which calculates tips.this machine will produce the value for each tip item in the array when the tip variable calls it...arrow function does not contain return if the funtion is a simple one...i.e one parameter(bill)
//we either use a or b...

const bills = [125, 555, 44]; //creating the bills array
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]; //creating the tips array using the calctip machine, the machine gets its input data from the bills array...we called the calctip function inside this array.
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]; //creating the totals array which combines the tip and bill, note how it is araanged, each array item has comma and space.
console.log(bills, tips, totals); //return the bills, tips and totals array..
*/

/*
//this illustrates the totals arrays...an array can carryout operation and combine items of other arrays(1,2 or more) to get its own item, you can also have an array inside of another array...example:
// const sammy = [1, 2, 3, 4];
// const zane = [12, 15, 17];

// const sammyzane = [sammy[0] + zane[2], sammy[2] + zane[0], zane[0] / sammy[2], sammy[1] * sammy[2], [1, 2, 3, 4], [sammy]];
// console.log(sammyzane);
*/
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////
/////////////////***LESSON 42****///////////////
//intro to objects..while array items are referenced by their rank position in the array, object data structure allow us assign a key/variable name/property to a value/item and then we can reference the value/item by their name...the value can be of any data type....

/*
//array
const jonasArray = [ //u can write arrays vertically...
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven']
];
console.log(jonasArray);

//object...we use object to group different variables about a particular concept together...unlike arrays, instead of square braces u use CURLY BRACES to define objects just like u use curly braces to define if, switch or else statements, and function buddies..also in objects the order of ranking the items/property does not matter unlike in arrays where the items are returned based on their position in the array and can only be referenced or accessed based on their rank number, in objects we retireve items simply referencing them by their name/property/key... use array for ordered data and objects for unstructured data.

//method of writing objects
//method 1: object literal syntax...here we write down the entire object content...ie the object names and values.
const jonas = { //this object contains five key-value pairs.
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends:['Michael', 'Peter', 'Steven'],
}
console.log(jonas);
*/
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////
/////////////////***LESSON 43****///////////////

//dot vs bracket notation...retrieving/returning and changing data in objects
/*
const jonas = { //this object contains five key-value pairs.
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
};
console.log(jonas);

//returning the array items in the browser console...
//method 1......to return last name using the dot operator....
console.log(jonas.lastName); 
//....method 2... to return last name using the square bracket which is similar to array...note the square bracket here can accept an operation or expression and return the value of the function, it doesnt just accpet the name string value alone....
console.log(jonas['lastName']); 

//js concatenates the operation in the bracket to give one string value- firstName and lastName which is a property/item in the object jonas then the console returns this property i.e  (jonas['firstName']). this does not work with the dot method. with dot method we use the final property name/real property name as it appears inside the object to return the value, while with square bracket we can use a computed property name to return its value... use bracket notation to return objects values when you do not know which property in the object will be returned....ie the object property has to be chosen first bfor the object is runned. see example below..

const nameKey = 'Name'; //sets a value-name which the nameKey holds.
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);
//console.log(jonas.'last' + nameKey)//will not work
*/

/*
const interestedIn = prompt('what do you want to know about Jonas? choose between firstName, lastName, age, job, and friends');
console.log(jonas[interestedIn]);//where a property inside the jonas object is inputted in the prompt by the user, the console will return the value of that property..
// console.log(jonas.interestedIn);..undefined...when the user inputs a property in the prompt interface that is not part of the properties set/defined in the object.
//we set a variable which will hold any of the jonas object property. we then link the user determined input to the object by using the object variable-jonas  and the square bracket with the prompt variable insides which holds one of the property of jonas object. this will make the console return a property value set in the jonas object based on what is inputted by the user. when the user input a property that does not exist the console returns undefined.

//since the property inputed is either correct(true) or incorrect(false) we can apply the if and else statements to make the console return a response we set based on the input entered.

if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]); //return the value for the set object property inputed
} else {
   console.log('Wrong reqest! choose between firstName, lastName, age, job, and friends')
} //remember if the jonas object has any property value set to null zero..when that property is inputed js will treat it as false and effect the else message instead of returning the if.


//using the dot and bracket notation to add new properties to object.
jonas.location = 'Portugal';//adds the location property with value protugal to jonas object.
jonas['x'] = '@Jonasschmedtman'; //adds the x property.
console.log(jonas);


// //challenge...write out: Jonas has 3 freinds, and his best friend is called Michael.without any hardcode..i.e using the values saved in the object.

// console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`); //we use [0]bcos item Michael exists inside an array in the object.

*/
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////
/////////////////***LESSON 44****///////////////

//lesson 44..object methods..any function attached to an object is called method. it works as the property of objects have values so to make a function an object item we simply change the functions vaiable to the object property and the value of the function(function expression) becomes the value of the changed property...the function expression will process data and return a value which becomes the value for the object property..i.e method....function declaration will not work as it does not produce a value on its own...note a function property is also called method.

/*
const jonas = { //this object contains five key-value pairs.
  firstName: 'Jonas',
  lastName: 'Schmedtmann', //string value
  birthYear: 1991, //number value
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'], //array value
  hasDriversLicense: true, //boolean value
   
  //....method A...setting the arguement in the console log
  //.property                //method...any function attached to an object.
  // calcAge: function (birthYear) { //in putting a function iside an object, its variable becomes the object property/name/method
  //   return 2037 - birthYear;
  // }
   
  //.......method B using the this keyword to set arguement
  calcAge: function () {
    console.log(this); //display jonas object in browser console.
    return 2037 - this.birthYear; //this directs the calcAge function to the jonas object....using d this.operator to directly read the birthyear from the object without passing it as a parameter arguement. this.birthyear means jonas birthyear....we can also use jonas.birthyear instead of this.birthyear...it will work but wen the object name is changed the function will not run.....we used the this command to determine arguement and also we used it to create a  variable age which store d caluclated age value.
  },

  //storing the calcAge value in a new property...we created the age property using dot method, then we return the age property value as the value of the calcAge property...so instead of to console log calcage and call its function all the time, we simply consolelog the age property wen we need to call on the calcage function.
  // calcAge: function () {
  //   this.age = 2037 - this.birthYear; //create new property using . in the jonas objects which stores the value of the method(age)...
  //   return this.age;
  // }
    
  //challenge...Jonas is a 46-year old teacher and he has a/no  drivers  lincense.
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${jonas.job} and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's lincense.`
  }// if the jonas boolean property value is true return a, else(or) return no. always use the property(calcAge) in the plcaeholder that holds a function rather than using the variable    (this.age) of the function.
};
*/

/*
//...how to console log object method
console.log(jonas.calcAge(1991)); //using dot method to display the value of an object property...here object is jonas, jonas property is calcAge...we used the parenthesis to call the function i.e set its parameter arguement...method A
console.log(jonas['calcAge'](1991)); //using bracket method to display the value of the object property..notice the string, parethensis...see more explanation below...method A

console.log(jonas.calcAge()); //the object jonas calls the calAge function...we must first call the function inside the object using the parenthesis and parameter arguement before we console the function, if not the method will not be calculated and its value will be undefined. the method doesnt call itself. u have to call it then consol log or do both at once like we did here....method B

// console.log(jonas.age); // return the age property value. this we be the same as the calcAge value as we stored the calcAge inside the Age property.

console.log(jonas.getSummary()); //displays the getsummary string in the console.
*/

/*
//explanation 
//jonas.calcAge(1991) sets the arguement for the function, calls the function and runs the function to produce a value...the birthYear parameter takes its input from the calAge parenthesis...there is no need for this as the birthyear is already defined somewhere else inside the object now we can make calcAge use this already defined property value as its input in running the calcAge machines we dont need to pass the arguement when we console log the function variableor object property...we should define the birthyear just in one place,no need to duplicate the input data,...  so lets make use of the object value as the input...method A

// console.log(jonas.calcAge()); // we used empty parenthesis bos we did not need to set the parameter arguement as we already used the this keyword...the this keyword directed the CalcAge method to use the value of the birthYear property as its parameter arguement...always do this wen the function parameter exists as a value of another property inside the object...i.e the function parameter(birthYear) exists as a Property in the same object as the function property...so no need to set the parameter arguemnt for the function...method B


// //we do not need to call on the calcAge everytime we want to reference the calculated age by console loggin it...we can rather create a new variable which stores the calculated age inside the object as a new property using this. then refenecing the new object property when we want to use the caluclated age value...so isntead of
// console.log(jonas.calcAge());
// console.log(jonas.calcAge());
// console.log(jonas.calcAge());
//we use
// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.age);
*/

/*
//clean code
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYear: 1991, 
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriversLicense: true, 
 
  // calcAge: function (birthYear) { 
  // return 2037 - birthYear;
  // }

  // calcAge: function () {
  //   console.log(this); 
  //   return 2037 - this.birthYear;
  // },

  calcAge: function () {
   this.age = 2037 - this.birthYear;
   return this.age;
  },
  
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${jonas.job} and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's lincense.`
  }
};
*/

// const mark = {
//   fullName: 'Mark Miller',
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2; //creating the bmi variable which stores the calculated bmi.
//     return this.bmi; //returning the bmi variable
//   }
// };

// const john = {
//   fullName: 'John Smith',
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2; //creating the bmi variavle which stores the calculated bmi.
//     return this.bmi;
//   }
// };

// mark.calcBMI(); //this is the method call. calling the calcBMI function for object Mark...without calling it the function wont run and produce a tolog in the broswer.
// john.calcBMI();
// console.log(mark.bmi, john.bmi);

// if (mark.bmi > john.bmi) {
//   console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BIM (${john.bmi})`)
// } else if  (john.bmi > mark.bmi) {
//   console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BIM (${mark.bmi})`)
// }
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////
/////////////////***LESSON 46****///////////////

//lesson 46: iteration..loops...it allows us automate repetitive tasks in js...rather than write a line of code over and over again we can write one line and let js run the other interation using loops..if we need to make an alteration across all repeated codes we simply alter the code in the loop and every other affected code will be changed.
/*
console.log('Lifting weight repetition 1');
console.log('Lifting weight repetition 2');
console.log('Lifting weight repetition 3');
console.log('Lifting weight repetition 4');
console.log('Lifting weight repetition 5');
console.log('Lifting weight repetition 6');
console.log('Lifting weight repetition 7');
console.log('Lifting weight repetition 8');
console.log('Lifting weight repetition 9');
console.log('Lifting weight repetition 10');
*/
//using loop...
/*
for (let rep = 1; rep <= 10; rep++) {
console.log(`Lifting weight repetition ${rep}`); //return the string value 10 times starting from 1 (placeholder was used because the lop runs a function variable)...
}
*/

//implementing a for loop that has a counter... we use the for loop statement to implement a loop that counts.the loop statement has 3 parts, its syntax is:
/*
 for (the counter variable; the logical condition; the counter update ){
  }
*/
/*'for loops' keep running while condition is true
part 1... let rep = 1 is the counter variable, it defines which number the repetition should start from...
part 2...rep <= 10 is the logical condition of the loop which determines when the loop will stop running..the loop continues running as long as the condition is true.the loop stops after 10 iteration..
part 3...rep = + 1 or rep++ this updates the count of the counter variable...when js run the loop for the first time, this will take the rep variable value to 2...so every time js iterates the code the counter increases by 1. when the rep variable gets to 10, the condition will be met and the loop stops running....without the rep++ the loop function runs forever as js will read the present count to be 1 at all time. rep++ simply increse the counte variable by one after each iteration.
we replaced the number in the temperate string with a placeholder, we put the counter variable inside this placeholder..this made the count to be automatically be updated, because after each loop, the counter variable value is updated by rep++, this updated value is displayed in the console browser. we hange the temperate string from hand code to a dynamic string that updates using th placeholder.*/
// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weight repetition ${rep}`); //return the string value 10 times starting from 1 (placeholder was used because the lop runs a function variable)...
//}
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////
/////////////////***LESSON 47****///////////////

//lesson 47...looping arrays,breaking and continuing

// const jonas = [ //this array contains five key-value pairs.
//   'Jonas',
//   'Schmedtmann',
//   2037 - 1991,
//   'teacher',
//   ['Michael', 'Peter', 'Steven'],
//   true
// ];
// console.log(jonas[0])
// console.log(jonas[1])
// console.log(jonas[2])
// console.log(jonas[3])
// console.log(jonas[4])
//jonas [5] does not exist o..there are five values but the rank starts from 0 to 4, not 1 to 5

//instead of using console to return each of the item in the array we can simply use loop to write a single line code which instructs js to return/repeat each item value in the array based on the terms we set....1. where the loop should start counting from...(counter)....when the loop should stop counting/creating array values(the condtiton)...how the count should be updated...

//we started the counter from zero because array ranks its value position from 0...the condition is lesser than five which means that the loop should repeat until just before 5...once the loop counter is 5 the condition is false and js will stop running the loop..the count update is +1 which instructs the loop to increase the count by 1 each time is is runned.

// for (let i = 0; i < 5; i++) {
// console.log(jonas[i])  //return jonas array...[] was used bcos the loop runs an array
// };

//instead of setting the condition of the loop to an exact number(<5), we automated it so that js runs the array and determine its length..i.e <jonas.length (number of items that exist inside the array...this makes the loop to stop when all jonas value have been repeated),then set the condtion for the array.this enables us add items/values inside the array without stressing about altering the loop condition to capture the altered length of the array. we changed the condition to jonas.length..
// for (let i = 0; i < jonas.length; i++) {
//   console.log(jonas[i])//return jonas array staring from position zero till position 4 ie jonas+[i]...[] was used bcos the loop runs an array..
// };

// A. CREATING NEW ARRAY BY USING AN EMPTY ARRAY AND FILLING IT UP WITH VALUES THAT ARE DERIVED FROM ANOTHER EXISTING ARRAY..
//steps....1. create existing array. 2. create new empty array. 3.define the loop statement for the existing array...4.set the machine that fills up the new array by linking it to the existing array i.e define the value of the new array using push method, this should be executed inside the loop function-never forget...step 5; then console log both arrays inside the for statement.

// task: creating an array that contains the datatype of the jonas array...i.e the new array gets its item values from another array..the jonas array ...we want to create a new array that will return the datatype of each jonas array item in the console browser as its values..instead of creating the new array(types) then filling it with the datatype(values of the type array) one by one then console logging each of them to return/retrieve the datatype in the browser console, we simply first create an empty types array, then fill the empty array with the datatype of each jonas value, then we console log the new/empty array which is already filled with the datatype of the jonas array values.

//step 1: create existing array...jonas array already exist somewhere bfor now
// step 2, create empty types array...NO ITEMS/VALUES/ELEMENTS
// const types = [];

// //step 3 loop the existing jonas array
// for (let i = 0; i < jonas.length; i++) {
//   console.log(jonas[i], typeof jonas[i]) //return jonas array...[] was used bcos we applied loop on the array..so we retrieve/return all the values in the array using counter variable(i)...the typeof returns the data typeof each array value. below we fill the empty types array earlier created with these jonas datatypes value as its content/values

//  step 4, fill up the empty types arrays with values determined by the jonas array value...
//method 1: using the unshift method...it adds the values to the beginning of the types array
//types[i] = typeof jonas[i];
/*fill up the empty types array,left side says types has a length defined by i (i starts from 0 ends at the last item of the jonas array as defined by the loop condition)....right side says that they type array values should be defined as the datatype of jonas array values starting from rank zero to the last jonas item as defined by the loop condition...in summary we simply said types array should have the datatypes of jonas array items as its content/values with js running the iteration for each value..then we console log below to return the array values in the browser. manually we could have given the empty array value using
types[0] = 'string';
types[1] = 'string';
types[2] = 'number';
till we get to [5]
*/

// //method 2:....adding elements to the empty types array using push method...it adds the value to the end of the types array.
//   types.push(typeof jonas[i]); //adds the datatype of the jonas items as the values of the types array..always add new elements to the end of arrays and not the beginning so use push and not unshift command
// }

//step 5; console.log(types);//return the types array...

/*
//we want to calculate ages, then store them as values to a new variable using loops push method...
const years = [1991, 2007, 1969, 2020]; //step 1: create existing array...
const ages = []; //step 2 create new empty array

for (let i = 0; i < years.length; i++) {  //step 3, loop existing array...this will make the new array filled by the existing array to also be looped
 ages.push(2037 - years[i]); //step 4: use push method to fill u new array...adding values to the empty ages array...the loop runs the iteration from rank 0 to end of the years array length. to get value [0] in the ages array we subtarct 2037-years[0], to get value [1] in the ages array we subtract 2037-years[1]etc.
}  
console.log(ages); //step 5: console log new array..the existing array is looped, this makes the new array values to be looped and returned in the browser console..if u change any loop condition, the new array will b affected in the console browser...for instance set i=1 the ages array items returned will be 3 items instead of 4..
*/

//continue and break statements for loops....to break the loop means to completely stopping the loop from running anymore.,...continue exists the current interation of the loop and move to the next one, that means if a certain condition is not satisfied by the looped value js will not return/loop/retrieved that value. it will immediately skip and run only the values that meet the condition. basically only the values that meet the condition will be returned/retrieved in the console.

/*
//we can decide to return/print/display/RETRIEVE only string values in the jonas array..THE CONTINUE KEYWORD

console.log('---ONLY STRINGS---')
for (let i = 0; i < jonas.length; i++){
if (typeof jonas[i] !== 'string') continue; 
  console.log(jonas[i], typeof jonas[i]);
}

// the continue statement reads: if the datatype  of any of jonas array values [rank 0 to 5] is not a string skip it(i.e stop iteration/js will not loop/return it and skip/continue to the next value)...only the values with string datatypes will be returned.
//return only string values..the console will only return values that was iterated/not skipped...i.e meets the if condition...jonas[i] in the consolelog no longer represents all items of the jonas array but only items in the jonas array that satisfy the if statement i.e are string values.
*/

/*
console.log('---BREAK WITH NUMBER---')
// terminate/break/stop the loop process once we find a number value...i.e the loop will return items just bfor a number, once it runs a number the loop ends.
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === 'number') break;
  console.log(jonas[i], typeof jonas[i]); //after the age value which is a number datatype is found no other value was returned in the browser console as instructed by the break statement.
}
*/
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////
/////////////////***LESSON 48****///////////////

//lesson 48...looping backwards and loops in loops...
//looping the jonas array backward i.e returning the array from end to start in the browser..instead of looping from 0 to the end of the array length we will loop from the end to 0.
/*
const jonas = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];
for (let i = jonas.length - 1; i >= 0; i--){ 
  console.log(i, jonas[i]);
}
// the counter starts from the last rank/position...which is always array length less 1, the condition is that the loop keeps running till the counter goes below zero or becomes negative(no negative rank exist inside the array so the loop will stop when it runs up till rank 0), i-- means the counter is always updated / reduced by 1 each time the loop runs...
//logging i means the position/rank of each values will be returned in the browser
*/

//creating a loop inside a loop....when we place a loop inside another loop js will run the entire second loop after each count of the first loop
//step 1 create the initial loop which contains the first repeated string
/*  
for (let exercise = 1; exercise < 4; exercise++) { //step 1....
  console.log(`-------starting exercise ${exercise}`);
  for (let rep = 1; rep < 6; rep++) { //step 2
  console.log(`Exercise ${exercise} lifting weight repetition ${rep}`);
  }
}
*/
//step 2..create the new loop inside the curly bracket of the loop u wish to add another loop to...this will make js run the whole second loop comletely after each count of the first loop.
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////
/////////////////***LESSON 49****///////////////

//lesson 49 the while loop...using the while loop we only specify the condition but the result works exactly like the for loop...the loop will keep running while the condition is true...the while loop is more versatile as it will run with just the condition set, we dont need to set the counter...we can use it without a counter..we use the while loop where we do not know the number of times the iteration is supposed to run...
/*
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}

//while syntax
let rep = 1;
while (rep <= 10) {
  // console.log(`WHILE: Lifting weights repetition ${rep}`);
  rep++;
}
*/

//while loop without counter variable..rolling a dice to give a random number...run the loop till dice gives 6..when the first roll is 6 the loop will have zero iteration...

//step 1...set the variable value...its value is a random number of a dice possibly from 1-6....the loop is not determined by a counter condition but rather bya random number...the loop keeps running as long as it doesnt return six, one it loops six, it stops....here we do not need a counter variable to tell the loop to stop bcos we simply do not know when the dice will give 6.

/*
let dice = Math.trunc(Math.random() * 6 )+ 1;
console.log(dice);

//step 2...set the condition and write the while loop
while (dice !== 6) { //the loop keeps running while dice value is not 6...
  console.log(`YOU rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1; //execute the function then log the result that satisfies d set condition...
  if (dice === 6) console.log(`LOOP is about to end...`);  //loop stops running when a 6 is the result of the count.
}
*/
////////////////PERSONAL EXERCISES

// const array1 = ["a", "b", "c"];

// const array2 = array1.push("x", "y", "z");
// console.log(array1);

// const array1 = ["a", "b", "c"];

// const array2 = array1.unshift("x", "y", "z");
// console.log(array1);

const array3 = ["x", "y", "z", "a", "b", "c"];

const array4 = array3.shift("x", "y");
console.log(array4);

// Simulating a queue
let queue = [1, 2, 3, 4, 5];

while (queue.length > 0) {
  let currentElement = queue.shift();
  console.log(`Processing element: ${currentElement}`);
}

// Output:
// Processing element: 1
// Processing element: 2
// Processing element: 3
// Processing element: 4
// Processing element: 5

// Simulating a round-robin scheduler
let processes = ["Process A", "Process B", "Process C"];

function runNextProcess() {
  if (processes.length > 0) {
    let currentProcess = processes.shift();
    console.log(`Running ${currentProcess}`);
  } else {
    console.log("No more processes to run.");
  }
}

// Run processes in a round-robin manner
runNextProcess(); // Output: Running Process A
runNextProcess(); // Output: Running Process B
runNextProcess(); // Output: Running Process C
runNextProcess(); // Output: No more processes to run.
