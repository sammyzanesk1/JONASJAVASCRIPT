'use strict';

/*
///////////
//default parameter...we set the parameter for the function so we do nt have to manually code the arguements unless when we want to change the parameters...

//we called the function with only 1/the fisrt arguement...the arguement goes into the object function as the value of the flightNum property...we then used the push method to add the booking values as the values/elements of the empty booking array...the value of the price and numPassengers are undefined(falsy values)--they do not exist since did not specify them..however we can set default values for them...we use the old way..we used the new way ES6 which simply setd the parameter default value using the = to default value sign....default values can contain any expression even using values of parameters set ONLY bfor it....WE cannot skip prameters when calling a function by using space as the parameter arguement..however we can skip that arameter by setting its arguement to undefined...

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //   numPassengers = numPassengers || 1; //old way of setting default parameter, bfor es6...the or operand stops immediately and return the last/default value set whenever it reads a property with a flasy value...(one false makes the whole operation false.)
  //   price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
  console.log(bookings);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000); //we skipped the numPassenger parameter, its default value will then be passed into the function as we did not manually set an arguement that can be passed.
*/

/*
/////////////////////////////////////////
//values vs reference...in functions we cannot manipulate variables that have strings as their values declared outside of the function within the function(i.e we cannot change the parameter arguement of function inside of it if the parameter takes the value of a primitive variable(a variable which ha a number or string as its value)...)..this is bcos when we reassign the parameter arguement for variables with primitive values we are simply creating a new value for the variable and primitives cannot be changed do the reassignment will not work...however when we manipulate variables that are objects (reference types) by assigning new values to them, the original variable will be updated by this reassign value bcos in the memory heap the two variable points to the same value so they value can be altered...jonas is a variable that has an object value, inside the function the parameter that takes the jonas object values as its arguement was reassinged a new property/name value..since it is an object the value is changed and the reassigned value is returned...note that for objects whatever we change in the reassigned variable will take effect in the original variable.

const flight = 'LH234';
const jonas = {
  name: 'Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; //this results in const flightNum = flight...u cannot reassign the value of a primitive

  passenger.name = 'Mr.' + passenger.name; //we change the passenger name from what is set in the object to what is specified in the function...the cahnge for flight did not work..this is same as doing const passenger = jonas....jonas property reassigned will be updated.

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};
checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

//real life complication due to the fact we can reassign objects.
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000); //reassign the object property(passport)value
  console.log(person.passport);
  //   return person.passport;
};
newPassport(jonas);
checkIn(flight, jonas); //the reassgined passport value will be effected inside the checkin Function, this will make the set condition false..the else alert will be returned...we did not reassign the value of the passport directly in the checkIN function we also did not reassign or ourightly change it in the jonas object...the fact is that if we manipulate an object any lastest function, that manipulated value will be effected in prior functions that houses the manipulated object property...this is true bcos we have to call all the functions only afetr we have written the lastest function...so in the newPassport function, we manipulated/changed the passport value through the newPassport function...we call the newPassport function with jonas object so the first property (name) in the jonas variable object is passed in the newPassport function, note that the name that will be passed into the newPassport function will not be the initial one set in the original jonas object rather it will be the one reassigned in the  checkIn function...at the same time, we used the updated name value in the newPassport function to target the jonas object then effected/reassigned the value of the passport...this reassigned passport value in the updated jonas array will be called into the checkIn function...this value will be different from the one set in the condition so the else alert will be returned.
*/

