'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 10000; //object.freeze is a shallow freeze, we can mutate/change the value of existing properties of the object..with object.freeze we immute the object...no new property can be added to it.
// budget[9] = 'jonas';

const spendinglimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendinglimits.jay = 200; //added a new proeprty to the object....with object.freeze we immute the object...no new property can be added to it.
console.log(spendinglimits);

const getLimit = (limits, user) => spendinglimits?.[user] ?? 0;

//pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [
        // we created a new array by coping an existing array then adding one more new property to it.
        ...state,
        { value: -value, description: description, user: cleanUser },
      ]
    : state;
  // budget.push({ value: -value, description: description, user: cleanUser });
};

const newBudget1 = addExpense(budget, spendinglimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendinglimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendinglimits, 200, 'Stuff', 'Jay');

// const checkExpenses2 = function (state, limits) {
// return state.map(entry => {
//   return entry.value < -getLimit(limits, entry.user)
//     ? { ...entry, flag: 'limit' }
//     : entry;
// });
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendinglimits);
console.log(newBudget3);
console.log(finalBudget);

const logBigExpenses = function (state, biglimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -biglimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  //   .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
  // console.log(bigExpenses);
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -biglimit ? `${entry.description.slice(-2)} / '` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

console.log(budget);
logBigExpenses(finalBudget, 500);
