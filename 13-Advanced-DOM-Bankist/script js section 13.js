'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
/*
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
 
//////////////////////
///bankist website
////////////////////

//smoothe scrollin..we want d page to smoothe scroll to section--1(features section) wen d btn--scroll-to(learn more button) is clicked

// //step 1..we assign d html elements to dom variables..
// const btnScrollTo = document.querySelector('.btn--scroll-to');

// const section1 = document.querySelector('#section--1');

//Button Scrollin: step2 assign event listener to d clicked button and set d function body/event handler
btnScrollTo.addEventListener('click', function (e) {
  //usin d old codes to set d scroll functionality...we use d coordinates of d element we want to click then scroll from and dat of d element we want to scroll to set d functionality...note e.target=element dat triggers d event

  const section1coords = section1.getBoundingClientRect(); //we stored d cordinates of d html element stored in section1 variable to section1coords.
  console.log(section1coords);
  console.log(e.target.getBoundingClientRect()); //screen position of d feature section in relation to d viewport...

  console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //returns curent scrolled screen position relative to screen

  ///readin d scrolled height and width of d viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scroll functionality..we said wen d learnmore button is clicked d viewport window should scroll to top left of section 1 ...we use d windows.scrollTo which is a global function dat accepts 2 aruements, 1 d is left cordinates and 2 the top coordinates...d lobal function uses d left property value(left coordinate) and top cordinate to give us d region we sould scroll to.

  // window.scrollTo(
  //   section1coords.left + window.pageXOffset,
  //   section1coords.top + window.pageYOffset
  // );

  //to enable smooth scrollin use object wit properties and values..any time d lenarn more button is clicked d scroll should take us from d top of d screen to features section...to do dis we added d distance between d clicked learn more button and d features to d distance between d screen top and d learn more button(i.e already scrolled/out of display screen area)
  // window.scrollTo({
  //   left: section1coords.left + window.pageXOffset, //current position+current scroll
  //   top: section1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //modern code for scroll functionality...we just said wen d learn more button is clicked scroll to d features section in a smooth manner.
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

///////////////////////////////////////////

//Page Navigation....smoothe scrollin to sections wen nav links are clicked

//method 1
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //wen nav links are clicked dey dont take us/scroll to d section attached as dia href
//     console.log('LINK');
//     const id = this.getAttribute('href'); //wen a nav link is clicked get its href attribute value.
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       //target d element wit d href attribute value and scroll to it.
//       behavior: 'smooth',
//     });
//     console.log(document.querySelector(id));
//   });
// });

//method 2....event delegation.
//step 1..add event listener to common parent element...note wen d child elements are clicked d direct parent element is clicked..but d parent can also clicked directly and d event will be listened to. we will deactivate making d parent element listen to d event wen it is clicked usin d matching stategy. we only want d paent to listen and react to d event wen its child elements are clicked.

//step 2..determine which child element originated d event..i.e d clicked element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); //wen nav links are clicked dey dont take us/scroll to d section attached as dia href

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //wen a nav link element is clicked get its href attribute value.
    document.querySelector(id).scrollIntoView({
      //scroll to d element wit d href value as its id.
      behavior: 'smooth',
    });
  }
});

//tabbed component

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));....USE EVENT DELEGATION
//event delegation to handle tabs
tabsContainer.addEventListener('click', function (e) {
  //marching stratey
  const clicked = e.target.closest('.operations__tab  '); //wen we click d number in d tab its direct parent element(tab button) will be selected, but wen d tab button is clicked its direct parent element(tab container) is selected...we do not want d tab container to be selected.

  //we want to make d tab container not responsive to click event...i.e ignore click events using guard clause,..we want to solve tis error: script.js:138 Uncaught TypeError: Cannot read properties of null (reading 'classList')
  //guard clause
  if (!clicked) return; //we said if anywhwere outside the number and tab button is clicked the codes in the function should be stopped immediately...but if clicked is true(number and tab button clicked) everytin specified inside this function should run smoothly...simply clicked=number / button clicked, !clicked = number / button not clicked i.e container is clicked.

  //remove active classes...
  tabs.forEach(t => t.classList.remove('operations__tab--active')); //wen d tab button or number is clicked d operations__tab--active class(this is d css style dat makes d button move upward) should be removed from all elements if present
  tabsContent.forEach(c => c.classList.remove('operations__content--active')); //remove content for all buttons

  //activate tab
  clicked.classList.add('operations__tab--active'); //adds d upward movement style(operations__tab--active class) to d selected button.

  // //we could have written
  // if (clicked) {
  //   clicked.classList.add('operations__tab--active');
  // }

  //activate content area
  console.log(clicked.dataset.sam);
  document
    .querySelector(`.operations__content--${clicked.dataset.sam}`) //dynamically select content based on d clicked button. we did dis by usin data attribute in d html on each button
    .classList.add('operations__content--active'); //display d above selected content
});

////////////////////menu fade animation functionality
//refactor d hover handler
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    //d codes below should run if d hovered nav element as a class of nav link
    const link = e.target; //clicked nav
    //transversin(use parent cildren style to get siblings)
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //get parent of all elements in d nav section den all its child wit nav link class(all navs)
    const logo = link.closest('.nav').querySelector('img'); //get parent den child

    //we dim d navs not clicked
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    //we dim d logo not clicked.
    logo.style.opacity = this; //the this keyword here points to d bind method function that calls it. so d this keyword will take d set arguement value in the bind method function as its value..this = 0.5, 1...
  }
};
//passin an arguement into event handler...always use d bind method, then the this keyword inside the original function...The bind() method of Function instances creates a new function that, when called, calls this function with its this keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called.
nav.addEventListener('mouseover', handleHover.bind(0.5)); //to pass in multiple values/arguements use an array
nav.addEventListener('mouseout', handleHover.bind(1));
*/
//OR
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

