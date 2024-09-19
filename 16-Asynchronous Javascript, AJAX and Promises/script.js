'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
             <p class="country__row"><span>🗣️</span>${
               data.languages[0].name
             }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
          </article> `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON0 = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      // console.log(response);
      throw new Error(`${errorMsg} (${response.status})`); //default error message...err.message
    return response.json();
  });
};

///////////////////////////////////////
// performing ajax call...
// method 1: XML HTTP request function..old school
/*
const getCountryData0 = function (country) {
  //store ajax call to a variable..step 1
  const request = new XMLHttpRequest();

  //.step 2...pass in the http request to get data from the url api using the GET keyword, then specify the url/api to which we make the ajax call..note the api must have CORS set to yes or unknown....we open the request in step 2
  request.open(
    'GET',
    `https:countries-api-836d.onrender.com/countries/name/${country}`
  );

  //STEP 3:...send for the request
  request.send();
  // console.log(request.responseText); // the responsetext contains the feedback of the request we made to the api...until js finishes handling the request in the background and emits the load event the feedback will not be available.it will not work...hence an error will be displayed at this point. the loading process is not complete...

  //step 4: get the loaded request, convert to array/object using json.parse then destructure.
  //when our ajax request is loaded/delivered we log it to the console,note it comes in as a string or text..we have to convert it to an object.
  request.addEventListener('load', function () {
    //   console.log(request.responseText);//same as below
    console.log(this.responseText); //the this keyword points to the request

    //convert the json string to an array containing one object element which holds all the string text as properties and values..then we destructure the array,thus getting just the object..i.e const data beocmes just an array containing an object...we destructure the array, thus leaving it as an object
    // const data1 = JSON.parse(this.responseText)[0];
    // console.log(data1); //or
    const [data] = JSON.parse(this.responseText);
    console.log(data); //data is an object...we can acces its properties..

    const html = `  <article class="country">
    <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
            </article> `;
    //insert this customised html element in the html file...
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData0('portugal');
getCountryData0('usa');
getCountryData0('nigeria');
getCountryData0('kuwait');
*/
// ///////////////chaining ajax calls/request in sequence..we fire the second ajax call inside the function of the first ajax call, so the second ajax call can only execute when we implement the first ajax call.
/*
const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();

  //
  request.open(
    'GET',
    `https:countries-api-836d.onrender.com/countries/name/${country}`
  );
  //
  request.send();
  console.log(request.responseText); //pending request

  //
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText); //we save the string from the api as an object(data{}) then use this object to customise the html we created.
    console.log(data);

    //render country 1...create the countries element.
    renderCountry(data);

    //get neihbour country
    const [neighbour] = data.borders;

    if (!neighbour) return;

    //AJAX call neighbour country (2)
    const request2 = new XMLHttpRequest();

    //
    request2.open(
      'GET',
      `https:countries-api-836d.onrender.com/countries/alpha/${neighbour}` //note when we use code(alpha) to send for ajaz request the api does not return an objcet or array so we do not destructure the string.
    );
    //
    request2.send(); //asynchronous method
    console.log(request.responseText);

    request2.addEventListener('load', function () {
      console.log(this.responseText); //the api returns a json string, we need to convert it to an object
      const data2 = JSON.parse(this.responseText); //we save the string from the api as an object(data{}) then use this object to customise the html we created.
      console.log(data2);

      renderCountry(data2, 'neighbour'); //we created the html element by calling the functionality we refactored above...we used neighbour as a second arguement in order to style the neighbouring country different using customised css class...
    });
  });
};
// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('china'); //note we sue nested callback here, ajax call 2 is inside ajaxcall 1, when we execute ajax call 1, call 2 is fired also.

// callack hell...when we have to code too many nested callback functions/methods so that the asynchronous codes execution will be done in seuence..i.e simply chainign too many functions.....we solve callback hell usuing es6 promises.

// to enable asynchronous functions/methods execute in a sequential order we have to chain them or nest them within each other...see below....callback hell, triangular shape.

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/
///////////////////////promises
// modern way of making ajax calls//////
///the fetch api method

// old way of making ajax call.....ignore error if u open
// const request = new XMLHttpRequest();
// request.open(
//   'GET',
//   `https:countries-api-836d.onrender.com/countries/name/${country}`
// );
// request.send();

/*
// using fetch method to make ajax call
const request1 = fetch(
  'https:countries-api-836d.onrender.com/countries/name/portugal'
);
console.log(request1); //returns a promise immediately, which is the placeholder of the yet to be loaded ajax request we have made using fetch method...with promses we dont use nested callback functions to make our ajax calls or other asynchronous cde run in the nested order.ie we avoid call back hell..at the same time we avaoid using too many event listeners when working with promises, bcos promises immediately returns a response pending object which is a placeholder for the asynchronous code that takes time to be executed....promises can either be created automatically or manually..we it is created automatically, we simply consume it..

// life cycle of promises...1, pending(async task yet to be executed)..2, settled(async task comleted/loaded)....settled: (a) fulfiled....api returns a value/string/data we requested for(b) rejected....api returns error......note promises are only settled once..once settled the sate remains same/immutable for ever....the fetch method builds the promise as we do not have to code the request ourselves...we only consume the promise in that we write codes based on the settled promise/request returned by the api.

/////////////consuming promises..chaining promises...the fetch method returns a promise, either fulfilled or rejected we have to handle the promise, we handle the fulfilled promise using the then method.

const getCountryData1 = function (country) {
  //send request
  fetch(`https:countries-api-836d.onrender.com/countries/name/${country}`) //sets a promise to be settled
    //where request is successful i.e ajax call is settled, a Response s is returned by the url/api. we convert this Response object to a readable object by using the json method. the string we need is in the body property of the returned object with the value ReadableStream...
    //then we convert the returned response object to a readable object using

    //the fetch method returns a promise, where the promise is fulfilled we use the then method to handle the fulfilled promise. we take in the return value from the api into the then method as a response
    .then(function (response) {
      console.log(response); //displays the settled response..we need the body property value(readable stream)
      return response.json(); //converts the settled response object body property to a data/object we can read...the json method returns a resolved promise so we handle its value using another then method on it...its value goes into the then method as an arguement(data)
    })

    //we apply another then method here to display the converted object....data here is the object that was returned above or simply say it is the final value of the resonse function.
    .then(function (data) {
      console.log(data); //displays the converted response object...we can now access specific properties and manipulate them
      console.log(data[0]); //data[0] is the first element of the response object which we pass in as data in this function..
      renderCountry(data[0]); //we call the render country function....data[0] is also an object. we pass it as an arguement into the renderCountry function..inside that function its properties will be assessed.
    });
};
getCountryData1('italy');
*/

/*
// simplifying the above function using arrow function...
const getCountryData2 = function (country) {
  fetch(`https:countries-api-836d.onrender.com/countries/name/${country}`) //fetch/request data from url/api
    .then(response => response.json()) //when request is settled successfully, we convert it into a readable object
    .then(data => renderCountry(data[0])); //we pass in the readable object first property as arguement to
};
getCountryData2('nigeria');
*/

//////////////////////////////////////
//chaining promises...fetch call inside another fetch call...chaining 2 sequential ajax calls.
/*
const getCountryData9 = function (country) {
  fetch(`https:countries-api-836d.onrender.com/countries/name/${country}`) //fetch/request data from url/api
    .then(response => response.json()) //when request is settled successfully, we convert it into a readable object
    .then(data => {
      renderCountry(data[0]); //we pass in the readable object first property as arguement to

      //store the border property of the response object.the value of this property is the neighbour country
      const neighbour = data[0].borders[0];

      // we said the fulfillment value of the then method here should either be the api call or the neighbour variable.

      //guard clause, just incase no border property exists
      if (!neighbour) return;

      //scond ajax call..neighbour country..chaining ajax calls...the second ajax call occurs inside the first ajax call, this will make both calls to be always executed in d specific order...this avoids calback hell..returning the fetch method here makes the value of this fetch method the final value of the then method in which it exist, so we can use a new then method to handle this final value...simply say, the then method take in data arguement, executes/calls the rendercountry function with the data, creates a new variable using parameter from the data arguement, then makes a new ajax call using that neighbour variable that was just created...now we want to subsequently handle the response of the ajax call sowe need to make the ajax call the final output value of the then method here. remeber that a fetch method and a then method always return a promise so wecan now subsequently make use of a then method to handle the returne value here as seen below.
      return fetch(
        `https:countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
      // return 23;
    })

    //whatever value we use the return keyword on in the previous then method bcoms the input arguement for the next then method...this is how it operates in chaining of promises...the returned value in a then method becomes the fulfilled value of the then method in which the return value is set...we chain the next then method to handle the resolved promise of the previous then method.......in our normal working code we said that the fetch method should be returned, that is it should be the final value or fulfillment value of the promise of the then method in which it exist....
    // .then(data => alert(data));

    //we used another then method to handle the fulfilled promise of the previous then method. in the previous then method we said  that its fulfilled value should be the successful response of the api to our fetch request. the new then method takes in this fulfillment vaue as its input arguement.

    .then(response => response.json()) //we converted the unreadable object to a readable object using json
    .then(data => renderCountry(data, 'neighbour')); //we pass in the readable/converted object as the first arguement into the render country function, with the second arguement being the neighbour string...
};
btn.addEventListener('click', function () {
  getCountryData9('portugal');
});
*/

