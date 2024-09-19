'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//console.log(accounts[0]);

//Elements
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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////////////////
//creating DOM elements
// for each array element, display the movement element(html), we looped the array then created a functio which creates the display element then we added the element to a parent element using the insertadjacenthtml function.
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //delete the html elements inside the parent/movement element..we targetted the movement element then saved it to containerMovements variable using js...we used innerHTML to change the pre existing element to an empty string which means they do not exist..they are deleted.

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; //if sort is true, create a shollow copy of the movement array, sort this shallow copy in an asending order.

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //we created a new html element (movement) dynamically, it could be a deposit or withdrawal element depnding on the met condition
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = `${acc.balance} €`; //we targetted the element (balance_value) in the html doc then set its content to be the value of the balance variable.
};
// caclDisplayBalance(account1.movements);

///////////using the chain method to calculate the sum for deposits(ins), withdrawals(out) and interest figures...

const calcDisplaySummary = function (currentaccount) {
  //deposit
  const incomes = currentaccount.movements
    .filter(mov => mov > 0) //creates an array for deposits/positive values from the movement array
    .reduce((accum, mov) => accum + mov, 0); //accumulates all deposits to give one final value..
  labelSumIn.textContent = `${incomes}€`; //make this final value to be displayed in the app..we targeted the page then set its content to the final value
  // console.log(incomes);
  //withdrawals
  const out = currentaccount.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
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
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements); //we call the function with the acc object bcos we want the movemnets of the logged in user to be displayed.
  //display balance
  caclDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
  // console.log('LOGIN');
};

