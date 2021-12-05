/*
 * A sandbox file for quick feature testing
 */

// const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// readline.question("Please enter commands\n", (answer) => {
//     console.log(answer);
//     readline.close();
// });

const string = "?crypto --slug cardano --catge --convert msyr --id 3 --doge";

const matches = string.match(/--\w+\s\w+/g);
const boolean = string.match(/--\w+$/g);
const boolean_m = string.match(/--\w+\s--/g);

console.log(matches);
console.log(boolean);
console.log(boolean_m);