//////////////////handling rejected promises...a promise in wich an error occurs is a rejected promise..i.e we sent an ajax call or a request to an api/url and instead of gettin d reqiured data we get an error message..most times wen we send request/fetch data from an api we hget an error wen internet connection is lost...in this situation our request/fecth method fails..our ajax call was rejected...we have to handle the rejection......andlin error is also called catcin error.

// metod 1 of andlin rejection call...just ;like we set a ten metos for a successful callback we will set a ten metod for an unsuccessful callback or a rejected call back.....errors propaate down te cain, only wen tey are not caut after oin tout d entire cain den a rejected messae is displayed...so in iur chaining we can handle all rejection errors there...method 1 uses either the then or catch method to handle the rejection.

// method 2 uses the finally method to handle the rejection...while method one is only called when the ajax call is rejected the catch method is called in either instances when d call is susccessfulor rejected...so when we have a message that will be displayed irresective whether our ajax call was sucessful or not, we use the finally method to handle the rejction...to use the finally method, wemust first use catch method in the chain, the cathc method will emit a failed promise upon which finally method willact upon.

/*
const getCountryData3 = function (country) {
  fetch(`https:countries-api-836d.onrender.com/countries/name/${country}`) //fetch/request data from url/api
    .then(
      //we set 2 aruements in te ten metod wic andles resonse from te api..if d request was succesful and if d request was rejected.
      response => response.json() //we converted d object te api returns wen our call is successful.
      // err => alert(err) //we set an alert messae wen our request is rejected
    )
    .then(data => {
      renderCountry(data[0]); //we pass in the readable object first property as arguement to

      //store the border property of the response object.the value of this property is the neighbour country
      const neighbour = data[0].borders[0];

      //guard clause, just incase no border property exists
      if (!neighbour) return;

      //scond ajax call..neighbour country
      return fetch(
        `https:countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
      // return 23;
    })

    //whatever value we use the return keyword on in the previous then method bcoms the input arguement for the next then method...this is how it operates in chaining of promises...the returned value becomes the fulfilled value of the fetch method above...we chain the next then method on this fetch method above.......in our normal working code we returned the fulfilled fetch request...the fulfilled request is the response/ an unreadable object fromthe url/api....noteeach callback function/chaining occurs outside of the previous one
    // .then(data => alert(data));
    .then(
      response => response.json()
      // err => alert(err)
    ) //we converted the unreadable object to a readable object using json
    .then(data => renderCountry(data, 'neighbour')) //we pass in the readable/converted object as the first arguement into the render country    function, with the second arguement being the neighbour string...
    // .catch(err => alert(err)); //andlin all rejection erros at once in d lobal cain usin d catc metod
    .catch(err => {
      console.error(`${err} ⚠⚠⚠❌🔴`);
      renderError(`something went wrong  ⚠⚠⚠❌🔴 ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData3('portugal');
});
*/
///////////////////////////
//////////////////////////