////////////////creating the user login functionality.....
//event handler
let currentAccount;

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
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome...the logged in page appears and the login message changes to another message(welcome)
    labelWelcome.textContent = `Welcome back ${
      //display message
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; //we targeted the app element in the js usng containerApp...take note check labelat the top.

    //clear input fields we want the username and pin form to lose active/focus highlight when we login successfully, we also want to delete the inputted values too..

    inputLoginUsername.value = inputLoginPin.value = ''; //the = operator works fromleft to right, we said pin is nothing, username is pin .i.e nothing.
    inputLoginPin.blur(); //blurs the form

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

  const amount = Number(inputTransferAmount.value); //the amount to be transferred is obtained as an input from the transfer form
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

    //update UI
    updateUI(currentAccount);
  }
});

/////implementing the loan section functionality, when the loan enter button is cliked the loan amount if approved should be logged in the account qs a deosit(i.e the amount should be added to the movement array as an element), then we need to update the UI to reflect this newly added value in the movements section...then we should clear the input form field for the loan section
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  //we set the condition for successful loan grant. 1, theloan amount must be positive. 2, the account must have add a deposit(the movement array must have an element with a positive value => 10% of the loan amount) >= 10% of the loan amount.
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add amount as an element to the movement
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  //clear the loan input fielf
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
    currentAccount.pin === Number(inputClosePin.value)
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

/// //////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//start of lessons
///////////////////////////////////////////////////////////////////
//methods are functions attached to objects
/*
//slice method returns a portion of the array...we call the method with the begin parameter, .this is the index where the method starts extracting/slicing the array... then we input the end parameter(the index in the original array where the slicing stops...note that just like in strings the end parameter (last index element is not included in the output i.e sliced array retuned where we set the start and end parameter for the slice method)) where we do not specify the end parameter the slice methid slices the array from the start and stops at the last index of the original array .the slice method returns a new array with the slice portion inside it...
let arr = ['a', 'b', 'c', 'd', 'e', 1, 2];

//SLICE ARRAY METHOD
console.log(arr);
console.log(arr.slice(2)); //returns the slice array
console.log(arr.slice(2, 4)); //returns the sliced array index of 2 and 3, 4 is not inluded...the length of the returned array will be the end - begining parameter arguement..(4-2=2....i.e [3],[4])
console.log(arr.slice(-2)); //setting a negative parameter makes the slicing starts from the end...returns the last 2 index/elements of the original array
console.log(arr.slice(-1)); //returns the last element/index of the original array.
console.log(arr.slice(1, -1)); //retruns an array that starts from the [1](2nd element) and ends just before the last element of the original array...since we specified the end parameter the slice cannot end at -1, it will end in the position bfor -1 which is -2...
console.log(arr.slice(1, -2)); //returns rank [1] to rank [-3]...extract from rank 1 till the end of the array except the last 2 index of the array.

//using the slice method to create a shallow copy of an array...we do this by calling the slice method without any parameter arguement..this give use the same result as using the spread operator...
console.log(arr.slice());
console.log([...arr]); //the spread operator unpacks the arr array then saves the unpacked values to an array...

//SPLICE ARRAY METHOD...this works like th slice mthod but it mutates the original array...the elements it extracts from the original array is eliminated from that original array subsequently.
arr = ['a', 'b', 'c', 'd', 'e', 1, 2];
console.log(arr.splice(2, 4)); //returns a slice array that starts at [2] and contains 4 elements starting from [2]...i.e [2],[3],[4] and [5]....
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(2)); // returns from the [2] element till the last element in the array...removes the first 2 elements...[0],[1]

console.log(arr); //returns the mutated or altered array,the sliced elements are removed/deleted from it....i.e [0] and [1]....
//we use splice in  practice to trim or delete elements from arrays...

arr = ['a', 'b', 'c', 'd', 'e'];
//using splice to remove the last element of an array.......
console.log(arr.splice(-1)); //returns the last element of the array
console.log(arr); //returns the original array that no longer has the last element

//to delete specific elements in an array...we use the slice method with 2 parameter arguement, the first arguement is the index we want to start the extraction/splicing, the second arguement is the number of elements we want to be spliced starting the the beginning index...in the below example we want to remove  elements b and c from the original array,so we have to splice the original array then log the mutated array

arr = ['a', 'b', 'c', 'd', 'e']; //original array
console.log(arr.splice(1, 2)); //the sliced array should start from [1] and it should contain 2 elements with [1] inclusive, i.e [1],[2].....the mutated array will have elements in [1] and [2] deleted...we deleted b and c...[b, c]
console.log(arr); //returns the mutated array[a, d, e]....

//REVERSE ARRAY METHOD...mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //mutates the original array, arranging the elements in a reverse order..the last bcoms the first, second last becomes second just in that order..
console.log(arr2);

//CONCAT ARRAY METHOD...used to join 2 arrays to 1 single array...does not mutate...we can also merge 2 arrays to be one by unpacking the individual arrays then assgin their unpacked values to one array..i.e use the spread operator on the individual arrays..using the spread operator does not also mutate the original array...

const letters = arr.concat(arr2); //merge arr array and arr2 array to form one letters array..we called the concat method on the arr arrat then used the arr2 array as the arguement...
console.log(letters);
console.log(arr);
console.log([...arr, ...arr2]); //merges the  2 individual arrays into 1, by first unpacking the 2 individual arrays then storing the unpacked values into an array...

//JOIN ARRAY METHOD...used to unpack elements of an array into individual values, then the individual values are joined together using the parameter passed in the join method...this makes the individual values bcom just one value(a string with the specified separator )
console.log(letters.join('-'));
*/

/*
///////////////////////////////
//the new at method...we use it to return the value of an array at a particular index or rank
const arr = [23, 11, 64];
console.log(arr[0]); //traditional way of returning the value of an array at a particular index/rank
console.log(arr.at(0)); //es2022 method to return the value of an array at a particular rank/index...

//getting the value of the last rank in an array
console.log(arr[arr.length - 1]); //using the traditional code..i.e arr[2] is last position
console.log(arr.slice(-1)[0]); //returning the last element in the array using the slice method..first we took the last element of the arr array, the slice method will return the last value of the arr array in a new array...the new array contains just a single element/value i.e 64 we then said that the value should be console log in the broswer so in the broswer 64 is logged...
// console.log(arr.slice(-2)[0]);//the slice return an array which contains the original array last 2 element we said the element occcupying [0] should be logged in the BC...

//using the at method to return the value of the last element in an array
console.log(arr.at(-1)); //return the value at the last rank..i.e return the first value starting from the end of the array.
console.log(arr.at(-1)); //return the value at the second to the last rank..i.e return the second value starting from the end of the array.
console.log(arr);

//at method works on strings...
console.log('jonas'.at(0)); //returns the first character of the string
console.log('jonas'.at(-1)); //returns the last character of the string
*/

/*
//////////////////////////
//the for each loop....

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//we want to loop over each element of the above array, returning a message in the BC for each elememt....for positive value log you deposited some money, for negative figure log you withdrew some money..

//using the for loop to iterate all the items/elements in the array at one go...after ecah iteration the value of the element iterated will be saved in the movement variable..

//to create a counter variable which holds the index of each iterated item in the  array(i holds the index, movement holds the value..entries returns the unpack element s and their index, then we store them in   an array)
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  } //we used Math.abs to ignore the negative sign and use absolute figures...
}
console.log(`------FOR EACH-------`);

//using the forEach method to loop over the movements array......the forEach is a higher order function which has a call back function attached to it...anytime the foraxh method is executed it calls the function attached to it..the array elements to be looped will each be passed as an arguement in the call back function for each iteration executed, the forEach loop function also passes in the index of each  array element passed in as an arguement, therefore we can specify the index in the parameter list of the forEach method syntax...below we applied/executed the forEach method on th movements array, this makes the forEach method to call on the call back function attached to it...in calling the function attached to it, it uses each element in the movements array as an arguement, this arguement is passed into the call back function during each iteration and the callback function processes it and logs the result based on the condition satisfies inside of it...

//difference between the for loop and forEach function when we want to get index of current element looped, for for loop the index variable which holds the current looped index comes bfor the movement variable which holds the current looped element...for forEach function, the index and current element looped are not held in variables, rather they are passed as arguement by the forEach function into the callback function for each iteration...so to access them we simply set them as arguements in the function, note that the first arguement that should be passed is the current element looped, then the index then the entire array...the function will work even if we do not set the arguement for the third parameter.

//first parameter = current element, second parameter = current index, third parameter =the entire array we are looping over
// movements.forEach(function (movementsamuel, i) {
movements.forEach(function (movementsamuel, i, arr) {
  //the parameter will be filled with the value of the array as its arguement starting from [0] element at the first, iteration, [1] at second iteration ans so on....
  ement ${i + 1}: if (movementsamuel > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movementsamuel}`);
  } else {
    console.log(`MovYou withdrew ${Math.abs(movementsamuel)}`);
  } //we used Math.abs to ignore the negative sign and use absolute figures...
});
//0: function (200)
//1; function(450)
//2.function(400)
//....for each iteration in the loop, the value/element of the array is passed in the call back function as the arguement...after the callback function processes the arguements, the forEach mthod returns the final value of the process...

