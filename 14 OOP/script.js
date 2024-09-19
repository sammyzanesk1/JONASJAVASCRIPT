'use strict';

//////////////////////////////
//constructor function and d new operator..we call constructor function usin d new operator

//how d new operator works...4 stepa...
//1, new {} is created
//2. function is called, this = {}, above this points to Person object created
//3. {} linked to prototype
//4.d called function returns d created object

//constructor function...blueprint........arrowfunction do not work here as they do not have their own this keyword
/*
const Person = function (firstName, birthYear) {
  //instance properties..ie d properties d objects we create using d constructor function will have
  this.firstName = firstName;
  this.birthYear = birthYear;
  console.log(this);

  //addin methods in d constructor function..do not always write methods inside constructor function bcos we may create instances dat do not need d method but dey will b forced to inherit it...prototypal ineritance will solve this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

//call d  function.....creates new objects.........instances
const jonas = new Person('Jonas', 1991); //we use d function above to create a new object by means of d constructor function.
console.log(jonas);

const matilda = new Person('Matilda', 2017);
console.log(matilda);
const jack = new Person('Jack', 1975);
console.log(jack);

//checkin if an object is an instance of a constructor function
// console.log(jonas instanceof Person); //retruns true
///////////////////////////////////
//prototypes...objects have access to methods of thier prototypes.
console.log(Person.prototype); //returns d constructor function

/////////////adding a static method to a constructor function..
//set 1, create the static method. attach it to the constructor function
Person.hey = function () {
  console.log('hey there 😏😎');
  console.log(this); //points to the constructor function calling the static method
};
// step 2..call it
Person.hey(); //...comment this if u want to call for class constructor later
// jonas.hey(); //returns error,objects do not inherit static methods. no prototypal inheritance therefore any object we create from the constructor to which the static method applies,the method cannot be accessed by that object.

//we want to create a method for d Person constructor function(prototype) so dat all objects created from dis constructo function can have access to d method and make use of it...

Person.prototype.calcAge = function () {
  //we create d method and it will be in d prototype property of all objects created from d constructor function
  console.log(2037 - this.birthYear); //note d this keyword of d method points to d object which calls it.
};

jonas.calcAge(); //d created obeject...i.e instances can access d method through prototypal inheritance..i.e d objects will look at d constructor function and not find d metod den dey look at dia own prototyps dey c it and den use it.
matilda.calcAge();

//to check d prototype and prototype method of an object...use
console.log(jonas.__proto__); //returns d calcAge function and d constructor function

console.log(jonas.__proto__ === Person.prototype); //returns true, d prototype of jonas object is d Person constructor function/prototype.

console.log(Person.prototype.isPrototypeOf(jonas)); //returns true, d prototype of jonas object is d Person constructor function/prototype.
//.prototypeoflinkedobjects.

//settin properties for prototypes/constructor functions
Person.prototype.species = 'Homo Sapiens'; //we created a new property for d prototype usin dot method

//d objects created from d person prototype will inherit this new property, although d property and d value  will only b stored in d prototype...not directly in d object...but we can always access dis property and its value usin d prototype object. take note of this point...
console.log(jonas, matilda); //return d prototype object, check prototype section u will c d new property.-
console.log(jonas.species, matilda.species); //accessin d created property of d prototype usin d object.

//so object created usin new operator ave 2 types of property, inherited property and owned property..powned property are d object property declared in d constructor function....while inherited  property are those d object access on d prototype...(i.e prototype methods and prototype property).

//checkin for owned property of an object
console.log(jonas.hasOwnProperty('firstName')); //returns true...firstname was declared in d constructor function

console.log(jonas.hasOwnProperty('species')); //returns false..species is a prototype property.it was not declared in the constructor function..jonas only inherits and has access to it. jonas object does not own it
*/