// handling 404 error...i.e we send an ajax call/request and the api does not contain the data we are looking for..for example sending a request for data of a country that doesnt exist...note that even if there is an error, the fetch did not reject our request. the request was successful but the needed data was not retunrned rather a string which when converted to an object contains an object with properties we cannot work with. this will make the next then method that accesses the property of the converted object return an error.... we handle the !200 error message manually by using a guard clause in  the first then method. so we said if the request is successful but an error message is returned (ok:false), we use the throw new error method to create an actual error.. which immediately returns..the method accepts an arguement which should be the error message to the displayed in the app....i.e we created a rejected promise, then return this promise immediately in the handler then method, this will make the catch method take in the rejected promise as its input arguement, then our customise error message displayed inside the catch method.

// scenario 1:handling 404 error in the first ajax call..country

// when error 404 occurs the fetch promise returns a promise that is settled, but the returned object does not contain what we want...so we have to convert the promise received from the fetch method into the handler then method to a rejected promise ourself and display a customised error using the catch method...note that even if we do not create a manual error in the handler then method, the fact that response the handler then method takes in is not the required data at such it cannot covert d data to an object using json..the uncoverted string will the passe to the next then method which handles the promise of the handler then function...inside this then function an error will be registered as the string cannot be accessed just like an object which we intended to access..this will be the proces if a catch method is not in the chain...if a catch method is in the chain, the rejected promise in the handler then method will be caught by the  catch method and the catch method code will be executed taking in the rejected promise as its input arguement.
/*
const getCountryData4 = function (country) {
  //get data from api..returns a promise..fulfilled or rejected..fulfilled promise is a string we will convert to object. rejected promise is an error that will trickle downthe chain and be handled by catch method. always add the catch method to the promise chain....
  fetch(`https:countries-api-836d.onrender.com/countries/name/${country}`)
    //handles the rejected or fulfilled promise returned by fetch method...also returns its own promise which is the value we set the return keyword inside the method...also note that the throw keyword also returns its arguement immediately if the condition to which it is attached is true...i.e the guard clause holds true
    .then(response => {
      console.log(response);

      if (!response.ok)
        // console.log(response);
        throw new Error(`Country not found (${response.status})`); //default error message...if the promise is fulfilled but an error occurs..404
      return response.json(); //if the promise is fulfilled and no error occurs in the fetch method..convert the api string to a readable object
    })

    //handles the fulfilled promise(converted string to object) returned by the previous then method as its input arguement...object=data
    .then(data => {
      console.log(data[0].borders[0]); //returns the border country after accessing the object
      renderCountry(data[0]);
      const neighbour = data[0].borders[0]; //stores the border country to a variable

      //scenario 3...no neighbour.
      if (!neighbour) throw new Error('No neighbour found!'); //if no neighbour exists in the object or no neighbour variable is created, we  create an error message that ill be handled by the catch method.

      //we make a second ajax call using the neighbour that was created in the request
      return fetch(
        `https:countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })

    //handles the fulfilled promise of the previous then method...i.e the string from the api.
    .then(response => {
      //if the api returns a fulfilled promise but an error occurs, we handle the error by manually creating an error and handling it with the catch method..we always use catch method to handle the error so we can have a nice customised error message, not the crude one of js.
      if (!response.ok)
        // console.log(response);
        throw new Error(`Country not found (${response.status})`); //default error message...err.message..this bcoms the promise of the then method here, it will be returned immediately and handled by catch method.
      return response.json();
    })

    //handles the fulfilled response with no error attached of the previous then method...i.e takes in data object then calls the rendercountry function with it and a css classasasecond arguement.
    .then(data => {
      console.log(data), renderCountry(data, 'neighbour');
    })

    // the catch method takes in as its arguement the error message we create in the gaurd clause.
    .catch(err => {
      console.error(`${err} ⚠⚠⚠❌🔴`);
      renderError(`something went wrong  ⚠⚠⚠❌🔴 ${err.message}. Try again`);
    })

    //implements a code irrespective of the promise the fetch method returns.
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
//calling the get country data function which creates the html countries but when we clcikc the button...
btn.addEventListener('click', function () {
  getCountryData4('france');
});

//calling the get country data function by default...
getCountryData4('egypt');
*/
// refactored the fetch method and the then method that creates our manual error...
/*
const getJSON0 = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      // console.log(response);
      throw new Error(`${errorMsg} (${response.status})`); //default error message...err.message
    return response.json();
  });
};

const getCountryData5 = function (country) {
  getJSON0(
    `https:countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(neighbour);
      console.log(data);

      if (!neighbour) return;

      return getJSON0(
        `https:countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    // the catch method takes in as its arguement the error message we create in the gaurd clause.
    .catch(err => {
      console.error(`${err} ⚠⚠⚠❌🔴`);
      renderError(`something went wrong  ⚠⚠⚠❌🔴 ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData5('usa');
});
getCountryData5('russia');
*/