/////fundamental difference between foreach loop and for loop is that in for each method u must loop over the entire array without stoping, you cannot breakout of thr array u want to loop...if u want to break out u use the for loop
*/

/*
/////////////////////////////////////
//forEach Method on MAPS AND SETS....map is an array of arrays with key value pairs

///using MAP AND FOREACH METHOD
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//we use the forEach method to loop the set, for each iteration the method passes in the key value pair of each indiviual array in the map to the callback functioon for processing after which the forEach method returns...the other of the parameter arguement is same like in forEach method on array..the value first, the key second then the map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//USING SETS AND FOREACH METHOD
const currenciesunique = new Set(['USD', 'GBP', 'USD', 'EUROS']);
console.log(currenciesunique);

//looping over the set using foreach method...we pass in the 3 arguements so that the syntax here look like that of arrays an maps, but ordinarily, we only need to pass the first parameter bcod maps hold only one uniques value each, it has no index or key just unique values...
currenciesunique.forEach(function (uniquekey) {
  console.log(`${uniquekey}`);
});

//to make the looed set look like arrys and maps...i.e have key/index value pair, we created a throwaway paramter..the forEach method will pass the value in the set as the arguement for both parameters...
currenciesunique.forEach(function (uniquekey, _, map) {
  console.log(`${uniquekey}: ${_}`);
});
*/

//////////////////////////////
//data transformations:map, filter, reduce...data transformation means creating new arrays fromexisting arrays...
//MAP METHOD: we use the map method to loop over arrays just like the forEAach method...but map creates a brand new array based on the original array....maps works likes this, we loop over an original array, applying a convic function to the looped array elements, then store the result of each convic function process in a new array...the map is better than the foreach method bcos while foreach method aloows us work on the looped elements of an array the map ethod allows us store the result of the looped elements of the original array into a brand new array....
//FILTER: we use this method to select elements in an original array which meets a certain set condition...the lements that meets this condition/test are filtered and selected into a new array....i.e the elements whose boolean is true relative to the set condition will be filtered and stored in the filtered array....elemnets with false boolean i.e they do not meet the set condition are filtered out or not included in the new array...
//REDUCE METHOD: we use this method to convert all the elements in the original array into one single value..no new array is returned rather we pass in a code which combines all the elements in the original array and returns a single value as the end product.