/*
/////////////////
// higher order functions....function calling function

//creating the first 2 generic functions...

//this function replaces all empty spaces in the string with no space at all, it also converts all words to lower case...
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

//this function returns the..first we split the string, this returns an array with the splitted words as its elements, we then save the the splitted words into 2 variables(destructure the split array) according to the rank in the array..remember since we use the rest operator it means that the first word will be saved to the first variable while the rest words will be saved as a string in the others variable...we then return an array of both elements having  change the value of the first variable to uppercase ..then we joined the first variable to the others variable..this join method returns both variables as a single string and returns them without the array.
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//higher order function...it takes in a function as parameter arguements
const transformer = function (str, fn) {
  // console.log(`${fn(str)}`);
  //`${fn(str)}`;//the transformer function tells the called function to work on the string...(he called function is referenced by its parameter name..fn recieved the arguement, the arguement is a function name....the arguement bcoms that function which will be the called function. )
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord); //we said the transformer function should transform the string using the upperFirstWord...ie in the transformer function we passed in 2 arguements, a string and a function...inside the transformer function the function that is passed iinside will work on the string...we are not calling the generic function here. we inly pass in the value of the function variable which is the function itself...the transformer function simply calls the upperfirstword function...
transformer('JavaScript is the best!', oneWord);
console.log(transformer);

//callback function...the addeventlistener function calls on the high5 function(event handler function), the high5 function calls on the forEach function...
const high5 = function () {
  console.log('🖐');
};
document.body.addEventListener('click', high5); //the event listener.eventhandler is a function that we passed into the addeventlistener function...the handler(high5 function) is the call back function and the addeventlisterner is the higher order function...anytime the document is clicked an highfive emoji is console log...
['Jonas', 'Martha', 'Adam'].forEach(high5); //the forEACH FUNCTION CALLS ON THE HIGH5 FUNCTION..ayntimethe high5 function is implemented(the event occurs)..the high5 function should return a wave emoji for each array element...i.e each click returns 3 waves.
*/

////////////////////////////////////////
//function returning function...(a function exists inside another function)
/*
//clean code
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//method 1
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Zane');
//method 2
greet('Hello')('Jonas');
greet('Hello')('Steven');

//using arrow function to write the above function that return a function..one arrow function  returns another arrow fucntion
const greetArrow = greeting => name => console.log(`${greeting} ${name}`); //shorter code but maybe a bit confusing
//calling the arrow function
//method 1
const greetArrowHey = greetArrow('Hi');
greetArrowHey('Jonas');
//method 2
greetArrow('Hi')('Jonas');
*/

/*
///understanding how function which returns a function is called...
// the greet function has another function inside it..to call the greet function we have to pass in 2 arguement, 1 for the greet function parameter(greeting) and 1 for the inner function parameter(name) which exists inside the greet function...we have 2 ways to do this...just note the difference that in the second method we use the variable that holds the outer function to call the whole function at one go...

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//calling the function which returns a function..i.e the above function
//method 1...
//we first call the outer function (greet), save it to a variable, this makes the new variable(greaterHey) own the inner function i.e:
//  greeterHey = function (name) {
//  console.log(`${greeting} ${name}`);
//};

//then we call the inner function separately....in calling the innner function using the new variable we are also infact calling the outer function fist, so in effect we called the 2 functions...i.e greeterHey('Jonas') simply is greet('Hey')('Jonas) bcos  greeterHey = greet('Hey')...so we can call both functions uing one line of code without having to first save the outer function to a new variable then use that variable to call the inner function.
const greeterHey = greet('Hey');
console.log(greeterHey);
greeterHey('Jonas');
greeterHey('Zane');

//method 2...
//the greet function has another function inside it..to call the greet function we have to pass in 2 arguement, 1 for the greet function parameter(greeting) and 1 for the inner function parameter(name) which exists inside the greet function...so we said the greet function parament arguement = Hello i.e greeting = hello....then we said the function inside the greet function should have Jonas as its parameter arguement...
//in other words, greet('Hello') = parameter arguement for the greet function parameter(i.e greeting), then greet('Hello')('Jonas') means parameter arguement for the greet function function parameter(name)-(i.e Jonas is the parameter arguement for the parameter of the function that exist inside the greet function)...the greet function owns the inner function so we can set arguements for both of them at the same time, we first set the the arguement for the greet function, thenw we set the arguement for the inner function...
greet('Hello')('Jonas');
greet('Hello')('Zane');

//personal examples...i created different use case of function that returns another function..they are all called using the logic above and they are work like jonas.

//example 1, 1 parameter for each function
const greet1 = function (greeting1) {
  return function (name1) {
    console.log(`${greeting1} ${name1}`);
  };
};
//method 1
const greeterHey1 = greet1('Hello');
greeterHey1('Sammy');
greeterHey1('KING');

// method 2

greet1('Hello')('Sammy');
greet1('Hello')('KING');

//example 2....a function with 1 parameter returning another function with 2 parameters
const greet2 = function (greeting2) {
  return function (name2, age) {
    console.log(`${greeting2} ${name2} age ${age}`);
  };
};
//method 1
const greeterHey2 = greet2('Hello');
greeterHey2('KingZane', 17);
greeterHey2('SK', 19);

//method 2
greet2('Hello')('KingZane', 17);
greet2('Hello')('SK', 19);

//example3...a function with 2 parameter calling a function with 2 parameter...
const greet3 = function (greeting3a, greeting3b) {
  return function (name3, age3) {
    console.log(`${greeting3a}, ${greeting3b} ${name3} age ${age3}`);
  };
};

//Using method 1 to call the function(with 2 parameter) that returns a function(with 2 parameter)
const greeterHey3 = greet3('Hello', 'How e b u');
greeterHey3('SAMMYKING', 21);
greeterHey3('DMX', 0);

//method 2, calling the function that returns a function all in one line of code...
greet3('Hello', 'how e b u')('SAMMYKING', 21);
greet3('Hello', 'how e b u')('DMX', 0);
*/