// // scenario 3....a country with no neighbour(s)......the const neighbour bcoms undefined..our fetch wassuccessfulbut the data we got is not the dsired data, we got an undefinedproperty error mesage...we have tomanually reject the ajax call and custoised our error message...the error message will be thrown by the throw new error method and the error message will be caught by the catch method which will then effect it.

/*
//url at the top of the script
const getJSON = function (url) {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`Country not found! (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https:countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found!'
  )
    //fetch/request was successful but not desired response, we create an error, we manually reject the fetch ajax call here, set the error message
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // console.log(neighbour);
      if (!neighbour) throw new Error('No neighbour found!'); //this error message will serve as the input arguement for the catch method

      //u may comment this out but it is not neccessary...the code here returns if there is a neighbour, in this scenario no neighbours exist so it will not return.
      return getJSON(
        `https:countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    //the catch method takes in as its arguement the error message we create in the gaurd clause.
    .catch(err => {
      console.error(`${err} ⚠⚠⚠❌🔴`);
      renderError(`something went wrong  ⚠⚠⚠❌🔴 ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('sweden');
});

getCountryData('china');
*/
///////////// challenge 1
/*
const whereAmI = function (lat, lng) {
  fetch(
    `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
  )
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json(); //convert
    })

    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      //second ajax call using country
      return fetch(
        `https:countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found! (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message} ❌`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

////////////////////////////////////
//
//////////////////////////////////
// the event loop in practice
console.log('test start');
setTimeout(() => console.log('0 sec timer'), 0); //finsih execution at 0 sec...immediately
Promise.resolve('Resolved promise 1').then(res => console.log(res)); //promise.resolve resolves immediately n returns a success or fulfilled promise which we set as its arguement...
console.log('test end');
//the above code will first execute the 2 console.log bcos they are global variables/to level code...not embedded in a callback function, then js will priotise microtask queue over regular callback queue....so promise.resolve will execute bfor setimeout...order of execution...line 485, 488, 487, 486

//microtask/promises that take huge amount of time will make the regular function callback queue delay in implementation...bcos all microtask queued callbacks must first be attended to irrespective if they come after the regular callback...note that the promise is resolved immediately but it has a task that consumes a lot of time, all task associated to the promise will fisrt be executed bfor regular calls are addressed.

//Promise. resolve will always return a promise that is resolved, even if the value passed in is a promise that is rejected. The new Promise constructor will only return a promise that is rejected if the reject function is called.

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/

///////////////////////////////////////////
// building a simple promise...we makes promises behave asynchronously by imbidding a set timer in this example..the timer implements at a later time...

/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN✅');
    } else {
      reject(new Error('You LOST your Money❌')); //we created an error for the rejected promise
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

console.log('Lottery draaw is happening');
*/

//promisyfying...converting old callback based  ansychronous code behaviours to promise based coded behaviours...promisfying a set timeout function in the below example..
//we first call the wait method with 2 seconds this returns the first resolve promise...we then call the wait method with 1 second, this returns the second resolve promise...i.e we practically did multiple promise call....we chain the promise callback. we did this to avoid trhe callback hell associated with regular functions....we promisify the regualr function by making the promise we return behanve like asynchronous regular callbacks function(settimeout in this example).we created a nice chain of asynchronous behaviour that happens in a sequence all without the callback hell

//callack hell...when we have to code too many nested callback functions/methods so that the asynchronous codes execution will be done in seuence..i.e simply chainign too many functions.....we solve callback hell usuing es6 promises.
/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// still a regular callback function........wait=wait
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); //we did not set any value for the resolve..we only said the set timeout should be implemented when the promise is resolved each time.
  });
};

wait(2)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
  });
*/

// we simply created a function that executes a timeout function, to implement the timeout function without callback hell, we promisify the set timeout function by using a new promise function on it...the promise construcotr will return a resolve/successful callback or reject callback, in this case we need to create the error message manually. but in settimeout it will also be resolved/success bcos the timer will always never fail...

/*
Promise.resolve('abc').then(res => console.log(res));
Promise.reject(new Error('Problem!')).catch(x => console.log(x));
*/

