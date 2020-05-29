// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();

var inquirer = require("inquirer");
var fs = require("fs");

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
    {
      type: "input",
      message: "How is this project installed? (leave blank if N/A)",
      name: "install",
    },
    {
      type: "input",
      message: "What is the intended use of this project?",
      name: "usage",
    },
    {
      type: "confirm",
      message: "Is there any licensing that needs to be listed?",
      name: "licenseQuery",
    },
    {
      type: "input",
      message: "Enter all licenses to add:",
      name: "licenseRes",
      when: (answers) => answers.licenseQuery === true,
    },
    {
      type: "confirm",
      message: "Are there any contributors to credit?",
      name: "contributorQuery",
    },
    {
      type: "input",
      message: "Enter all contributors:",
      name: "contributorRes",
      when: (answers) => answers.contributorQuery === true,
    },
  ])
  .then(function (res) {
    console.log(
      res.title,
      res.desc,
      res.install,
      res.usage,
      res.licenseQuery,
      res.licenseRes,
      res.contributorQuery,
      res.contributorRes
    );
    fs.writeFile(
      "readme.md",
      `# ${res.title}
## Description
${res.desc}
***
## Contents
- How to install
- How to use
- Licenses (if applicable)
- Contributors (if applicable) 
***
## How to install 
${res.install}
***
## Licenses
${res.licenseRes}
***
## Contributors
${res.contributorRes}`,
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log("File Created");
      }
    );
  });
