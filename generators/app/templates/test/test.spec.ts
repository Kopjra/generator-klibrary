import {expect, use} from "chai";
import * as chaiPromised from "chai-as-promised";

use(chaiPromised);

describe("Unit test suite", () => {
    it("Unit test1", async () => {
        expect(true).to.be.true;
    });
});