///////////////////////////////
// promisifying the geolocator

// asynchronous method...takes time, the location is obtained then the position or err is logged...the broswer api handles the getcurrent position method...we can promisify the regular call back function here....i.e convert the callback based api(regular method) to a promise based api(microtask)...

////////////////////////
//similar previous example...promisify settimeout...
/*
const lotteryPromise1 = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN✅');
    } else {
      reject(new Error('You LOST your Money❌')); //we created an error for the rejected promise
    }
  }, 2000);
});

lotteryPromise1.then(res => console.log(res)).catch(err => console.error(err));

console.log('Lottery draw is happening');
////////////////////////

//promisifying the navigator callback function.......the navigator/getcurrentposition is an asychronous function..
////////////////////////////////

//u can implement the navigator using only the succesful callback arguement..normally we use 2 arguements, one function for success one for error

navigator.geolocation.getCurrentPosition(function (positionobject) {
  console.log(positionobject);
});

console.log('Getting position'); //top level code

//implementing the navigator using the 2 arguements which are callback functions...we said if the navigator works well, the successful callback should log the object the navigator returns...this works like our fetch method too...we said if the navigator fails to get our location, the 2nd arguement/error callback should imlement.we use function expression here

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
  },
  function (err) {
    console.error(err);
  }
);

console.log('Getting position'); //top level code

//using arrow function to code the navigator...

navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);

console.log('Getting position'); //top level code
*/

//promisifying the getcurrentlocation asynchronous function...since the asynchronous functon has a succesful and error vallback/values we can convert them to resolve and rejected functions by using the new promise constructor...the successful callback function is changed to a resolve value and the error callback function is changed to the reject function...note that the navigator getcurrentposition function automatically calls the callback functions inside it with its value, i mean when the position is obtained or fails to obtain i.e an error in this case, the object or the error calls on the relevant callback function and execute it..by this we may not hard code the resoove and reject function rather we just pass in the resolve and reject functions as the arguements of the getcurrentpositionfunction directly, if the getcurrentposition is successful its value bcom the fulfilled promise and that value will be returned and handled by the then method otherwise handled by the catch method.....we can now use the then method and catch method to handle the newly constructed function...we want to promisify a ballbackbased api to a promise based api.

/*
const getPosition = function () {
  // we did not pass in any input arguements into the gtposition function bcos the resolve and reject method will depend on the getcurrentposition function which is inside it...i.e we are not going to call it with any values so its arguements are empty.
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

getPosition().then(fulfilledpromise => console.log(fulfilledpromise));

// or
// we set the resolve and reject functions directly on the getcurrentposition function...we promisify it automatically, no need to hard code

//returns a position object from which we can acces the lat and lng properties..

const getPosition1 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition1().then(pos => console.log(pos));

//we want to automatically get current location then render it using the whereami function......check challenge 1
const whereAmI1 = function () {
  getPosition1() //this is a constructor function which returns either a fulfilled or rejected promise..check lines above.
    .then(res => {
      const { latitude: lat, longitude: lng } = res.coords; //go into the fulfilled promise(res=object), acces its coords object property and take out latitutde and longitude properties values, save them to the lat and lng variables.

      return fetch(
        `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json(); //convert
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      //second ajax call using country
      return fetch(
        `https:countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => console.log(`${err.message} ❌`));
};

btn.addEventListener('click', whereAmI1);

*/
////////////////////////////////
///challenge 2
//promisifying images
/*
//settimer function promisified
const wait1 = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); //we did not set any value for the resolve..we only said the set timeout should be implemented when the promise is resolved each time.
  });
};

const imgContainer = document.querySelector('.images'); //selects the image element

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img'); //we create an image
    img.src = imgPath; //the src of the empty image created is the input arguement of the create function..we called the function with an image.

    //when the created image finishes loading, we want to display it on the html file as an element,so we appended/attached the created image to the selected image element
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img); //we set the image as the fulfilled promise...the image bcoms the input arguement of the handler then method if successful
    });

    //if the image is not successfully loaded we created the usual reject function and its error message to be handled b the catch method
    img.addEventListener('error', function () {
      reject(new Error(`Error!, Image not found. Reload image`));
    });
  });
};

let currentImg;

//we handled the function using the src of the image.
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('image 1 loaded');
    return wait1(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('image 2 loaded');
    return wait1(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/
// /////////////////////////////////
///////////////////////////////////
// consuming promises with asyn await...asyn makes the function run in the background as a microtask(priority over regular callback)...await makes the callback function return a promise(fulfilled or error) without us hard coding the resolve and reject functions..we no longer need to use the then methodtohandle the asynchronous code unlike bfor.....

// const whereAm2 = async function (country) {
//   // //old way
//   // fetch(`https:countries-api-836d.onrender.com/countries/name/${country}`).then(
//   //   res => console.log(res)
//   // );

//   const res = await fetch(
//     `https:countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   console.log(res);
// };
// whereAm2('nigeria');
// console.log('first'); //top level code, prints first

// recreating the navigator function using async await
/*
const getPosition2 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};
*/
//recreating the whereAmI function using async await.
// const whereAmI3 = async function () {
//   //geolocation
//   await getPosition2();
//   const pos = await getPosition2(); //object from the get position function above
//   const { latitude: lat, longitude: lng } = pos.coords; //we destructure the object

