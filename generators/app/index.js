"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-excellent ${chalk.red(
          "generator-nodered-ts"
        )} generator!`
      )
    );

    const validate = n => Boolean(n.match(/^[A-Z][\w_]+$/i));

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Project Name (a project can contain many nodes)",
        validate,
        default: _.kebabCase(path.basename(process.cwd()))
      },
      {
        type: "input",
        name: "nodename",
        message: "Node Name",
        validate,
        default: "uppercase"
      },
      {
        type: "input",
        name: "category",
        message: "Node palette category",
        default: "function",
        validate
      },
      {
        type: "input",
        name: "description",
        message: "Description",
        default: "Converts the input payload to upper case"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const templates = [
      ".eslintrc.json",
      ".gitignore",
      ".vscode",
      "dummyfile.txt",
      "jest.config.js",
      "package.json",
      "src/__nodename__.integration.test.ts",
      "src/__nodename__.ts",
      "src/__nodename__.unit.test.ts",
      "src/__nodename___node.html",
      "src/__nodename___node.ts"
    ];
    for (const t of templates) {
      this.fs.copyTpl(
        this.templatePath(t),
        this.destinationPath(t.replace(/__nodename__/, this.props.nodename)),
        this.props
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