//////////////////////////////////////
//prototypal inheritance of built in object....created object>functional constructor(prototye)>built in object.prototype
/*
console.log(jonas.__proto__); //we access d functional co'nstructor(prototype)

//object.prototype(top of prototype chain)
console.log(jonas.__proto__.__proto__); //we access d built in object...
console.log(jonas.__proto__.__proto__.__proto__); //null, bcos d built in object is d highet in d prototype scope chain,no oter prototype esxist after it.

console.log(Person.prototype.constructor); //returns d constructor function itself.

//inspectin d constructor function
console.dir(Person.prototype.constructor); //returns d details of d constructor function.

//prototypes of arrays....created array>functional constructor(prototye)>built in object.prototype
const arr = [3, 6, 6, 5, 6, 9, 9, 3];
console.log(arr.__proto__); //returns d contructor function(prorotype of the array)..all the methods of the prototype are inherited by the created array...note that this constructor function is an inbuilt one...called Array.prototype/array constructor...new Array === [].
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

//arrays inherit their method(array method) from d their prototype..therefore we can create new methods attach them to array prototype then the array will automaically inherit the created method from the prototype using prototypal inheritance.

//we create a method which returns all d unique elements of an array...we added it to the array prototype using dot method......which means any new array we create can have access and inherit this method.and implement it.

Array.prototype.unique = function () {
  return [...new Set(this)]; //we get the unique elements of the calling array using new Set, then stored d elements inside an array using spread([...])..rem d this keyword here points to the array calling d unique method...rememeber new set return d element of an array without repetition
};

console.log(arr.unique()); //we called d arr with an unregular method(i.e a method which ordinarily is not in the known array prototype) we created, the array implements this method through prototype inheritance...this is exactly like prototype inheritance for objects.

///all elements in the html are behind d scenes object in the DOM(js)....

const h1 = document.querySelector('h1');
console.log(h1); //returns d html selected element
console.dir(h1); //returns the behind d scene object of h1..here we can acces all methods available to h1 element

console.log(x => x + 1);
console.dir(x => x + 1);
*/
//challenge 1:
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;

  //dont do this ever...
  // accelarate = function () {
  //   //  this.speed = speed + 10
  //   this.speed += 10;
  //   console.log(`${this.make} is going at ${this.speed} km/h`);
  // };
};
Car.prototype.accelarate = function () {
  //  this.speed = speed + 10
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

//calling the methods.
bmw.accelarate();
bmw.accelarate();
bmw.brake();
bmw.accelarate();
*/

//////////////////////////////
//ES6 classes......classes are like functions.....we want to create objcets  like in construction function but using es6 class syntax....i.e creating objects using es6 syntax
//unlike constructor function, where we create methods outside of the function then attach it to  prototype, here we create methods in d Class and d method is added to the class constructor prototype and d object created by the class constructor can then access the method using prototype inheritance.
//methods are added in the class but outside the constructor under es6 classes..this makes the method fall under the prototype of the constructor and not as owned properties of object created using the constructor i.e objects will only inherit methods and not carry them around as owned properties. this slows performance

//class expression
// const PersonCl =class {}

//class declaration
//
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName; //becomes _fullname..we use setter to set the fullname to bcom _fullname
    this.birthYear = birthYear;
  }

  //instance methods....methods that will be added to .prototype property of the constructor..i.e accessibleby the object created..prototypal inheritance exist....similar to Person.prototype.calcAge = function(){}; under constructor function
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`); //no commas between methods.
  }

  //setters and getters in CLass Constructor
  get age() {
    return 2037 - this.birthYear;
  }
  //set a property that already exists in d constructor..WE RENAME/RECREATE THE CONSTRUCTOR PROPERTY it using underscore...we can use the setter to edit the property of the class constructor
  set fullName(name) {
    //we use setter and getter as data validation tool...e.g below
    if (name.includes(' ')) this._fullName = name;
    //this sets the value for the constructor property..rename d construtor property den set the value of fullname which we renamed to _fullname to avoid conflict...or use d myname example below
    // if (name.includes(' ')) this.myname = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName; //this sets the value for the getter property(FULLNAME)...same as the value of _fullname property...i.e name passed in as the arguement

    // return this.birthYear;
  }

  //static method...only exist in the object constructor..not accessible to the objects manually created.
  //creating a static method to the class constructor......use the static keyword..thats it
  static hey() {
    console.log('hey there 😏😎');
    console.log(this); //points to the constructor function calling the static method
  }
}
//


const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age); //retuns the getter property

//adding a method manually to a prototype in es6......
// PersonCl.prototype.greet = function () {
  //   console.log(`Hey ${this.firstName}`);
  // };
  jessica.greet();
  
  // const walter1 = new PersonCl('walter', 1996);
  const walter = new PersonCl('Walter Jones', 1996);
  PersonCl.hey();
  */

//1. classes are not hoisted....functions are hoisted
//2classes are first class citizens just like functions..we can pass them into functions and return dem from functions.
//3. classes are executed in strict mode

///////////////////////////////////////////
//setters and getters...accessor properties..they aare features of objects...they are functons that set and get  a value...setter methods always have 1 parameter...the gette and setter are also added to the prototype and therefoe accessible by the object.
/*
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  //getter property
  get lastest() {
    return this.movements.slice(-1).pop(); //take out the last element of movement array into a new arrayi.e[300], then take out the last element from the returned array..i.e 300
  },

  // setter property.......we add a new element to the movement array
  set lastest(mov) {
    this.movements.push(mov);
  },
};
// const movements = [200, 530, 120, 300];
// console.log(movements.pop());
// console.log(movements);
*/

/*
//calling the getter property..we call it like it is a normal property
console.log(account.lastest); //returns 300

//calling the setter with the arguement we wish to implement/set......note setters have just 1 input parameter
account.lastest = 50; //sets 50 as an element to the movement array
console.log(account.movements);
*/

////////////////////////
//static array methods..

//array.from...........this is a method attached to the prototype of the built in array constructor(object). what this means is that array.from method do not work on arrays that we manually create by ourself. it will only work if the array points to an object....remember: prototypes of arrays....manually created array>functional constructor(prototye)>built in object.prototype...we cannot access the array.from method on arrays we created ourself...onlyt the arrays that point directly to html elements i.e dom objects can access the array.from method...........same applies to objects...no prototypal inheritance exists for static array methods.
// console.log(Array.from(document.querySelectorAll('h1'))); //the array method returns an array from the nodelist of h1.

//number.parseFloat...........parseFloat is a method attached only to the number constructor..it is a static number method

///////////////////////////////
//object.create........we manually create an object whose porperties will serve as the prototype of hte linked objects we create.

/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  
  //filling the instance/created object with properties...
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear; //this points to sarah bcos sarah calls d init method
  },
};
*/

/*
const steven = Object.create(PersonProto); //we created a new object then lik it to the object which contains d prototypes to be accessed by the created linked object
console.log(steven); //returns an empty steven object with accessibility to PeronProto prototype


//we fill up the empty steven object.setting up proerty for the steven object
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); //we call the method. the steven object accesses it bcos it's its prototype...returns 35

console.log(steven.__proto__); //.....the calcage property is the prototype of the steven object
console.log(steven.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);
//calling the init method with arguements that will serve as values to the set property of the created object.
sarah.init('Sarah', 1995);
console.log(sarah);
sarah.calcAge();
*/

///////////////////////////
//challenge 2

/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  //instance methods....methods that will be added to .prototype property of the constructor..i.e accessibleby the object created..prototypal inheritance exist
  accelarate() {
    //  this.speed = speed + 10
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake = function () {
    //  this.speed = speed + 10
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  };

  get speedUS() {
    //we transform a method(speedUS) to a property using the getter
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
//calling d getter
console.log(ford.speedUS);

const mercedes1 = new CarCl('mercedes', 130);
console.log(mercedes1);

ford.accelarate();
ford.accelarate();
ford.brake();
ford.accelarate();
ford.speedUS = 50;
console.log(ford);
*/

/////////////////////////////
//inheritance between classes: constructor function

//parent constructor function
const Person = function (firstName, birthYear) {
  //instance properties..ie d properties d objects we create fomd function will have
  this.firstName = firstName;
  this.birthYear = birthYear;
};
//addin methods in d constructor function..do not always write methods inside constructor function bcos we may create instances dat do not need d method but dey will b forced to inherit it...prototypal ineritance will solve this
//   this.calcAge = function () {
//     cons

//addin methods in d constructor function..do not always write methods inside constructor function bcos we may create instances dat do not need d method but dey will b forced to inherit it...prototypal inheritance will solve this
Person.prototype.calcAge = function () {
  //we create d method and it will be in d prototype proerty of all objects created from d constructor function
  console.log(2037 - this.birthYear); //note d this keyword of d method points to d object which calls it...
};

//child constructor function
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear); //we call d parent constructor..i.e the person this keyword points to the student object...note
  this.course = course;
};

//linking parent and child constructor function..i.e making sure they have linked prototype..we must link the child prototype to the parent prototype before we create any other methods for the child constructor,this is bcos if we do the latter first, the linking will make the parent create an empty object which will make the child constructor empty thereby overwriting the already created method stored in the child prototype.

//the mike object can access a method in the parent constructor through prototypal inheritance, the student constructor has been linked to the parent/person constructor throgh create object technique, this makes the student constructor have access to the parent constructor prototype and d objects created using the student constructor can therefore access the parent prototye...in simple terms mike can access calcage bcos student constructor function inherits the method of its linked parent constructor function

Student.prototype = Object.create(Person.prototype);
//adds a method to the student constructor which the objects created using the student constructor function can access.
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science'); //creates a new object
mike.introduce(); //calling the introduce method...mike can access it bcos of prototypal inheritance
console.log(mike); //prints object
mike.calcAge();

//after linking the child constructor to the parent constructor prototype, by default, js will take the parent coonstructor as the constructor of the instance /object created instead of the child constructor which is the actual constructor of the instance this always happens when we use objct.create for linking..we solve this in the next 2 lines
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__);
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student); //true direct link
console.log(mike instanceof Person); //true., class inheritance
console.log(mike instanceof Object); //chain heirarchy

Student.prototype.constructor = Student; //rectified
console.dir(Student.prototype.constructor);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__);

/////////////////////////////////////////
//challenge 3
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.brake = function () {
  //  this.speed = speed + 10
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;

  console.log(
    `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}`
  );
};

//link the prototypes
EV.prototype = Object.create(Car.prototype);

//adding methods to the child constructor......this cahnges the charge value
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(
    `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}`
  );
};

EV.prototype.accelerate = function () {
  //  this.speed = speed + 10
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate(); //the second accelerate method (child method) overwrites the accelerate method set in the parent constructor
console.log(tesla);
tesla.brake();
tesla.chargeBattery(90);
tesla.accelerate();

// const ford = new CarCl('Ford', 120);
// //calling d getter
// console.log(ford.speedUS);

// const mercedes1 = new CarCl('mercedes', 130);
// console.log(mercedes1);

// ford.accelarate();
// ford.accelarate();
// ford.brake();
// ford.accelarate();
// ford.speedUS = 50;
// console.log(ford);
*/

////////////////////////////////////
//inheritance between classes:class constructor

/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName; //becomes _fullname..we use setter to set the fullname to bcom _fullname
    this.birthYear = birthYear;
  }

  //instance methods....methods that will be added to .prototype property of the constructor..i.e accessibleby the object created..prototypal inheritance exist
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`); //no commas between methods.
  }

  //setters and getters in CLass Constructor
  get age() {
    return 2037 - this.birthYear;
  }
  //set a property that already exists in d constructor..WE RENAME/RECREATE THE CONSTRUCTOR PROPERTY it using underscore...we can use the setter to edit the property of the class constructor
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    //this sets the value for the constructor property..rename d construtor property den set the value of fullname which we renamed to _fullname to avoid conflict...or use d myname example below
    // if (name.includes(' ')) this.myname = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName; //this sets the value for the getter property(FULLNAME)...same as the value of _fullname property.

    // return this.birthYear;
  }

  //static method...only exist in the object constructor..not accessible to the objects manually created.
  //creating a static method to the class constructor......use the static keyword..thats it
  static hey() {
    console.log('hey there 😏😎');
    console.log(this); //points to the constructor function calling the static method
  }
}
*/
//linking the student class to the parent class to enable prototypal inheritance....extends and super keywords.
//extend keyword links the parent and student class behind d scene...if d child and parent constructor have exactly same properties we could decide not to write the child properties..it will work.

