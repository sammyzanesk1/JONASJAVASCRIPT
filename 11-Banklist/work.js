//////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

//the find method.....we use this method to retrieve elements/items from an array based on a set condition...it does not return an array of elements that satisfy the set condition,it only returns the first element in the looped array that satisfy the conditon....the filter method accepts 2 paramters, the first one is the set condition, the second is the callback function...i.e the function/process the find method will implement while it loops an array....find method workslike filter method in that they both operate with a set condition but they have 2 fundamental differences, while the filter method returns multiple elements from an array it loops(i.e all the elements that meet the set condition are returned) the find method only returns the first element that meets the set condition in the array that it loops, all other elements that meet the set condition are not returned by the find method...the second fundamental difference between the two is that while the filter method returns its elements in an array, the find method does not return its element in an array..it returns the first elemnent that meets a set condition in an array as a value...

const firstWithdrawal = movements.find(mov => mov < 0); //the find method returns the first element in the movements array which is a negative value.
console.log(movements, firstWithdrawal);

//working with an array of objects using the find method...the find method here will return the object that mets the condtion set.
console.log(accounts);

const account = accounts.find(account => account.owner === 'Jessica Davis'); //find method loops over an array of objects (i.e accounts array), with each iteration it loops over each account object, then retrieve the account object with owner property value of Jessica Davis
console.log(account); //

const sarahDod = dogs.find(mov => mov === 275);