/*
/////////////////////////////////
//the map method....the new array the map method produces is the result of applying a cal back function on each looped elements of the original array.......the map method uses a call back function like the forEach method...the original arrray is not mutated by the map method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];......we want to covert each currency value inside the movement array from dollar euros, we create a variable than converts dollar to euro(the variable simply holds the convertion rate), then we need to loop over the movement array, apply the convertion function on the looped elements of the movement array then store the converted values into a new array..this is a perfect job for map method.

//step 1; create the converter variable
const eurToUsd = 1.1;

//step 2; write the map method and its callback function, then we saved the result of the map method(a new array) to a new variable.
//2a...we used  function expression to write the callback function
// const movementsUSD = movements.map(function (mov) {
//parameter = value of each looped element
// return mov * eurToUsd;
// return 23; //the new array elements will have each value set to 23.
// });

//2b...usimg arrow function to write the callback function...it is shorter and cleaner.
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements); //original array
console.log(movementsUSD); //new map array which contains the result of the map method..a new array with different elements.

//METHOD 2...
// uisng the for loop to solve the task above...here we first loop over the movements array manuallyn then run the conversion process, then we added the converted values to an empty array we manually created.
const movementsUSDfor = []; // step 1...define an empty array which we will save each result of the for loop process to..
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd); //we loop the the movements array, saved each looped element to the mov variable , we then multiplied each looped element saved to the mov variable by the eurToUSD variable which gives us the converted value, we then saved each converted in the empty array using the push method...this whole process occurs each time the movemnts array is looped.
console.log(movementsUSDfor);

//we want to work with the map method using 2 parameters, i.e the current loop value of the original array and its index/rank (i)...just like in the for each method...in the example below we want to loop over the movements array and get as the result of the loop process a string which uses both the index/rank and the elements values of the movements array........we want the string produced after each loop to be stored as an element inside the new array...we want to buil a brand new arrat which contains the result of the map method as elements...using the loop method only creates side effects, i.e after each iteration the result of the iteration process is soted into a variable, and each result is logged as a separate value in the BC...if we want all the result to be in an array we then create an empty array and push the results inside..we do not do this for maps.....

// arrow function syntax
// movements.map((parameters) =>
// );

/*
const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`; //we used return and not console.log bcos we want the string returned to be an element in the new array, not just to be logged in the BC...we need the result of the function to be stored in an araay...we also made the code lookbetter by using the ternary operator instead of the if else statement.
  }
});
*/
/*
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
*/

/*
/////////////////////////////////////////////
//the filter method..only the elements of an array that meet the pre defined condition is returned and saved into a new array..
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawal = movements.filter(mov => mov < 0);
console.log(movements);
console.log(withdrawal);

//using the for loop method to
const depositFor = []; //create an empty array...
for (const mov of movements) if (mov > 0) depositFor.push(mov); // manually loop through the movement array, if the looped element saved  meets the if condition the element is added to the empty array...if not nothing is done.
console.log(depositFor);

const withdrawalFor = []; //create an empty array...
for (const mov of movements) if (mov < 0) withdrawalFor.push(mov); // manually loop through the movement array, if the looped element saved  meets the if condition the element is added to the empty array...if not nothing is done.
console.log(withdrawalFor);
*/

//////////////////////////////////////////////////
//reduce method....the method has a call back function just like map and filter method, however, itscallback function workd differently,..the reduce callback function can work with 4 parameter input unlike the others which work with 3 parameter arguements. the parameter arguement for the reduce method are the accumulatr, current array element value looped, current index looped and the array...the accumulator stores the final value of the call back function afetr each loop process...it is the final value of the accumulator that will be returned as the value of the reduce method after the completion of the entire loop process..
// the reduce method is an array method and it loops over the array it is applied on...the reduce method itself receives 2 arguements, first the callback function and the initial value for the accumulator parameter.

////we want to add up all the elements/values in the movement array and return the accumulated sum as the final value of the reduce method..to do this we need to loop over the movements array, for each iteration, the value of the current index is added to an accumulator value which will be set to 0 initially...
//console.log(movements);