/*
class StudentCl extends PersonCl {
  // constructor(fullName, birthYear, course) {
  //   //always needs to happen first
  //   super(fullName, birthYear); //the super creates the this keyword for the child constructor so do it first
  //   this.course = course;
  // }
}
const martha = new StudentCl('Martha Jones', 2012); //the child



class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //always needs to happen first
    super(fullName, birthYear); //the super creates the this keyword for the child constructor so do it first
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  //the child method overwrites the parent method if they are same...shadowing
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      } years old`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

//inheritance between classes: object.create..............everything here works with functions notethat

//parent constructor.....parent prototype of Jay object
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); //object created using the parent constructor

//child constructor...created using the parent constructor.child prototype of jay object
const StudentProto = Object.create(PersonProto);
//adding shared properties, unique properties and methods to child constructor..

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear); //shared properties
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.first} and I study ${this.course}`);
};
const jay = Object.create(StudentProto); //object created using the child constructor
jay.init('Jay', 2010, 'Computer Science'); //creating the child object
jay.introduce();
jay.calcAge();
*/

// const acc1 = new Account('Jonas', 'EUR', 1111, [5, 7, 2]);
// console.log(acc1);

//////////////////////////////////

//another example of constructor prototype
//passing an array to be filled when we create the object..we should not use this method..ose the next code
// class Account {
//   constructor(owner, currency, pin, movement) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movement = movement;
//   }
// }