////////////////////////////////////////
//the call and apply methods....

//we want to set the this keyword by ourself, manually...
/*
//we wanted to make use of the book method in multiple objects so we had to save it in an external variable then put the variable inside the objects..i wanted to preseve the object bfor this whole change was implemented
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  //we wrote the function method using the enhance object literal syntax instead of the old way above
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push(`flght: ${this.iataCode}${flightNum}`, name); //we used the push method to add elements into the empty bookings array above...we targeted the bookings array using the this keyword...
  },
};
*/

/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  //we wrote the function method using the enhance object literal syntax instead of the old way above
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); //we created 2 elements inside the book method, we then placed the 2 elements in an object, we then used the push method to add the object which contains 2 elements into the empty bookings array above()(we used the book function method to create an object which contains 2 elements)...we targeted the bookings array using the this keyword...note that the 1st element combines 2 property values to give 1 element (i.eiataCode and flightNum), we did this using template string(we put the 2 property values inside the string..the string makes it 1 value/element).
    // this.bookings.push(this.iataCode, flightNum, name);//i added an extra 2 element into the bookings array
  },
};

lufthansa.book(239, 'Jonas Schedtmann'); //we call the book function method,it adds 2 elements to the bookings array in the lufthansa object
lufthansa.book(635, 'John Smith'); //we call the book function method,it adds 2 elements to the bookings array in the lufthansa object

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; //we assign the lefthansa object method to the book variable without hard coding the function in it, we simply said book value should be the lefthansa object property(book)...this is a regulat function call, it is not the same as the book method insid the lufthansa object

//the function call below will not work...this does not work bcos in the EuroWing function, the book method is a regular function call...it is not a method. so the this keyword inside it the book function of the Eurowing object will point to underfined instead of the Eurowings object.
//book(23, 'Jonas'); //an error is returned because the this keyword point to a function call..when the this keyword is used in a regular function cal it will always return undefined...we created a regular book function above which has the this keyword in it..when the this keyword exist in a regular function call it will return undefined....however we can make the this keyword work for a regular function call like this by explicitly/manually setting the this keyword up.,..what we mean is that when we call the book function method, in the lufthansa object the this keyword of the method in it will point to it (the lufthansa object) while in the eurowings the this keyword of the eurowings book function will point to the eurowings object.

//setting u the this keyword manually...we do this through the call, bind or apply method...we can use thecall function to direct the function method to point to any object we havecreated so far the object has the properties that are set up in the entire method code.
book.call(eurowings, 23, 'Sarah Williams'); // we used the call method on the book function...we said that the call method should call the book function, and that the book function method should be applied on the eurowings object(remember the book function creates and adds 2 elements to the bookings proerty, so we used the book function toadd 2 elements into the bookings array of the eurowings function)...then we said that the book function method should use 23, and sarah williams as the arguement for its parameter...we said flightNum = 23 and name = Sarah Williams...
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
book.call(lufthansa, 239, 'Sammy Zane');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper'); //same result as apply method
book.apply(swiss, [583, 'Mary Cooper']); //same result as call method
console.log(swiss);

//APPLY METHOD
//we can also use the apply methodjust in the apply method method after we specify object the this keyword should apply to the method takes in arguements in an array.

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
console.log(flightData);

//we can use the spread operator to unpack the array then use the call method...the ... turns [583, 'George Cooper'] to just 2 individual elements without the array i.e 583, 'George Cooper'
book.call(swiss, ...flightData);
console.log(...flightData);
*/

