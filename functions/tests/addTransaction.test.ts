import { assert } from "chai";
import Blockchain from "../src/classes/blockchain";
import Transaction from "../src/classes/transaction";

describe("Add new block that having the transaction just created", function () {
  let chain = new Blockchain();
  it("Create new Blockchain", function () {
    assert.isOk(chain, "Not ok");
  });

  const tx: Transaction = new Transaction({
    amount: 100,
    from: "038861565bcd170f022c7a2628bedad606a015d0064dbbc8e3c5d947aba8aa66d9",
    to: "0xAb1546219caCb1E17dDDE6Ec09788715b0E4f4F6",
  });

  tx.signTransaction(
    "977934c2452bd01c42ff27083d89d4f26ec4ec690b39ed4609d69ce13f81e10d"
  );

  assert.isTrue(tx.isValid(), "Invalid transaction");

  chain.addTransaction(tx);

  it("Adding new transaction", function () {
    assert.isAbove(chain.pendingTransactions.length, 0, "Failed");
  });

  chain.addNewBlock("0xAb1546219caCb1E17dDDE6Ec09788715b0E4f4F6");

  assert.isTrue(chain.checkChainValidity(), "Invalid Blockchain");

  it("Adding new block", function () {
    assert.isAbove(chain.chain.length, 0, "Failed");
  });

  it("Check balance", function () {
    assert.equal(
      chain.getBalanceOfAddress(
        "038861565bcd170f022c7a2628bedad606a015d0064dbbc8e3c5d947aba8aa66d9",
        "0xDd2F5bd0fBec5FCFCde2e93b0cc95Ea825d38E47"
      ),
      -100,
      "Wallet X should have had lesser than 0 (sent Y 100)"
    );

    assert.equal(
      chain.getBalanceOfAddress(
        "0379c6109b1698bba81d45eca95ec105bbe99f63e56f24e5b340bc86b3a379711a",
        "0xAb1546219caCb1E17dDDE6Ec09788715b0E4f4F6"
      ),
      100,
      "Wallet X should have had greater than 100 (mining reward + from X)"
    );
  });
});
