'use strict';

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = '';

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';

//     const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//     `;

//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

// const calcDisplayBalance = function (acc) {
//   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//   labelBalance.textContent = `${acc.balance}€`;
// };

// const calcDisplaySummary = function (acc) {
//   const incomes = acc.movements
//     .filter(mov => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${incomes}€`;

//   const out = acc.movements
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(out)}€`;

//   const interest = acc.movements
//     .filter(mov => mov > 0)
//     .map(deposit => (deposit * acc.interestRate) / 100)
//     .filter((int, i, arr) => {
//       // console.log(arr);
//       return int >= 1;
//     })
//     .reduce((acc, int) => acc + int, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };
// createUsernames(accounts);

// const updateUI = function (acc) {
//   // Display movements
//   displayMovements(acc.movements);

//   // Display balance
//   calcDisplayBalance(acc);

//   // Display summary
//   calcDisplaySummary(acc);
// };

// ///////////////////////////////////////
// // Event handlers
// let currentAccount;

// btnLogin.addEventListener('click', function (e) {
//   // Prevent form from submitting
//   e.preventDefault();

//   currentAccount = accounts.find(
//     acc => acc.username === inputLoginUsername.value
//   );
//   console.log(currentAccount);

//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     // Display UI and message
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(' ')[0]
//     }`;
//     containerApp.style.opacity = 100;

//     // Clear input fields
//     inputLoginUsername.value = inputLoginPin.value = '';
//     inputLoginPin.blur();

//     // Update UI
//     updateUI(currentAccount);
//   }
// });

// btnTransfer.addEventListener('click', function (e) {
//   e.preventDefault();
//   const amount = Number(inputTransferAmount.value);
//   const receiverAcc = accounts.find(
//     acc => acc.username === inputTransferTo.value
//   );
//   inputTransferAmount.value = inputTransferTo.value = '';

//   if (
//     amount > 0 &&
//     receiverAcc &&
//     currentAccount.balance >= amount &&
//     receiverAcc?.username !== currentAccount.username
//   ) {
//     // Doing the transfer
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     // Update UI
//     updateUI(currentAccount);
//   }
// });

// btnLoan.addEventListener('click', function (e) {
//   e.preventDefault();

//   const amount = Number(inputLoanAmount.value);

//   if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
//     // Add movement
//     currentAccount.movements.push(amount);

//     // Update UI
//     updateUI(currentAccount);
//   }
//   inputLoanAmount.value = '';
// });

// btnClose.addEventListener('click', function (e) {
//   e.preventDefault();

//   if (
//     inputCloseUsername.value === currentAccount.username &&
//     Number(inputClosePin.value) === currentAccount.pin
//   ) {
//     const index = accounts.findIndex(
//       acc => acc.username === currentAccount.username
//     );
//     console.log(index);
//     // .indexOf(23)

//     // Delete account
//     accounts.splice(index, 1);

//     // Hide UI
//     containerApp.style.opacity = 0;
//   }