/*
////////////////////////////////////////////////////////////////////////
//BIND METHOD..
// steps
//step 1, use the bind method to assign the this keyword in the function method we want to always reuse to the intended object we want the this keyword to always point to when called...i.e book.bind(eurowings); we binded the book function method to the eurowings object, anything we call the method the this keyword inside the method points to the eurowings objects.

//step 2...save this function into a variable...const bookEW = book.bind(eurowings);...w

//step 3...call the function method using the variable, passing the method parameter arguements along side..we can also set the parameter arguement inside the function this makes the arguement static and immutable..anytime we call the function method using the bind method, this set arguement will be the input for the methods parameter....also, we do not signify the object we want the this keyword to point to here using bind method, unlike call and apply method.

const bookEW = book.bind(eurowings); //we create a new function where the this keyword of the book function method is always pointing/set to eurowings..ie we bind the this keyword of the book function method to the eurowings object using the bind method. we have to store this new function(the function that assigns the this keyword only to eurowings object) in a new variable, then use this variable to call book function method whenever we want...whenever we call the book function using the bind method, the function method will only ever point to eurowings...to call the bind function we use the variable we stored the bind method, then we set the parameter arguement for the function method...

const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

//book.call(eurowings, 23, 'Sarah Williams');
bookEW(23, 'Steven Williams');
// console.log(bookEW);

//we set the flightNum parameter arguement inside the bind function..this means that anytime we call the function method using the variable which holds the bind method, the flightNum value will be 23 forever...so we only need to set parameter arguement for the name parameter...this is CALLED PARTIAL APPLICATION...setting part of the parameter arguement bfor hand.
const bookEW23 = book.bind(eurowings, 23); //partial application...
bookEW23('Jonas Schmedtmann');
bookEW23('Sammy Zane');

//using the bind method with event listeners and objects together...

lufthansa.planes = 300; //added a new property to the lufthansa object

//added a new function to the lefthansa object
lufthansa.buyPlane = function () {
  console.log(this);
  // this.plane = this.plane + 1
  this.planes++; //increase the value of the planes property by 1 each time the method is called
  console.log(this.planes); //returns 301 (300+1) as a start(first time the method is called)...returns lufthansa planes property
};
// lufthansa.buyPlane(); //returns the updated lufthansa object

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //assign the method as the handler function/call back function to the event listener..remember that when a function method or a function is attached to an event listener the this keyword in the handler function points to the element of the event listener.. and in this case to the buy element and not to the lufthansa object...it is the eventlistener function that calls the this keyword and not the event handler so even if the this keyword is inside the event handler it will point to the event listener which calls it...so when we click on the buy new plane button, the event handler returns the buy element in the BC...we can make the this kyword point to the lufthansa object instead of the event listener whenever the button is clcicked..doing this will enable the buyplane method implement well..we will manually define the this keyword and set it to the buyplane method by using the bind method. we binded the this keyword to lufthansa obejct right inside the handler function.
*/