/*
//using function expression to write the callback function
const balance1 = movements.reduce(function (accum, cur, i, arr) {
  //reduce method loops the array, takes in the accumulator value set, the index and the current element value...it does this for each iteration..
  console.log(`iteration ${i}: ${accum}`);
  return accum + cur; //for each loop, add the value of the looped index to the updated accumulator value...
}, 0);
console.log(balance1);

//using arrow function to write the callback function....
const balance = movements.reduce(
  (accum, cur, i) => (console.log(`iteration ${i}: ${accum}`), accum + cur, 0)
);
console.log(balance);
*/

/*
//using function expression to write the callback function....without the cl
const balance1 = movements.reduce(function (accum, cur, i, arr) {
  //reduce method loops the array, takes in the accumulator value set, the index and the current element value...it does this for each iteration..
  return accum + cur; //for each loop, add the value of the looped index to the updated accumulator value...
}, 0);
console.log(balance1);

//using arrow function to write the callback function without the cl...
const balance = movements.reduce((accum, cur, i) => accum + cur, 0);
console.log(balance);
*/

/*
//uing the for loop....
let balance2 = 0; //initial accumulator value
for (const mov of movements) balance2 += mov; //we manually loop over the movements array, for each loop, updated balance2 = previous balance2 value + the current loop value ( mov holds the current index value for each loop)...
console.log(balance2);

//get maximum value of the movements array...i.e 3000....for each iteration either the previous accumulator or the current index value bcoms the updated accumalator value depending pn the met condition....
const max = movements.reduce((accum, mov) => {
  if (accum > mov) return accum;
  else return mov;
}, movements[0]);
console.log(max);
*/

//////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//////////////solution:

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  console.log(dogsJulia.slice(0));

  //task1,
  // method 1
  dogsJuliaCorrected.splice(0, 1); //delete[0]...
  dogsJuliaCorrected.splice(-2); //delete last 2
  //method 2
  // console.log(dogsJulia.slice(1, 3));
  // console.log(dogsJuliaCorrected); //return altered array with [0], and last 2 elements deleted...

  // task2
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  //task3
  dogs.forEach(function (dogAge, i) {
    if (dogAge > 3)
      console.log(
        `"Dog number ${i + 1} is an adult, and is ${dogAge} years old"`
      );
    else console.log(`"Dog number ${i + 1} is still a puppy 🐶`);
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]); //when we call the checkDog functioneverything in the function body must be executed accordingly to the codes inside tahek NOTE.
////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

////////////solution
//task ....create function
const calcAverageHumanAge = function (ages) {
  //task 1........cal human age...save results to a new array.....use map method
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  //task 2, eliminate elements with values less than 18 from the humanAge/map array...use filter here
  const adultDogs = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adultDogs);

  //task 3
  //2,3 (2+3)/2 = 2.5.............===(2/2)+(3/2)=2.5
  const average = adultDogs.reduce(
    (accum, age, i, array) => accum + age / array.length,
    0
  );

  //OR use
  // const average =
  //   adultDogs.reduce((accum, age) => accum + age, 0) / adultDogs.length;

  console.log(average);
  return average; //this is the final rsult of the whole function this will be saved in the calcaveragehumanage variable.
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

/////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//////////////////solution...
//using function expression...
const calcAverageHumanAge1 = function (ages) {
  const average = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((accum, age, i, array) => accum + age / array.length, 0);
  // console.log(average);
  return average;
};

//calling the function
const avg11 = calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);
const avg12 = calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]);
console.log(avg11);
console.log(avg12);

//using arrow function...
const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((accum, age, i, array) => accum + age / array.length, 0);
//adult.length does not exist here.

//calling the function
const avgr = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg2rr = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(avgr);
console.log(avg2rr);

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

