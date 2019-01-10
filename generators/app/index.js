"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const glob = require("glob");

module.exports = class extends Generator {
    async prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(`Welcome to ${chalk.red("generator-klibrary")} generator!`)
        );

        this.answers = await this.prompt([
            {
                type: "input",
                name: "libName",
                message: "Library Name (no spaces)"
            },
            {
                type: "confirm",
                name: "createFolder",
                message: "Do you want to create a folder?"
            }
        ]);
    }

    writing() {
        if (this.answers.createFolder) {
            this.destinationRoot(
                `${this.destinationRoot()}/${this.answers.libName}`
            );
        }
        const paths = glob
            .sync(this.templatePath("**/!(*RENAMED)"), {
                dot: true
            })
            .map(path => path.substring(this.templatePath().length + 1));

        for (const path of paths) {
            this.fs.copyTpl(
                this.templatePath(path),
                this.destinationPath(path),
                this.answers
            );
        }

        this.fs.copyTpl(
            this.templatePath(".npmignoreRENAMED"),
            this.destinationPath(".npmignore"),
            this.answers
        );
    }

    install() {
        this.npmInstall(
            [
                "@types/chai",
                "@types/chai-as-promised",
                "@types/joi",
                "@types/mocha",
                "@types/nconf",
                "@types/node",
                "@types/sinon",
                "@types/sinon-as-promised",
                "chai",
                "chai-as-promised",
                "dotenv",
                "mocha",
                "mocha-junit-reporter",
                "nyc",
                "rimraf",
                "sinon",
                "sinon-as-promised",
                "source-map-support",
                "ts-node",
                "tslint",
                "typescript"
            ],
            { "save-dev": true }
        ).then();
        this.npmInstall(["joi", "nconf", "ts-polyfill"], { save: true }).then();
    }

    end() {
        this.log(
            yosay(
                `Everything is ready. Search for ${chalk.yellow(
                    "TODO"
                )} markers in the code and follow the instruction in the comments.`
            )
        );
    }
};
