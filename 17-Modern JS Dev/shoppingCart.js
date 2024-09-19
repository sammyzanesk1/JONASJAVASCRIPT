//exporting module
console.log('exporting module');

//blocking code:
// console.log('start fetching users');
// await fetch(
//   'const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);'
// );
// console.log('finsih fetching user');

//variables scope to the modules, meaning they cant be accessed outside of this shoppingCart script file.
const shippingCost = 10;
export const cart = [];

//making module variables global variabes, i.e accessible to other js files or outside of the module..exporting the variables to other files or importing the variable into other files...

//method 1..wrap the variable in an export keyword int he mosule then use the import keyword in the js file with the exported variable name in a curly braces ....
//method 1....using import/export syntax..export only works in top level code...i.e declared as global variables and not inside any other function or codess...

//will work
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// //wont work
// if (true) {
//   export const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };
// }

//method 2.exporting multiple thing usingnamed export at the same time
const totalPrice = 237;
const totalQuantity = 23;

// export { totalPrice, totalQuantity };

//we can change the name of the module variable at the point of exporting it, the importing file must refer to the imported variable with the changed name set in the export else an error.
export { totalPrice, totalQuantity as tq };

//default export.we use it when we want to export the final value of a variable of a module..we store it to a variable or give it a name at the point where we import it.
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
