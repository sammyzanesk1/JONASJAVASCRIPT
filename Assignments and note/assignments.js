//Values and Variables part
// let country = "Nigeria"; //declaring a variable
// let continent = "Africa";
// let population = "240million";
// console.log(country); //registering the js to the browser
// console.log(continent);
// console.log(population);
// you console log the variable and the browser will display the value...but u must first link ur js file to the html using script..variables are reuseable.

/*Data type part
if (country) === "Nigeria"
let (isIsland) === "country";
*/

//coding challenge 1...1st attempt
//task 1 data 1
// const markHeight = "1.69";
// const markWeight = "78";
// const johnHeight = "1.95";
// const johnWeight = "92";
//data 2
// const markHeight = "1.88";
// const markWeight = "95";
// const johnHeight = "1.76";
// const johnWeight = "85";
// console.log(markHeight, markWeight, johnHeight, johnWeight);

// //task 2
// const markBMI = markWeight / markHeight ** 2;
// console.log(markBMI);

// const johnBMI = johnWeight / johnHeight ** 2;
// console.log(johnBMI);

// //task 3
// const markhigherBMI = markBMI > johnBMI;
// console.log(markhigherBMI);

// //jonas solution
// const massMark = 78;
// const heightMark = 1.69; // meters
// const massJohn = 92;
// const heightJohn = 1.95;

// const BMIMark = massMark / (heightMark * heightMark);
// const BMIJohn = massJohn / (heightJohn * heightJohn);

// const markHigherBMI = BMIMark > BMIJohn;
// console.log(BMIMark, BMIJohn, markHigherBMI);

// challenge 2....if/else statements

// if(BMIMark > BMIJohn) {
//     console.log(`Mark's BMI is higher than John's!`);    
// }else{
//     console.log(`John's BMI is higher than Mark's!`);
// }

//using temperate literate
// if(BMIJohn > BMIMark){
//     console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
// }else {
//     console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
// }


//  Calculate the average score for each team, using the test data included below. The average score for Dolphins should be assigned to the scoreDolphins variable, and the average score of Koalas should be assigned to the scoreKoalas variable.

// 2. Compare the team's average scores to determine the winner of the competition, and print to the console:

// "Dolphins win the trophy" if Dolphins win, or

// "Koalas win the trophy" if Koalas win, or

// "Both win the trophy" if their average scores are equal.

// TEST DATA: Dolphins scored 96, 108, and 89. Koalas scored 88, 91, and 110.

//bonus point 2 solved
// const scoreDolphins = (97 + 112 + 101) / 3
// const scoreKoalas = (96 + 95 + 106) / 3

// console.log(scoreDolphins, scoreKoalas)

// if (scoreDolphins > scoreKoalas && scoreDolphins>=100) {
//     console.log("Dolphins win the trophy");
// } else if (scoreDolphins < scoreKoalas && scoreKoalas >= 100) {
//     console.log("Koalas win the trophy");
// } else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100 && scoreKoalas >=100) {
//     console.log("Both win the trophy");
// } else {
//     console.log('No one wins the trophy')
// }




// Steven needs a very simple tip calculator for whenever he goes to eat in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

// Your tasks:

// Calculate the tip, depending on the bill value. Create a variable called tip for this. It's not allowed to use an if...else statement (if it's easier for you, you can start with an if...else statement, and then try to convert it to a ternary operator).

// Print a string to the console containing the bill value, the tip, and the final value (bill + tip).

// Example: The bill was 275, the tip was 41.25, and the total value 316.25.

// Note: Use the values of the bill and tip variables to construct this string. Don't hard-code them 🙂

// TEST DATA: Test with different bill values: 275, 40, and 430

//declare the bill variable, then write the tip ternary condition, then console log using string i.e temperate literal.
// const bill = 430;
// const tip = bill >= 50 && bill <=300 ? (bill * 15)/100 : (bill * 20)/100;

// console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);




// CHALLENGE #1
// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.

// Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).

// A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!

// Your tasks:

// Create an arrow function calcAverage to calculate the average of 3 scores. This function should have three parameters and return a single number (the average score).

// Create two new variables — scoreDolphins and scoreKoalas, and assign the value returned from the calcAverage function to them (you will need to call this function, and pass scores as arguments).

// Create a function checkWinner that takes the average score of each team as parameters (avgDolphins and avgKoalas), and then logs the winner to the console, together with the victory points, according to the rule above. Example: Koalas win (30 vs. 13) (use avgDolphins and avgKoalas instead of hard-coded values).

// Use the checkWinner function to determine the winner for both DATA 1 and DATA 2.

// Ignore draws this time. Instead, log No team wins... to the console if there is no winner.



// TEST DATA 1: Dolphins scored 44, 23, and 71. Koalas scored 65, 54, and 49.

// TEST DATA 2: Dolphins scored 85, 54, and 41. Koalas scored 23, 34, and 27.

//task 1
//using arrow function to get average of three score...this will be a stand alone function which calcuates averages
// const calcAverage = (a, b, c) => (a + b + c)/3;  // no curly braces, no return command.
// console.log(calcAverage(3, 4, 5));

// //calls on the arrow function to get its value
// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolphins, scoreKoalas);

// //takes the parameter from the the checkwinner arguement...
// const checkWinner = function (avgDolphins, avgKoalas) {
//     if (avgDolphins >= 2 * avgKoalas) {
//         console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//     } else if (avgKoalas >= 2 * avgDolphins) {
//         console.log(`Koalas wins (${angKoalas} vs. ${avgDolphins})`);
//     } else {
//         console.log(`No team wins...`);
//     }
// }

// checkWinner(scoreDolphins, scoreKoalas);//sets the parameter arguement...
// checkWinner(576, 111);//sets the parameter arguement.

// //test 2
// scoreDolphins = calcAverage(85, 54, 41);
// scoreKoalas = calcAverage(23, 34, 27);
// console.log(scoreDolphins, scoreKoalas);
// checkWinner(scoreDolphins, scoreKoalas);

/* challenge 6...
Steven wants you to improve his tip calculator, using the same rules as before — tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

Your tasks:

Write a function calcTip that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from the first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.

And now let's use arrays! So, create an array called bills containing the test data below.

Create an array called tips containing the tip value for each bill, calculated from the function you created before.

BONUS: Create an array totals containing the total values, so the bill + tip.

TEST DATA: 125, 555, and 44.
*/

// const calcTip = function (bill) {
//     return bill >= 50 && bill <= 300 ? bill  * 0.15 : bill * 0.2;
// } //returns the tip if the condition is met, notice the arguement is called using the array position..i.e return tip for each array item(bill value)

// // const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

// const bills = [123, 555, 44]; //creating the bills array
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]; //creating the tips array using the calctip machine, the machine gets its input data fromthe bills array.
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]; //creating the totals array which combines the tip and bill, note how it is araanged, each array item has comma and space.

// console.log(bills, tips, totals);

//cahllenge
