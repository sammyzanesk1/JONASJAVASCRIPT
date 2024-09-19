'use strict';
/*
//we stored the js class selectors to variables so we can easily reuse the variable than rewriting the class selector everytime....

//where different elements in the html has the same class we select all the class in js using queryselectall...this will make our manipulation in js aply to all of them at the same time...the queryselectall turns all selcted elements to a nodelist which behaves like an array...therefore we can use the for loop on them, thismeans we can selectively apply js on them i.e implement js manipulation on a specific class only...
//we said return the selected class in the BC...
//we did not use the curly bracket for the loop here bcos the loop function is a single code line
//we said loop and return all selected elements text in the BC...

//we attached the event handler to the 3 similar elements using the for loop...
//when the modal btn is clicked js removes its hideen class(any css style attcahd to the hidden class will not be applied...we use classlist to add, remove or check if an element has a class list)...

//we select the elements we need using their classes then store them to variables...
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); //select all elements with show-modal
*/

/*
//we use loop to apply js to the 3 show-modal element //no curly braces in d for loop bcos only one line of code is to be written..we use selectorall for multiple elements which have same class we want to manipulate...we use the for loop to implement js on these elements all at the same time or each at a time...it all depends on how we set the loop...
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', function () {
    console.log('Button clicked'); //the return in bc applies to each of the 3 buttons
    modal.classList.remove('hidden'); //the hidden class hides d modal, we remove it to display modal
    overlay.classList.remove('hidden'); //remove the hidden overlay styles..i.e show overlay
  });
}
*/

/*
//we shorten the above code below by storing the function in a variable,then we allow js call the function when the event listener happens..

const openModal = function () {
  console.log('Button clicked'); //the return in bc applies to each of the 3 buttons
  modal.classList.remove('hidden'); //the hidden class hides d modal, we remove it to display modal
  overlay.classList.remove('hidden'); //remove the hidden overlay styles..i.e show overlay
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal); //if one of the nodelist element is clicked, implement openModal function...note if e set i = 1, the first modal button will not be looped..so if u click it, the js function will not apply
}
*/

/*
//to hide the modal window and overlay when the modal close button is clicked..we do the opposite of showing it...above we removed the hidden class to show the modal window, now we add it back which will hide the modal window

const closeModal = function () {
  modal.classList.add('hidden'); //add the hidden class back to the element, d modal will bcom hidden
  overlay.classList.add('hidden'); //add the hidden styles to the overlay..d overlay will b removed
};
btnCloseModal.addEventListener('click', closeModal); //when the close modal btn is cliked, closeModal function above runs..
overlay.addEventListener('click', closeModal); //when the overlay is clicked, closeModal fucntion runs...
*/

/*
//ordinarilly the above code would have been repeated twice, 1, when the close button is clicked and 2, when the overlay is clicked but we made the code shorter above since both scenarios apply same function...we now first saved the function to a variable, then allow js call the function by placing the saved variable as the event handler..
btnCloseModal.addEventListener('click', function () {
  modal.classList.add('hidden'); //add the hidden class back to the element, d modal will bcom hidden
  overlay.classList.add('hidden'); //add the hidden styles to the overlay..d overlay will b removed);
});
overlay.addEventListener('click', function () {
  modal.classList.add('hidden'); //add the hidden class back to the element, d modal will bcom hidden
  overlay.classList.add('hidden'); //add the hidden styles to the overlay..d overlay will b removed);
});
*/

/*
//we can set event listeners for keypads, when we do this we usually set the whole document as the place where the event will occur(the event will occur wen any key is clicked while we are on the document/page)...from the code below we add an event listener of keydown to the document and an event handler which logs a message in the console. when any key is pressed(keydown event happens) in the keyboard while on the document, in the console A key was pressed is logged.

document.addEventListener('keydown', function () {
  console.log('A key was pressed');
});
*/

/*
//when an event occurs, information about the event can be stored in the event handler function(the event handler will have a parameter which will create an object in which the parameter stores the event info in it )..to do this, we set a parameter to the handler function..the parameter will then store the event info inside an object...so basically with the example below, we said when any key is pressed down/event happens, the handler function should console log the set parameter...the parameter will store all info about the event inside itself...in the BC we will now see all the keys that was pressed which led to the event happening...
document.addEventListener('keydown', function (e) {
  console.log(e.key); //e is a parameter which has an object, we want the BC to display only the key property value in the object..(the object contains many values stored in its properties..we are concenred with the key property which has as its value the key that was pressed that led to the event..(event info we want))
});
*/

/*
//we can now set conditional statement based on the event info stord in the parameter object, for instance, if the key that led to the event is equal to a set key, then some predefined code should be implemented...in the code below we want the modal window to be closed(the elements with modal class, the hidden class will be added to it) if the escape key is pressed...i.e the key that led to the event happening is the escape key...however we want the modal to close based on another condition i.e the modal should close if only the modal element does not contain the class hidden(the modal window is on display)...where the modal element contains the class hidden(the modal window is not on display)  and the escape key is pressed, nothing will happen...summarily the code below says any key pressed leads to the event happening....now the event handler will store the event info in its parameter object...then the event handler will display in the BC the event info, and where the key that led to the event is escape key, the handler should clos the modal window if the modal elemnt does not contain the hidden class...

document.addEventListener('keydown', function (e) {
  console.log(e.key); //display in the BC any key that leads to the event...

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }

  // if (e.key === 'Escape') {
  //   //if the key that leads to the event is Escape key close Modal but only...
  //   if (!modal.classList.contains('hidden')) {
  //     //if modal element does not contain hidden class
  //     closeModal();
  //   }
  // }

  //we can shorten the 2 conditions putting them together using the and operator..check up
});
*/

//CLEAN CODE FOR THE MODAL WINDOW PROJECT....
/*
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); 

const openModal = function () {
  console.log('Button clicked'); //the return in bc applies to each of the 3 buttons
  modal.classList.remove('hidden'); //the hidden class hides d modal, we remove it to display modal
  overlay.classList.remove('hidden'); //remove the hidden overlay styles..i.e show overlay
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal); //if one of the nodelist element is clicked, implement openModal function...note if e set i = 1, the first modal button will not be looped..so if u click it, the js function will not apply
}

const closeModal = function () {
  modal.classList.add('hidden'); //add the hidden class back to the element, d modal will bcom hidden
  overlay.classList.add('hidden'); //add the hidden styles to the overlay..d overlay will b hidden
};
btnCloseModal.addEventListener('click', closeModal); //when the close modal btn is cliked, closeModal function above runs..
overlay.addEventListener('click', closeModal); //when the overlay is clicked, closeModal function runs...

document.addEventListener('keydown', function (e) {
  console.log(e.key); //display in the BC any key that leads to the event...
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
*/