/*
////////////////////////////////////
//the chaining method........we only chain methods if only the previous method returns an array, filter and map do but reduce does not,so we cant chain immediately we apply the reduce method.
const eurToUsd = 1.1;
console.log(movements);

const totaldepositsUSD = movements
  .filter(mov => mov > 0) //returns a new array from the movment array, this array only contain elemnents with positive values from the original/movement array
  .map(mov => mov * eurToUsd) //returns a new array by iterating the filter array, each element of the filter array is multiplied by 1.1, the results are saved as elemnts in the map array
  .reduce((accum, mov) => accum + mov, 0); //returns a single value, the value is obtained by adding all the elements in the ma array up...
console.log(totaldepositsUSD);

/*
//debugging the chain method...we made an error instead of filtering the positive elements of the movement array i.e filter deposits we fltered withdrawals i.e negative numbers...so the chain method produced a different result...we used the array parameter to do this...
const totaldepositsUSD = movements
  .filter(mov => mov < 0) //returns a new array from the movment array, this array only contain elemnents with positive values from the original/movement array
  //debugging a method inside the chain...we can check an array of a method inside the next method chained to it...we check the filter array inisde the map method
  .map((mov, i, arr) => {
    console.log(arr); //displays the array map is working/loopin on.....i.e the filter array
    return mov * eurToUsd;
  })

  .map(mov => mov * eurToUsd) //returns a new array by iterating the filter array, each element of the filter array is multiplied by 1.1, the results are saved as elemnts in the map array
  .reduce((accum, mov) => accum + mov, 0); //returns a single value, the value is obtained by adding all the elements in the ma array up...
console.log(totaldepositsUSD);
*/

/*
////////////////////////////////////////
//the find method.....we use this method to retrieve elements/items from an array based on a set condition...it does not return an array of elements that satisfy the set condition,it only returns the first element in the looped array that satisfy the conditon....the filter method accepts 2 paramters, the first one is the set condition, the second is the callback function...i.e the function/process the find method will implement while it loops an array....find method workslike filter method in that they both operate with a set condition but they have 2 fundamental differences, while the filter method returns multiple elements from an array it loops(i.e all the lements that meet the set condition are returned) the find method only returns the first element that meets the set condition in the array tha it loops, all other elements that meet the set condition are not returned by the find method...the second fundamental difference between the two is that while the filter method returns its elements in an array, the find method does not return its element in an array..it returns the first elemnent that meets a set condition in an array as a value...

const firstWithdrawal = movements.find(mov => mov < 0); //the find method returns the first element in the movements array which is a negative value.
console.log(movements, firstWithdrawal);

//working with an array of objects using the find method...the find method here will return the object that mets the condtion set.
console.log(accounts);

const account = accounts.find(account => account.owner === 'Jessica Davis'); //find method loops over an array of objects (i.e accounts array), with each iteration it loops over each account object, then retrieve the account object with owner property value of Jessica Davis
console.log(account); //
*/

/*
////////////////////////////////////
//some and every.......we use the dome method to know if an aray has met certain condition or not...we used the some method to implemnt our loan section functionality..

console.log(movements);
//includes method checks for equality, does the array have an element with the set value?

console.log(movements.includes(-130)); //we use include method to check if an array includes/contain a certain value...it is used to test for quality i.e it tests if an array contains a value exactly equal to or the same as the one we input as the include arguement.

//////SOME METHOD
//we want to check if the movement array has recieved any deposit i.e has array elements greater than zero
//some method checks for condition, does the array have element(s) that satisfy the set condition?
console.log(movements.some(mov => mov === -130)); //syntax 1

//syntax 2
const anyDeposits = movements.some(mov => mov > 0); //we stored the result of the some method to a variable..the some method returns true bcos the original array contains elements with values greater than 0....
console.log(anyDeposits);

////////EVERY METHOD.......this method check if all/every elements in an array satisfies a given condition. if all the lements in the array do,the method returns true otherwise it will return false...

//lets check if all the elements in the movemnt array are deposits i.e all the element values are > 0...
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0)); //we applied the every method on the movements array which is a property of account4...it will return true bcos all the elements of the movements array in the account4 object are positive values.

//we can save the arguement of our array method into a variable then use that variable as the arguement when we want to apply the array method...this approach is key,bcos if we intend to change the condition we just go to the variable that hold it and change it only there, once and for all instead of changing it at each array method where the condition was set.......i.e te DRY PRINCIPLE

const deposit = mov => mov > 0; //we saved the condition to a variable, i.e we said deposit should hold values > 0.
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/*
/////////////////////THE FLAT AND FLATMAP METHOD...the flat method works with nested arrays(arrays that have other arrays inside them)..we use it to return each element inside a nested array as individual elements of a new array..its callback arguement is the levelof depth we want it to flatten...it does not mutate the original array...the method remove the nested array in an array and falttens the entire array into a new array...note that flat method goes one level deep when falttening nested arrays as its default flatten/depth level.

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// const newarray = arr.flat();
// console.log(newarray);

console.log(arr.flat()); //the flat method will return all the values in the array above as elements of a new array.
// console.log(arr);

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8]; //array nested in an array that is nested in another bigger array, i.e 2 levels of nesting
console.log(arrDeep.flat()); //the flat method will only flatten the arrDeep at one level...flattens [0] and [1] only...
console.log(arrDeep.flat(2)); //the flat method will flatten the arrDeep at 2 levels of depth...flattens all the arrays i.e the 2 arrays exisitng withing the main array.

//we want to store all the movements arrays elements as individual elements into one single big array variable...then add up all the values into a single value

// //step 1: create a variable array(accountMovements) which holds all movements array
// const accountMovements = accounts.map(acc => acc.movements); //the map method loops the accounts array of object, for each object looped the element of the movement property which is an array  is returned and added as an element to a new array...so the accountMovement array is an array which contains other arrays
// console.log(accountMovements);

// //step 2: flatten the accountMovements variable...i.e store all the movements array as individual values of one single array variable.
// const allMovements = accountMovements.flat(); //we store the flattened array to a new variables which holds all movements value
// console.log(allMovements); //return the one big array which holds all movements values...

// //step 3: get the single value by summing up all values in the allMovement array using the reduce method
// const overBalance1 = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overBalance1);

//chaining the whole steps in one...
const overBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overBalance);

//FLAT MAP combines both the map and flat array method together....flatmap only goes one level deep we cannot change that.
const overBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overBalance2);
*/