//   //reverse geocoding
//   const resGeo = await fetch(
//     `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
//   );
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   //country data
//   const res = await fetch(
//     `https:countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
//   );
//   console.log(res);
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };
// whereAmI3();
// console.log('first'); //top level code, prints first

/////////////////////
//error handling with try catch
// using try catch to handle errors in async await

//simple example
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

//capturing errors in async await isdone using the try catch code block
/*
const whereAmI4 = async function () {
  try {
    //geolocation
    await getPosition2();
    const pos = await getPosition2(); //object from the get position function above
    const { latitude: lat, longitude: lng } = pos.coords; //we destructure the object

    //reverse geocoding
    const resGeo = await fetch(
      `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
    );
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //country data
    const res = await fetch(
      `https:countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Error! Country not found');

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err}🔴`);
    renderError(`❌ ${err.message}`);
  }
};
whereAmI4();
// console.log('first'); //top level code, prints first
*/

////////////////////////////////////////
//returning values from async functions in the browser console....
//when we want to get a value from the async function we set a return value inside the function. if no error occurs inside the async function, thisset return value will be the fulfilled promiseof the function. the async functionwill return this fulfilled promise. if and onyif no error occurs inside the async function.  to succesfully log this fulfilled promise we must use the handler then function on the asyc function...if an error occurs inside the async function, the fulfilled promise/set return value cannot be returned...infact js willnot prcess the code up till the set return value as the error will make the code stop and the error will be immediately returned.int his case we will have to first capture the error then we handle it. to catch the error we will use the throw keyword..u have to set the throw keyword after the set return keyword...then to finally handle the thrown error we use the catch function..so basically we chain the thenand catch functions to the variable which holds the async function...where we do not chain / handle the async function and we log the async function we will have its value(return value/fulfilled ) set to undefined...this appliesto the then function and catch function.

//part 1...
//order of execution for the code....as logged in d BC......async code are relegated to d background(web api), synch codes are first executed then asyn codes are runned.
/*
const whereAmI5 = async function () {
  try {
    //geolocation
    await getPosition2();
    const pos = await getPosition2(); //object from the get position function above
    const { latitude: lat, longitude: lng } = pos.coords; //we destructure the object

    //reverse geocoding
    const resGeo = await fetch(
      `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
    );
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //country data
    const res = await fetch(
      `https:countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Error! Country not found');

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err}🔴`);
    renderError(`❌ ${err.message}`);
  }
};
console.log('1: Will get location'); //first
whereAmI5(); //last..even if it appears console.log(dataGeo) in the function bfor the other 2 top level codes here..async code
console.log('3: finished getting location'); //second

//part 2
//returning a value from an asynch function....an async function will return a promise...if no error occurs inside the async function the promise returned will be a fulfilled promise...in this case, the value of the fulfilled promise will be the set return value inside the async function...remember example off return 23 way back....we can then store this fulfilled promise/async function return value into a variable then console log the variable. note that since this variable holds the an async value as its value, javascript will treat it asynchronously...i.e the value will be a pending promise(unresolved asynchronous code at this point), run all synchronous codes then return to the variable and execute it as either a fulfilled promise or a rejected promise using the then function or catch method.....if we do not set a the then or catch handler function and chain it to the async function, the promise will be a pending/unresolved object, that is not undefined..
// /*
const whereAmI6 = async function () {
  try {
    //geolocation
    await getPosition2();
    const pos = await getPosition2(); //object from the get position function above
    const { latitude: lat, longitude: lng } = pos.coords; //we destructure the object

    //reverse geocoding
    const resGeo = await fetch(
      `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
    );
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    //country data
    const res = await fetch(
      `https:countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Error! Country not found');

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}🔴`);
    renderError(`❌ ${err.message}`);
  }
};
console.log('1: Will get location'); //first
const city = whereAmI6(); //returns a pending promise in the browser console,
console.log('2:', city); //last
console.log('3: finished getting location'); //second

//part 3
// to make js resolve the pending promise/return value of the async function we have to handle the promise...in this case we do not have to store the returned value in any variable first, the handlerssimply take in the return valuewhich will either be a fulfilled or rejcted promise from the async function..
// /*
const whereAmI7 = async function () {
  try {
    //geolocation
    await getPosition2();
    const pos = await getPosition2(); //object from the get position function above
    const { latitude: lat, longitude: lng } = pos.coords; //we destructure the object

    //reverse geocoding
    const resGeo = await fetch(
      `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
    );
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    //country data
    const res = await fetch(
      `https:countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Error! Country not found');

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}🔴`);
    renderError(`❌ ${err.message}`);
  }
};
console.log('1: Will get location'); //first
// const city1 = whereAmI7(); //returns a pending promise in the browser console,
// console.log('2:', city1); //last
whereAmI7().then(city => console.log(city)); //last async code
console.log('3: finished getting location'); //second

//part 4
//catchng fulfilled promise but errors in async functions...403, 404...where error occur inside the async function and the promise/return value  is fulfilled, the set return value will not be reached as the code will stop running immediately and strikle down the error...to handle the error we have to rethrew the throw method bcos this will now address the error from the asynch return value  ...without rethrowing the throw method, the error will not be captured and the promise/return value will be undefined . when we use the throw method again or rethrow the error the return value is fulfilled but no longer undefined.

const whereAmI8 = async function () {
  try {
    //geolocation
    await getPosition2();
    const pos = await getPosition2(); //object from the get position function above
    const { latitude: lat, longitude: lng } = pos.coords; //we destructure the object

    //reverse geocoding
    const resGeo = await fetch(
      `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
    );
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    //country data
    const res = await fetch(
      `https:countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Error! Country not found');

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    // console.error(`${err}🔴`);
    renderError(`❌ ${err.message}`);

    //reject promise returned from asynch function handled
    throw err;
  }
};
console.log('1: Will get location'); //first
whereAmI8()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}❌🔴⚠}`)); //last, async code

console.log('3: finished getting location'); //second

//part 5
// to make js treat the all code asynchronously or in order of ccode..we use the finally method
// /*
const whereAmI9 = async function () {
  try {
    //geolocation
    await getPosition2();
    const pos = await getPosition2(); //object from the get position function above
    const { latitude: lat, longitude: lng } = pos.coords; //we destructure the object

    //reverse geocoding
    const resGeo = await fetch(
      `https:geocode.xyz/${lat},${lng}?geoit=json&auth=182834863841573497513x91000`
    );
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    //country data
    const res = await fetch(
      `https:countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Error! Country not found');

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    // console.error(`${err}🔴`);
    renderError(`❌ ${err.message}`);

    //reject promise returned from asynch function handled
    throw err;
  }
};

// console.log('1: Will get location'); //first
// whereAmI8()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}❌🔴⚠}`)) //second
//   .finally(() => console.log('3: finished getting location')); //third..rejected or fulfilled it will run last.

//using asynch cod to render the codes in order....we asynch the asynch function...thus all the codes are treated in an orderly manner...the try and catch functions are there to capture  any error that happens in the city async function that is wrapped in a second async function.

console.log('1: Will get location'); //first
(async function () {
  try {
    const city = await whereAmI9();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}❌🔴⚠}`); //second
  }
  console.log('3: finished getting location');
})();
*/

