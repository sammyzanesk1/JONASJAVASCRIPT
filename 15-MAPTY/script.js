'use strict';

// let map, mapEvent; //just like we moved the getposition method that was in the global scope to the constructor, we needed to move the map and mapevent variables into the constructor too.

/////to render the workout...
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.date=...
    // this.id=...
    this.coords = coords; //[lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  _setDescription() {
    // prettier - ignore;-
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    // this.clicks = clicks + 1;
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
console.log(run1);
const cycling1 = new Cycling([39, -12], 27, 95, 523);

console.log(cycling1);

//architecture...to make our app work, we must create an object out of the class constructor

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  //private instance property...they will be properties for all objects created using the App class...
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  //methods placed inside the constructor will be executed or called immediately the objcet app is created or immediately the js is loaded.
  constructor() {
    //get user position
    this._getPosition(); //this points to the object that will be created from the app constructor

    //get data fromlocale storage on page reload..
    this._getLocalstorage();

    /////////attach event handlers
    //submitting the form by clicking enterkey
    form.addEventListener('submit', this._newWorkout.bind(this)); //the this keyword here will point to the dom element upon which the addevent listener is attached...since we refactor the newworkout function we want the this keyword to point to class app object itself. so we binded the this keyword

    //toggling between elevationgain and cadence input fields when the type field is changed
    inputType.addEventListener('change', this._toggleElevationField); //no need for the this keybord binding here

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    ///////////////////////////////////
    //we use the getCurrentPosition() method to get the loaded position by passing the loadmap method as the successful callback arguement for it, then we set the alert message as the error callback function/arguement..the getcurrentposition method calls the loadmap method. i.e the loadmap method is the successful callback functon of the getposition method.
    if (navigator.geolocation) console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(
      //store the function into
      this._loadMap.bind(this), //we use the bind method when we call a method with another method. when a method calls another method js treats the call as a regular function call, thus the this keyword is set to undefined, we get an error. to fix this error we bind the this keyword of the called method to the method calling it using bind(this) at the point of writing the method call
      function () {
        alert('Could not get your position');
      }
    );
  }

  _loadMap(position) {
    //loadmap means when we open the app, our current location is obtained and loaded in the app, asap...we implement this by calling the loadmap method using the get position method, i.e the getposition method is runned, its final value will be used as the arguement to call the loadmap method...
    console.log(position);
    const { latitude } = position.coords; //we destructure the latitude property.
    //   const latitude = position.coords.latitude;
    const { longitude } = position.coords; //we destructure the longitude property.
    //   const longitude = position.coords.longitude;
    console.log(latitude, longitude);

    //creating a google map link using our browser location
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    /////////////////////////
    //displaying our location using a 3rd party API...making d map dislay on our doc
    const coords = [latitude, longitude]; //our location coordinates stored in a variable
    //   const map = L.map('map').setView([51.505, -0.09], 13);...default location in the 3rd party app..
    //in a regular function call the this keyword is set to undefined..when the getposition method calls the loadmap method, it calls it as a regular function call..hence this keyword in the loadmap function will be undefined(error message)...we use the bind method to solve this error..so we binded the this keyword to the current function/method making the call(i.e the getposition method...so the this keyword inside the called method(loadmap) now points to the getposition method)
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); //we change the map location from default to our own location using our the coords array
    // console.log(this.#map);
    //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {//change map view..appearance
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    ////////////////////////////
    //handling clicks on map..
    this.#map.on('click', this._showForm.bind(this)); //the this keyword here since we refactor the showform function will point to the element to which the event listener is attached..i.e the map, but we want the this keyword to point to the class app object itself so we bind it.

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  //display marker form when map is clicked...functionality
  _showForm(mapE) {
    this.#mapEvent = mapE; //note MapE takes in the object created by leaflet when the map is clicked.
    form.classList.remove('hidden'); //form appears by the side of the map when we click on the map....we remove the hidden css styled class
    inputDistance.focus(); //puts the pointer focus/blinker on the forms distance input/bar..
  }

  _hideForm() {
    //empty/clear inputs fields when the form is submitted
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden'); //form disappears on click...
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  //toggling between elevationgain and cadence input fields when the type is changed
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();
    // console.log(this);

    //get data from user/form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    //setting where the marker should be displayed(exactly where we click in the map..MapE takes in the object created by the map when we click it,inside this object we cana ccess the latlng object which has as its values the coordinates of the clicked area, we then use this coordinates to append the created marker there. )

    const { lat, lng } = this.#mapEvent.latlng; //destructure the lat, and lng values of the latlng property of the object created by our click on the map(ie, get the cordinates of the clicked map area)..we went ahead to append the workout marker at the clicked point(using d lat lng)
    console.log(lat, lng);
    let workout;
    //check if data is valid

    //if workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //if workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(elevation)
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive!');
      workout = new Cycling([lat, lng], distance, duration, elevation); //the lat and lng is dynamically set when we click the map, distance, duration and elevation we input when we fill the form.
    }
    //add new object to workouts array in the app object
    this.#workouts.push(workout); //we add the created workout object(running or cylcing) as a property into the app object using the push method.

    //display workout marker after the workout form is submitted
    this._renderWorkoutMarker(workout);

    //render workout on list
    this._renderWorkout(workout);

    //hide form + clear input fields

    //clear input fields

    //clear input fields
    this._hideForm();

    //set local storage to all workouts
    this._setLocalStorage();
  }

  //display workout marker after the workout form is submitted
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords) //determines where the marker should be added i.e the clicked map area
      .addTo(this.#map) //adds the marker to the clicked map area
      .bindPopup(
        //we used an object here to customise the popup marker
        L.popup({
          maxWidth: 250,
          minWidth: 150,
          autoClose: false, //each marker remains in the map even when a new marker is created
          closeOnClick: false, //when user clicks on any part of the map, the markers should not close.
          className: `${workout.type}-popup`, //use custom css to style the popup(the color side bar) dynamically
        })
      )
      .setPopupContent(
        //sets the content message of the popup marker..
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}.6</span>
              <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
        </div>
      </li>

      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
         </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    //using the public interface
    // workout.clicks();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalstorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);

    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

//creating the object from the class constructor/making our app work..remember that codes outside of classes are top level scope and they are executed once the js script loads...therefore the app object is created immediately our js script loads, and it calls the getposition method at that instance....
const app = new App();
console.log(app);
//we want to activate the getpoition method, i.e we want to load our location, then get the location immediately we open our app(call the getlocation method when the app is loaded)..but we placed the getpositionmethod inside the app constructor, bcos the constructor also gets loaded immediately our js runs!...this is true bcos for the object to be created in the first play the constructor had to be runned/loaded bcos it is the constructor that create the object.
// app._getPosition();

// console.log(app);
