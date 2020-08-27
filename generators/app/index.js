"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const path = require("path");
const mkdirp = require("mkdirp");
const defaultFolder = _.kebabCase(path.basename(process.cwd()));

module.exports = class extends Generator {
  installDependencies(dependencies) {
    super.installDependencies({ ...dependencies, bower: false });
  }

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
        default: defaultFolder
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

  defaultfolder() {
    this.log(`paths:${this.destinationPath},${defaultFolder}`);
    if (this.props.name !== defaultFolder) {
      this.log(
        `Your generator must be inside a folder named ${this.props.name}\nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    const templates = [
      "dot_eslintrc.json",
      "dot_gitignore",
      "dot_npmignore",
      ".vscode",
      "jest.config.js",
      "package.json",
      "tsconfig.json",
      "src/__nodename__.integration.test.ts",
      "src/__nodename__.ts",
      "src/__nodename__.unit.test.ts",
      "src/__nodename___node.html",
      "src/__nodename___node.ts"
    ];
    for (const t of templates) {
      this.fs.copyTpl(
        this.templatePath(t),
        this.destinationPath(
          t.replace(/__nodename__/, this.props.nodename).replace(/^dot_/, ".")
        ),
        this.props
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
