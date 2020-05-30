var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username",
  })
  .then(function ({ username }) {
    const searchUrl = `https://api.github.com/users/${username}`;

    axios.get(searchUrl).then(function (res) {
      var avatarUrl = res.data.avatar_url;
      var userEmail = res.data.email;

      if (userEmail === null) {
        userEmail = "Not Publicly Available";
      }
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
            message: "How is this project installed?",
            name: "install",
          },
          {
            type: "input",
            message: "What is the intended use of this project?",
            name: "usage",
          },
          {
            type: "list",
            message: "Which License are you using?",
            name: "license",
            choices: [
              "MIT",
              "Apache 2.0",
              "ISC",
              "GNU GPLv3",
              "Mozilla Public License 2.0",
              "Boost Software License 1.0",
              "None",
            ],
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
          if (res.licenseRes === "undefined") {
            res.licenseRes = "None";
          }
          if (res.contributorRes === "undefined") {
            res.contributorRes = "None";
          }
          console.log(
            res.title,
            res.desc,
            res.install,
            res.usage,
            res.license,
            res.contributorQuery,
            res.contributorRes
          );
          fs.writeFile(
            "readme.md",
            `![license type](https://img.shields.io/badge/License-${res.license}-yellow)<br>
  ![user's avatar](${avatarUrl})<br>
  email: ${userEmail}
  # ${res.title}
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
  ## Intended Usage
  ${res.usage}
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
    });
  });
