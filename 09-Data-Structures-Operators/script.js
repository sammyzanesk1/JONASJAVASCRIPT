'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
//console.log(flights);

/*//we want to create a progam that transform the above dat to this output below
🔴 Delayed Departure FAO TXL(11h25)
Arrival BRU FAO (11h45)
🔴 Delayed Arrival HEL FAO (12h05)
            Departure FAO LIS (12h30)
*/

//SOLUTION
//working with the above string data from an api...
//data given to us is 1 big string joined by +... ...
//flights.split('+'); //we slit the data into 4 parts by removing the +
//console.log(flights.split('+')); //the split function returns the 4 parts in an array

//we do not want the 4 parts to be 1 single value held in an array..we want to return them as individual values..we loop them, each iteration returns a part/value(1 big string), according to the rank in the array..each iterated value/part(1 big string) is stored in the flight variable...(e.g after first iteration, flight = _Delayed_Departure;fao93766109;txl2133758440;11:25)

// flight.split(';');............we splitted the flight variable..this broke each iterated part (1 big string value) into 4 parts parts by removing the ; in the string...(e.g after first iteration, flight = [_Delayed_Departure fao93766109 txl2133758440 11:25])...these 4 parts are elements in an array...so basically flight.split(';') results in an array of 4 elements for each iteration done...

// we then destucture the [type, from, to, time] the flight.split(';') which is an array of 4 elements...we stored each element in a variable...NOTE that each iteration process results in a string, that string we broke down into 4 parts, each part we stored into a variable...so after each iteration we have 4 new values for the 4 variables....so for isntance for the first iteration we have: const type = _Delayed_Departure, const from = fao93766109, const to = txl2133758440, const time = 11:25.

//we then have to format each individual variable to get that nice formatted message in the BC....we do this by creating a template literal...in this template literal we will have the 4 variables as placeholders....this template literal we then be the message in the BC...we will edit the variables using string methods here...each variable is a string...since the temperate literal is inside the loop function, the formating will be applied on the values of the 4 variables after each iteration...

//we want to edit the variables in the temperate string...so for isntance for the first iteration we have: const type = _Delayed_Departure, const from = fao93766109, const to = txl2133758440, const time = 11:25....

//for the time variable we want to replace the: with h...we use the replace method

//for the type variable we want to replace the underscore with empty space then add an icon at the begining for the type variable with delayed departure as its value...since the _ is in multiple location we can use replaceALL method to relace it at once...we want to add the icon emoji to the variable value only when the variable value starts with _delayed...so we set a tenary operator to handle this....if the boolean is true add the icon if not add nothing..we use the startswith method along with tenrary operator...we said if type starts with _delayed, if true add '🔴' if not add ''..
//for the airport codes(from and to variable values), we want to make use of only the letters in them, we also have to capitalize the letters...we take the first 3 letters of the from and to variables values convert them to caps the eliminate the remaining part of the string...we use the slice method to take up the first 3 character...then we use the uppercase method to cap this 3 returned characters....we do this for both the from and to variables...since both variable needs the same methods in this case, we can just save the method to a variable(say getCode) then assign this getCodevariables to both to and from...this getCode variable has to be declared outside of the loop function so that it doesnt mess with our work or it doesnt get looed over and over ....so instead of this here  ${from.slice(0, 3).toUpperCase()} ${to.slice(0, 3).toUpperCase()}...we did  ${getCode(from)} ${getCode(to)} with the help of the getCode function.

//we have to arrange the temperate literal in the BC to maintain the nice pattern...we do this by add more characters still we get the desired length of the temperate literal string(output variable)...we need to add the needed character at the begining of the output variable (1 big string value)...the needed character is a space...we do not need to set the character, where we do not set the character the default character added will be a space. that what we need...we placed the .padstart at the end of the temperate literal bos we ant the space characters to be added adter all formating to all the 4 variables has happened.

const getCode = str => str.slice(0, 3).toUpperCase(); //the function takes in 'from' and 'to' values then apply the method on them then return it...

