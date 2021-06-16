import * as fs from "fs"
import { Client } from "discord.js"

const eventsFolderPath = "./src/events"
const filenames = fs.readdirSync(eventsFolderPath, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name)
  .filter(item => item != "index.ts")
  .map(item => {
    const splittedItem = item.split(".");
    return splittedItem[0];
  })
console.log(filenames)

export default (bot: Client): void => {
  filenames.forEach(moduleName => {
    // Require the module
    const _module = require(`./${moduleName}`);

    // Using the module
    _module['default'](bot)
  })
}