////////////////sticky naviation functionality...make d nav section stick to d screen wen we scroll.
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//LECTURES
/*
//////seletin elements
//selectin d entire document of any webpage/document.....special way
console.log(document.documentElement); //returns d entire html doc
console.log(document.head); //returns d head of an html doc
console.log(document.body); //returns d body of an html doc

//manually selectin parts of d document...
const header = document.querySelector('.header');
const allSectons = document.querySelectorAll('.section');
console.log(allSectons);

document.getElementById('section--1');

//selectin element usin its tagname...</button>
const allButtons = document.getElementsByTagName('button'); //saves all buttons in d doc to d variable
console.log(allButtons); //returns an html collection of allbuttons on d document..html collecton updates live in response to changes made to d doc in our code...html collection works with getElementByTagName...nodelst does not udate lve....i.e does not respond to d changes we make to the doc in our code automatically

//selectin element usin its classname...creates an html collecton
console.log(document.getElementsByClassName('btn'));

////////////////creatin and insertin elements
//.insertAdjacentHTML........

const message = document.createElement('div'); //we created an element usin DOM
message.classList.add('cookie-message'); //we added a class to d created element, we already styled d class in css, so d style is applied to d DOM element created....

// message.textContent = 'We use cookie for improved functionality and analytics'; // we set d text content for d created DOM element.....we used inner html instead

message.innerHTML =
  'We use cookie for improved functionality and analytics. <button class= "btn btn--close-cookie"> Got it!</button>'; // we set d text content for d created DOM element, we also created a button.....we used inner html instead
// header.prepend(message); //we attach d created element to d DOC(d header)..prepend adds d div element stored in d message variable as d first child element(bcoms d first element in d header div) of d header element.
header.append(message); //we attach d created element to d DOC(d header)..append adds d div element stored in d message variable as d last child element(bcoms d last element in d header div) of d header element.

header.before(message); //appears bfor d header...d dom element bcoms a siblin element to d header element

header.after(message); //appears after d header...d dom element bcoms a siblin element to d header element

//note if we place d dom element in 2 or more places inside an element only d last position will be implemented..

///////////////////
//////////////////
//WE CAN USE DOM TO POSITION DOM ELEMENTS ANYWERE WE WANT DEM IN OUR DOCUMENT...just like d above example
/*
  //DOM ELEMENTS ARE UNIQUE LIVE ELEMENTS, DEY APPEAR IN ONE PLACE AT A TIME BUT WE CAN MAKE/NSERT MULTIPLE COPIES OF A LIVE DOM ELEMENT...MAKE IT APPEAR AT MUTIPLE PLACES AT ONCE, WE DO DIS BY CLOWNIN D ORIGINAL DOM ELEMENT DEN PLACN IT AT WHERE WE WANT..SEE BELOW...
  
  //we clone 3 copies, append it..i.e place it at d top(first child element) of d header div.
  // header.prepend(message.cloneNode(true));
  // header.prepend(message.cloneNode(true));
  // header.prepend(message.cloneNode(true));
  
  //we clone 2 copies, append it..i.e place it at d bottom(last child element) of d header div.
  // header.append(message.cloneNode(true));
  /////////////
  ////////////
  
  //deletin elements...we want to delete d dom element w created and stored in d message variable wen d message button is clicked...
  
  //we select d message button assigned event listener to it and handler function
  document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
      // message.remove();
      message.parentElement.removeChild(message); //dom traversin
    });
  
  //////////styles, attributes and classes
  
  //STYLIN D DOM ELEMENT...css style set in js are inline styles....i.e dey are applied in d html file and not in d css.
  message.style.backgroundColor = '#37383d'; //ash color to d message element.
  message.style.width = '120%';
  
  //readin d created inline styles of d dom element...readin style only work for styles we created usin d domelement and js..
  console.log(message.style.height); //returns empty
  console.log(message.style.backgroundColor); //returns d property...bcos it is an inline style
  console.log(message.style.color); //retruns empty bcos d property is set in css and not inline...but we can really get d css stlye(bot inline and css styled)..see below
  
  console.log(getComputedStyle(message)); //returns an object wit all d css property of d element..
  console.log(getComputedStyle(message).color); //return just a specific object propery nd value
  console.log(getComputedStyle(message).height);
  
  //manipulatin a stylin made in d css...
  
  //we want to increase d height of d dom element..remeber height is not an inline element.
  message.style.height = Number.parseFloat(
    (getComputedStyle(message).height, 10) + 30 + 'px'
  ); //d height will b a strin we use parsefloat to get d rounded number we need, ten we added to dat parsed number den attach px(i.e parsed original heigt + 10 + px)...remeber we set te base number of d parsefloat method
  
  //css custom properties/css variables...we can change d css styln of multiple elements usin css variables....i.e we create d desired property in d root den attach d property to elements...we can therefore change d styling of d elements all at once by changing d value in d css universal variable in d css file...we can also change stylin of multiple elements all at once usin js....ere we select all elements of d document den attach d set property, den alter/change it...note: css root = js document(root=document.documentelement)
  
  //setproperty used to effect document wde change....customproperty used to set effect changes for just a single element.
  //we want to change d primary colot from green to orangered....we change d style of d whole pae
  document.documentElement.style.setProperty('--color-primary', 'orangered'); //in d doc, select all doc elements apply d changed style to d elements..
  
  ///atributes.....
  //we can assign an html element in d document as d value of a variable in our js file usin any of d attributes of d element, we then manipulate the variable usin dom tereby manipulatin d html element/document.
  
  //we created a variable, assined d header image to it using d image class attribute value..wen we manipulate dis variable d document/html element/image will be altered.
  const logo = document.querySelector('.nav__logo');
  
  //readin d attribute of an html element from d DOM (usin js)
  console.log(logo); //returns d assigned html element
  
  //we can access d attributes of d created variable on js once dey are specified in d html file...only standard or default html element attributes can be accessed by js, any attribute dat is not a standard or default html element attribute created in d html file cannot be accessed on js...js returns undefined.
  console.log(logo.className); //returns d classes attached to d loo element
  console.log(logo.alt);
  console.log(logo.src); //returns d absolute url of d html image element
  console.log(logo.getAttribute('src')); //returns d relative url of d html image element...(relative url means d folder file path where d file is stored in my computer)
  
  //non standard attributes are not reconised by js.
  console.log(logo.designer); //returns undefned bcos designer is not a standard attribute to a logo element...owever we can manpuklate and return dis attribute
  
  //return non standard attributes in js...
  console.log(logo.getAttribute('designer'));
  
  //settin attribute value of html element usin js
  logo.alt = 'beautiful minimalist logo';
  console.log(logo.alt);
  
  //creatin an attribute and settin d attribute value..accpets 2 arguements, d attribute name and d attribute value.
  logo.setAttribute('company', 'Bankist');
  
  //the html link element here is an external sourced url..so both methods returns an absolute url...
  const link = document.querySelector('.twitter-link');
  console.log(link.href);
  console.log(link.getAttribute('href'));
  
  const linkInternal = document.querySelector('.nav__link--btn');
  console.log(linkInternal.href); //returns d absolute attribute value...i.e d external url
  console.log(linkInternal.getAttribute('href')); //returns d attribute value as written in d html...value relative to d html..
  
  //data attributes...html attributes dat start wit d word data...to return or use data attributes in js(dom) we transform d attribute to camocase
  
  // data-version-number : versionNumber.......ignore data
  console.log(logo.dataset.versionNumber);
  
  //classes..d metos below do not interfere wit existin classes
  logo.classList.add('c', 'j');
  logo.classList.remove('c', 'j');
  logo.classList.toggle('c');
  logo.classList.contains('c');
  
  //to set a single class dat overides all other existin classes of an html element we use:
  logo.className = 'jonas';
  */