for (const flight of flights.split('+')) {
  // console.log(flight);
  const [type, from, to, time] = flight.split(';');
  //console.log(type, from, to, time);
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} ${time.replace(':', 'h')}`.padStart(36);
  console.log(output);
}

/////////////////////////////////////////
// Data needed for first part of the section....THE RESTAURANT BLOCK CODE IS WRITTEN USING OBJECT LITERAL SYANTAX..
//ENCHANCED OBJECT LITERAL
//enhancement 1: old method of adding an object that exist inisde another object..then using the ES6 method
//enhnacemenr 2: in writng a method we no longer need to create a property then set it to a function expression inside the object..rather u just write the name of the function, the parameter and the fucntion body
//enhancement 3: property names can be computed instead of written out in the object

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; //created array to illustrate that
const openingHours = {
  //we took the openingHours object outside the restaurant object..then added it to the restaurant object using two ways..note when the external object name changes we have to go and change the name of the object inside the other object in which it exist..
  //  thu: {
  //   open: 12,
  //    close: 22,
  // },
  [weekdays[3]]: {
    //instead of writing thursday, we computed the property name by saying it is the weekday array rank 4
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //openingHours: openingHours, //old way of adding an external object inside another object...use ES6
  openingHours,

  // order: function (starterIndex, mainIndex) {//old way
  //   //this function method lets us return a value/element each from the mainMenu and starterMenu arrays
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //return restaurant.starterMenu[arguement], restaurant.mainMenu[arguement]..return the two elements in an array..take note of the bracket[]...
  // },

  //new enhanced way of writing function method in objects
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function ({
  //   //the method receieves the object as its arguement, any property not set use default value...
  //   starterIndex = 1, //set default starterIndex to [1], if the method does not see any index in the function call it uses 1.
  //   mainIndex = 0, //we set the default value of mainIndex to [0], if main index is absent in the function call use 0 in its place
  //   time = '20:00', //we set the default time value to 20:00
  //   address,
  // }) {
  //   console.log(
  //     //when the function method is called the string should be returned in the BC
  //     `Order received! ${this.starterMenu[starterIndex]} and  ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
  //   );
  // },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and  ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  //created a new function to enable us apply spread operator...
  // orderPasta: function (ing1, ing2, ing3) {
  //   console.log(`This is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  // },
  orderPasta(ing1, ing2, ing3) {
    console.log(`This is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  // orderPizza: function (mainIngredient, ...otherIngredients) {
  //   //the parameter arguements will be grouped to 2, one element(mainIngredient) and one array which pack the rest elements(...rest parameter)
  //   console.log(mainIngredient); //returns the arguement/element passed for the parameter(s) before the rest parameter
  //   console.log(otherIngredients); //returns the arguemet/elements passed for the rest parameter..these elements will be packed in an array.
  // },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

//SOLUTION....
//step1...separate the 1 big string into 5 parts using the split method...this gives 5 elements in an array

//step 2...loop the splitted array(loop the rows value, save the returned value to const row, then format const row using methods, split const row then destructure row)...after each iteration a single value is returned saved to const row...e.g after first iteration, const row = underscore_case...we then format this row variable value using string methods....then we destructure the formatted value(i.e save it into 2 individual variables, const first, const second)...note originally when we loop, the returned value is a single string ie const row = underscore_case..we used different methods on it, first we transformed to lowercase, then we trim(remove any space at the start of the string), then we split using ('_') i.e (we deleted the _ in the string then made the words bfor and after the _ become values..this 2 values are held in an array )..since we splitted the row variable value(underscore_case) into 2 elements we then destructure the row variable...i.e save the 2 element into 2 individual variables(thats what happened on the left side...const [first, second])...this whole process happens to each rows value iterated...as an example for the... first iteration after all formating and destructuring...const row = underscore_case, const first = underscore const second = case.

//step 3...use temperate literal to print the output in the BC..the temperate literal combines the variables by using placeholders..so in the BC both variables are returned without any spacing between them(no space between the two placeholders), and the first letter of the second variable being capital....so we use the replace and toUppercase method to fix that..we said replace the character in the first position of the second variable with an uppercase of that character..

//step 4...all the variables have the same length and a lot of spaces at the end..so we use padend for that...

//we use a placeholder on the output variable so we can add the checklist icon...the checklist icon increases along with the number of iteration so we set the checklist iocn to the iteration index.

//to get the iteration index we had to use the .entries method on the variable that we are looping..this method when used on an array returns the index/rank/position of an array and the array element itself...we then use destructure to create 2 variables to store the values(index element) returned by the entries method..the variable that stops the index of the array is then used to repeat the icon..we added plus 1 bcos the first index is 0..we needed to start from 1...

//the program should imlement when there is a click...so we used event listener and handler..
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  //console.log(text);

  const rows = text.split('\n');
  //console.log(rows);

  for (const [i, row] of rows.entries()) {
    //console.log(row);
    //console.log(i);
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

// underscore_case;------>underscoreCase
// first_name;
// Some_Variable;
// calculate_AGE;
// delayed_departure;

//////////////////////////////////////
/*
///working with string method..part 3.

//the split method...it allows split a string into multiple partbased on a divider string which is the arguement...when we slit a string, the individual parts of the splited string will be save as elements in a new array..we can now use destructuring to saves the splitted individual parts of the string into variables...
console.log('a+very+nice+string'.split('+')); //delete the plus and take the parts as array elements
console.log('a/very/nice/string'.split('/')); //delete / then return the parts as array elements...
console.log('Jonas Schmedtmann'.split('a')); //delete the a, returns the parts bfor and after the a as array elements...

// .we can now use destructuring to saves the splitted individual parts of the string into variables...
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' '); //right side is an array that has the splited string parts as its element..the left part destructures the array on the right side..i.e it unpacks the array elements into individual elements/values then stores each of this element into the vaiables on the left side based on the position/rank.
//divider string/arguement is space...delete the spaces and split the string into different parts at the points were we have spaces..
console.log(firstName, lastName);

//using different string methods  to produce a string...we want to add a Mr to the front of the full name, then make the lastName uppercase...we can use an array to define the adjustments then join all of the adjustment to form a string(no array)...they work in opposite direction.

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' '); //join removes the elements from the array and return a single string...
console.log(newName);

const newName1 = ['Mr.', firstName, lastName.toUpperCase()].join('**');
console.log(newName1);

//while split is used to break a string into individual parts(elements stored in an array) by the divider string, join is used to merge individual array elements to form a unified string...we joined the elements using space

//capitalizing the first letter of each name
const capitalizeName = function (name) {
  const names = name.split(' '); //we create a variable array of the parameter arguement(name) using the split method...
  const namesUpper = []; //we want to the iterated elent to be stored in an array..so we declaredan empty array here

  for (const n of names) {
    //each iteration of names is stored in n...bfor iteration the values of names were array elements but after iteration they aren't...
    //namesUpper.push(n[0].toUpperCase() + n.slice(1)); //the value stored into n after each iteration we capitalize the first letter then merge that letter to the rest of the values...after the complete iteration, all the elements are stored into the uppernames array using the push method
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' ')); //return the elements as a single string joined by space.. not in an array..
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

//padding a string...this means adding characters to a string until it has a desired length...
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+')); //the padstart add a desired character to the begining of the string..the first parameter arguements the total characters of the padded string, the second arguements sets the character to be padded..after the startPad is returned, immediately we implemented a padend method to the result...
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + ''; //converts number type parameter to string
  const last = str.slice(-4); //return the last 4 characters of the converted number string
  return last.padStart(str.length, '*'); //pad the remaining unsliced character from the first character to the point of slicing
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(3737284938500698));
console.log(maskCreditCard('348765483248904753801'));

//repeat method...enables us repeat a string multiple times...
const message2 = 'Bad weather...all departures delayed...!';
console.log(message2.repeat(5));

const planesInLines = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLines(5);
planesInLines(3);
planesInLines(12);
*/
/*
const airline1 = 'TAP Air Portugal';
//changing the case of a string
console.log(airline1.toLowerCase());
console.log(airline1.toUpperCase());

//chaning a string case directly
console.log('jonas'.toUpperCase());

//fising capitalization in name..
const passenger = 'jOnAs'; //fix this name to Jonas
//step 1...fix everything to lowercase
const passengerLower = passenger.toLowerCase();
console.log(passengerLower);
//step 2..make first charcter uppercase then merge the remaining part of the lowercase string to it using slice method...(J+onas)
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//creating a function that fixes names....
const nameFixer = function (wrongName) {
  const nameLower = wrongName.toLowerCase(); //makes the wrongName lowercase
  const nameCorrect = wrongName[0].toUpperCase() + nameLower.slice(1);
  console.log(nameCorrect);
};

nameFixer('saMuel');
nameFixer('princinHO');

//comparing email...we want to make the 2 emails look exactly the same

const email = 'hello@jonas.io';
const loginEmail = '  hello@Jonas.Io \n';

//step 1...fix the mail to lower cases
const lowerEmail = loginEmail.toLowerCase();
//step 2..fix up all spaces in the lowercase email...we use the trim method to fix up(remove) all spaces in a string.
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

//we can fix up the whole issues in one step...
const normalisedEmail = loginEmail.toLocaleLowerCase().trim(); //we transformed the loginmail to lowercase then we trimemed that transformed value.
console.log(normalisedEmail);

//creating a function to check the mail passed and return a message
const emailChecker = function (passedEmail) {
  const checkedEmail = passedEmail.toLocaleLowerCase().trim();
  console.log(passedEmail === checkedEmail);
};
emailChecker('kingzane.io'); //true...........parameter arguement is the passedEmail
emailChecker('kingZAne. io'); //false........parameter arguement is the passedEmail.

//comparing the original email to our worked on email to see if we did well...
console.log(email === normalisedEmail); //true
console.log(email === trimmedEmail); //true

//we can trim wide spaces only from the start or only from the end....we use trimstart or trim end to do this.

//relacing parts of strings(single characters).......we want to replace the comma to a dot/period....and the £ to $...we use the replace method to do this. the replace method has parameter arguements, what we want to relace and what we intend to be the replacement...
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.'); //replace the £ with $, then saved the string witht the replaced cahracter to a new variable...we then replace the , with dot...
console.log(priceUS);

//replacing entire words in a string...replace method only replaces the first occurrence..so u use the replaceAll method..we first replaced the word then we console log it...
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
const updatedAnnouncement = announcement.replace('door', 'gate');
console.log(updatedAnnouncement);
const updatedJsAnnouncement = announcement.replaceAll('door', 'gate');
console.log(updatedJsAnnouncement);

//replacing the word and console logging at the same time....
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

//if we do not want to use the replaceAll method, we will employ the regular expression code which will instrcut the replace method to target and replace all occurences of the word we wish to replace in the string...
console.log(announcement.replace(/door/g, 'gate')); //we used the regular expression(double slash and g-flag(globalimplement))..the global door word will be targeted and replaced with gate.

//simple string methods that returns a boolean..they are includes, startswith and endswith...
const plane = 'Airbus A320neo';

console.log(plane.includes('A320')); //returns true
console.log(plane.includes('Boeing')); //returns false

console.log(plane.startsWith('Airb')); //returns true
console.log(plane.startsWith('A320')); //returns false..startswith works with only the first word in the string

console.log(plane.endsWith('eo')); //retruns true
console.log(plane.endsWith('us')); //returns false

//using string methods to set conditions...
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  //true returns the message on BC
  console.log('Part of the NEW Airbus Family');
}

//practice exercise...using strings method to set conditions
const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); //convert the parameter arguements to lower case always  bcos when the arguement has an uppercase letter the condition will read it as false even if the arguement and the condition is true/ssame..e.g Knife = flase, kNife=false..we will have to set condition to every posible variation..that is not practical..just convert the whole patamter arguement to lowercase once then set condition using lowercase.
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('You are not allowed on board');
  else console.log('welcome aboard!');
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('got some snacks and a gun for protection');
*/
/////////////////////
//working with strings........it is impossible to mutate strings....to manipulate strings we must first store the string to a variable then play with that variable...
/*
///strings behave like arrays
const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]); //return the first character of the plane string..the returned character is a string
console.log(plane[1]);
console.log(plane[2]);
console.log(airline[4]);
console.log('A320'[0]); //return the first character of the string directly
console.log('B737'[0]);

console.log(airline.length); //return the length of the variable which is a string
console.log('B737'.length); //return the length of the string directly

///strings and array methods
console.log(airline.indexOf('r')); //return the position/rank of a certain character in a string...r is in the 6th position/rank
console.log(airline.lastIndexOf('r')); //return the position/rank of the last r character...
console.log(airline.indexOf('Portugal')); //return the rank/position of the word occurence Portugal...

console.log(airline.indexOf('portugal')); //where we search for the occurence of a word that doesnt exist in the string - 1 is returned

//extracting parts of a string using the slice method...the space is counted as a position in the slice parameter
console.log(airline.slice(4)); //return the string starting from the 4th position(begin parameter)..where the extraction starts...the part of the string returned is called a sub string...
const slice = airline.slice(4);
console.log(slice);

//we can dictate the exact portion of the string we want to extract by setting the beginning and end parameter in the slice method..
console.log(airline.slice(4, 7)); //return a substring starting from the 4th position ending at the 7th position...the 7th rank character is the space..the last rank character is not included in the sub string returned when we use start and end parameters in the slice method...the extraction stops just before end parameter...simply put, the length of the extracted string will be end parameter less start parameter..(7-4 = 3.)

//extracting strings from variables we have no idea about their values bfor hand...

//case 1..extracting the first word of a string...i.e we set the start parameter to 0(first )
console.log(airline.slice(0, airline.indexOf(' ')));

//case 2...extracting the last word of a string...i.e we set the start parameter as the last space of the string(using the lastIndex of which returns the last rank of space )..the last word of a string starts just after the last space of that string...no need to set the end parameter.
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //we said the slice method should start from the last space in the string...the space was added to the substring...to remove it, we said the slice should start one rank after the rank of the last space...i.e the rank of the first character of the last word...

//we can extract from the end of the string using negative parameter
console.log(airline.slice(-2)); //starts extracting from the end...extract the last 2 characters.

console.log(airline.slice(1, -1)); //start extracting from the second character in the string, stop extracting before the last character of the string...

//we use the function below to check if the data/arguement we receive contains a middle seat(B or E), Then its a middle seat..we need to check the last character to see if it contains the middle seat letters
const checkMiddleSet = function (seat) {
  //sit row ABC, DEF...B & E ARE THE MIDDLE SEATS
  const s = seat.slice(-1); //s is a variable which holds the last character of the parameter/arguement passed...
  if (s === 'B' || s === 'E') console.log('You got the middle seat🤦‍♀️');
  else console.log('You got lucky 😁');
};
checkMiddleSet('11B');
checkMiddleSet('23C');
checkMiddleSet('3E');

//we are able to use methods on strings bcos js converts strings which are primitives to objects first then apply the method we code...afetr the operation is done the object is reverted to a primitive(a primitive is any value that is not an object!)...also note, the result of methods applied on strings are primitives.

console.log(new String('jonas')); //example of string object
console.log(typeof new String('jonas')); //returns an object
console.log(typeof new String('jonas').slice(1)); //we applied a method on a string, the result has a datatype of string(primitive value).
*/
/////////////////////////////////////////////////////

//////////////////////////////////
//WHEN TO USE WHICH DATA STRUCTURE...4 types of data structure..1.array, 2. objects, 3. sets, 4. Maps

// the type of data structure to use depend on the nature if the data we want to store/save in the data structure...sources of data for data structure could be from 1. data in the js program itself, 2. data d=from the user interface(data written in the DOM or data inputed by the user e.g forms data), 3. data from external sources(data fetched from web APIs)

//data from external sources/APIs, APIs use a program called JSOON to pass data in the API...the data come in the form of strings but in key value pairs..so it can be converted to javascript object because it uses the same formatting...i.e objects and arrays

//if the data obtained is simple list of data we use arrays or sets...the values have no desription
//use array when u need to store values(data) in order and these values(data) will have duplicate...use arrays when u have to manipulate data a lot bcos arrays have many manipulation methods...
//use when wen working with unique values/data..use sets when u want a high perfomance as operations using sets are 10 times faster than operations working with arrays...use sets to remove duplicates from arrays...

//if the data is a key value pair we use a key or a map...the values have a description(property or key)
//maps are suited for simple key value stores...they offer better relative performance...they are easy to iterate, easy to compur their sizes and maps can have any data types as key value pairs..
//objects are easier tp access using the dot method or []...

//use map when you need to map/assign keys to values, also when you need keys/property that are not strings

//where u need function as value for a key use object..methods...in objects u can use the this keywords in maps u cannot!

//u use objects to work with JSON data
/*
//MAP ITERATION

//filling up a map without using the set method which is too cumbersome when we have too fill the map with a larg amount of key value pairs...we can do this by passing an array inside the map, the array passed will contain multiple array in itself which each having 2 elements (key value pair)...each array within the array will be separated by a comma...i.ethe map is an array of arrays

const question = new Map([
  ['question', 'what is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'correct 👏'],
  [false, 'wrong ❌, try again!'],
]);
console.log(question);

//converting objects to maps
console.log(Object.entries(openingHours)); //return an array of 2 elements([0] = property of the opening hours object, [1] values of these property)..ie we coverted the openingHours object to an array which has an array of 2 element as its value...(an array of arrays)...we then returned that array...we can convert this openingHours Object to a map since a map can be an array of arrays just like when we convert an object to an array of arrays...
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap); //return the object that has been converted to a map..(the map is an array of array just like when we converted the object to an array..)

//building a quiz app using map and looping...
//iteration on maps...using loop on map
console.log(question.get('question')); //return in the BC the value of the question key...
for (const [key, value] of question) {
  //we loop over the question map and at the same time saved the key value pair of each iteration to 2 variables...i.e we dstructured the question map while looping it...we only want to loop and return numbers
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`); //.we only want to loop and return map keys of number types
  //if (typeof key === 'boolean') console.log(key, value); //we only want to loop and return map keys of boolean types
}