/*
//we can create properties for the contructor even without setting input parameter like movements above
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }
  //public interface of the acc1 object
  deposit(val) {
    this.movements.push(val);
  }

  withdrawal(val) {
    this.deposit(-val);
    // this.movements.push(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val); //we call another method inside a different method
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

//filling in the movement array...remember u cannot use an arguement  to fill the array during the point o creating the object bcos we did not set a movement parameter in the constructor....we will target the movement property(array) of the acc1 object then use an array method(push) to add elements to the array..fillup the movements array..
// acc1.movements.push(250); //deposits
// acc1.movements.push(-140); //withdrawals

//.better we can create a method in the constructor which handles the array...we created deposit method and withdrawal method which takes the movement array property and use push to add elements to the array..this approach is called the API/public interface bcos we can access and set values for the property of the object created with the constructor from outside the constructor function...i.e we set the movement values outsid of the class construction using methods that are within the constructor..
acc1.deposit(250);
acc1.withdrawal(140); //we eliminated the minus using the withdarwal method.
acc1.requestLoan(1000);

console.log(acc1);
console.log(acc1.pin);

//.better we can create a method in the constructor which handles the array...we created deposit method and withdrawal method which takes the movement array property and use push to add elements to the array..this approach is called the API/public interface bcos we can access and set values for the property of the object created with the constructor from outside the constructor function...i.e we set the movement values outsid of the class construction using methods that are within the constructor..
acc1.deposit(250);
acc1.withdrawal(140); //we eliminated the minus using the withdarwal method.
acc1.requestLoan(1000);
// console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1.pin);
*/
////////////////////////////
//data encapsulation and privacy.....making sure the methods of the constructor cannot be accessed from outside of the constructor.i.e securing the API/Public interface of the constructor....i.e making the methods of concern private methoda....in js fake encapsulation method is used...

