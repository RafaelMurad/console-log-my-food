#! /usr/bin/env node

const { default: axios } = require("axios");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Enter a command > ",
});

readline.prompt();
readline
  .on("line", (line) => {
    switch (line.trim()) {
      case "vegan food":
        console.log("Here are some vegan food options:");
        break;
      case "log":
        readline.question("what would you like to log today", async (item) => {
          const { data } = await axios.get("http://localhost:3001/food");
          const iterator = data[Symbol.iterator]();

          const position = it.next();

          while (!position.done) {
            const food = position.value.name;
            if (food === item) {
              console.log(`${item} has ${position.value.calories} calories`);
            }
            position = it.next();
          }

          console.log(item);
          readline.close();
        });
        break;
      default:
        console.log(`Sorry, I don't know ${line.trim()}`);
        break;
    }
    readline.prompt();
  })
  .on("close", () => {
    console.log("Have a great day!");
    process.exit(0);
  });