/*
//////////////////////////////////
//SORTING ARRAYS...sorting mutates the original array

//sorting with strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//sorting with numebrs
console.log(movements);
// console.log(movements.sort());.......sorting only works well with string by default. it doesnt make sense on numbers but we can make it work by using a callback function of 2 arguements.....

//return < 0, a comes before b..descending order...    a=450, b=-400
//return >0,  b comes before a. ascending order
//ascending
// movements.sort((a, b) => {
//   if (a > b) return 1; //ascending order
//   if (a < b) return -1; //descending order
// });
//or
movements.sort((a, b) => a - b); //a-b = positive, return positive value means ascending order sorting..
console.log(movements);

//descending
// movements.sort((a, b) => {
//   if (a > b) return -1; //descending order
//   if (a < b) return 1; //ascending order
// });
movements.sort((a, b) => b - a);
console.log(movements); //b-a = negative, return negative value means ascending order sorting..

//note...if a=b, returns o, array will not be sorted, elementsremain unchanged...we used the sort method in the app functionality..
*/

/*
////////////////////////
//More Ways of Creating and Filling Arrays
//creating arrays manually i.e defining the elements of the array manually...
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//creating arrays programatically..fills method + empty arrays.
const x = new Array(7); //creates an empty array with 7 empty element...we can only use the fill method to assign elements to this empty array...fill mutates the underlying array i.e original empty array.
console.log(x);

//using the fill method on empty arrays....fill accepts 3 arguement, 1=the element value assigned, 2= start index, 3=end index..the last index is not included
x.fill(1);
x.fill(1, 3); //we start filling the empty array from position 3, till the end with the element value=1 ...
x.fill(1, 3, 5); //we start filling the empty array from position 3, till the 4th position with the element value=1 ...note the 5th position is not included.
console.log(x);
//using the fill method for existign arrays..it wil mutate the original array.
arr.fill(23, 4, 6); //we said fill the 4th and 5th position with 23...23 replaces the original element values...
console.log(arr);

//array.from...........we use this method to create arrays from other iterables...
const y = Array.from({ length: 7 }, () => 1); //the from method iterates the array 7 times for each iteration 1 is passed as the element value
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); //iterates an array, after each loop, the current looped index plus 1 is returned as the element vaue
console.log(z);

const diceRoll = Array.from({ length: 100 }, (_, i) => i + 1);
console.log(diceRoll);

/////////////////working with nodelist using array method...

labelBalance.addEventListener('click', function () {
  //we used the values of a document(nodelist) as elements of an array using the array from method, then we used a function to edit array elements.
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')) //we edited the created array..(mapping)
  );
  console.log(movementsUI);

  //another of creating an array from a nodelist...here we use spread to create a copy, then use map to edit the copy...
  // step 1:
  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; //we use spread to create an array copy of the nodelist..
  // step 2
  console.log(movementsUI2.map(el => el.textContent.replace('€', ''))); //we use map to edit the copied array elements.
});

//note:difference between both approach, using array from method allows solve the problem at one go.
*/