//making a user choose the answer(key)...
//const answer = Number(prompt('Your answer')); //the answer the user chooses is stored in the answer variable..
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer)); //if the user chooses 3, the condition becomes true bcos the answer is same as the value of the correct key..the code becomes question.get(true) else it is false when another number aside 3 is choosen, the code becomes question.get(false) ..we then console.log(question.get(false)) which prints the false key value..

//converting a map into an array...
console.log([...question]); //we unpacked the question map key value pairs(i.e arrays each with 2 elements) then we put the unpacked elements(arrays with 2 elements) into an array....i.e an array with arrays...
console.log(question.entries()); //returns the unpacked keys and values of the question map...
console.log([...question.entries()]); //we unpack the question map key value pairs then save it to an array..same as 3 lines above
console.log([...question.keys()]); //returnt the unpacked keys of the question map
console.log([...question.keys()]); //we unpack all the keys of the question map using the spread operator, we then saved the unpack keys in an array....we then return that array
console.log(...question.values()); //return the unpacked values of the question map
console.log([...question.values()]); //we unpack the values of the question map using the spread operator, we then put these unpacked values inside an array... that array is returned
*/

/*
/////////////////////////////////////////////////////
//MAPS fundamentals...map is a data structure used to assign values to keys...in maps data is stored in key value pairs(the key and the value)..it works like objects, but objects usually have their keys value to be strings...maps values can be other maps, arrays, objects or strings, just any data type suffices...

//creating a map..first create an empty map, then fill it up using the set method(this adds element to maps data structure)
const rest = new Map(); //create empty set
rest.set('name', 'Classico Itaiano'); //adds a key value pair to the set
rest.set(1, 'Firenze, Italy'); //adds a key value pair to the set
console.log(rest.set(2, 'Lisbon, Portugal')); //we told js to return the rest map set 2 we added to the rest map, but it always return the whole updated rest map

//chaining the rest map...what we mean here is that we can add new key value pairs to the rest map using this syntax below..notice the absence of ; compared to the syntax above
rest
  .set('Categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']) // key = categories, keyvalue = array...
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');
console.log(rest);

//to return the value of any key of a map in the BC we use the .get method..mapvariaablename.get(key)..returns the value of the key
console.log(rest.get('name')); //return the value for the name key of the rest map in the BC
console.log(rest.get(true)); //return the value of the true key in the BC...
console.log(rest.get(1));

//we can set a condition that returns either a true or false boolen, then use the get method to return the value of the true of false key value...see below

let time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); //return the value of the boolean key the condition will give

//rest.get('open') gives us the value of the open key...i.e 11.....rest.get('close) results in the value of the close key i.e 23..
//above we said is (time > rest.get('open') && time < rest.get('close')...i.e is time > 11 && < 23..yes, the operation returns true...
//rest.get(true) gives us the value of the true boolean..we then console log the value...if the condition is not true, the boolean retrun by the operation will be fasle, then the value of the false boolean will be loogged to the BC....see below

time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

//checking if the map contains a certain key..we use the .has method
console.log(rest.has('Categories')); //returns true

//deleting a key from the map
console.log(rest.delete(2)); //deletes the  key value pair of 2 => 'Lisbon, Portugal'..returns true
console.log(rest); //returns the map set without the key value pair of 2 => 'Lisbon, Portugal'

//checking the size of a map
console.log(rest.size);

//removing all the elements from a map
// rest.clear();
console.log(rest);

//we can use arrays or objects as map keys...
rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.get([1, 2])); //cannot work...

//to get the value of an array key, we ned to first store the array into a variable then use the variable as the key in the map...
const arr = [1, 2]; //save the array to a variable
rest.set(arr, 'Test'); //use the variable as the key
console.log(rest.get(arr)); //works,retrrns the value of the array key in the BC.

//we can use maps to manipulate the elements of an html document
rest.set(document.querySelector('h1'), 'Heading'); //we made the h1 element of the document a key in map..we can access the document h1 element by hovering over the set h1 key in the BC...
console.log(rest);
*/

/*
//SETS...sets do not contain duplicates...in creating sets u use iterables(arrays or objects)
//create a set
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet); //sets deletes duplicates...set behave like array just values no property name and property values..sets do not care about order unlike array(no indexes/ranks exist in sets unlike array)...also it deletes repeated values unlike arrays(set contain only unique values)...

console.log(new Set('Jonas')); //strings are iterables, we can pass a string inside a set

console.log(new Set()); //sets could be emptied

//getting the size of a set....(in arra we call it length in sets we call it size)
console.log(ordersSet.size); //return the size of the OrdersSet set in the BC...

//we can check if a set has a certain element/value in it..if the set has the element, BC returns true, otherwise it returns false...in arrays we use the include method to checkif the array has a certain element/value
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

//adding a new element to a set..we added two elements to the set, but only one will be added, no duplicate exists in sets
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet);

//deleting an element from the Set..
ordersSet.delete('Risotto');
console.log(ordersSet);

//deleting all of the elements in a set
// ordersSet.clear();
console.log(ordersSet);
// deletes the entire elements in the set

//retrieving elements in sets...there is no way in getting values out of a set since it has no index/rank...if the goal is to set values in an order and RETRIEVE THAT value u must use array.

//looping over sets...
for (const order of ordersSet) console.log(order); //we looped the set, saved each looped value to order variable then return the vriable value in the BC....

//Use cases of set
//1. removing duplicates values of arrays
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']; //an array which contains the staff in the restaurant
console.log(staff);
//we want to know just the staff position that exists in the restaurant...i.e get unique values for the staff array...no duplicate..we converted the staff attay to a set...
const staffUnique = new Set(staff); //creates the set by converting the staff array...
console.log(staffUnique);
//we can convert the staffUnique set to an array
const staffUniqueArray = [...new Set(staff)]; //creates the array by converting the uniquestaff set
console.log(staffUniqueArray);

//we can know the size of a set from any given array without having to convert the array to a set tehn checking the set size...do this using this syntax....console.log(new Set([]).size);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

//we can use set.size method to know the number of unique letters in a string like a name..we pass the string directly into the set
console.log(new Set('jonasschedtmann').size); //return the size of the set...

//we can first create the set then check the size...
const nameString = new Set('jonasschedtmann'); //creates the set saved to a variable
console.log(nameString); //return the set
console.log(nameString.size); //return the size of the set...
*/

