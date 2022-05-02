import Transaction from "../../classes/transaction";
import { getLatestBlocks } from "../../repositories/token.repository";

export default async function getBlockchainAnalytics() {
  const chain = await getLatestBlocks(10);

  if (!chain) throw new Error("Empty blockchain");

  let txns = [] as Transaction[];
  chain.chain.forEach((b) => b.transactions.forEach((t) => txns.push(t)));
  return {
    difficulty: chain.difficulty,
    miningRwd: chain.miningReward,
    blocks: chain.chain
      .map((b) => {
        let total = 0;
        b.transactions.forEach((t) => {
          total += t.amount;
          t.timestamp = b.timestamp;
        });

        return { ...b, txns: b.transactions.length, total: total };
      })
      .reverse(),
    txns: txns.reverse(),
  };
}