/*
////////////////////////////////////////////
//array methods practice

//exercise number 1...sum of total deposits in the bank
// const bankDepositSum = accounts.map(acc => acc.movements).flat(); or use flatmap
const bankDepositSum = accounts
  .flatMap(acc => acc.movements) //takes all the movements arrays elements out of their accounts accounts array into one big array
  .filter(mov => mov > 0) //returns an array with only the positive element values in the big array
  .reduce((sum, cur) => sum + cur, 0); //sums up all the positive values into a single sum value.
console.log(bankDepositSum);

//exercise 2: counting how many deposits worth at least a $1,000 put in the bank.
// method 1
const numDeposits1000s = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length; //returns the length of the array which has deposit worth at least $1k...we count hw many times at least $1k was deosited
console.log(numDeposits1000s);

//using reduce method as a counter to solve this problem...
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, mov) => (mov >= 1000 ? count + 1 : count), 0); //0 = accumlator, after each loop accumulator increases by 1 if the condition is met
// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((i, mov) => (mov >= 1000 ? i + 1 : i), 0); //0 = accumlator, after each loop accumulator increases by 1 only if the condition is met
  // .reduce((i, mov) => (mov >= 1000 ? i++ : i), 0); //wont work
  .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

//prefixed ++ operator
let a = 10;
console.log(a++);
console.log(a);

let b = 10;
console.log(++b);
console.log(b);

//exercise 3:using the reduce method to return an iterable(object/array/string)....create an object which contains the sum of deposita & the withdrawals..
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// exercise 4.....creating a simple function to convert any string to title case.
//this is a nice title--------------->This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    // .map(word => word[0].toUpperCase() + word.slice(1)); //map takes in each elements in the array as a string/word then capitalise the character [0] of the word, then we use + slice to add the remaining uncapitalised words to the capitalised character
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' '); //we set the condition that if the word that map takes in is included as an element in the exeptions array, then map should simply return the word as it is in the exeptions array (i.e not capitalize it)..when the word is not in the exeptions array then map should capitalise its first character...
  return titleCase;
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//to solve the problem of capitalizing and, and is added in the exemption array, it was not capitalise but we have to capitalize it separately because it starts the sentence...
const convertTitleCase1 = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1); //this function takes in the title as a string that it is and capitalises the first character of the string...then adds the remaining uncapitalised parts of the string to it to form back the title but with a capitalised character at its start.
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    // .map(word => word[0].toUpperCase() + word.slice(1)); //map takes in each elements in the array as a string/word then capitalise the character [0] of the word, then we use + slice to add the remaining uncapitalised words to the capitalised character
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' '); //we set the condition that if the word that map takes in is included as an element in the exeptions array, then map should simply return the word as it is in the exeptions array (i.e not capitalize it)..when the word is not in the exeptions array then map should capitalise its first character...
  return capitalize(titleCase); //any titleCase with a small letter as its starting word will be capitalised by the capitalize function.
};
console.log(convertTitleCase1('this is a nice title'));
console.log(convertTitleCase1('this is a LONG title but not too long'));
console.log(convertTitleCase1('and here is another title with an EXAMPLE'));
*/


///challenge 4 
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//task 1
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//task 2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah')); //we use include method to set the condition for the find method...
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

//task 3
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recFood) //gives us an array with objects which satisfy the condition as its element
//   .map(dog => dog.owners) //loops the filtered array, takes the owners property and add them as properties of the new array the map method returns [[0], [1, 2]]
//   .flat(); //we use flat to remove the nested array inside the array the map returned..[[0], [1], [2]]...
// console.log(ownersEatTooMuch);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood) //gives us an array with objects which satisfy the condition as its element
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood) //gives us an array with objects which satisfy the condition as its element
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// task 4
// "Matilda and Alice and Bob's dogs eat too much!"
// "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//task 5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//task 6
// current > recommended * 0.9 && current < recommended * 1.1;
// console.log(
//   dogs.some(
//     dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
//   )
// );

const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//task 7
console.log(dogs.filter(checkEatingOkay));

//task 8
//  shallow copy of the dogs array and sort it by recommended food portion in an ascending order
//use a-b for arrays with just numbers while sorting...use a.objectproperty - b.objectproperty where the values we want to sort are in array objects...we sorted using ascending order.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
