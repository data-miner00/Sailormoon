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

// const matches = string.match(/--\w+\s\w+/g);
// const boolean = string.match(/--\w+$/g);
// const boolean_m = string.match(/--\w+\s--/g);

// console.log(matches);
// console.log(boolean);
// console.log(boolean_m);
const regex =
    /(?<=[-{1,2}|/])(?<name>[a-zA-Z0-9]*)[ |:|"]*(?<value>[\w|.|?|=|&|+| |:|/|\\]*)(?=[ |"]|$)/gm;
const str = `sailormoon crypto --doge true --flag --shit dofsdf`;
let m;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
    console.log("---");
}
