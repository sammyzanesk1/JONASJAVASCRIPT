'use strict';
/*
//function scope
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName); //firstname is outside of the function scope but it will be executed bcos all global variables can be accessed by all scopes...first name is a global variable. global variables are those declared outside a function...note that firstName was executed bcos it occured bfor the function was called...if it happens after the function is called, the console log instruction will not owrk bcos the function scope can only look up...i.e recognise all global variables before it is called...it can not recognize those declared after it is called.
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
*/

/* 
//function inside function scope
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output); //this will dipslay the string as the child function can look up
    console.log(age); //this will display the age as the child function(inner scope) can carry out variable look up on all other outer scopes. note that firstName was executed bcos it occured bfor the calcAge function was called...if it happens after the function is called, the string will not work bcos the child function scope can only look up to its parent function and global scope...since the parent function does not recognise the global scope the child function will also not recognise it.
  }
  printAge(); //we can call the printAge function here bcos the printAge function is a child/inner scope of the CalcAge function/outer scope...so the can look from inside to outside.

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
//console.log(age); the age variable can only be executed in the calcAge function and its inner scope function...i.e printAge
//printAge(); the printAge variable cannot be executed outside of its function..so we cannot call it outside of its parent scope....i.e in the global scope..only inner scopes(functions) can have access to outer scopes(variables outside functions)...so the printAge() is saying js should work from the global scope(i.e printAge is called outside the function) and call the PrintAge function which is an inner scope(i.e function scope)...we can only access outside from inside and not inside from outside...in the global scope we do not have access to other variables defined in the other scopes(inner scopes)
*/

/*
//block scope...a block scope is the code inside a curly brace...in block scope, const and let variables are blocked scope which means they cannot be executed outside of the block(curly brace) in which they exist...but, var is function scope which means that it ignores the block and it can be executed outside of the block...however , the block scope can carry out variable lookup up to the global scope....
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const str = `you are a millenial, ${firstName}`;
      console.log(str); //str is a constant it can only be executed inside the block code. it will b displayed
    }
    //console.log(str); //str is a const in the block code..here it is written outside of the block code it cannot be executed.
    console.log(millenial); //millenial is a var variable in the block code..here it is written outside of the block code where it exist... it can be bcos executed bcos it is a function scope..the millenial variable belongs to a block code which is the child of the printAge function. so the whole block code is part of the function scope of the printAge function, so the code runs...the cope of the millenial variable is the entire printAge function...
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
//console.log(age);
//printAge();
*/

/*
//functions are blocked scope in ES6....a function inside a block code will be block scoped...but this is true only under when the js script is under strict mode...
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const str = `you are a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3)); //this will be executed bcos the add function console log is written within the block scope...i.e the curly brace of the block function in which it exist...
    }
    //console.log(add(2, 3));//this will not be executed bcos it is written outside of the block scope in which the add function exist....the if block code is the scope of the add function, the add function is block scoped which means it can only be executed within the if block scope i.e inside the curly braces...however, note that if we remove the js script from strict mode, functions inside blocks will no longer be block scoped which means that if they are console logged outside of the block code they will be displayed.
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
//console.log(age);
//printAge();
*/

/*
//experimentations
//where a variable is declared in a parent scope and a child scope, and another vaiable in the child scope needs the value of the variable that has been twice declared...it will implement the one in its scope...i.e the child variable value...it works like this bcos js will execute look up variable first in the inner scopre/child scope before looking up to the outer scope/parent scope if not found here it goes to the global scope....the scope chain is not necessary at all if the variable we want to look out for is already in the same block/ function, so no variable lookup will be executed in fact... see the firstName example below

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output); //this will return Jonas, first js will look at the function itself and see no first name variable then js will perform variable look up(i.e find the variable outside of the function scope...ie go into the global scope there it sees firstname ste to Jonas and implements that.)...most importantly note that js does not look inside it can only look outside...so here the function could not look within itself...if it did it would have taken the firstname set to steven...

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Steven';
      const str = `you are a millenial, ${firstName}`;
      console.log(str); //this will return Steven..look at the top for explanation...

      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3));
    }
    //console.log(add(2, 3));
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
//console.log(age);
//printAge();
*/