//   inputCloseUsername.value = inputClosePin.value = '';
// });

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-10-28T17:01:17.194Z',
    '2023-11-01T23:36:17.929Z',
    '2023-11-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date); //NOW, DATE IN D MOVEMENTSDATE
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  //else {
  // const day = `${date.getDate()}`.padStart(2, 0); //date is 1 character, we want to add 0 at d front of d date.
  // const month = `${date.getMonth() + 1}`.padStart(2, 0); //month is already 2 characters, d pas method will be ignored
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  //usin d int api to format our date...
  return new Intl.DateTimeFormat(locale).format(date);
  //}
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
// for each array element, display the movement element(html), we looped the array then created a functio which creates the display element then we added the element to a parent element using the insertadjacenthtml function.
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; //delete the html elements inside the parent/movement element..we targetted the movement element then saved it to containerMovements variable using js...we used innerHTML to change the pre existing element to an empty string which means they do not exist..they are deleted.

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; //if sort is true, create a shollow copy of the movement array, sort this shallow copy in an asending order.

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //we created a new html element (movement) dynamically, it could be a deposit or withdrawal element depnding on the met condition

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale); //callin d function usin d date in d account array dat has been formatted and stired in d date variable and d locale in d account array

    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency, //we set d value of currenct to be dat in d current account array
    // }).format(mov);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
    </div>
    `;
    //we need to attach this created element to the movement segment/container the segment had a class of 'movements' so we told js to attach the created element to this class (segment/container)...note we save the container class to a variable then we used the variable name when we wanted to attach the created element to the container instead of using the query selector.element class...the insertadjacenthtml function takes in 2 parameters, the first parameter arguement sets the position we wish to place the created element, afterbegin means we want to place the new/created element(child element) in the beginning position of the parent element, so after each loop,the lastest element is placed as the first child element i.e we want the child element to be the very fist child element of the parent element...the seond parameter arguements is the value of the newly created html element i.e the string which creates the new html element...we needed to empty the parent element, i.e delete any pre existing child element (i.e we want to dlete any element that was existing inside the parent element bfor our new created element is added, this will make the parent element contain only the new element)...

    containerMovements.insertAdjacentHTML('afterbegin', html); //we said insert a new element as the first child element of the parent element-the element we targeted and saved to containerMovements variable using js.

    // console.log(containerMovements.innerHTML);//we also use the inner html function to read the content of html elements...so here we said return in thr BC the content(child elements) of the containerMovement element(parent element)
  });
};

///////////////////calculating the current balance value in the Bankist app using the reduce method...we have to display this accumulated value in the app page...we also want the balance to be a property of each account object so we call the function with the array of objects after each iteration the balance is obtained and added to the looped account obeject using the dot method....
//calculating the balance value using reduce method
const caclDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, mov, i) => accum + mov, 0);
  // acc.balance = balance; //we created a new property called balance, we added it in each looped account object, each time the accounts array is looped this property is added to each account object, the value of the balance property is the balance we obtain using the reduce mthod on the movement property of each looped account object.....

  //displaying the calculated balance....
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`; //we targetted the element (balance_value) in the html doc then set its content to be the value of the balance variable.
};
// caclDisplayBalance(account1.movements);

///////////using the chain method to calculate the sum for deposits(ins), withdrawals(out) and interest figures...

const calcDisplaySummary = function (currentaccount) {
  //deposit
  const incomes = currentaccount.movements
    .filter(mov => mov > 0) //creates an array for deposits/positive values from the movement array
    .reduce((accum, mov) => accum + mov, 0); //accumulates all deposits to give one final value..
  labelSumIn.textContent = formatCur(
    incomes,
    currentaccount.locale,
    currentaccount.currency
  ); //make this final value to be displayed in the app..we targeted the page then set its content to the final value
  // console.log(incomes);
  //withdrawals
  const out = currentaccount.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(out),
    currentaccount.locale,
    currentaccount.currency
  );
  // console.log(out);
  //interest...we need to apply the interest rate on the deposit array elements created by the filtter method. we use map method to apply the multiplication..
  const interest = currentaccount.movements
    .filter(mov => mov > 0) //creates an array with only positive values of movement array as its value..i.e an array of 'deposits'
    .map(deposit => (currentaccount.interestRate * deposit) / 100) //creates an array with the calculated individual interests as its element
    .filter((int, i, arr) => {
      //we used 3 parameter here bcos we wanted to view the array from the map method..0.84 euros will be filtered out by the filter method here...
      // console.log(arr);
      return int >= 1; //only int >= 1 euro makes it into the array that will be processed by the rduce method next.
    })
    .reduce((accum, interest) => accum + interest, 0); //sums up all the elements/values of the ma array to one single value(sums up all interest to give us a total interest value)
  labelSumInterest.textContent = formatCur(
    Math.abs(interest),
    currentaccount.locale,
    currentaccount.currency
  );
  // console.log(interest);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner //we save the converted string into a variable(username), then we use the dot method to add the username variable as a property of the account object.
      .toLowerCase()
      .split(' ')
      //using function arrow to write the call back function for the map method
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = function (acc) {
  //display movement...we use the displaymovement function we created to do this. we will call the function when a user logs in, that y we placed it here.
  displayMovements(acc);
  //display balance
  caclDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
  // console.log('LOGIN');
};

// logoout timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0); //returns d remainder of time/60(1 minute, 40 secs)...i.e d seconds(40secs)...we use padstart so wenever secs gets to a single digit 0 is added at d front of dat single digit
    //in each call, print d remainin time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //wen timer gets to 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }

    //time decreases every 1 second
    time--;
    // time=time-1
  };

  //set time to 5 minutes..i.e d timeout code implements after 5 minutes..
  let time = 120; //wen d setinterval function is executed/called, in its callback function we will reduce time by a second...d setinterval will be called every second so every second it is called, time reduces by a second

  //call d timer every second...use interval
  // tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