/*
  /////////////////////////////////////
  //event behaviour..wheter we create event listeners and handlers or not event must always occur by default..we do not create events we only listen and handle them.
  
  //mousenter event......we set up an event handler for d event of a mouse hovering over a certain area/element of d document
  
  const h1 = document.querySelector('h1'); //assign h1 element to a dom variable h1
  
  //METHOD 1 style of listening for events..normal style....we said wen d mouse enters the h1 element section an alert messages should be displayed...modern way...2 advantage. 1. we can write multiple event handler function for same event...d other method does not do dis. 2.we can remove an event handler function after it has been executed(to do this u first store d event handler function into a variable then use d variable in place of d event handler function)
  
  /////////////
  //METHOD 1
  // h1.addEventListener('mouseenter', function (e) {
  // alert('Great! You are reading the headin :D');
  // });
  
  //deleting an event handler after it has been executed.
  
  //dis variable implements d alert den delete it..so wen we initially hover d mouse d alert message pops up after which d event listerner is deleted..so wen we hover subsequently d event is not listened to so d event handler function will not be executed i.e d alert message will not pop up again...in summary we only listen to d event once and d alert popup is executed once after which it is deleted....WE CAN REMOVE D EVENT LISTENER ANYWHERE
  // const alertH1 = function (e) {
  //   alert('Great! You are reading the headin :D');
  
  //   // h1.removeEventListener('mouseenter', alertH1);
  // };
  
  // h1.addEventListener('mouseenter', alertH1); //we call d event listerner function wit d event listener and d event handler.
  
  // setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); //once it passes 3 seconds d eventlistener and handler is deleted...bfor 3 seconds we can hover and get d pop up,once 3 or more seconds elapse wen we hover we dont getd pop up.
  //////////////
  
  ///////////////////
  // METHOD 2....using the on-event property...old method
  // h1.onmouseenter = function (e) {
  //   alert('Great! You are reading the headin :D');
  // };
  
  ////////////
  //METHOD 3.......WE WRITE D EVENT LISTENER AND HANDLER FUNCTIONS AS INLINE CODES IN D HTML FILE ITSELF USIN D ON-PROPERTY...
  //    <!-- <h1 onclick="alert('HTML ALERT')"> -->
  // <!-- <h1 onmouseenter="alert('Great! You are reading the headin :D')"> -->
  ////check line 45 / 46 of d html file
  */