/*
//LOOPING OBJECTS (PROPERTY NAMES/KEYS)...we can loop over object property name/keys  or the value of the object property or both together...
//looping over the object keys/properties..here we do not loop over the object itself..we indirectly loop the object by creating an array of the object keys then using the for of loop to loop over the array of object keys/property name.

const properties = Object.keys(openingHours); //
console.log(properties); //return the array of keys created from the openingHours object by the object.keys method!

//console.log(`We are open on ${properties.length} days`); //we used the property array lenth to set the number of days opened

for (const day of Object.keys(openingHours)) {
  //we looped the array(has the openingHours object keys as its element) created by object.key...note that the for of loop creates a variable (day) and stores the result of each iteration in that variable...so after first iteration day = thu, after second iteration, day = fri...etc
  console.log(day); //return the value of day after the whole iteration process is completed.
}

//for (const day of properties) {
//instead of using the object.keys, we store it to a variable and used the variable
//we looped the array(has the openingHours object keys as its element) created by object.key...note that the for of loop creates a variable (day) and stores the result of each iteration in that variable...so after first iteration day = thu, after second iteration, day = fri...etc
//  console.log(day); //return the value of day after the whole iteration process is completed.
//}

//we declared a openStr variable that has a nice string which uses the array length to determine the open days, then we looped the properties array(the array that has the keys of the openingHour as its elements), each time the loop is iterated, the openStr variable is updated/changed/altered with the day value that was returned...
let openStr = `We are open on ${properties.length} days:`;
for (const day of properties) {
  //openStr = openStr + `${day}, `;
  openStr += `${day},`;
}
console.log(openStr);

//LOOPING OBJECTS (PROPERTY VALUES)
const values = Object.values(openingHours); //used object.values to create an array that has the openingHours values as its element
console.log(values); //return the values array..the elements in the array are objects bcos they were already objects in the first place.

//LOOPING OVER OBJECTS...to loop objects we first need to use the entries keyword..the entries keyword creates an array which contains the property names/keys and the value of each property name...after which we then loop the created array using the for of loop...note the difference in syntax between using entries for objects and arrays...also note that looping array retruns index/rank and rank value while looping objects return property name and value....

const entries = Object.entries(openingHours); //transform the object into an array
console.log(entries); //return the value of the entries variable which is an array that contains an array for each openingHour property...each array contains the property key and the value of that particular property...

//looping over the object..
// for (const x of entries) {
//   //entries is an array variable that contains 3 elements/values([0],[1],[2]), each value is an array which holds 2 items..now we said the for loop should iterate the array variable and hold the result of each iteration in the x variable...
//   console.log(x); //each iteration will return an array with 2 element(the property name and property value(also an object)) to the x variable...the BC will thus have 3 returns bcos the object has 3 properties in the obejct that was transformed to an array then the array looped.
// }

//we loop the entries array, the value(an array with 2 items) we get after each loop we saved into 3 variables, the first item we saved to the key variable, the 2nd item which is an object with 2 values we saved individually to 2 variables open and close..we can now print a stirng with the variable placeholders..for each iteration, the string is returned with the values of the iteration save to the detructured variables which we used as our placeholder...(observe how we destructure the obeject value into 2 variables)

//key, value...key=day
for (const [day, { open, close }] of entries) {
  //entries is an array variable that contains 3 elements/values([0],[1],[2]), each value is an array which holds 2 items..now we said the for loop should iterate the array variable and hold the result of each iteration in the x variable...
  console.log(`On the ${day} we open at ${open} and close at ${close}`); //each iteration will return an array with 2 element(the property name and property value(also an object)) to the x variable...the BC will thus have 3 returns bcos the object has 3 properties in the obejct that was transformed to an array then the array looped.
}
*/

/*
//OPTIONAL CHAINING
//console.log(restaurant.openingHours.mon.open); //we tried to access a variable that does not exist...the monday value does not exist it returns undefined, the  we tried to read the open value of mon which never exists, we get an error...we can avoid the error by checking if the  mon elements exists in the first place...if it doesnt exist nothing will happen, the error message will not come up...
// if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open); //return 11
// if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open); //return nothing

//we can also check if multiple elements/objects exist then set a value to be returned where the condition is met..if it is not met nothing will happen(no error message will be relayed.

//real world example

if (restaurant.openingHours.mon && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open); //NOTHING WILL BE RETURNED.

//optional chaining is brief, we wrote the above codes which check existence of ibjects and return a message or no meesage at all where the objects do not exist in brief lines using chaining...

//HOWEVER WITH OPTIONAL CHAINING WE CAN SET AN UNDEFINED VALUE TO BE RETURNED IN THE SITUATION WHERE THE OBJECT DO NOT EXIST
console.log(restaurant.openingHours.mon?.open); //mon does not exist, return undefined.(a property exist if it is not nullor undefined)..open will only be accessed if all of the previous objects exist

//Multiple optional chaining...here we check the existence of multiple objects at the same time..instead of writing many line of code to check if multiple objects exist we can use o

//if (restaurant.openingHours.mon && restaurant.openingHours.mon)
//console.log(restaurant.openingHours.mon.open);

console.log(restaurant.openingHours?.mon?.open);

//read world example...we want to loop over the days array to check if the restaurant will be opened on everyday of the week
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  //each time the days array is looped the value of each iteration is saved to a day variable...if the array is looped 7 times, the day variable will return 7 values, each for an iteration process completed.
  //console.log(day); return the values for the day variable(it will return each looped value)
  //const open = restaurant.openingHours[day]?.open || 'closed'; //we did not use . here bcos day is not an object but a variable...[variable]...if the day object exists inside the openingHour object, access the open property and save the open property value to the open variable ..if the day object does not exist in the openinghours object then open does not exist and it is undefined... ${open} = days that exist in the opening hour object or undefined..we used or operator to return closed instead of undefined where the open property does not exist...sat has a falsy value so closed is returned for open instead of 0 so we used the nullish operator
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//OPTIONAL CHAINING WORKING WITH METHODS...we can check if a method exist beFore we call it...
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // if the value of the method is not null or undefined return the first part(i.e call the function)..if any part of the operator returns null or undefined, the operand stops immediately and returns the last value or set message...the function method exists, returns the first part i.e calls the function.

console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); // the method does not exist, the operator returns underfined, the operand stops immediately and the last value(string/set message is returned in the BC)..i.e function is not called!!!

//OPTIONAL CHAINING WORKING WITH ARRAY....we can use it to check if an array array has element and then return that element or we can set a message that will be returned where the array element does not exist.

const users = [{ name: 'Jonas', email: 'hello@jonas.io' }]; //we created an array of object
// const users = []; //the user array is empty, so the name element does not exist
console.log(users[0]?.name ?? 'User array empty'); //we said does the users array has the name element (user[0]) exsiting in it? if yes, access the name element and return it...if the name element does not exist(undefined) the operand should stop immediately and return the last value.

//without optional chaining in array we have to write the if conditional statement like this to yield same result..however the result i not perfect bcos when the array > 0 but name element does not exist, for the optional chain the nullish value will be returned, but for the if statemnt undefined will be returned.
if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');

//main takeaway we always use the optional chaining with nullish operator..optional chaining checks if a property/object/value exist and returns that value, we use the nullish operator to set a value that will be returned when the checked items does not exist(undefined).
*/

/*
//calling the food delievery function method with an object as the arguement
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});
*/

//we want to simulate a food delivery application in this section...

