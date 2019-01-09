"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-klibrary:app", () => {
    beforeAll(() => {
        return helpers
            .run(path.join(__dirname, "../generators/app"))
            .withPrompts({ libName: "testLib" });
    });

    test("creates files", () => {
        assert.file(["tslint.json", "README.md", "src/index.ts", ".npmignore"]);
        assert.fileContent("README.md", /# testLib/);
    });
});
