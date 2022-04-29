import { assert } from "chai";
import Blockchain from "../src/classes/blockchain";

describe("Add new block", function () {
  let chain = new Blockchain();
  it("Create new Blockchain", function () {
    assert.isOk(chain, "Not ok");
  });
  it("Adding new block", function () {
    chain.addNewBlock("0xAb1546219caCb1E17dDDE6Ec09788715b0E4f4F6");

    assert.isTrue(chain.checkChainValidity(), "Invalid Blockchain");
  });
});