//
/*
//THE FOR OF LOOP...LOOPING OVER ARRAYS..we do not need to manually code the loop instruction anymore
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]; //create a merged array
for (const item of menu) console.log(item); //automatically loop over the item (elements) of the menu array then return the elements in the BC..

//returning an array of the index of the looped array elements(their ranks) and the looped elements each time an iteration occurs...i.e we used the for of loop to return an array that contains the rank of each of the element in the original array and the value/element in that specific position...the loop will return an array[rank, element] for each array element iterated

for (const item of menu.entries()) {
  console.log(item); //the menu array is looped, each iteration results/returns an array that contains the index(rank) of the element looped and the element itself..this will be returned for each element looped
}

for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`); // `${item[0] + 1 means in the first place holder should be the value that occupies rank 0 in the item array, we added 1 to that value so what will be returned for item[0] is item[0] + 1... ${item[1]} means that in the second placeholder should be the value that occupies rank 1 in the item array...
}

//we destructure the item array..i.e saved the values of the item array to individual variables...for each loop array[0] is tored in i, array[1] is stored in el
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`); //we assigned a new variable : (change the name) of the index (each old index name is changed to that index plus 1, then  ${item[1]} means the element that occupies rank[1] in each array)
}

console.log(menu.entries()); //the for of loop uses menu.entries() as an array iterator which iterates the items of the menu, for each item iterated/looped the iterator will return an array that holds the index/rank of the element in the original menu array and the value of the element...

// console.log([...menu.entries()]); //here we destructure the array iterator..we see that it is an array that contains the returned arrays each time the loop runs...
// Coding Challenge #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
*/

/*
CHALLENGE 1 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

/*
//SOLUTION
//1.
const [players1, players2] = game.players; //destructure the palyers array into 2 variables each consist of an array of 11 elements
console.log(game.players);

//2
const [gk, ...fieldPlayers] = players1; //destructure player1 assign it to 2 variables, a gk and the rest(...)
console.log(gk, ...fieldPlayers);

//3
const allPlayers = [...players1, ...players2]; //merge both players arrays to create 1 array of 22 players...
console.log(allPlayers);

//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; // create an array that merges an existing array elements plus some other elements...
console.log(players1Final);

//5...we want to destructure an object that exist inside another object...i.e nested destructuring
//it works but use jonas method

// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

const {
  odds: { team1, x: draw, team2 }, //we changed the name of the variable from x to draw...
} = game;
console.log(team1, draw, team2);

//to save all the properties inside the odd object to one variable called odd we do:
const { odds } = game;
console.log(odds);

//6..visit again
const printGoals = function (...players) {
  //we used the rest parameter to pack all the individual incoming arguements into one array (players array)
  console.log(`${players.length} goals were scored`); // the number of players who scored is the length of the (players) array
};
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');//calling the function using manual   multiple arguements
// printGoals('Davies', 'Muller');//calling the function using manual multiple arguements.

printGoals(game.scored); //we called the function with an array, the function takes the array arguement as one arguement..we need to unpack the array (break the array into its individual elements..we do this using the spread operator)

printGoals(...game.scored); //spread operator unpacks the array into invidual elements and calls the functions with these multiple arguements just like the manualmultiple arguements above

//7
team1 < team2 && console.log('Team 1 is more likely to win'); //use the && logical operator bcos u need an operator that will return the last value when the operands are all truthy(i.e will not short circuit when the first value/condition is true)...so we set the winning condition, thenw we set the value to return, since the condition is true the last value should be returned(remember to console log it)
*/

//////////////////////////////////////
// Coding Challenge #2
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
/*
//SOLUTION
//1...SOLVED COMPLETELY BY MYSELF...✅
const score = game.scored; //we create the array to be looped...
console.log(score); //return the array..to check if the loop was done properly

//we loop the created array, then return a message each time the array is looped
for (const scoreloop of score.entries()) {
  //we looped the score array, but we used .entries to ensure that each iteration returns an array with 2 elements(index of the array and the value of the index)...these are stored in the scoreloop array variable
  console.log(`Goal ${scoreloop[0] + 1}: ${scoreloop[1]}`);
}
//OR...BOTH WAY WE GET SAME RESULT..THE SECOND METHOD IS JUST BETTER..ALWAYS DESTRUCTURE THE ARRAY THEN USED THE DESTRUCTURED VARIABLES AS PLACEHOLDERS RATHER THAT SET THE LACEHOLDERS MANUALLY.

//lets destructure the scoreloop array,(we unpack the scoreloop array values, then saved them individually to variables which we will use as placeholders ) then return same string as above in a very nice way...
for (const [goalNumber, goalScorerName] of score.entries()) {
  console.log(`Goal ${goalNumber + 1}: ${goalScorerName}`);
}

//JONAS SOLUTION...1..very brief
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player} `);

//2
const oddS = Object.values(game.odds);
let average = 0;
for (const odd of Object.values(game.odds)) average += odd;
average /= oddS.length;
console.log(average);
//updated average = initial average + odd(iterated)

//3
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}
*/

//// Coding Challenge #3

// // Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
*/

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀

/*
//task 1, create a set that logs the events...
const eventsSet = new Set([
  '⚽️ GOAL',
  '🔁 Substitution',
  '⚽️ GOAL',
  '🔁 Substitution',
  '🔶 Yellow card',
  '🔴 Red card',
  '🔁 Substitution',
  '🔁 Substitution',
  '⚽️ GOAL',
  '⚽️ GOAL',
  '🔶 Yellow card',
]);
console.log([...eventsSet]);

//task 2, deleting the yellow card value from the BC/log
eventsSet.delete('🔶 Yellow card'); //remove the unfair yellow card
eventsSet.add('🔶 Yellow card');
console.log(eventsSet);

//task 3, printing the string 'An event happened, on average, every 9 minutes'
console.log('An event happened, on average, every 9 minutes');

//JONAS SOLUTION...

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
console.log(gameEvents.values()); //return the values of the gameEvents map..
const events = [...new Set(gameEvents.values())]; //the new set elemens should be the values of the game event map..then we unpack the set elements and save them to an array
console.log(events);

//2...remove a key value pair from the game event log(i.e gameEvent map)
gameEvents.delete(64);
console.log(events);

//3.
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
//bonus
const time = [...gameEvents.keys()].pop(); //returns the last value in the destrucutred array...
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

//4.
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}

*/

/*
const rest1 = {
  name: 'Capri',
  //numGuests: 20,
  numGuests: 0, //problem
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//we created the numGuests property in the rest object using the (dot method), then we used the or operator to assign a value to the created numGuest property..we said if the numGuest property alreaddy exist in the rest object (truthy) the operator should stop immediately and return that value as the numGuest property value, otherwise if it is falsy (does not already exist), the default value of 10 should be assigned to the created numGuests property...

// LOGICAL OR ASSIGNEMENT OPERATOR..assign a value to a variable where the variable is falsy
//using a logical or operator to write the above code in a consise way..
// rest1.numGuests = rest1.numGuests || 10; //returns 20, property already exist(truthy)
// rest2.numGuests = rest2.numGuests || 10; //returns 10, property did not exist before..it returned undefined which is fasle, (falsy)

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// LOGICAL NULLISH ASSIGNMENT OPERATOR...solve the numGuest: 0; problem...it is a precise way to write the nullish operator we used earlier...

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// LOGICAL AND ASSIGNMENT OPERATOR...create an owner property for the rest object if the rest  object has a owner property (true), replace/assign the owner property value with an ANONYMOUS string (the last value of the operand)...if not the operator stops immediately (falsy) and an undefined value is assigned to the created property(undefined is returned bcos the name property does not exist.)

rest1.owner = rest1.owner && '<ANONYMOUS>'; //creates the owner property, chech if it exist(false), operator stops immediately and assign/returns an undefined value to the property
rest2.owner = rest2.owner && '<ANONYMOUS>'; //creates the owner property, check if it exists(truthy) if yes operator runs and returns/assigns last value set to the property

//USE CASE WHEN U WANT TO ASSIGN A VALUE TO A VARIABLE THAT IS ALREADY DEFINED AND HAS ITS VALUE AS TRUTHY, YOU USE THE AND ASSIGNMENT OPERATOR....
//using the logical and assignment operator to write the code consisely....but there is a slight different, this operator assigns a value to a variable only if it is truthy...if it is not truthy nothing is done..as if the variable did not exist..nothing happens
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/

/*
//THE NULLISH COALESCING OPERATOR(??)..this concept works with the idea of nullish values instead of falsy values
//NULLISH VALUES: null and undefined (not 0 or '')...the operator does not work with falsy values, it only stops and immediately return a value if the value is not a null or not an undefined value...where the values in the operator chains are nullish or undefined the operator  continues and return the last value in the operand

//the problem with or operator( 0 is a number but a fasly value so the default value is returned instead of 0..check or operator section)..we use the nullish operator to solve the problem...nullish operator avoids truthy and falsy values, it uses nullish or undefined values...if a value is not a null it stops the operand and returns the value immediately, if it they are all null or undefined it returns the last value in the operand

const guest = restaurant.numGuests || 10;
console.log(guest); //returns 10...

const guestCorrect = restaurant.numGuests ?? 10; //the numGuest is not declared yet, it doesnt exist so the value of the first condition is undefined, the null operator will return the value of the last condition(i.e the default value in this case)
console.log(guestCorrect); //return 10

restaurant.numGuests = 0;
const guest3 = restaurant.numGuests ?? 10; //we declared the numGuest property in the restaurant object, its value is a number which is 0, 0 is falsy, 0 is not null(non nullish) the nullish operator will immediately terminate and return the non nullish value and not consider the other values in the operand
console.log(guest3); //return 0.
*/

