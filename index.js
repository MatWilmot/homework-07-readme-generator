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
        userEmail = "Not Available";
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
          {
            type: "confirm",
            message: "Is this for an existing project?",
            name: "existingProject",
          },
          {
            type: "input",
            message: "Copy/Paste repo *name*",
            name: "repoName",
            when: (answers) => answers.existingProject === true,
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
            res.licenseQuery,
            res.licenseRes,
            res.contributorQuery,
            res.contributorRes
          );
          fs.writeFile(
            "readme.md",
            `![user's avatar](${avatarUrl})
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
    });
  });