/*
////////////partial application...note when u want to use partial application, always put the parameter u want to set its arguement in stone/forever as the first parameter.....in the example below rate is the first arameter.

//a general function that calculates tax
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//we created a specific function, then use the bind method to set the paramter arguement of the method in stone..instead of hardcoding const addVAT = (rate, value) => value + value * 0.23 we use the bind method...

const addVAT = addTax.bind(null, 0.23); //we said the addVAT variable should be the addTax function but with its value parameter arguement set to 0.23 forever... since the this keyword does not exist inside the AddTax function we are not borthered with binding it to any specify function, so we set it to null.
console.log(addVAT(100));

//using the function returning a function approach...personal solution..worked 1000%

const addTax1 = (rate, value) => value + value * rate;
//METHOD 1
const addVAT1 = addTax1(0.23, 100);
console.log(addVAT1);
const addVAT3 = addTax1(0.23, 23);
console.log(addVAT3);
//METHOD 2
const addTax2 = value => rate => console.log(value + value * rate);
addTax2(100)(0.23);
const addTax3 = value => rate => console.log(value + value * rate);
addTax3(23)(0.23);

///JONAS SOLUTION, HE USED FUNCTION EXPRESSION approach to create the function that returns a function..

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/
/////////////////////////////////////////
//////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0), //the initial values for the array is set to 0
  //solution
  registerNewAnswer() {
    //new function method
    //get answer from user
    const answer = Number(
      //the answer vaariable stores the user inputted data...we converted the inputted data to a number,any input that is not a number, NaN wil be returned in the BC for that input bcos it is not a number...
      prompt(
        `${this.question}\n${this.options.join('\n')}
        \n(write option number)`
      )
      //task 1 of the method...prompt window...prompts are always saved to variables, the variables holds the input the user selects...the prompt message is divided into different lines using line breakes(\n)..we unpack d options array using join method (turns d array element to a string)...each unpacked element from the options array occupies a new line bcos of the linebreak...note the temperate literal we used bcos we needed placeholders...note we converted the user input to a number..never forget prompt have typeof = strings
    );
    console.log(answer); //display the user inputted data

    //task 2 of the method....register/update answer...we could not use the if condtiton, so && short circuiting was used to set the condition..we said if the answer inputted by the user is in the options we provided(0-3)....i.e the answer is a number and the number is less than the length of the answers array (less than 4), then the value of the answers array position that was inputted should be increased by 1 for each time it is selected as the answer..note that since we use the && operand if any of the set condition is false the operand immediately stop and returns no value bcos no default/last value was set in it..the counter will not work.
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++; //we increase the value of the array position/rank that was chosen as the input by 1...everything a rank is inputted the rank is increased by 1...this.answer is an array, anything any of 0-3 is chosen the value of the chosen rank will increase by 1...

    this.displayResults(); //we called the display result method with no manual arguement, this will make the method to implemnt its default arguement('array') thus the first process will be returned which is to dislay the answers property value in the BC
    this.displayResults('string'); //we called the display method with string as its arguement, it will return the else message in the BC
  },

  //NOTE; the fact we are calling the displayresult method inside the registernewanswer method means that anytime we call the registernewanswer method, the displayresults method will automatically be called by the registernewanswer method....the message to be displayed by the display result method depends on if we callit without a manual arguement set or with a 'string' as the manual set arguement...
  displayResults(type = 'array') {
    //set the default arguement value of the method parameter to a string called array..when the method is called without an arguement hardcoded, the method will take in the word "array' as its arguement.
    if (type === 'array') {
      //i.e we did not passan arguement manually when we called the method....
      //we said if the arguement is a word 'array'(this will be when we call the method without an arguement manually passed) then the method should process  console.log(this.answers);  )
      console.log(this.answers);
    } else if (type === 'string') {
      //we want the displayResults method to dsplay the process below whenever the method is called with a word string as its parameter arguement...
      console.log(`poll results are ${this.answers.join(', ')}`); //we want the display results method to display the answers array as a string in the BC, so we used a template literal, and a placeholder (for the answers array..this converts the array to a string), then a join method..the join method unpacks the array values turning them to a string separeted by a comma...the temerate literal returns the whole console.log(`poll results are ${this.answers.join(', ')}`); operation as 1 sentence
    }
  },
};
// poll.registerNewAnswer();

//task 2.....we set the registerNewAnswer method as the event handler when a click occurs on the poll button...wthe method has a this keyword in it, when we use handlers that have the this keyword as call back function for event listener functions, the this keyword will point to the element to which the event listener function is attached and not to the object function in which it exist...in other to solve that we used the bind method to assign the this keyword to the poll object in which its method exist. when this was done, the this keyword pointed to the poll object not the element to which the event listener function is attached.....
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); //the this keyword here points to the poll object.

poll.displayResults.call({ answers: [5, 2, 3, 7] }, 'string'); //we are calling the displayresult function here and we want the this keyword inside the displayresult method to point to the answers array in the poll object..note that we created a new object which has the answers property with its values set to an array  i.e the object we want the this keyword to point to wa created...we also called the display result method here without an arguement manually set,so the method will use its default parameter arguement to run, and return the this answers property value(i.the array but the new array...)

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }); //we called the method using the string word as the arguement this will make the method return the second process...ie converts the answers array to a string separated by a comma(the new object which has the answers property with an array as its value.)
// [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/
//clean code
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  //solution
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}
        \n(write option number)`
      )
    );
    console.log(answer);

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'samuel') {
    if (type === 'samuel') {
      console.log(this.answers);
    } else if (type === 'string') {
      //pool results are 13, 2, 4, 1
      console.log(`poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/

/*
//////////////////////////////////////////////////////////////////
//immediately invoked function expressions.....using functions only once...data inside the function is private/encapsulated because it cannot be accessed from outside the function scope in which it exist..so if we try to console log a variable declared inside a function from outside of the function(global scope) for instance, it wont work we will have an error message that readsundefined variable bcos the variable does not exist in the global scope....so we use the IIFE to protect/encasulate some variables so they do not get overwritten/chnaged by mistake by other programs in the file.
const runOnce = function () {
  console.log('this will never run again');
};
runOnce();

//u create immediately invoked function exression without the function stored to a variable..when the function is stored to a variable we can call the function multile times using the variable, so this eliminates that...then we wrap the function using parenthesis, then we immediately call the function once!..we simply created and immediately called a function value..we call it with the empty bracket
(function () {
  console.log('this will never run again');
  const isPrivate = 23; //exists only within this function...outside of the function it seems not to exist...
  console.log(isPrivate);
  var notPrivate = 46; //var does not disregard the rule when used in IIFE...its value returns undefined(i.e th var variable does not exist...)
})();
console.log(notPrivate); //returns undefined...........

// console.log(isPrivate); //reads error bcos the variable is hidden inside a function scope..function scope cannot be accessed by global scope...scope point outward...function scope can acess global scope but not the other way round.

// creating an IIFE using arrow function
(() => console.log('this will also never run again'))();

//we can also make variables unaccessible from outside scope using blocks...
{
  const isPrivate = 23; //exists only within this function...outside of the function it seems not to exist...
  console.log(isPrivate); //var variables ignores scope, can be accessible globally...
  var notPrivate = 46;
}
// console.log(isPrivate); //error...not defined(not exist) bcos the variable cannot be accessed it is inside its own scope/block..cannot be accessed outside of it...
console.log(notPrivate); //displays the var variable bcos var disregards blocks/inner scope rule when used in blocks...

//main take away use block to hide variables instead of empty functions....but use IIFE when u intend to execute a function just once, immediately it is created/called!...
*/
/*
/////////////////////////////////////////////////////
//closures.....closures are not manually created they happen at certain instances........
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

//function returning function
const booker = secureBooking(); //booker stores the securebooking function...closure enables the booker function (parent scope) look into the execution context in which the variables it uses where created..the passengercount variable exists inside a child scope function (function inside function) which will be executed bfor the booker functio(when executed, the variables in it are assumed to be no longer existent)...the booker function is able to access this counter variable and update it because of closure...note that when we call the booker function, it is the booker function that updates the counter variable, this is possible bcos even if the passenger counter function is first executed bfor the booker function, closure gives the booker function access to the functions in which the needed counter variable was created..
booker();
booker();
booker();

console.dir(booker);
*/