///////////////////////////////////////
//running promises in parralel.

//format for writing async function.
// const get3Countries = async function (c1, c2, c3) {
//   try {} catch (err) {
//     console.error(er);
//   }
// };

//running tthe promises turn by turn
// const get3Countries1 = async function (c1, c2, c3) {
//   try {
//     const [dataA] = await getJSON0(
//       `https:countries-api-836d.onrender.com/countries/name/${c1}`
//     );
//     const [dataB] = await getJSON0(
//       `https:countries-api-836d.onrender.com/countries/name/${c2}`
//     );
//     const [dataC] = await getJSON0(
//       `https:countries-api-836d.onrender.com/countries/name/${c3}`
//     );

//     console.log([dataA.capital, dataB.capital, dataC.capital]);
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('holland', 'greenland', 'poland');

//part 2...runnng promises on a parralel basis,all at once using the promise.all function...it takes in an array of asynchronous code there it returns an array of promise...note if one of the proise rejcet the whole array of promises rejcets as well...promise.all short circuits when one promise rejects...use promise.all when u want to run multiple asynchronous code where each code does not depend on the next code...run everything once to save the call time and enhace calling speed.
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON0(`https:countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON0(`https:countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON0(`https:countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);

    console.log(data); //returns an array which contains the fulfilled promise of our fetch(getjson0 call)..we need to correc  t this object
    console.log(data.map(d => d[0].capital)); //we want to return an array of the capital of the three countries,since the 3 countries exists as individual objects inside the data array, we will loop over the objetcs in the array then return the capital property(first property in each country object) of each looped object.
  } catch (err) {
    console.error(err);
  }
};

get3Countries('holland', 'greenland', 'poland');
*/
/////////////////////////////////////////
//otherpromise combinators: race, allsettled and any ....

//promise.race...takes in an array of promise, returs an array of settled promise...the first settled promise wins the race...i.e the asyn code is runned randomly each time, for each run time the aync function promise will be the promise of the first code that was settled...the async function will therefore be an array with just the object of the winning call...the promise that wins the race can either be a fulfilled  or rejected promise...promise.race short circuits whenever one of the promises gets settled.
/*
(async function () {
  const data1 = await Promise.race([
    getJSON0(`https:countries-api-836d.onrender.com/countries/name/italy`),
    getJSON0(`https:countries-api-836d.onrender.com/countries/name/egypt`),
    getJSON0(`https:countries-api-836d.onrender.com/countries/name/mexico`),
  ]);
  console.log(data1); //returns the promise of the first settled code as the promise/value of the async function
  console.log(data1[0]);
})();
*/

//real world aplication of promise.race....we want the promise to reject if it call is not successful within a set given time.
//we first create a timeout function whose settled promise will always be a rejected promise(error message value)

/*
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long'));
    }, sec * 1000);
  });
};

//we do not want to waste much time waiting for thr ajax call to be setled, so we set it against the setimeout function. we said if the  ajax call/fetch takes more than a second to be settled, timeout should win the race so we set the timeout function by calling it with 1 seconds...note that whenever the timeout function wins its own promise bcoms the settled promise of promise.race in this specific example it will be a rejceted promise, so the error message we coded will be displayed....if the ajax call is settled bfor a second its settled promise(fulfilled or rejeted bcomsthe promise of the promise.race function.

Promise.race([
  getJSON0(`https:countries-api-836d.onrender.com/countries/name/tanzania`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

*/

//promise.allsettled....takes in an array of promises and returns an array of all the settled promises irrespective of it any was rejected.itdoesnt short circuit....es202020
/*
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
]).then(res => console.log(res)); //returns an array with both fulfilled and rejected promises as its value.

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err)); //short circuits, will not return an array as not all the promises were fulfilled. it returns the rejected promise as its value.
*/

//promise.any.es2021...........takes in an array of promises and returns the first fulfilled promise ignoring all rejected promises...it returns just only the first fulfilled promise...it is similar to promise.race just that it ignores rejected promises. while promise.race shortcircuits, promise.any does not short circuit...the array the promise.any returns will always be a fulfilled promise unless all the promisesit took in rejects.
/*
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

//////////////////////////////
//challenge 3:

//previous challange no 2...
//settimer function promisified
const wait1 = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); //imlement after 1secong.
  });
};

const imgContainer = document.querySelector('.images'); //selects the image element

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    //we use the return here, either the fulfilled or rejected promise inside the  promise function will be the final value of the create image function
    const img = document.createElement('img'); //we create an image..if the pr
    img.src = imgPath; //the src of the empty image created is the input arguement of the create function..we called the function with an image.

    //when the created image finishes loading, we want to display it on the html file as an element,so we appended/attached the created image to the selected image element
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img); //we set the img variable as the fulfilled promise...this will hold the value that will be the value of the create image function if the image is successfully created.
    });

    //if the image is not successfully loaded we created the usual reject function and its error message to be handled b the catch method
    img.addEventListener('error', function () {
      reject(new Error(`Error!, Image not found. Reload image`));
    });
  });
};

let currentImg; //global variable....epmty

// we handled the function using the src of the image.
createImage('img/img-1.jpg') //call the image function using an image path....as input arguement
  .then(img => {
    currentImg = img;
    console.log('image 1 loaded');
    return wait1(2); //the handler then function here returns a promise. the promise here is the timeout/wait function. we called it with 2 seconds....this wait function will serve as the inout to the next then function
  })
  .then(() => {
    console.log(wait1);
    //the then method here handles the previous then function taking in the set return value there as its input arguement.
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('image 2 loaded');
    return wait1(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

//challenge 3 part 1
const loadNPause = async function () {
  try {
    //load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('image 1 loaded');
    await wait1(2);
    img.style.display = 'none';

    //load image 2
    img = await createImage('img/img-2.jpg');
    console.log('image 2 loaded');
    await wait1(2);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};
// loadNPause();

//challenge 3 part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    err => console.log(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
///////////////////////////////////////////////////////
/////////////////js promises in 10 minutes....youtube
// let p = new Promise((resolve, reject) => {
//   let a = 1 + 2;
//   // a = 5;
//   if (a == 3) {
//     resolve('success');
//   } else {
//     // reject( throw new Error('Problem!'));
//     reject(new Error('manually created error message')); //goesinto the catch method as err
//   }
// });

// p.then(resolvedpromise => {
//   console.log(resolvedpromise);
//   console.log('this is a resolved promise handled by the then handler');
// }).catch(rejectedpromise => {
//   console.error(
//     rejectedpromise,
//     `${rejectedpromise} + this is the rejected promise handled by the catch method` //to combine the set default error message in the reject method with the error mesage in the catch method we use a temperate literal.
//   );
// });

// //handling callback hell...
// const userLeft = false;
// const userWatchingCatMeme = true;

// function watchTutorialCallback(callback, errorCallback) {
//   if (userLeft) {
//     errorCallback({
//       name: 'user left',
//       message: ':(',
//     });
//   } else if (userWatchingCatMeme) {
//     errorCallback({
//       name: 'user watching cat meme',
//       message: 'webdevsimplified < cat',
//     });
//   } else {
//     callback('thumbs up and subscribe');
//   }
// }

// watchTutorialCallback(
//   message => {
//     console.log('success: ' + message);
//   },
//   error => {
//     console.log(error.name + ' ' + error.message);
//   }
// );

// //promisifying above callback
// function watchTutorialPromise() {
//   return new Promise((resolve, reject) => {
//     if (userLeft) {
//       reject({
//         name: 'user left',
//         message: ':(',
//       });
//     } else if (userWatchingCatMeme) {
//       reject({
//         name: 'user watching cat meme',
//         message: 'webdevsimplified < cat',
//       });
//     } else {
//       resolve('thumbs up and subscribe');
//     }
//   });
// }

// watchTutorialPromise()
//   .then(message => {
//     console.log('success: ' + message);
//   })
//   .catch(error => {
//     console.log(error.name + ' ' + error.message);
//   });

// ///////////handling multiple proses at once

// const recordVideoOne = new Promise((resolve, reject) => {
//   resolve('Video 1 recorded');
// });

// const recordVideoTwo = new Promise((resolve, reject) => {
//   resolve('Video 2 recorded');
// });

// const recordVideoThree = new Promise((resolve, reject) => {
//   resolve('Video 3 recorded');
// });

// Promise.all([recordVideoOne, recordVideoTwo, recordVideoThree]).then(
//   fulfilledpromisereturned => {
//     console.log(fulfilledpromisereturned);
//   }
// );

// //returns the quickest executed promise ...
// Promise.race([recordVideoOne, recordVideoTwo, recordVideoThree]).then(
//   fulfilledpromisereturned => {
//     console.log(fulfilledpromisereturned);
//   }
// );