////////////////creating the user login functionality.....
//event handler
let currentAccount, timer;

//fake always logged in.
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

///experimentin wit d INT API

//FORMATTIN DATE ONLY
// const now = new Date();
// labelDate.textContent = new Intl.DateTimeFormat('en-US').format(now);

//FORMATTIN DATE AND TIME.......create date, create time as an object wit 2 elements hrs and minutes, call d int api formatters usin d date object as d second arguement
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric', //long, or 2-digit
//   year: 'numeric', //or 2-digit
//   weekday: 'long',
// };
// // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);

// // settin d locale to d user browser language
// const locale = navigator.language;
// console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (event) {
  //when the login button is clicked the default setting for the form is to submit the form then reload the page. we have to disable this.
  event.preventDefault(); //we prevent the form from submitting and reloading the page when the login is clicked(i.e event occurs)

  //setting the login functionality for a user..when the login button is clicked, the account(i.e currentaccount) that will be displayed(current account logged into) should be the account whose username was inputted in the username form...to implement this we used the find method, we said when a username is inputted and the login buton is clicked, the event handler should call the find method on the accounts array, the find method will loop each account object of the accounts array and will retrieve the entire account object that its username matches the inpuuted value in the username form..
  currentAccount = accounts.find(
    //we use the find method to return an object account which met the set condition, we stored this object in the currentAcount.
    account => account.username === inputLoginUsername.value //we compare the value inputted by the user in the username form to the username property value in each looped object, the object that satisfies this condition is returned, and it becomes the value of the currentAccount variable..if no object meets this condition, the find method will return underfined..i.e the object with the inputted username property value does not exist/was not found
  );
  console.log(currentAccount); //the account object that meets the set condition is retrieved by the find method and stored to the cuurentAccount variable

  // now we have been able to set the currentaccount, we need to confirm the pin of the currentaccount / cuurentuser so we can enable login functionality..this is simple, we simply check if the pin inputted in the pin form is the same with the pin property value of the object that was saved in the currentaccount variable as obtained in the step above...

  //we said if the cuurent account pin property value is same as the number inpuuted in the pin form, the U.I and a welcome message should be displayed..we converted to number bcos forms has typeof string...where the cuurent account is undefined js will read an error message for the pin inputted, we solve this by using the optional chain method...we chained a ternary operator(?)  we said js should only run the pin condition if the current account exists(currentaccount=true) i.e the find rturns an object..where the find method returnd undefined, the pin condition will not be executed..no eror message will be relayed...
  if (currentAccount?.pin === +inputLoginPin.value) {
    //display UI and welcome...the logged in page appears and the login message changes to another message(welcome)
    labelWelcome.textContent = `Welcome back ${
      //display message
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; //we targeted the app element in the js usng containerApp...take note check label at the top.

    //creatin d date functionality............intended date format...day//month/year
    //method 1
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //long, or 2-digit
      year: 'numeric', //or 2-digit
      // weekday: 'long',
    };
    // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);

    // settin d locale to d user browser language
    // const locale = navigator.language;
    // console.log(locale);

    //we set d locale of d current user to dat set in d user array.
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //method 1
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0); //date is 1 character, we want to add 0 at d front of d date.
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); //month is already 2 characters, d pas method will be ignored
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //clear input fields we want the username and pin form to lose active/focus highlight when we login successfully, we also want to delete the inputted values too..

    inputLoginUsername.value = inputLoginPin.value = ''; //the = operator works fromleft to right, we said pin is nothing, username is pin .i.e nothing.
    inputLoginPin.blur(); //blurs the form

    //we call d loout timer...it starts countin wen we login succesfully

    //timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //display U.I......we refactored this codeinto a function, ie stored it in a function variable then moved it upwards...when we click the send transfer button the UI should display the updated info, i.e balance,movements and summary figures...we saved the functions that do this into 1 function then call function here...when we call the functin, it will call the 3 functions inside it which will calculate the updated figures then it will be implemented here.
    updateUI(currentAccount);

    // //display movement...we use the displaymovement function we created to do this. we will call the function when a user logs in, that y we placed it here.
    // displayMovements(currentAccount.movements); //we call the function with the currentaccount object bcos we want the movemnets of the logged in user to be displayed.
    // //display balance
    // caclDisplayBalance(currentAccount);

    // //display summary
    // calcDisplaySummary(currentAccount);
    // // console.log('LOGIN');
  }
});

////////////////////////creating the transfer functionality......
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //prevents the form from reloading the page when clicked

  const amount = +inputTransferAmount.value; //the amount to be transferred is obtained as an input from the transfer form
  //find method loops the array of objects, with each object looped the username proerty is checked, the one that meets the condition is returned, this object bcoms the receiverAcc...we set a condition relating to a property, the object that satisifies is returned.
  const receiverAcc = accounts.find(
    account => account.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);

  //clearing the input field after transfer has been made..the field is cleared irrespective of transfer successful or not..nce the send transfer bttonis clicked, the transfer fields are cleared.
  inputTransferAmount.value = inputTransferTo.value = '';

  //we need to limit the transferable amount to current balance, so we implement a check functionality toensure this at all times..we said transfer shoulfd be sent if amount to be sent is > 0, the current account we are sending from should have a balance hiher than the amount to be sent, the user to which we want to send money to should be existent and we cannot send money to the current account using the current =Account.
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //we implement the actual transfer here, we debit the sender credit the receiver.
    currentAccount.movements.push(-amount); //less
    receiverAcc.movements.push(amount); //add

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //update UI
    updateUI(currentAccount);
  }

  //reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

/////implementing the loan section functionality, when the loan enter button is cliked the loan amount if approved should be logged in the account qs a deosit(i.e the amount should be added to the movement array as an element), then we need to update the UI to reflect this newly added value in the movements section...then we should clear the input form field for the loan section
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // const amount = +inputLoanAmount.value;
  const amount = Math.floor(inputLoanAmount.value);

  //we set the condition for successful loan grant. 1, theloan amount must be positive. 2, the account must have add a deposit(the movement array must have an element with a positive value => 10% of the loan amount) >= 10% of the loan amount.
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add amount as an element to the movement
      currentAccount.movements.push(amount);

      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //update UI
      updateUI(currentAccount);

      //reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  } //clear the loan input fielf
  inputLoanAmount.value = '';
});

//////////////////////////
//lesson: the findindex....it returns the index of an element...we use when when we want to work with the index of an element inside an array...
//we want to close an account in our app..we do this simply by deleting the account object from the accounts array using the splice method, the splice method works elements/index of an array...we set the event handler for when the close button is clicked.

btnClose.addEventListener('click', function (e) {
  e.preventDefault(); //prevents the form from reloading the page when clicked
  // console.log('Delete');
  if (
    currentAccount.username === inputCloseUsername.value &&
    +inputClosePin.value === currentAccount.pin
  ) {
    // console.log('e shoke');//....always do this check if ur set condition work....

    //the findindex method loops the account array of objects and returns the object that meet the set condition...if we use jd, findindex returns [1]...the returned index is saved to a variable called index.
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index, 'this is the index');
    //.indexOf(23)..this method checkif an array contains the 23 element if tru it returns it if not nothing happens...

    //delete account......deleting the index (object) that is returned by the findIndex method...
    accounts.splice(index, 1); //we said splice method should splice the accounts array, start from the index and remove one element starting from the index(i.e delete the index element from the accounts array)..rememeber slice mutates the original, this means whatever it deletes from an array has been permanently dleted, so we can no longer log in the with details of the deleted user

    //we want to delete the user account when he closes his account...i.e hide the U.I
    containerApp.style.opacity = 0;
  }

  //clearing the input fields for close account section whenever the enter buttn there is clicked..this code should always b outside the id statement bcos even if the right or wrong account details are inputted we want the field to be cleared when enter is clicked..also we lace the code after the if statement if we placed it bfor
  inputCloseUsername.value = inputClosePin.value = '';
});

//fixing the sorting functionality...
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; //each time we click the sort button, the value of sorted is flipped, first click turns sorted to not sorted i.e true, second click turn sorted from true to false...the displaymovements will then sort the movements section using either false(actual movement array) or true(movs shallow copy array)
});
////////////////////////
//customising username
//we converted the string value to lower case using the tolowercase mthod, then we used the split method to break down the user value (string) into 3 different individual values(substrings/words) separating them with a comma, then we saved these individual strings/values into an array..inorder to now get the first character of each individual string/word/element/value we need to loop over each word/string/value/element then take the first letter of the looped element in each iteration, then add these first letters to a new array(we used map method here, it looped the username array['steven', 'thomas', 'williams'], returned the first letter of each looped element, then saves the letter returned into a new array ['s', 't', 'w']), we then used join method to add all the elements of the new map method array into a string, separated by the specified separator string(an empty string which means no character/space sould exist between the words i.e they should not be separated)...
/*
//using function expression to write the call back function for the map method.
const user1 = 'Steven Thomas Williams'; //we need to create the username 'stw' from the name property value(a string)

//we changed the caps to small letter, we splitted the string to 3 single array element, we then looped the array and applied a function proces which returns the first character of each looped element...mapmethod stores this looped result in an array, we then applied the join method...the whole process will give us the converted username we then store this username into a variable
const username1 = user1
  .toLocaleLowerCase() // ----->'steven thomas williams'....
  .split(' ') //-----> ['steven', 'thomas', 'williams']....map method will loop this array, the arguement will be each element value in the looped array
  .map(function (name) {
    return name[0]; //----->stw, this result will be stored in an array----->['s', 't', 'w']
  })
  .join(''); //----->stw
console.log(username1);

// using function arrow to write the call back function for the map method
const user2 = 'Steven Thomas Williams'; //we need to get the username 'stw' from the user value(a string)
const username2 = user2
  .toLocaleLowerCase()
  .split(' ')
  .map(name => name[0]) //no use of return keyword
  .join('');
console.log(username2);
*/

//we saved this whole process into a new variable, i.e we made the whole process bcom a function then stored the function into a variable...with this we can now call the function with any arguement we want to convert to a username...we no longer have to save the name we want to convert to username into a variable first, then process the variable by applying methods on it...what we do is that we will either call the function directly using the names we want to convert to username without first storing the name inside a variable or we can call the function with a property value in this case the string value of the owner property which exists inside the accounts object..that is what we did below.

/*
const createUsernames1 = function (user) {
  //user = parameter arguement used to call the createUsernames1  function
  const username = user //we want to process the string arguement passed in (user), then store the final product   (username created) into a variable called username
    .toLowerCase()
    .split(' ')
    //using function arrow to write the call back function for the map method
    .map(name => name[0])
    .join('');
  console.log(username);
  return username;
};


//clean code for the function variable...

const createUsernames1 = function (user) {
  const username = user
  .toLowerCase()
  .split(' ')
  //using function arrow to write the call back function for the map method
  .map(name => name[0])
  .join('');
  console.log(username);
  return username; //stops the excution of the above process and return the end product as a value stored in username
};
// console.log(createUsernames('Steven Thomas Wiliams'));
console.log(createUsernames1(account1.owner));
console.log(createUsernames1(account2.owner));
console.log(createUsernames1(account3.owner));
console.log(createUsernames1(account4.owner));
*/

//now we successfully have a function that creates the username string..we want to add this username string as a value to a new property we will create. the property will be called username...the property will exist inside each looped object....we loop the objects becos the objects have the string we want to convert inside the, likewise we will be able to add the converted string back inside them with the same process...now we have to choose between using the foreach loop or the map method to loop the accounts array which is an array with objects inside of it as its elements...we used the for each method becos we want the result of the loop process, we do not want to store the looped results inside a new single array, so we did not use map method...

// steps..we call the function using an array of objects, we loop the array, each object is iterated, with each single iteration of each object, we process the string value of the owner property inside the object, our process gives us a final product which is a string value, we store the string value as the value of the username variable, we then use the dot method to add this username variable as a property inside each iterated object......

/*
///how to understand the code here
const createUsernames = function (arrayofobjects) {
  accounts.forEach(function (eachobject) {
    eachobject.username = eachobject.owner
    .toLowerCase()
    .split(' ')
    //using function arrow to write the call back function for the map method
    .map(name => name[0])
    .join('');
  });
};
createUsernames(accounts);
console.log(accounts);
*/

/*
//clean code for the customising name task
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner //we save the converted string into a variable(username), then we use the dot method to add the username variable as a property of the account object.
      .toLowerCase()
      .split(' ')
      //using function arrow to write the call back function for the map method
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);
*/

/* //....final result compared to accounts object at the data segment...
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  username: js
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
    username: jd
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
    username: stw
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
    username: ss
};

const accounts = [account1, account2, account3, account4];
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// numbers; they are stored in 64-2 base format i.e stored in 0s and 1s...
console.log(23 === 23.0);
//base 10---->0 to 9
//base 2----->0 t0 1.............0.1 = 0.30000000000000004
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); //false.....error

//converting string to number
console.log(Number('23'));
//trick
console.log(+'23'); //.............js uses type coercion to convert all values to numberss when plus operator is used.

//using the parsing method....the Number function is an object, object have methods...parsing is a method that works on objects..

//getting numbers from strings..................
//parsing with intergers......the ParseInt method accepts 2 arguement, first the string we want to parse, seond the number base we want the number parsed to be in.....we can parse a number from a string.....where a number and string form a string value, we use parse to extract the number string and return it as a number value...note for it to work the initial string value must start with a number, otherwise NaN will be returned
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('px30', 10));

//parsing with floats....we use it to parse numbers that have decimals..it returns both the integer and decimal parts
console.log(Number.parseFloat('   2.5rem')); //returns full number
console.log(Number.parseInt('     2.5rem')); //parseInt on decimals return only the integer part

///we calluse number methods without calling them 0n the number object.
console.log(parseInt('     2.5rem'));

//checking if a value is NaN......we use the isNaN method to do this..In JavaScript NaN is short for "Not-a-Number". The isNaN() method returns true if a value is NaN and the type is a Number. The isNaN() method converts the value to a number before testing it.

//NaN return true only when value typeoff is a Number and the value itself is not a Number(NaN)
console.log(Number.isNaN(20)); ///number....isNaN = false
console.log(Number.isNaN('20')); ///value = NaN, typeOFF = string.....is NaN = false...
console.log(Number.isNaN('+20')); ///value = number, typeOFF = number.....is NaN = false
console.log(Number.isNaN(+'20x')); //value = NaN, typeOFF = number.........isNaN = true
console.log(Number.isNaN(23 / 0)); //infinity i.e value = infinite number, typeOFF = number... isNaN = false

//isFinite Method: NaN method does not consider infinite number, so we make use of the isFinite Method to solve this problem....it is also a better method for checking if a given value is a number

//checking if a value is NaN
console.log(Number.isFinite(20)); //true.......is a number
console.log(Number.isFinite('20')); //false.......is not a number...a string
console.log(Number.isFinite(+'20x')); //false...is not a number..a string
console.log(Number.isNaN(23 / 0)); //false........infinity

//checking if a number is an interger...interger= number without decimal number
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23.1)); //false
console.log(Number.isInteger(23 / 0)); //false
*/

/*
////////////////////////////////
//math and rounding

//getting the square root of numbers

//using the square root method
console.log(Math.sqrt(25));

//usimg the exponentiator operator
console.log(25 ** (1 / 2));

console.log(8 ** (1 / 3)); //getting cubic root

///getting the maximum value amongst a couple of values....max method
console.log(Math.max(3, 5, 65, 77, 6));
console.log(Math.max(3, 5, 65, '77', 6)); //max method does type coercion..
console.log(Math.max(3, 5, '65px', 77, 6)); //max method does not do parsing..

///getting the minimum value amongst a couple of values....min method
console.log(Math.min(3, 5, 65, '77', 6));

//calculating the radius of a circle
console.log(Math.PI * Number.parseFloat('10px') ** 2);

//genrating a random number
console.log(Math.trunc(Math.random() * 6 + 1)); //genrating a random dice roll....Math.trunc eliminates decimals...Math.random gives a random number from 0.0 to 0.99..we multiply by 6 to get 5, then add 1 to make up the random number be 6.

//genrating randomintergers between 2 values...
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//works better at generating random number between 2 values..it works for plus and minus
const randomIntuse = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomIntuse(10, 20));

//rounding intergers
console.log(Math.trunc(23.8)); //simply removes the decimal part of the number.

console.log(Math.round(23.8)); //simply round up the number to the nearest integer/whole number...

//ceil method rounds up to the next integer
console.log(Math.ceil(23.1));
console.log(Math.ceil(23.8));

//floormethod round down to the previous integer
console.log(Math.floor(23.2));
console.log(Math.floor('23.8'));

//both trunc and floor cut off the decimal numbers and return just the inegers when we deal with positive numbers, however they behave differently when handling negative numbers.
console.log(Math.trunc(-23.2)); //eliminates the decimal number and returns -23.
console.log(Math.floor(-23.2)); //rounds to the previous negative interger i.e -24
//use floor, bcos it works more accuately irrespective of the type of number

//floating point numbers...i.e rounding decimals.

//the toFixed metod rounds up a number to te nearest decimal place we specify in the arguement
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); //converted result to number
*/

/*
////////////////////////////////
//the remainder operator (%)...it returns the remainder of a division.operation
console.log(5 % 2); // 5 / 2 = 2 remainder 1.....
console.log(5 / 2); // 5 = 2 * 2 + 1...1 is the remainder  value
console.log(8 % 3); //8 / 3 = 3 remainder 2........2 is the remainder value
console.log(8 / 3); // 8 = 3 * 2 + 2...2 is the remainder  value

//in js a number is even if when we divide it by 2 the remaindr is zero..or the result of dividing the even numbe by 2 is an interger(whole number)
console.log(6 % 2); //remainder = 0
console.log(6 / 2); //results in an interger

////odd numbers...in js a number is odd if when we divide it by 2 the remaindr is 1
console.log(7 % 2);
console.log(7 / 2);

//checking if a certain number is even or odd
const isEven = n => n % 2 === 0; //a function which states a condition for even number
console.log(isEven(8));
console.log(isEven(58));
console.log(isEven(81));

//coloring every second row of the movements table i.e we create an array from the movements nodelist then loop it changing the background color of every even index of the array.

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    //0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    //0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
//////////////////////////////////////////
///numeric separators...

//287,460,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
console.log(PI);

console.log();

//converting strings with underscore and numbers to numbers will not work.....
console.log(Number('230_000')); //NaN
console.log(parseInt('230_000')); //230
*/

/*
//////////////////////////////////
///Big Int
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
//numbers on js higher than the Number.MAX_SAFE_INTEGER is not safely represented/stored
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 0);

//bigInt solves this..bighint stores huge numbers no matter how large.we add n at the end of the huge number to transform it to a bighint or u use tge bighint method directly...use n for really huge numbers and bighint for smaller huge numbers
console.log(4838430234789874377878798080980909970n);
console.log(BigInt(48384302));

//operations
console.log(10000n * 100000n);
console.log(3824787498980934070072347n * 100000000n);
//math operators do not work on bigint
// console.log(Math.sqrt(16n));

const huge = 24987243827223987942908470n;
const num = 23;
// console.log(huge * num); //error......u cannot mix bigint and regular numbers together unless wen usin comparison operators

//we convert d regular number to bighint using the bighint method
console.log(huge * BigInt(num));

//u cannot mix bigint and regular numbers together unless wen usin comparison operators or strin conversion....i.e exceptions

//operators
console.log(20n > 15);
console.log(20n === 20); //strictly bigint is not regular number
console.log(typeof 20n);
console.log(20n == '20'); //loosely bigint is same as regular number

//string conversion
console.log(huge + ' is REALLY big!!!'); //we convert everything to string

//bigint and divisions
console.log(11n / 3n); //in division bigint cuts off the decimal points
console.log(10 / 3);
*/

//////////////////////////////////
//creating dates....dates are infact special types of objects...so dates have methods

//creatin a date.....tere are 4 ways to create dates in js...tey all use te same new date constructor but tey accept different aruements.
/*
//method 1.......automatic
const now = new Date();
console.log(now);

console.log(new Date('2023-11-04  15:27:01'));
console.log(new Date('December 24, 2014'));

///creatin a new date usin a strin from an object....we used te movements date in our account1 object
console.log(new Date(account1.movementsDates[0]));

//yr, month, day, hr, min, sec.........the month in js is zero based...10th month = november
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 19, 15, 23)); //sec can be omitted
//js auto corrects dates
console.log(new Date(2037, 10, 33)); //.....dec 3

console.log(new Date(0)); //Jan 1, 1970....unix date

//3 days after unix date...3 days x 24 hrs x 60min x 60sec *1000milliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000));
//time stamp for day number 3 unix.........
console.log(3 * 24 * 60 * 60 * 1000);
*/
// workin wit dates usin date metods
/*
const future = new Date(2037, 10, 19, 15, 23);
// console.log(future.getYear()); //dont use
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); //day of d week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); //used to convert date type to string so we can store in a variable.

//timestamp....minute dat has passed since Jan 1st, 1970......it is in milliseconds

//gettin timestamp for a certain date
console.log(future.getTime()); //returns 2142253380000

//gettin current date from timestamp
console.log(new Date(2142253380000));

//gettin timestamp of current moment/now......metod 2
console.log(Date.now());

//settin a future date
future.setFullYear(2040);
console.log(future);
*/

/*
/////////////////////////
//operations with dates......operators work wit dates by chanin dem to timestamps..we can now convert d timestamp back to date.
const future = new Date(2037, 10, 19, 1, 23);
console.log(future);
console.log(Number(future));
console.log(+future);

// gettin d number of days dat has elapsed between two given dates...

//step 1:create te function dat calculates d elapsed days
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); //we convert d timestamp to days by dividin it wit d time stamp formular...we use Math.abs to ignore negative value

//call d function
const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);
*/

////////////////////////////////////
///int numbers

////basics
// const num = 3888474.23;
// console.log('US;', new Intl.NumberFormat('en-US').format(num));
// console.log('GERMANY;', new Intl.NumberFormat('de-DE').format(num));
// console.log('SYRIA;', new Intl.NumberFormat('ar-SY').format(num));

// //////usin d locale fromd browser
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language).format(num)
// );

/*
///////////////usin a second arguement
const num1 = 3888474.23;
const options = {
  style: 'currency', //percent,unit........u set currency manually, it isnt defined by d locale
  // unit: 'mile-per-hour',
  currency: 'EUR',
  // useGrouping: false, //ignores d number formatter(separator)
};
console.log('US;       ', new Intl.NumberFormat('en-US', options).format(num1));
console.log('GERMANY;  ', new Intl.NumberFormat('de-DE', options).format(num1));
console.log('SYRIA;    ', new Intl.NumberFormat('ar-SY', options).format(num1));

//////usin d locale fromd browser
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num1)
);
*/

/*
/////////////////////////////
//timers: setTimeout and setIntervals

//setTimeot executes the callback function once, after the timer elase
//setTimeout as 2 aruements,1 is d call back function d oter is d time lapse(in milliseconds)...after d setout timer period elapse d settimeout function calls d call back function

//asynchronous js
setTimeout(() => console.log('Here is your Pizza 🍕🍕🍕🍕'), 3000);
console.log('Waiting');

/////////////setting the setTimeout function with parameter arguements..to do this we specify the arguements after the second setTimeout 2 arguements...the parameter inputs are set in the brackets of the settimeout callback function.
setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your Pizza with ${ing1}, and ${ing2} 🍕🍕🍕🍕`),
  3000,
  'olives',
  'spinach'
);

