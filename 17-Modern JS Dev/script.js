//importing a module without imoorting any value from the module
//importing module
'./shoppingCart.js'; //we import using  the location of theexporting  module...top of file..now we can access the imported variable
console.log('importing module'); //will be returned after module code has been first exexcuted

//importing a variable from a module....
//method 1....using import/export syntax..export only works in top level code...i.e declared as global variables and not inside any other function or codess...

// import { addToCart } from './shoppingCart.js'; //we import using  the location of theexporting  module...top of file..now we can access the imported module variable here in our js file
// addToCart('bread', 5); //we call the module function here in the js file and it works bcos we have imported it here.

// import { addToCart, totalPrice, totalQuantity } from './shoppingCart.js';
// addToCart('bread', 5); //calling the function of the module
// console.log(totalPrice, totalQuantity);

//we can change the module variable name in the js file.
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity ,
// } from './shoppingCart.js';
// addToCart('bread', 5); //calling the function of the module
// console.log(price, totalQuantity); //if we use the name of the variable in the modul after the change an error occur.

// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

// console.log('Importing module');
// console.log('shippingCost');

//importing all the exports ofa module at the same timein the js file:..creates an object of all exported variables by the module
// import * as ShoppingCart from './shoppingCart.js';

//accssing a module variable imported using the object method(all variable imoorted as objects of the ShoppingCart variable)

// ShoppingCart.addToCart('bread', 5); //we access one of the variable using dot method
// console.log(ShoppingCart.totalPrice);

// //we can have the default export and named export using the same import statement...ie line 25 and 41.
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// add('pizza', 2);

//assigning d xorted default module function/value a name/variable...then using that name to call the function
// import add from './shoppingCart.js';
// add('pizza', 2);x

//we never imported the cart variable since so we calling the addcart function did not implement the push method inside of it(add property to the empty array...now we have  done so.)

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart); //returns the cart array with pushed properties.

// import add, { cart, totalPrice } from './shoppingCart.js';
// add('pizza', 2);
// add('bread', 5);
// add('apples', 4);
// console.log(cart); //returns the cart array with pushed properties.

////////////////////////
//using the await keyword in modules...top level await.........using await outside a function.

//note: since awau exist in the top level/outside a function/or in the global scope, it will slow down the js, only when the await variable is runned bfor other top level code after it will be executd..it blocks other top level codes taht come after it in the module and also top level codes coming after it was imported in the js file.
// console.log(`start fetching data`);
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);
// console.log('something');

/*
//returning a data from an async function
const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, txt: data.at(-1).body }; //return an array as the valu of d async function
};

getLastPost();

const lastPost = getLastPost();
console.log(lastPost); //retruns a pending  promise...not an objct

//we us the then mthod to handle the fulfilled promis of the async function...this is mthod on of bypassing the pnding promise.
// lastPost.then(last => console.log(last));

//method 2:....use the await function for the asycn function that rturns a valu.
const lastPost2 = await getLastPost();
console.log(lastPost2); //th log will wait for th async function return value to first be settled, it is the settled value that will be logged.

//importing an await variable from themodule..here the js file will first wait for the variabe to be executed bfor it executes its own top level codes.

////////////////////////////////////
//module pattern......using functions which behave like modules...ie variables ar private and not accessibl outsid of the function, the function is calld once and we only export the variables we want to accss from the function using the return keyword...we created our own module but in the js file.

//creating a new scope and returning data from the function just once...variables inside the function are private, cannot be accesed from the outside...but we can acces it using the set return keyword and a value...to gt a value out of ifes, w must rturn that value first inside th function...if w do not wa cant accss th value....check orderstock.......to use ifs function assign them to varibles, then accss the variables inside uisng the assignd name.

//ifessyntax
// const ifesvariable = (function () {
//   const variable1, const variable2, const variable3, const variable4,
//   const variable5 = function (product, quantity) {};
//   const variable6 = function (product, quantity) {};
//   return {
//   variables
//   };
// })();

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart(shiping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  //...the variables we want to be able to access from the outsid,i.e get their values. we put all of them in an object...making the function variabls as api.
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
    // orderStock,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pawpaw', 6);
// ShoppingCart2.orderStock('pineapple', 3);
console.log(ShoppingCart2);
console.log(cart); //global scope
console.log(ShoppingCart2.cart); //private bcos it exist in a function we made it public using return
console.log(ShoppingCart2.orderStock); //undefined..its private cannot be accessed bcos it exists inside the function and was not returned...can only be accessed inside the function.

//ifes are expected to be executed once automatically when the js loads, but we can still use other functions on it or call it again and it will implemented like above bcod of closures which says in js that if a function exists/created inside another function(its birthplace) the birthed function can always have access to its birthplace functions nd the other sibling functions that exist in the birthplace even if we do not return those sibling functions(for instance we did not return shopping cart variable but we use its value wen we called the shoppingcart2 function using addtocart.)...so we used a birthed function to implement the ifes function repeatedly.
*/
//////////////////////////////
//common js modules....not native really on external implementations...emd modules and common js modules.

// ..common js

/*
//exporting in common js which only workson nodejs..not on our computer browser
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} addedtocart (shiping cost is ${shippingCost})`);
}
//importing in common js which only workson nodejs..not on our computer browser
const { addToCart } = require('./shoppingCart.js');
*/

//it is standard practice not to clone objects using the js object.assign method...bcos when we have a nested object and we change the value of one of the object properties js will implement that change...we byepass this problem by importing the cloneDeep methodfroman external js file(module..lodash)

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

//importing when parcel is active
import cloneDeep from 'lodash-es'; //parcel automatically finds the part of the methods module...es versio,
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
// console.log(stateDeepClone); //returns true
// console.log(stateClone); //returns true

//we change the value of an object property...object.assign will implement the change. bcos it is a shaloow copy of the object variable. changes affecrs it...solve this using clonedeep...we copy/clone the object before we change the nested object property variable(NOTE!!!)
state.user.loggedIn = false;
//lets see which one of the 2 method is the true deep clone...i.e not affected by property value changes later.
console.log(stateClone); //returns the altered value (false)..it is a fake/shallow copy of the state object
console.log(stateDeepClone); //returns the original value (true) even after the change, it is the real/deep copy/clone of the state object..always use lodash to clone objects.

//to reinstall deleted npm module packages...type in the terminal 'npm i'......npm will go into its packages and reinstall allof them again...sometimes we may need to move our code files to a new system or send itto someone u do not send the package modules along..u delete them then install them in the new system after the files have been received there.

///////////////////////////////////////////////
//bundling with parcel and npm scripts...module bundler---parcel
//
if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));
import 'core-js/stable';
// import 'core-js/stable/array/find';
import 'regenerator-runtime/runtime';