/*
//SHORT CIRCUITING (&& and ||)
//boolean value can use any data type, return any data type and they do short circuiting..short circuit evaluation means that if the first operand of the or operator is truthy the other operand will not be evaluated, just the first truthy operand will be instantly returned.

//DIFFERENCE BETWEEN || AND &&...|| SHORT CIRCUIT SEEK TO RETURN A TRUTHY VALUE, WHEN NO SINGLE TRUTHY VALUE EXIST, THE LAST VALUE IN THE OR OPERATOR CHAIN IS RETURNED.....&& SHORT CIRCUIT SEEK TO RETURN A FALSE VALUE, WHEN NO FALSY VALUE EXIST, THE LAST VALUE IN THE AND OPERATOR CHAIN IS RETURNED.

console.log('---OR OPERATOR---'); //the logic, for the || operator to b true, one/any of the conditions/value must be true, once a condition/value is true the || operator must return return the whole process as treu, there is no need for the || to run all the values or conditions...once it identifies a truthy value it stops immediately and return that truthy value as the output of its process...

//how || short cicuiting works, if first operand is truthy(ie first value is a truthy value) the OR operator immediately stop and that truthy value is returned as the result of the || process, otherwise the OR opertor returns the next value irrespecive of if it is true or false. this holds if just 2 values are in the operands...see below example:

console.log(3 || 'Jonas'); //the or operator returns a number(truthy value) in the BC..
console.log('' || 'Jonas'); // an empty string is falsy, the operator returns the next value in the BC
console.log(true || 0); //true is a truthy value, the operator stops execution imstantly, truthy value is returned
console.log(undefined || null); // first value is false, operator returns the second value EVEN IF IT IS A FALSE VALUE..

//where we have a chain of or operators(multiple operands), it is the first truthy value that will be returned as the operand will be killed/short circuited immediately the truthy value is recognised...
console.log(undefined || 0 || '' || 'Hello' || 23 || null); //the first truthy value will be returned i.e Hello...if no truthy value exist in the operands the last value in the operand will be returned.

//using the OR operator with varaibles...we used this instead of the itenary operator(? :)
//here we created a variable which will either hold a property of the restaurant object, if the property exists in the restaurant object or a default value if the property does not exist in the restaurant object...we can use the second or operand to set default values where the first operand is false

//first scenario, the property does not exist...
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10; // const guest1 = restaurant.numGuest1 or guests1 = 10...
console.log(guests1); //return either the numGuest property value or the default value i.e console.log( numGuest || 10)..if the numGuest object does not exist, it will be undefined which is a falsy value, the operator will return the second value in this case.

//second scenario, the property exists
//lets create a the numGuest property in the restaurant object using the .command
restaurant.numGuests = 23; //created a new property in the restaurant object using the . method
const guests2 = restaurant.numGuests ? restaurant.numGuests : 10; // declared a variable which holds either a true or false value
console.log(guests2); //returns either the true or false value...
console.log(restaurant);

//we can declare the above variable which holds either the property or a default value using the or Operator
//scenario 3, using the or operator short circuit when the condition is true...(the property exist)
//restaurant.numGuests = 23;//take note of declaring this variable or not bcos it is what alternates the true and false condition.
const guest3 = restaurant.numGuests || 10; //here we used the short circuiting, we said guest3 should hold either the numguest property or the default value...since the numguest property exist it is a truthy value, the or operator immediately stops execution and the numguest value is saved to guest3. the default value is not considered at all by guest3.
console.log(guest3); //return  what is save in the guest3, in this case the value of the numguest variable...i.e the truthy value

//scenario 4, using the or operator short circuit when the condition is false...(the property does not exist)
const guest4 = restaurant.numGuests || 10; //the short circuit is in place, since the first value is false(the property hold 23, 23 does not exist bcos the variable is not declared...i.e undefined) the second value(default value) will be saved to the guest4 variable
console.log(guest4); //return 10...i.e guest4 = 10.]

//NOTE IF restaurant.numGuest = 0, the console must return 10(i.e falsy value)...this is because 0 as a number is a falsy value!!! this makes the restaurant.numGuest holds a falsy value...where this hapens the guest variable becomes falsy and we already set the default value for a falsy condition to be 10..10must be returned.

console.log('---AND OPERATOR---'); //the logic, for the && operator to b true, all the conditions/value must be true, once a condition/value is false the && operator must return false, there is no need for the && to run all the values or conditions...once it identifies a false value it stops immediately and return that false value as the output of its process...

//using the AND operator SHORT CIRCUITING with varaibles...it works the exact opposite way of the or operator when it comes to short circuiting..the AND operator short circuits when the value is falsy...i.e once the value in the operand is a falsy value, the operator cuts shorts and return that value immediately..when the whole values are truthy, the and operator runs till the last value and that last value will be returned...
console.log(0 && 'Jonas'); //halt the operator and return the fasle value immediatelty
console.log(7 && 'Jonas'); // both values are truthy, the && operator runs till the last value then return the last value.

console.log('Hello' && 23 && null & 'jonas'); //kill the hand operator and return the first falsy value(null)...

//using the and operator with variables...here we want to call a function if only the function exists in the restaurant object..if the function does not exist nothing happens(console log set in the function method will not be returned)...we can use the second operand to execute code if the first operand is true...
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach'); //if the condition is true call pizza with this 2 arguement..check the funcion to see what will be executedin the BC...
}

//using the && operator to write the code above...
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); //if the orderpizza function exist, the function call should be executed...(both are going to be true, the function will be called)
*/

//////////////////////////////
//THE REST PATTERNS AND REST PARAMETERS...use when we need to write VARIABLES seperated by commas
//the rest pattern has the same syntax with the spread operator but it works opposite way compared to the spread operator...while the spread operator expands an array and returns the array elements as individual elements/values the rest pattern collects individual elements not destructured and condense them into a new array/VARIABLE seperated by commas(read/research more)...while we can use the spread operator to unpack elements inside an array(check the ingredient example in spread operator) into individual elements, the rest pattern can be used to pack individual elements into an array where we destructure the array...note we use the spread operator on the right side of the syntax, we use the rest operator on the left side of the syntax...we use detructuring and the rest pattern together


//1.REST PATTERN AND OBJECTS(ARRAYS AND OBJECTS)
///USING REST PATTERN ON ARRAYS
//SPREAD, because on RIGHT SIDE OF =
const arr = [1, 2, ...[3, 4]]; //spread operator example...adds the [3,4] array elements as individual elements to a new array

//REST, because on LEFT SIDE OF ==
//we destruct the array on the right side(i.e return the array eklements as indivdual elemnts saved in the variables on the left according to the element rank)...const a = 1 ,const b = 2, const others = [3,4,5]. we used destructure  to unpack all the elements inside the arr array...ie we turned the arr elements into individual elements tobe saved in individual variables that are on the left side of the = operator...the others variable is created with the rest pattern, it is an array variable which holds the following individual/destrcutured/unpacked elements 3,4,5...the rest pattern simply collects the elements that are unused in the destructuring assignment.

const [a, b, ...others] = [1, 2, 3, 4, 5]; //right side array, left side destructure variables which stores the unpacked/individual elements of the destructured array..the rest syntax allows us store multiple unpacked/individual elements inside a variable, so the variable holds an array which contains multiple unpacked/individual elements.
console.log(a, b, others); //return 1,2 and ans array [3,4,5]...

//using both spread operator and rest pattern at the same time on an array...in the example we created a merged array(mainMenu array plus starterMenu array) using the spread operator and on the left side we destructured the merged array that is on the right side...we unpacked/made the merged array elements become individual elements(not array elements anymore...we removed them from the array) then we saved these individual elemnts into variables...we used the rest pattern to save multiple unpacked/individual elements into the otherFood variable....note that when we use the rest pattern, the variable holds an array of the unpacked elements...the rest pattern collects elements not sotred after the last variable bfor it...it does not include skipped element....the rest pattern must be the last variable in the destructuring assignment...there can also be only one rest pattern per destrucutring assignment.
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); //const pizza = pizza, const risotto = risotto, const otherFood = [focaccia, bruschetta, garlic bread, caprese salad].
*/

/*
//check, if name of variable must be name of destructured elements in the array..answer:NO!!!
const we = ['k', 'm', 'o'];
const [n, , h] = we;
console.log(n, h);
*/

