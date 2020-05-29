// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();

var inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter project title",
      name: "title",
    },
    {
      type: "input",
      message: "Enter project description",
      name: "desc",
    },
  ])
  .then(function (res) {
    console.log(res.title, res.desc);
  });
