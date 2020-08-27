const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-nodered-ts:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ name: "test", nodename: "testnode" });
  });

  it("creates files", () => {
    assert.file([
      ".eslintrc.json",
      ".gitignore",
      ".npmignore",
      ".vscode",
      "jest.config.js",
      "package.json",
      "tsconfig.json",
      "src/testnode.integration.test.ts",
      "src/testnode.ts",
      "src/testnode.unit.test.ts",
      "src/testnode_node.html",
      "src/testnode_node.ts"
    ]);
  });
});