/*
///USING REST PATTERN ON OBJECTS...the difference here is that the remaining/rest individual/unpacked elements will be packed into an object(the object created by the rest synatx!)

//in the below example we want to destructure the opening hours object, the weekend object/element should be stored in a variable while the weekdays objects/elements should be packed into the rest variable(the rest pattern will create a variable which holds an object which contains the packed elements..(the packed elements are also objects on their own))

const { sat, ...weekdays } = restaurant.openingHours; //openinghour is an object which is a property of the restaurant object
console.log(sat, weekdays); //const sat = {open:0, close:24}, const weekdays = {thur:{open:12, close:22}, fri:{open:11, close:23}}.
console.log(weekdays); //return the weekdays varible only..ie {thur:{open:12, close:22}, fri:{open:11, close:23}}.

//2.REST PARAMETER AND FUNCTIONS...when we have a function that takes in array as its parameter arguement, the rest parameter becomes handy as it basically packs individual elements into an array, this array can then be used by the function...in the below example we created a function that sums up any amount of numbers passed into it as an arguement...instead of writing too many parameters, each for an input to be passed into it as the parameter arguement when we want to call the function, we can simply use the rest parameter which packs all the arguements into an array...since the arguements are now in an array we can use the loop syntax inside the function...

// so u know how just how rest parameter works
// const add = function (...numbers) {
//   //the rest parameter packs the arguements/individual elements into an array(numbers array), then this array will be passed into the function
//   console.log(numbers); //return an array which contains the pack elements/arguements.
// };
// //calling the function using different arguements...all the arguement will be packed into an array by the ...numbers
// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 1, 4);

//each time the function is called, it loops the function call arguement, after eeach iteration the sum is updated, we started we sum 0, after first iteration the sum becomes 0 + first arguement iterated and so on...
const add = function (...numbers) {
  //we can use loop in this function because the arguement is now an array..
  let sum = 0; //initial sum, after each iteration it will be updated
  for (let i = 0; i < numbers.length; i++) sum += numbers[i]; //sum = initial sum plus each number iterated...after 1st iteration sum = 0 + numbers[0], 2nd iteration sum = 0+[0] + numbers[1]...
  console.log(sum);
};
//calling the function using different arguements (rest arguements)
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 1, 4);

//to use an array as the arguement when we want to call a function with the rest parameter we have to use the spread operator..the spread operator will first unpack the elements in the array, then the rest parameter will pack the elemnts back into and array then pass this array into the function...take NOTE!

const x = [23, 5, 7]; //we create a simple array
add(...x); //to use the array as a function arguement we used the spread operator(...)..it will simply unpack the array.. the call function then looks like this: add(23, 5, 7);

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach'); //we called the orderpizza function with 2 arguemnts not 4 as the rest parameter in the function will group all arguements after mushroom as elements inside an array..this arguement will be grouped in 2 by the function parameter...mainIngredient = mushrooms, ...otherIngredients = [onions, olives, spinach].

restaurant.orderPizza('mushrooms'); //when we call the function using just 1 arguement the rest parameter will have no arguement it will be an empty array.

//takeaway: use rest syntax when we need variables seperated by commas, use spread syntax wen we need values separated by commas
/////////////////////////////........use spread when we need to write VALUES/ELEMENTS separated by commas
*/

//SPREAD OPERATOR....creating a new array which contains an existing array element but with new elements added to its start...USE THE SPREAD OPERATOR WHENEVER YOU NEED THE INDIVIDUAL ELEMENTS OF AN ARRAY!!!ALSO USE WHEN WE NEED TO PASS THE ARRAYS MULTIPLE ELEMENT INTO A FUNCTION....THE SPREAD OPERATOR IS LIKE DESTRUCTURING BECAUSE IT HELPS US GET ELEMENTS OUT OF AN EXISTING ARRAY INTO A NEW VARIABLE(NEW ARRAY)...BUT IT IS DIFFERENT IN THAT IT TAKES ALL THE ELEMENTS OUT OF THE ARRAY(DESTRUCTURING CAN OMIT ELEMENT...THE SPREAD OPERATOR DOESNT CREATE NEW VARIABLES BY ITSLEF...IT ONLY BRINGS OUT ALL VARIABLES IN AN ARRAY THEREFORE WE CAN USE IT IN PLACES WHERE OTHERWISE WE COULD HAVE WRITTEN VALUES SEPERATED BY COMMAS.
/*
//manually creating the new array which has some elements at the start and an existing array (arr) elements inside it...
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); //returns the array we want but we had to do it manually...not nice

//using the spread operator to add the existing array elements in the new array
const goodNewArray = [1, 2, ...arr]; //the spread operator(...arr) expands the new array by adding the element of an existing array to it as if we wrote the array elements manually.(without the ... the new array will contain the existing array and not its element)
console.log(goodNewArray); //returns the new array which consist of some typed elements and the elements of an exisitng array..nice

// we use the spread operator when we want to pass an array element into a new array and also when we want to pass an array arguement(with the array individual element) into a function...for instance we can use the spread operation in the consolelog function...

console.log(goodNewArray); //returns the array...
console.log(...goodNewArray); //we used the spread operator to return each elements in the array and not the array itself.
console.log(1, 2, 7, 8, 9); //we couldhave logged the elements individually..

//we want to cretae a new menu array that has a new element and the existing menu array elements as its content...note that the existing array belongs to an object so observe (restaurant.mainMenu)...the new array starts with the expanded mainMenu array..expanded here means the elements of the existing array we have added to the new array, then we added the last element...we create the new array by using the square bracket..dont forget the square bracket.
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//IMPORTANT USE CASE OF SPREAD OPERATOR...1 TO CREATE SHAllOW COPIES OF ARRAYS, 2. TO MERGE 2 DIFFERENT ARRAYS

//using spread operator to create a copy of the mainMenu array
const mainMenuCopy = [...restaurant.mainMenu]; //cteared a shallow copy of an existing array
console.log(mainMenuCopy);

//joining 2 or more arrays together using spread operator
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]; //a new array that merged two different arrays
console.log(menu);

//iterbles are arrays, strings, maps sets...NOT OBJECTS!.SPREAD OPERATOR WORKS ON ITERABLES BUT NOT OBJECTS...
//using the spread operator on strings...we want to create an array that contains all the individual leters of the string as elemenrts and some other elements...
const str = 'Jonas';
const letters = [...str, '', 'S.']; //used the spread operator to create a new array with elemnets which contains a existing string
console.log(letters);
console.log(...str);
// console.log(`${...str} Schmedtmann`);//cannot work...u dont use spread operator for place holders  bcos it has commas...

//we can use the spread operator for functions which accept multiple arguements, as we will use the spread operator to set these arguements...the parameter arguements nned to be array elemnents bfor we can use the spread operator...NOTE THAT!!!
const ingredients = [
  //ingredient is an array with 3 elements..we set the elements to be filled externally with the promt...this elentswill serve as the parameter arguement of the orderpasta function later...
  prompt("let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3 ?'),
];
console.log(ingredients); //return the ingredient array...
console.log(...ingredients);//return the elements in the ingredient array as individual elements! take note, here we used the spread operator to unpack an array...i.e, return the array elements as individual elements..we removed the elements from the array...

//calling the orderpasta function using the spread method or the manual method...both will work bcos the paramaters exist in an array...always use spread operator method!

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]); //calling the order function method usigng the elemnts from the ingredient array as the arguement for the function...

//instead we can use the spread operator to set the arguemnt for the function method since the parameters are elements of an array.
restaurant.orderPasta(...ingredients); //the spread operator will return the 3 elements of the ingredient array each separated by commas, exactly what we neended as the arguements to call the orderPasta function method...

//SPREAD OPERATOR WORKS ON OBJECTS STARTING FROM ES18..........

//objects and spread operator...
//creating a new obeject with elemnets from an existing object and some other elements
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

//creating a shallow copy of an existing object..we use this syntax instead of object.assign syntax
const restaurantCopy = { ...restaurant }; //creating a new object which copies an existing object
console.log(restaurantCopy); //returned the shallow object..
restaurantCopy.name = 'Ristorante Roma'; //we changed the name property value in the shallow object...
console.log(restaurantCopy.name); //return the cahnged name
console.log(restaurant.name); //return the name property of the original object
*/
/////////////////////////////////

////////////////////////////
//DESTRUCTURING OBJECTS
/////////////////////////////
//to destructure objects we need to use the name of the object properties we want to asign to new variables as the variables name...only after we have done this we can then reassign/change the name of the variables, so that these variables which holds the object properties values will not be the same name as those inside the object..pay attention to the bracket on the left syntax..note in objects the order of the properties and thier values do not matter...
/*
const { name, openingHours, categories } = restaurant; //destructuring the object...we saved the values of the 3 named properties in the object to the variables on the left...i.e const name = classico italiano, const openingHours = {..}, const categories = [...];
console.log(name, openingHours, categories); //the 3 variables have a string, object and array values..

//changing the name of the variables which h++olds the destructed object properties...
const {
  name: restaurantName, // const restaurantName = Italiano classico
  openingHours: hours, //const hours = {},
  categories: tags, //const tags = [],
} = restaurant;
console.log(restaurantName, hours, tags);
*/

//default values....
//we can set default values for a destructured object which we do not know its length..it works just like default values for arrays...so when our set variables are in excess or we try to store an element that is not in the object instead of having undefined as the value of the variable we can assign a default value in this situation...we use '=[]' to set a default value...we set the default value to an empty array...
/*
const { menu = [], starterMenu: starters = [] } = restaurant; //const menu = [], const starters = [...]
console.log(menu, starters); //menu does not exist in the restaurant object..menu would have been undefined in the BC but we assigned a default value to it..that is the value returned in the BC....note how we reassigned the variable name for starter we did the two process at once, we first save the restaurant object startMenu array to the starterMenu variable then changed the variable name from staterMenu to starters...
*/