////////////////////////////////
//Event Propagation: Bubbling and Capturing
////////////////////////////////

////////////////////////////////
//Event Propagation in Practice...this keyword inside event handler points to d element to which d event is attached
////////////////////////////////

/*
  //rgb(255,255,255)
  
  //we want to create a random color...
  
  //we create a function dat generates a random number...
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  
  //we use d function above to generate a random color...3 random number each between 0-225...
  const randomColor = () =>
    `rgb(${randomInt(0, 225)},${randomInt(0, 225)},${randomInt(0, 225)})`; //rgb(?,?,?)
  // console.log(randomColor(0, 225)); prints a random number
  
  //we want to create event handler wen d entire header is clicked, nav links are clicked, same as d features link....note: feature (anchor element) is a grand child element of nav element (ul element) and d nav element(ul) is a child element of d nav element wen we set event listener....nav-->ul-->li-->a
  
  //event listener for feature link...if d features link is clicked, both d feature link(li--->a) background color, d nav links(ul elements) background color and d nav section background color will randomly change..it is as if clicking d 3 element at once...note clicking is reistered in d dom and it trickles down to d target element/last child having passed through all parent elements
  document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); //wen d feature link is clicked its background color changes
    console.log('LINK', e.target, e.currentTarget);
    console.log(e.currentTarget === this); //returns true...e.currentTarget = d element on which d event handler is attached====this.
  
    //stop propagation....d bubblin stop...parent element can no longer listen to events dat happen in its child element, therefore its event handler cannot be executed wen d event occur in d child element
    // e.stopPropagation;
  });
  
  //event listener for nav links...if d nav links are clicked(i.e ul elements) bot d nav links background and d nav section background color will change bcos d nav link is part of d nav section...i.e clicking d nav link is in effect clicking d nav section
  document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV LINKS CONTAINER', e.target, e.currentTarget);
  });
  
  //event listener for header section...only d background color of d nav section is changed randomly bcos it has no direct parent element.
  document.querySelector('.nav').addEventListener(
    'click',
    function (e) {
      this.style.backgroundColor = randomColor(); //wen any part of d nav section is clciked d nav background color changes
      console.log('NAV SECTION', e.target, e.currentTarget);
    }
    // true //3rd parameter arguement in d event listener function, used to set d event listenin process to d caption phase instead of d bubbling pase, d result is dat d event handler will be executed starting from d parent element down to d child element....i.e from dom to target...it is always set to false or not set out at all..it is old school code...capturin is no longer used or relevant
  );
  
  //note: e.target = were d click event occurs..EVENT BUBBLING
  //note: e.currentTarget = d element on which d event handler is attached.
  
  ////////////////////////////////////
  // Event Delegation: Implementing Page Navigation
  
  //wen we click on any nav link is scroll smothly to d correspondin page section.
  */