//encapsulating the movement property.....we do this using underscore
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    //protected property
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }

  //cretaing a method by which we can access the protected property outside of the constructor
  getMovements() {
    return this._movements;
  }

  //////////////////..u can use the getMovements method to alter the protected movements property...set the getMovements array like this
  // setMovements(val) {
  //   this._movements.push(val); //call the deposit method api
  //   return this._movements;
  // }

  //public interface of the acc1 object
  deposit(val) {
    this._movements.push(val);
  }

  withdrawal(val) {
    this.deposit(-val);
    // this.movements.push(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val); //add the loan amount to the movemnt array as positive number
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
*/
//filling in the movement array...remember u cannot use an arguement  to fill the array during the point o creating the object bcos we did not set a movement parameter in the constructor....we will target the movement property(array) of the acc1 object then use an array method(push) to add elements to the array..fillup the movements array..
// acc1._movements.push(250); //deposits
// acc1._movements.push(-140); //withdrawals

//////////////////..u can use the getMovements method to alter the protected movements property...set the getMovements array like this
// settMovements(val) {
//  this._movements.push(val); //call the deposit method api
// return this._movements;
// }
// acc1.setMovements(100);
// console.log(acc1);

/////////////////

////////////////////////////
//classfields and data privacy.....4 main areas: public fields, private fields, public methods, private methods....4 other areas covered by the static method.

//remember static method only applies to their constructor and not the instances of the creating constructor

//a field is a property that will be on all instances ..i.e a property that all object created using a particular class will inherit from the class constructor
// note: field = constructor class
//defining public fields....public fields are not on the prototypes of the instances...they are properties we can reference with the this keywrod...note how they are placed outside of the construcor body
//locale = navigator.language;
//_movements = [];

class Account1 {
  //fields are properties possessed by all instances / objects created from the constructor).

  //public fields-(instances).....we declare public fields/properties as variables without const, let or var...outside of the constructor
  locale = navigator.language;

  //private fields(instances).....(makes properties not truly accessible from outside of the constructor)..we use # to declare private fields......outside of the constructor
  #pin; //if the field/property is one with a parameter arguement, we first declare it as an empty property outside the constructor, then we set the value inside the constructor
  #movements = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    //protected property...private field
    this.#pin = pin;

    //public fields
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }

  //public methods.............allmethods in green below i.e APIs

  //public interface of the acc1 object

  //creating a method by which we can access the protected property(movement array property) outside of the constructor.....when we need to log the movement array we call the API method
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    // this.movements.push(-val);
    return this; //makes the method chainable
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val); //add the loan amount to the movemnt array as positive number
      console.log(`Loan approved`);
      return this;
    }
  }

  //static public method.........accessible from outside the constructor..but static only apply to the constrcutor and not the object/instances always rememebr.
  static helper() {
    console.log('Helper');
  }

  //private methods..it is used to hide implementation details from outside of the constructor..we use #
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc2 = new Account1('Jonas', 'EUR', 1111);