/*
// mutating variables while destructuring objects...
// we want to destructure the array and at the same time make the variables change the value that hold from the set value to the values in the array....

let a = 111; //we want to mutate let a = 111 to a = 23;
let b = 999; //we want to mutate let b = 999 to b = 7.
const obj = { a: 23, b: 7, c: 14 };
//the normal syntax below cannot work bcos there is no const or let(we cannot use them here bcos we do not want to declare new variables, we only want to destruture the objects saving its element to already existing let variables.this allows us change the value of such variable), when there is no const or let bfor the curly braces js cannot destructure the object bcos when a code is started with curly braces js expects a code block not an equal to sign(=)...for this reason it will pop up an error...however to make enable us destructure the object and at the same time mutate/change the values of the already existing variables in which we want to save the object elements we use a bracket to wrap the destructure syntax...
//{ a, b } = obj;
//console.log(a, b);

//this will work..the issue of js expecting a code block has been solved...we did not start the syntax with curly bracker, but this did not affect how it is expected to work but it helped us bypass the block code issue.
({ a, b } = obj); // a = 23, b = 7.
console.log(a, b);
*/

//nested objects...destructuring an object that has an inner object in it but exists inside another object...the restaurant object has an openingHours property which is an object that has inner objects in it...we want to create two variables that holds the opening and closing hours for firday object...fiday object is a neseted object as it exists inside the openinghours object...to do this we first create a variable that stores the friday object...remember in destructuring object u name the new variable as exactly as the property of the object u which to save to it...the fri object is a property of the openingHours object
/*
const {
  fri: { open: o, close: c },
} = openingHours; //we destructure the openingHour object(we saved the property value to a variable named as the property....so the fiday variable stores the fri object as its values...then we destruct the fri variable which holds an object with two values..thus saving each object value to a new variable each....in short, we destruct the openingHours object, the fri variable holds the value which is an object with two values, we then destruct the fri object variable savings its 2 objects values to 2 variables open and close.....we then changed the name of the open and clos variable...to o and c...
console.log(o, c);
*/
///same way we pass an array into the order function method in the restaraunt object we can pass objects into a function method, the passed objects will serve as the arguement of the function method....just the same way the arrays served as parameter arguements

////////////////////////////////
/*
/////////////////////////
//DESTRUCTURING ARRAYS
////////////////////////

//data destructuring...destructuring is an ES6 feature which basically is a way of unpacking values from an array or an object into smaller variables, it is a method of breaking complex structures down into samllar data structure like variables.

//array destructuting involves using destructuring to retrieve elements from the array amd store them into variables...we can also use it to take out some specific array values out of a larger set of array values from the array and store just that specific array values into variables(we do not have to take all of the elements/values out of the destructured array)

const arr = [2, 3, 4];
//breaking down the array manually...we assign the arr array values to different variables manually
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c);
console.log(arr);

//using ES6 automated destructuring, with this method we code less and we preserve the arr
//we declare the 3 variables and assign the array values to them instataenously..we destruture the array from the right side to the left...the left side is the destructuring assignment it is not as array of x,y,z...it is simply a syntax that tells js to break down/destructure the arr...always declare the variables using const...after detructuring the original array is still intact.
const [x, y, z] = arr;
console.log(x, y, z); //we destructure/brokedown the array assigning each array value to a different variable
console.log(arr); //after we destructure the array it is still intact...it is not affected

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    //this function method lets us return a value/element each from the mainMenu and starterMenu arrays
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //return restaurant.starterMenu[arguement], restaurant.mainMenu[arguement]..return the two elements in an array..take note of the bracket[]...
  },
  orderDelivery: function ({
    //the method receieves the object as its arguement, any property not set use default value...
    starterIndex = 1, //set default starterIndex to [1], if the method does not see any index in the function call it uses 1.
    mainIndex = 0, //we set the default value of mainIndex to [0], if main index is absent in the function call use 0 in its place
    time = '20:00', //we set the default time value to 20:00
    address,
  }) {
    console.log(
      //when the function method is called the string should be returned in the BC
      `Order received! ${this.starterMenu[starterIndex]} and  ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};
*/
/*
//taking some elements/values out of the categories array in the restaurant objrct above...
const [g, h, , k] = restaurant.categories; //any variable names we use will work, the variables will take the array values in an orderly manner starting from [0]; to jump an element in the array we leave a hole ( ,) in the destructuring syntax for the position of the element we want to skip...wen we want to console log do not put the empty space.
console.log(g, h, k);
*/

/*
let [main, , secondary] = restaurant.categories; // let main = italian, let secondary = vegetarian...
console.log(main, secondary);

//we can use destructuring to switch the positions of the elements of an array in the BC...
//switching the position of the main and secondary categories manually
// const temp = main; //sets the temp variable value to be that of the above main variable i.e temps = Italian
// main = secondary; //changes the value of the main variable to be that of the secondary variable i.e main = vegetarian
// secondary = temp; //changs the value of the secondary variable to be the value of variable temp i.e secondary = Italian...
// console.log(main, secondary); //returns main = vegetarian, secondary = Italian...i.e switched values for both positions

//switching variables values using destructuring...we want the above let variables be interchanged in the browser console...i.e instead of main = italian and secondary = vegetarian we want main = vegetarian and secondary = italian...first on the right side we create a new array with the already switched variables in their desired respective position, then on the left side we use the destructure syntax to assign the swiched variables values to the variables we want.
[main, secondary] = [secondary, main]; //vegetarian is the first element in the array, then italian is the second element in the array...now on the left side we assign the array elements to exisitng variables using destructuring thereby changing their values...main = vegtarian, secondary = italian.
console.log(main, secondary);
*/

/*
//personal example: i want to return variables that switch the position of the mainMenu array 1st(Pizza) and 2nd values(Pasta) in the BC...

//step 1; destructure the mainMenu array i.e store the 2 values according to thier original position in the array to new variables
let [k, j] = restaurant.mainMenu; //k = Pizza, j = pasta
console.log(k, j);

//step 2: on the right create a new array, switch the position of the variables(i.e in the new array the original position of the values assigned to the variables have now changed)...on the left destructure the new array again(i.e assign the changed values to the exsiting variables.)
[k, j] = [j, k]; //on the right we said pasta comes first, pizza comes second...on the left we saved the array values on the right to the variables there..technically we just changed values of the let variables previously declared to new values
console.log(k, j);
*/

/*
//destructuring a returned array....the returned array consist of an element each of 2 different arrays returned using a function method....check the top of the this script...
console.log(restaurant.order(2, 0)); //we called the function method in the restaurant object with two arguements..remember the order function method lets us select an element each at the same time from the mainMenu array and the starterMenu array...ie we can order food from the restaurant, what we can order is an array which consist of one food item each (each element) from 2 menus...we can now assign the returned array values to variables to hold...i.e destructure the returned array.

let [starter, main] = restaurant.order(2, 0); // call the order function method  on the right side which returns an array with 2 elements as its values...on the left side we assigned/destructure/save this 2 elements into 2 let variables..i.e starter = garlic bread, main = pizza....
console.log(starter, main); // returns 2 values for the 2 variables but there is no array anymore...(destructured)
[starter, main] = [main, starter]; //starter = pizza, main = garlic bread...
console.log(starter, main);
*/
//receive 2 return values from a function..we created 2 variables out of 1(the) function call
//const [starter, mainCourse] = restaurant.order(2, 0);
//console.log(starter, mainCourse);

/*
//working on nested arrays(arrays inside arrays) using destructuring method
const nested = [2, 4, [5, 6]];
//we can destructure the nested array and save the fist elemnent to a variable, skip the second element then save the inner array to a second variable...
const [i, , j] = nested; //we breakdown the nested array, const i = 2, const j = [5, 6]..
console.log(i, j);

//nested destructuring...destructuring inside destructuring...
//we can save all the elements inside the nested array to new individual variables using destructuring...we will skip the element 4 again
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested; // we assigned the elements in the inner array to different variables by using destructing indside destructing...we first destruct the outer array..i.e assign new variables to the outer array element, then we destruct the inner array...we broke down the nested array like this, const i = 2, const j = 5, const k = 6...if we do not use the [] inside the destructuring syntax...i.e in the left side, const j = [5,6] and const k will be undefined...i.the inner array elements will all be assigned to j.
console.log(i, j, k);


//default values....sometimes we do not know the length of the array we want to destructure esp when the array values will be obtained from web APIS...in this situation we can set default values for the new variables in which we will save the destructured array...when the array is shorter...i.e contains elements lower than the set variables which will store the destructured elements, the excess variables when we do not set a default value for them will be undefined, but when we do the excess variables will simply take up this default values as their values instead of being undefined....TO DO THIS WHEN WE SET THE DESTRUCTURE SYNTAX WE ASSIGN DEFAULT VALUES TO ALL THE VARIABLES, HOWEVER WHEN THE ARRAY IS READY TO BE DESTRUCTURED ONLY THE EXCESS VARIABLES WHICH DO NOT HAVE ARRAY ELEMENTS ASSINGED TO THEM TAKES THE DEFAULT VALUE, THE OTHERS TAKE UP THE ARRAY ELEMENT ASSIGNED TO THEM ACCORDING TO THE RANK OF THE ARRAY ELEMENT

const [p = 1, q = 1, r = 1] = [8, 9]; // const p = 8, const q = 9, const r = 1(default value)
console.log(p, q, r);
*/
/////////////////////////////

///////////////////////////////////////
