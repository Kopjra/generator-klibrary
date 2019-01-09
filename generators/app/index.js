"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const glob = require("glob-promise");

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
                message: "Library Name",
                default: this.appname
            }
        ]);
    }

    async writing() {
        const paths = (await glob(this.templatePath("**/!(*RENAMED)"), {
            dot: true
        })).map(path => path.substring(this.templatePath().length + 1));

        for (const path of paths) {
            await this.fs.copyTpl(
                this.templatePath(path),
                this.destinationPath(path),
                this.answers
            );
        }

        await this.fs.copyTpl(
            this.templatePath(".npmignoreRENAMED"),
            this.destinationPath(".npmignore"),
            this.answers
        );
    }

    async installDeps() {
        await this.npmInstall(
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
        );
        await this.npmInstall(["joi", "nconf"], { save: true });
    }
};