/*
  ///////////////////////////////////
  //DOM TRAVERSIN
  const h1 = document.querySelector('h1');
  
  //going downwards: picks only d child element
  console.log(h1.querySelectorAll('.highlight '));
  
  //selectin direct child elements only
  console.log(h1.childNodes); //returns every childnodes of d element
  console.log(h1.children); //returns only direct child elements in d element..it is a live seletion..updated!
  
  //selectin only d first direct child element
  h1.firstElementChild.style.color = 'white';
  h1.lastElementChild.style.color = 'orangered';
  
  ////////////going upwards: picks/selects parents
  //selectin direct parent elements
  console.log(h1.parentNode); //returns d div with class header__title.
  console.log(h1.parentElement); //returns the direct parent element of h1...d div with class header__title.
  
  //selecting a parent element that is not the direct parent element of an element.
  
  //we use d closest selector to select d desired parent element.it recieves an arguement which should b d class that the desired parent element has..so if many parent elements have the class js will return only the parent element closest to the child element upon which the closest method is applied. closest method is the opposite of queryselector method. the former finds parent elements in d dom tree no matter how far,the latter finds cildren elements in d dom tree no matter how far.
  h1.closest('.header').style.background = 'var(--gradient-secondary)'; //we selected the closest parent element to h1 with a class of header, then changed its background color using css element(var.)
  
  h1.closest('h1').style.background = 'var(--gradient-primary)'; //returns d h1 element itself
  
  //going sideways: siblings...we can only get direct siblings i.e d sibling just bfor and after d element.
  
  console.log(h1.previousElementSibling); //returns d previous siblin element
  console.log(h1.nextElementSibling); //returns d next siblin element
  
  //returning all d siblin elements to a selected element
  console.log(h1.previousSibling); //returns null bcos h1 is d first element amongst d siblins so no siblin elements exist bfor it
  console.log(h1.nextSibling); //returns d siblin elements below or after h1.
  
  //accessin all siblin elements of a selected element. first we select d child element parent den access all d direct children element
  console.log(h1.parentElement.children); //returns all d children element of h1 parent element..i.e h1 and his siblings..
  
  //we want to style d h1 siblings differently fromd h1 itself. we put d nodelist of h1 and its siblings into an array usin d spread method, then we loop over d array.
  [...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) el.style.transform = 'scale(0.5)';
  });
  //////// buildin a tabbed component...a tab is like an item/component which has content item it display within it wen we click.
  */