////////////////////////////////
//more look at closures.....here we do not return the function to see the closure in action
//example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); //we declared the f variable in the global scope then assigned a function value to it in the child scope(function of function env)...the f variable is able to access the a variable because of closure, closure lets variables declared in the global scope to access variables it needs even if this variables are declared in inner scopes(function or funcction of function)...so wen we called the f vfunction, the function needed access to the a variable in order to execute its own process, closure enables the f function access the a variavle that was declared inside the g function....
console.dir(f); //displays how the closure works in the console...check for the scopes, there u will see the closure and the variable accessed by the f function....the g function was closed and a variable was accessed by the f function...this enabled the f function run its process when called!

//f was reassigned by h...since the f variable has been reassigned, the closure will be on the h function and the b variable which exists inside the h function will be accessed bcos that is the variable that the f function needs to execute its own process...
h();
f();
console.dir(f); // check how the closure process runs in the scopes........

// example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  //the setout function will be executed 3 secs late(1000 milliseconds times 3)..the BC message will take 3 secs to display...
  //task 1
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passngers`);
  }, wait * 1000);

  //task 2
  console.log(`Will start boarding in ${wait} seconds`);
};

//the closure has priority over the global scope chain...i.e the function will use the variable value accessed by closure over the value of that same variable set in the global scope or outside the function in which the closure happens...so in the below example the perGroup variable that will be used by the closure is the one inside the boardpassenger function and not the one in the global scope/window....if the function in which the closure occurs do not have a variable, and the callback function needs that variable for its process to run, where the variable is set in the global scope, the cllback function will use it.
const perGroup = 1000;
boardPassengers(180, 3); //the boardpassenger function was able to access the pergroup and n variables bcos of closure...
console.dir(boardPassengers);
// setTimeout(function () {
//   console.log('TIMER');
// }, 1000);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

/*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

//the background was chaned from red to blue by the handler function, it was able to change it because the closure made the handler function access thr header styles...so the styles was chaned from red to blue...
*/