////////////////////////////////////////
//experimentations
//redefining a variable from a parent scope inside of a child/inner scope...ie reassigning the value of a variable in the inner scope that was set in the outer scope...when this happens if we console log the output variable inside the inner scope or in the outer scope after re assigned the variable avlue, it is the reassigned output that will be returned/displayed in the BC...before it is reassigned it is the original value that will be returned....

//in the code below, the printAge function is the outer scope / parent function while the add function is the inner scope / child function
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName} You are ${age}, born in ${birthYear}`; //set output variable
    console.log(output); //the original value will be displayed sofar we console log the variable bfor we reassigned it.

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Steven';
      const str = `you are a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = 'NEW OUTPUT!'; //reassigned output variable
      console.log(output); //the reassigned value will be displayed
    }
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
//console.log(age);
//printAge();
*/

//Experimentation
//where we declare a variable in the inner scope that we have already declared before in the outer scope, here when we console log outside the inner scope, the return will be the set value of the variable declared in the outer scope...if we console log the variable in the inner scope, it is the new assigned variable that will be displayed in the BC...
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Steven';
      const str = `you are a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      const output = 'NEW OUTPUT!'; //new assigned variable
    }
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
//console.log(age);
//printAge();
*/

//////////////////////////////
//hoisting....it means that before execution js scans the scripts and moves all variables to the top of the execution list(variable environment object)...for function decleration under strict mode they are block scope but when not under strict mode they are function scope.it is hoisted..for var variables are function scope.it is hoisted..for let and const variables...they are not hoisted, they are uninitialized, they are placed in a temporary dead zone, u must call them bfor they can be implemented, their scope is block scope...

//Variables
/*
console.log(me);
//console.log(job);
//console.log(year);

var me = 'Jonas'; //hoisted but undefined
let job = 'teacher'; //not hoisted, tdz
const year = 1991; //not hoisted, tdz
*/

//functions
/*
console.log(addDeclaration(2, 3)); //function declaration are hoisted which means bfor execution js extracts its variable to the top of the execution list, thereforr u can call/implement the function bfor u declare it...the code will be excuted as seen here...function declaration is hoisted bcos the function carries a var, and vars are hoisted...

console.log(addExpression(2, 3)); //function expression are not hoisted which means bfor execution js extracts its variable to the top of the execution list, but will not let u implement it bcos it has placed the function variable which is a const on a tzd...the code will be excuted only after hte function is called and only if it is logged below the line it was called...function expression is not initialized until it leaves the tdz...
console.log(addExpression(2, 3)); //function arrow are not hoisted which means bfor execution js extracts its variable to the top of the execution list, but will not let u implement it bcos it has placed the function variable which is a const on a tzd...the code will be excuted only after the function is called and only if it is logged below the line it was called...function arrow is not initialized until it leaves the tdz...

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;
*/

/*
console.log(addArrow); //undefined
console.log(addArrow(2, 3)); //..i.e console.log(undefined(2,3)); this is not a function
console.log(addExpression(2, 3)); //since the function is a var function it will be hoisted, but remeber var is undefined so the function  will be undefined, an undefined function is not a function...so it cannot be executed...

var addExpression = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;
*/

/*
//using var creates bugs bcos of the way hoisting handles function declarations and vars...it hoist them and set thier values to be undefined....example:

if (!numProducts) deleteShoppingCart(); //call the function if value is not a number, any value with type of false will be true here and the function will be implemented here...

var numProducts = 10; //the numProduct is a number ordinarily, but hoisting will hoist the variable in the process turning it to an undefined value, undefined values are fasly thus the function will be implemented as hoisting has made the condition true by converting the numProduct from a number to an undefined value...best practice : avoid using VAR to declare variables,use const and let...declare variables at the top of each code..i.e variables should be declared before functions....call functions only after u declare the functions first.

function deleteShoppingCart() {
  console.log('All products deleted!');
}
*/

/*
//variables declared with var will create a property on the window object.
//only var will be registered as a property in the window, let and const variables will not be
var x = 1;
let y = 2;
const z = 3;
//return true if the variable is a property of the window, else return false...
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
*/
///////////////////////////////////
//this keyword...it is a special variable created for every function that is executed. it represents the value of the owner function...i.e the function being executed...its value is only assigned when the function it belongs to is called...u can call a function in different ways...the way u call afunction will determine the this keyword value...

//1. this key word may assign its value to the object calling the method to which the this keyword is used for...i.e the this keyword points to the object xalling the method...for example:
/*
const jonas = {
  name: 'Jonas',
  year: 1989,
  calcAge: function () {
    return 2037 - this.year;
  },
};
jonas.calcAge(); //the jonas object calls the calcAge function/method, so therefore the this keyword points to the Jonas object property(year)...i.e this.year means jonas.year{i.e 1989}
*/

/*
// the this keyword outside of any function
console.log(this); //the this keyword exist in the global scope..i.e outside of any function...in the global scope the this keyword is simply the window/global object..

/////////////////////
//if a function does not belong to an object, and the this keyword is used in the function, the value of the this keyword will be undefined..this is bcos the this keyword points to a property in an object, since the object and its value is not prresent, the this keyword has no defined value...example below:

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //undefined..the object is absent, the this keyword cannot point to the property value (this.year) of the absent object...so its own value is undefined.
};
calcAge(1991);

//////////////////////////
//if we use the this keyword on an arrow function, we have to understand that arrow function do not exist in objects, so they do not have thier own this keyword, rather they use the this lexical keyword  which simply means that an arrow function uses the this keyword of its parent function or its parent scope...so when we write the this keyword in an arrow function, the arrow function will look at the whole global scope and point to the value of the this keyword of the glabal scope/parent scope, if the parent scope/ global scope does not have a this keyword property value, the value of the arrow this keyword becomes undefined.

//////////////////////////
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); //the this keyword of the arrow function will point to the global this keyword..if there is none it will still point to the global scope/window...
};
calcAgeArrow(1980);
*/

/*
////////////////////////
// when we use the this keyword, inside of a method....the this keyword will be the object calling the method...
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); //the ths keyword returns the object in the BC.....the  this keyword means jonas
    console.log(2037 - this.year); //instead of setting a parameter and passing an aruement like the one below we can use the this keyword to point to the object property we want to use in our calculation..
  },
};
jonas.calcAge(); //jonas is calling the method in which the this keyword exist, that is why the this keyword points to the jonas object...

// const jonas = {
//   year: 1991,
//   calcAge: function (birthYear) {
//     console.log(this); //this returns the object in the BC.....the  this keyword means jonas
//     console.log(2037 - birthYear);
//   },
// };
// jonas.calcAge(1991);

///////////////////////we do not have to write a method in a duplicate way ...i.e we can make 2 object have the same method, instead of creating the same method for the two object with different codes, we simply copy the method in which we wrote in the first object then copy it to the next object we want to have the method as its property too..we do this through method borrowing...example below:

const maltida = {
  //created a new object, and we added a new property(method) to it using method borrowing.
  year: 2017,
};

maltida.calcAge = jonas.calcAge; //here we simply copy the calcAge method in the jonas object to the maltida object...so maltida object now has the calcAge method as a property we just cannot see it right here in the object but it is there, check the console browser...now we can call the calcAge method using the maltida object even if the calcAge method is in the scope of the jonas object as seen above, and when we use the this keyword inside the CalcAge method, the this keyword will always point to the object calling the method in this case object maltida calls the calcAge function...see below!

maltida.calcAge(); //maltida object calls the method, so the this keyword in the calcAge method will point to maltida...i.e maltida year property with value of 2017....ie console.log (2037 - 2017) = 20;

///if we store the method of an object to a variable that is not an object and we attempt to call the method using the variable we are going to get an undefined value for the this keyword in the called method...this is because the variable we use to call the method is a regular function call and it is not attached to any object....since the object is absent, the this keyword cannot point to the (this.year) property value of the absent object...so its own value is undefined.
const f = jonas.calcAge; //we added the calcAge method to the f variable..but it is not an object
f(); //we call the method...wen u call a method that has a this keyword with a variable that is not an object the this keyword cannot point to the object property of the variable that has called it bcos the variable has no object, since it has not object it will not havea proprty the this keyword will point to(this.year...i.e f is the object variable and it has a property year that has a value which the method is supposed to calculateand return a value in the BC as the value of the method/calcAge property.)..in the absence of this the this keyword value will be undefined!
*/

////////////////////////////////////////
//REGULAR FUNCTIONS VS ARROW FUNCTIONS......

//NOTE A VARIABLE THAT HOLDS AN OBJECT IS A GLOBAL VARIABLE AND THE WHOLE CONTENT OF THE OBJECT(items in the curly braces) ARE THE GLOBAL SCOPE.

//when u place an arrow function inside an object...arrow functions do not recognize the this keyword WITHIN THE OBJECT THEY EXIST, so they simply implement the this keyword of their surronding environment/parent scope/global scope (the obeject is stored in a variable, variables are global scope), where the parent scope do not have the this keyword set in the arrow function, the arrow function this keyword will return an undefined value as it could not find a this keyword in the global scope...the this.firstName does not exist in the window object/global scope...the arrow function this keyword tried to access a property OUTSIDE THE OBJECT which did not exist...this will result to an undefined value. THE ARROW FUNCTION THIS KEYWORD IGNORES THE OBJECT IN WHICH IT EXIST....NORMAL FUNCTION METHODS DO NOT BEHAVE LIKE THIS....ARROW FUNCTION KEYWORDS ACCESS VAR VARIABLES SET IN THE GLOBAL SCOPE/WINDOW SCOPE AND EXECUTE THEM WHEN THEY SATISFY THE KEYWORD, NORMAL FUNCTIONS DO NOT BEHAVE THIS WAY, THEY RECOGNIZE THE OBJECT VARIABLE WHICH STORE THEIR PROPERTY TO WHICH THEY EXIST AS METHOD/VALUE IN...
/*
const jonas = {
  firstName: 'Jonas',

  year: 1991,

  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => console.log(`Hey ${this.firstName}`), //this value is undefined...
};
jonas.greet();
console.log(this.firstName);
*/

/*
//this keyword for arrow function is different from other function bcos while other function this keyword limit their execution to the object which holds them, arrow function this keyword accesses the global scope or the entire window scope...so if var is used to declare a variable which satisfies the arrow function this keyword the this keyword will return the value of that var variable that was declared...

var firstName = 'Maltida';

const jonas = {
  firstName: 'Jonas',

  year: 1991,

  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => console.log(`Hey ${this.firstName}`), //this value is undefined...this in the arrow functions means the entire global scope/the window object!!!!
};
jonas.greet();
console.log(this.firstName); //the arrow function this keyword accessed the wholeglobal scope i.e window scope, it saw a variable that carries the firstName, and it executed it.
*/

///NEVER EVER USE ARROW FUNCTIONS AS A METHOD...........TO AVOID ALL THE ABOVE TROUBLES USE NORMAL FUNCTIONS METHODS
/*

const jonas = {
  firstName: 'Jonas',

  year: 1991,

  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: function () {
    console.log(this);//this means jonas object
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
console.log(this.firstName);
*/

// the pitfall of the this keyword where we have a function inside another function...the this keyword that is inside the function of a function will be undefined, this is because when we call the function that is inside another function we have to do that using the function variable name which will be a regular function call...regular function call return undefined for the this keyword
/*
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    //console.log(this);
    console.log(2037 - this.year);

    const isMillenial = function () {
      console.log(this); //undefined bcos the function is called just like a regular function call
      console.log(this.year >= 1981 && this.year <= 1996);
    };//since the this keyword is undefined the year property cannot be read to be a property of the jonas object...the undefined this keyword will not let the isMillenial function run...
    isMillenial(); //this is a regular function call...the this keyword inside it will therefore be undefined
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
jonas.calcAge(); //if u dont invoke the main function the function iniside it wont be invoked...
*/

//TWO WAYS TO SOLVE THE FUNCTION OF FUNCTION THIS KEYWORD PROBLEM...
//SOLUTION 1:...PRE VERSION 6 SOLUTION YOU DECLARE A SELF VARIABLE TO BE EQUAL TO THE THIS KEYWORD...REMEMBER SELF MEANS THE OBJECT VARIABLE!!!!SO YOU BASICALLY ASSIGN THE OBJECT VARIABLE TO THE THIS KEYWORD OUTSIDE OF THE FUNCTION THAT EXIST INSIDE ANOTHER FUNCTION..SO ANYWHERE JS SEES THE THIS KEYWORD INSIDE THE ISMILLENIAL FUNCTION IT READS IT DIRECTLY AS JONAS AND NOT AS THE THIS KEYWORD THAT WAY THE UNDEFINED VALUE ISSUE IS SOLVED
//SOLUTION 2: YOU USE AN ARROW FUNCTION AS THE FUNCTION INSIDE THE FUNCTION...IT WILL WORK JUST FINE AS ARROW FUNCTIONS DO NOT RECOGNIZE THE THIS KEYWORD INSIDE THEM AND THE ARROW FUNCTION WILL INSTEAD LOOK FOR THAT THIS KEYWORD IN THE PARENT SCOPE/GLOBAL SCOPE/ THE WHOLE FUNCTION SCOPE AND THEN APPLY IT WHEN IT SEES IT...ONLY WHEN IT DOES NOT SEE IT BEFORE IT RETURNS AN UNDEFINED VALUE...BUT IN OUR PROBLEM THE MAIN FUNCTION HAS THE THIS KEYWORD CONTAINED IN THE ARROW FUNCTION SO THAT FIXED THE PROBLEM PERFECTLY WELL...
//solution 1
/*
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    //console.log(this);
    console.log(2037 - this.year);

    const self = this; //self or that
    const isMillenial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
jonas.calcAge();
*/

/*
//solution 2
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    //console.log(this);
    console.log(2037 - this.year);

    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
jonas.calcAge();
*/

/*
////////////////////////////////////
////PRIMITIVE VS REFERENCE TYPE....while primitive types cannot be manipulated bcos they do not share the same value slot on the call stack, reference types can be manipulated as they share same value slot in the memory address on the Heap .................

// scenario 1...primitive types behaviour...
//the new assigned value to the age variable cannot manipulate the oldAge variable value(first age value)..this is bcos in the call stack the oldAge variable has a memory slot(a memory slot stores the value for each variable) different from the age variable..so for the oldAge variable its memory slot register the first age variable value declared as the value of the oldAge variable. the age variable has its own memory slot which stores its value..when it was first set it was 30 then later 31..the age variable will in effect have its value in the memory slot in the call stack changed from 30 to 31.
let age = 30;
let oldAge = age;
age = 31;
console.log(age); //returns 31, that is the last updated age value.
console.log(oldAge); //returns 30 here...oldAge takes the last updated value bfor its line of code..

//scenario 2....refernce types behaviour...
// friend object properties and values was copied to object me...we changed me object age property value from 30 to 27...this change was also implemented in the friend object....why is it like this ? objects and arrays variables declared using const can be manipulated(remmeber const are immutable but not here!)..this is how the js engine works for reference types...check screenshot of primitive values to understand the flow...back to lecture at hand...in the js engine Heap the friend object and the me object share the same reference memory address on the js engine heap, they also share the same value in the heap(the friend object property / content was copied and is same with the me object content)...therefore when the me object age property value was changed, it also changed the age property of the friend object...in short both objects share same properties in the js engine value slot, so when one property is changed in any of the object it affects the other....SO WHEN EVER YOU THINK YOU ARE COPYING AN OBJECT PROPERTIES TO ANOTHER OBJECT YOU ARE SIMPLY CREATING A NEW VARIABLE WITH THE SAME OBJECT....HOWVEVER THERE ARE WAYS AROUND THIS!

const me = {
  name: 'Jonas',
  age: 30,
};

const friend = me; // we copy the me object...friend is an object with the same content as the me object
friend.age = 27; //we change the value of the friend object age property from 30 to 27...

console.log('Friend:', friend); //returns the age value 27..it was affected by the change in the friend object
console.log('Me', me); //returns the age value 27....
*/
/////////////////////////////////////

///PRIMITIVES AND OBJECTS IN PRACTICE

//PRIMITVES VALUES [VARIABLES]...STORED IN THE CALL STACK
/*
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); //oldLastName has a memory value slot which store the lastName variable value(Williams) as its value.the lastNmae variable has a different memory value slot which stores the value of the lastNmae variable originally this value was Williams but it was later set to Davis so in the BC, the last updated value is displayed...PRIMITIVES WORKS THIS WAY BCOS EACH PRIMITIVE VALUE WILL SIMPLY BE SAVED INTO ITS OWN PIECE OF MEMORY IN THE CALL STACK.

//REFERENCE VALUES[OBJECTS, ARRAYS...]....STORED IN THE HEAP
//we think we copied the properties of the jessica object into another object(marriedJessica)...but what we really did was just stored the jessica object property to a new variable(marriedJessica), a change in the property calue for any of the objects will be implemented in the other object bcos in the call stack both objects have the same value(same properties and values.)...WHEN WE CREATED A NEW OBJECT WHICH SHARED THE SAME PROPERTIES WITH AN OLD/ORIGINAL OBJECT, IN THE JS ENGINE WHERE OBJECTS ARE STORED(HEAP) WE DID NOT REALLY CREATE A NEW OBJECT, WE SIMPLY CREATED ANOTHER VARIABLE IN THE (CALL-STACK) WHICH HOLDS THE REFERENCE TO THE ORIGINAL OBJECT(IN THE HEAP) THAT IS IT IA A VARIABLE WHOSE VALUE IS THAT OF THE ORIGINAL OBJECT...THEREFORE ANY MANIPULATION IN ONE OF THE TWO WILL EQUALLY BE EFFECTED IN THE OTHER...BOTH OBJECTS VARIABLES POINT EXACTLY TO THE SAME MEMORY ADDRESS(MEMORY SLOT...WHICH STORES THE VALUE OF THE OBJECT VARIABLE) IN THE HEAP...THEY BOTH ESSENTIALLY ARE TWO DIFFRENT NAMES FOR THE SAME THING...

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;

//marriedJessica.lastName = 'Davis'; //we change the value of the lastName Property in the MarriedJessica object. this will be implemented in the jessica object also...we can also add new properties or remove existing properties inside the object using any of the object variable such a change will be implemented also in the other object variable...BUT WE CANNT CHANGE THE SHARED OBJECT VALUE

//jessica.school = 'UNIBEN'; we added a new property to the object value (shared value) of one of the object variable, this was implemented in the other.
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);
*/
//jessica = {};  //assigning a new value to the marriedJessica object...cannot work...ERROR
// marriedJessica = {}; //assigning a new value to the marriedJessica object...cannot work...ERROR
//we tried to change the object(share value) in both of the object variable. it cannot work bcos u cannot chnange the value of a variable declared with const.

//NOTE ON REFERENCE VALUES...ALTHOUGH WE CAN CHANGE THE VALUES(ONE AT A TIME) OF THE OBJECTS PROPERTIES EVEN WHEN THEY ARE DECLARE WITH CONST (const MAKES THE OBJECT VARIABLE AND THEIR OBJECTS IMMUTABLE) WE NEED TO UNDERSTAND THAT IN THE CALL-STACK THE OBJECT OF THE OBJECT VARIABLES ARE SHARED, BOTH OBJECT VARIABLES HAVE 1 VALUE (THE SAME SET OF OBJECT PROPERTIES OR THE SAME OBJECT)....WE CANNOT CHANGE THIS ONE SHARED VALUE(THE SHARED OBJECT), WE ARE ONLY ALLOWED TO CHANGE SOME UNDERLYING VALUES (VALUES OF THE PROPERTIES INSIDE THE SHARED OBJECT, WE CAN ADD NEW PROPERTIES TO THE SHARED OBJECT, WE CAN REMOVE AN EXISITING PROPERTY FROM THE OBJECT, WE CAN CHANGE THE VALUE OF A PROPERTY IN THE OBJECT)....IT IS BECAUSE OF THIS REASON WE CANNOT CREATE A NEW DIFFERENT OBJECT FOR THE COPIED OBJECT VARIABLE...I.E MARRIEDJESSICA IF WE TRY TO DO THIS IT MEANS WE ARE TRYING TO ASSIGN REPLACE THE SHARED VALUE TO THE 2 OBJECTS, AND REMEMBER SINCE BOTH OBJECTS ARE DECLARED USING CONST WE CANNOT CHANGE THE VALUE OF A CONST...SO WE GET AN ERROR THAT SAYS ASSIGNMENT TO CONSTANT VARIABLE(WE TRIED TO ASSIGN A NEW VALUE TO A CONST VARIABLE...NOT POSSIBLE)...THERE IS NO WAY WE CAN ALSO CHANGE A PROPERTY VALUE IN ONE OF THE OBJECTS WITHOUT IT IMPLEMENTED IN THE OTHER OBJECT...IN SHORT, BOTH OBJECTS VARIABLES SHARE SAME VALUE (OBJECT PROPERTIES)...SINCE BOTH OBJECTS ARE DECLARED USING CONST WE CANNOT CHANE OR MUTATE THE SHARED VALUE BY ATTEMPTING TO ASSIGN A NEW VALUE(OBJECT) TO ANY OF THE OBJECT VARIABLES. WE CAN SOLVE THIS USING THE OBJECT.ASSING KEYWORD

//THE SOLUTION TO COPYING AN ORIGINAL OBJECT TO ANOTHER OBJECT AND CHANGING THE SHARED VALUE (OBJECT PROPERTIES) IN THE HEAP....I.E WE CAN CHANGE THE VALUE IN ONE OF THE OBJECTS WITHOUT THAT CHANGE IMPLEMENTED IN THE OTHER OBJECT VARIABLE....NOTE WE DO NOT USE THE OBJECT COPYING HERE.
/*
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

// const marriedJessica = jessica;....INSTEAD OF CREATING ANOTHER OBJECT VARIABLE AND COPYING THE OBJECT THUS MAKING US CREATE TWO VARIABLES WITH THE SAME VALUE/OBJECT WE WILL RATHER CREATE A NEW OBJECT VARIABLE THAT MERGES BOTH THE ORIGINAL OBJECT  AND THE NEW OBJECT TOGETHER TO RETURN ONE NEW OBJECT...THIS WILL MAKE THE ORIGINAL OBJECT TO BE UNAFFECTED BY CHANGES MADE IN THE NEW MERGED OBJECT...THE NEW OBJECT COPIES ALL THE PROPERTIES OF THE ORIGINAL OBJECT BUT THE VALUES CAN BE ALTERED WITHOUT AFFECTING THE ORIGINAL OBJECT VALUES...WHAT THIS MEANS IN THE HEAP IS THAT A NEW OBJECT/VALUE HAS BEEN CREATED AND THE NEW OBJECT VARIABLE POINTS TO THAT OBJECT....I.E 2 OBJECTS VARIABLES EXIST IN THE CALL-STACK AND THEY BOTH POINT TO DIFFERENT VALUES/OBJECTS IN THE HEAP...

const jessicaCopy = Object.assign({}, jessica2); //we create a new object that copies/clones the original object...now we can change a property in the new object without affecting the original object
jessicaCopy.lastName = 'Davis'; //we change the lastName property value in the clone object
console.log('Before marriage:', jessica2); //RETURN UNAFFECTED LASTNAME VALUE
console.log('After marriage:', jessicaCopy);//RETURN ALTERED LASTNAME VALUE
*/

//THIS CLONE METHOD IS A SHALLOW CLONE METHOD OF ALTERING OBJECTS THAT COPIES ANOTHER OBJECT BECAUSE THE CLONE OBJECT ONLY WORKS ON THE FIRST LEVEL WHICH MEANS THAT WHERE THE ORIGINAL OBJECT THAT IS COPIED HAS ANOTHER OBJECT INSIDE OF IT THE CLONE OBJECT CAN ONLY COPY IT BUT IT CANNOT ALTER THE PROPERTY VALUE OF THE SECONDARY OBJECT WHICH IS INSIDE THE ORIGINAL OBJECT...ANY PROPERTY THAT IS ADDED TO THE CLONE OBJECT WILL INFACT BE REPLICATED/ADDED IN THE SECONDARY OBJECT...SAME APPLIES WHEN WE ATTEMPT TO ALTER A PROPERTY IN THE SECONDARY OBJECT OF THE CLONE OBJECT, WHATEVER PROPERTY INSIDE THE SECONDARY OBJECT OF THE CLONE OBJECT THAT WE CHANGE THE VALUE, THE VALUE OF THE SECONDARY OBJECT IN THE ORIGINAL OBJECT WILL ALSO CHANGE.THIS IS BECAUSE WHEN WE CREATE A SECONDARY OBJECT IN THE ORIGAL OBJECT AND THE CLONE OBJECTS CREATES ITS OWN CLONED SCONDARY OBJECT BOTH OBJECTS POINTS TO THE SAME MEMORY SLOT IN THE HEAP I.E BOTH SECONDARY OBJECTS WILL HAVE THE SAME VALUE SO WHEN WE USE THE CLONE OBJECT TO ADD NEW PROPERTIES OR ALTER PROPERTIES IN THE CLONED SECONDARY OBJECT IT WILL BE IMPLEMENTED IN THE ORIGINAL SECONDARY OBJECT ALSO....THIS DEFEATS THE PURPOSE OF THE CLONE OBJECT..THE PROBLEM IN SIMPLE WORDS IS THAT WHEN AN ORIGINAL OBJECT HAS A SECONDARY/ANOTHER OBJECT INSIDE OF IT, THE CLONE OBEJCT CANNOT ALTER ITS OWN COPIED/CLONED SECONDARY OBJECT WITHOUT AFFECTING THAT OF THE ORIGINAL..THE CHANGE MUST AFFECT BOTH...ONLY A DEEP CLONE OBJECT CREATED WITH EXTERNAL TOOLS CAN FIX THIS. SEE EXAMPLE BELOW:
/*
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Sammy', 'Zane'], //an array is an object behind the scenes..so we added a secondary object inside the original object
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
//jessicaCopy.family[0] = 'SK'; //we altered the first value of the firends array property in the cloned secondary object....this change is effected in the original object secondary object. NOT SUPPOSED TO BE SO!..
jessicaCopy.family.push('King'); //we used the push method to add a new value to the cloned secondary object/array family property.
jessicaCopy.family.push('Gyan'); //we used the push method to add a new value to the cloned secondary object/array family property...the object.assign method failed to make the original object unaltered/unaffected
console.log('Before marriage:', jessica2); // the original secondary object/array is altered, new values have been added to it...the object.assign method added the values intot the cloned secondary object/array but it failed to exempt the original froom getting affected...the method failed.
console.log('After marriage:', jessicaCopy); //the cloned secondary object/array has the new values added to it
*/

/*
//clean code 
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Sammy', 'Zane'],//deeply nested object i.e beyond the first level function..
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';//first level clone

jessicaCopy.family.push('King'); 
jessicaCopy.family.push('Gyan')

console.log('Before marriage:', jessica2); 
console.log('After marriage:', jessicaCopy);
*/

//TAKEAWAY: THE OBJECT.ASSIGN METHOD ONLY CREATES A SHALLOW COPY OF THE ORIGINAL OBJECT AS IT COPIES ONLY THE FIRST LEVEL(ONLY THE FIRST OBJECT)...ANY OTHER OBJECT THAT IS CREATED INSIDE THE ORIGINAL OBJECT CANNOT BE COPIED/CLONE AND MANIPULATED INDEPENDENT OF THE SECONDARY OBJECT IN THE ORIGINAL OBJECT BY THE METHOD...IT IS ONLY A DEEP CLONE THAT CAN FULLY COPY ALL THE SECONDARY OBJECTS AND MANIPULATE THEM INDEPENDENT OF THE ORIGINALS...THE DEEP CLONE FOES BEYOND THE FIRST LEVEL...