// acc1._movements.push(250); //deposits
// acc1._movements.push(-140); //withdrawals

acc2.deposit(250);
acc2.withdraw(140); //we eliminated the minus using the withdarwal method.
acc2.requestLoan(1000);
console.log(acc2.getMovements());
Account1.helper();

console.log(acc2);
// console.log(acc2.#movement); //returns error,we cannot access the private fielfd/property outside of the constructor.
// console.log(acc1.#pin); //returns error,we cannot access the private fielfd/property outside of the constructor.

/////////////////////////////////////
///chaing methods...to make chaining work on our constructor methods or properties we must first set the return keyword inside of the methods we want to chain
/*
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000); //request loan method is executed in the log take note...line 741 in console browser
console.log(acc1); //returns the acc1 object with its movement arrays updated with the above movements
console.log(acc1.getMovements()); //returns the updated movement array..
console.log(_approveLoan()); //protected....cannotbe accessed.
*/

//////////////////////////////
/*
//challenge 4
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  brake() {
    //  this.speed = speed + 10
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  //private fields
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;

    console.log(
      `${this.make} is going at ${this.speed} km/h with a charge of ${
        this.#charge
      }%`
    );
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(
      `${this.make} is going at ${this.speed} km/h with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  accelerate() {
    //  this.speed = speed + 10
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate(); //the second accelerate method (child method) overwrites the accelerate method set in the parent constructor
console.log(rivian);
rivian.brake();
rivian.chargeBattery(90);
rivian.accelerate();
// console.log(rivian.#pin);
// console.log(rivian.#charge);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(rivian);
*/