//or

const ingredients1 = ['olives', 'spinach'];
setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your Pizza with ${ing1}, and ${ing2} 🍕🍕🍕🍕`),
  3000,
  ...ingredients1
);

////////cancelling the settime out bfor the set time elapses...assign timer to variable, set condition then clear/cancel timer....

const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your Pizza with ${ing1}, and ${ing2} 🍕🍕🍕🍕`),
  3000,
  ...ingredients
);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); //we deleted the timer by setting a condition and  using the variable which holds d timer.....line 1093 will nt be printed to the console bcos d condition is true

//condition is false, prints the timer
const ingredients2 = ['olives', 'zobo'];
const pizzaTimer2 = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your Pizza with ${ing1}, and ${ing2} 🍕🍕🍕🍕`),
  3000,
  ...ingredients
);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//we implemented our bankist timer function here.

////setInterval has 2 arguements viz; 1 the callback function, 2 the timer...
///setInterval excutes the callback function at intervals we set in the setInterval arguement.

//we want to create a clock that logs the time in our console at every 1 second interval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

//creating the timer...this time only the actual clock without the date will be printed...
setInterval(function () {
  const now = new Date();
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
}, 1000);
*/

/////////////////////////////
//ipmlementing countdown timer

const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);

const word = 'sammy kin zane';
const wordArray = word.split(' ');
console.log(wordArray);

console.log(20n === '20');
