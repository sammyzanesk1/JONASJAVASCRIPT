// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
const x = '23';
if (x === 23) console.log(23);

const calcAge = birthYear => 2037 - birthYear;

console.log(calcAge(1991));
*/

//there is an array of numbers and a string...we want to get the difference between the highest and lowest values in the array and return the difference(calcTempAmplitude)...

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min); //return max min values in the console browser
  return max - min; //the function name/variables holds this value as the final value of the function process
};
//console.log(calcTempAmplitude([3, 7, 4, 1, 8])); //calling the function using array as the arguement,then we return the  function varibale which holds the final value of the function ie the return max-min vanlue.

//console.log(calcTempAmplitude(temperatures)); //calling the function using an array withs its values as the arugement...then returning the function..

const amplitude = calcTempAmplitude(temperatures); //making the functiona name/varibale the value of another variable.
console.log(amplitude); //return the vaue of amplitude in the console broswser
//rather that calling and console log the function directly we first call then function, save it to a variable then console the variable...

//MERGING TWO ARRAYS TO FORM ONE NEW ARRAY THEN RETURN THE MAX, MIN AND DIFFERENCE BETWEEN MAX AND MIN VALUE...

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2); //merge array t1 and array t2 to create new temps array
  console.log(temps); //return merged array

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min); //return max min values in the console browser
  return max - min; //the function name/variables holds this value as the final value of the function process
};
//console.log(calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]));

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

/*
1. we used a function expression to return the highest and lowest value in the array..

how we got the max value in the array...
i. we declared a function expression which calc the differrence....
ii. we set the first item in the array as the initial max value..
iii we loop the function expression...
iv. we call the function expression...

we used the temps array values as the arguement for the function....each time the function is looped, the set max value-temps[0] is compared to the arguement-(curTemp)..if the arguement is higher, the arguement bcoms the max value,so that on the next loop/iteration, the new max value is compared to the next arguement..

curTemp=temps[i], implies that curTemp is the value of the temps array which start from 0 to 4 position..so the first loop takes curTemp to be temps[0], the next loop curTemp is temps[1], the next loop curTemp is temps[2] just like that...

using the example above...3 is set as the initial max value, we called the function using the array value...each of the array value will the arguement..so as the function is looped....1st call compares 3 to 3, the condition is not meant nothing will happen, 7 is the next arguement it is higher, 7 bcoms the max...the next iteration uses 4 as the arguement...the condition is not meant nothing happens, same applies to 1, then the last iteration will use 8 as the arguement it mets the condition so 8 bcoms the max value...we console log the max value...so 8 is returned.

to ignore the error i.e string value in the array we use the continue keyword which says that if a value does not meet a set condition the loop should skip that value and continue to the next...i.e the loop will not consider it...we know that the eror is a string so to avoid it in our function we said that if the typeof of the curTemp is not a number the curTemp should be ignored/skipped... 

then we got the difference between the max and min by using the return max min command...
*/

//coverting from degrees to kelvin

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // C) FIX the bug by converting the string to number...
    //value: Number(prompt('Degree celsius:')),..we commented this out after we solved the bug to stop the prompt coimg up everytime in the browser...
    value: 10,
  };

  //B) FIND THE BUG...(the bug is in the value index/key..we need to change it from string to a number )
  //console.log(measurement);
  console.table(measurement); //showing objects as tables in the BC...

  //console.log(measurement.value);
  // console.warn(measurement.kelvin);
  // console.error(measurement.kelvin);
  const kelvin = measurement.value + 273;
  return kelvin;
};
//A) IDENTIFY THE BUG (the value of the function is a concatenated number bcos the prompt value is a string)
console.log(measureKelvin());

//introducing a bigger bug to our merged array function...we used debugger to debug here

const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2); //merge array t1 and array t2 to create new temps array
  console.log(temps); //return merged array

  let max = 0; //we introduce the bug...instead of [0] we said 0;...this bug wont really affect the max value.
  let min = 0; //we introduce the bug...instead of [0] we said 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue; //if the value of the object key is not a number, skip it n continue

    //debugger; //this calls the debuuger tool in the console
    if (curTemp > max) max = curTemp; //compare the iterated object key to the initial set max...
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min); //return max min values in the console browser
  return max - min; //the function name/variables holds this value as the final value of the function process
};
//console.log(calcTempAmplitudeBug([3, 5, 1], [9, 0, 5]));

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
//A) IDENTIFY THE BUG---min = 0, max = 9,  and amplitude = 9...instead of min = 1, max = 9, amplitude = 8..we used debuger to identify the bug...in the sources, the breakpoint showed that the min was 0 instead of the min value inside the array...bcos the min value we initially set is already lower than all the values in the array...
console.log(amplitudeBug);

//challenge 1
//personal solution...not effective we needed one function that works for both arrays..
/*
const printForecastP = function (arr) {
  for (let i = 0; i < arr.length; i++) {}
  return `...${arr[0]}C in 1 days...${arr[1]}C in 2 days...${arr[2]}C in 3 days...`;
};
console.log(printForecastP([17, 21, 23]));

//test data 2
const printForecast2 = function (arr2) {
  for (let i = 0; i < arr2.length; i++) {} //use an empty function where u want to return a string value
  return `...${arr2[0]}C in 1 days...${arr2[1]}C in 2 days...${arr2[2]}C in 3 days...${arr2[3]}C in 4 days...${arr2[4]}C in 5 days...`;
};
console.log(printForecast2([12, 5, -5, 0, 4]));
*/

//JONAS SOLUTION...

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

console.log(`...${data1[0]}C...${data1[1]}C...${data1[2]}C...`);

const printForecast = function (arr) {
  let string = '';
  for (let i = 0; i < arr.length; i++) {
    //string = string + `${arr[i]}C in ${i + 1} days...`; //this adds each array value and days to the string after each loop...
    string += `${arr[i]}C in ${i + 1} days...`; //using the plus equal operator instead of the above
  }
  console.log('...' + string); //return string variable value in the console browser after the loop process is completed.
};
printForecast(data1); //call the function with the array
printForecast(data2);

//EXPLANATION...
//Jonas got the job using one function to run both arrays...I used one function per 1 array..i did not implement DRY principle...I was not able to decipher how to autoamte returning the days...i.e placing it in a place holder..Jomas did this by using the loop starter index plus 1 i.e for the first loop which start from position zero + 1 equals 1 days...Jonas was able to use one function for both arrays by first declaring 2 variable that stored the arrays then calling the function with the variables later..Jonas made the function return the desired output each time the function is looped by first declaring a variable with an empty value, then after each loop the string variable becomes the empty value plus(concatenated)desired result(the string we want the function to return), the string keeps growing after each loop so that by the time the iteration is completed the string that will be returned in the browser console will be one that presents all the values in the array that has been looped...inside the desired string, he created the place holders for the array value and the days counters..in the console log he concatenated the dots and the string that will be returned, this made only the beginning of the returned string have d 3 dots...{i=current looped value of the array....array at the current position}
