import Blockchain from "../../classes/blockchain";
import { getFullChain, updateChain } from "../../repositories/token.repository";

// if no block exists, create a new blockchain
const createNewBlock = async (minerAddr: string) => {
  const data = await getFullChain();

  // console.log("current chain\n" + JSON.stringify(data, null, 4));
  // if its empty, create genesis block
  if (!data) {
    const originBlockchain = new Blockchain();
    // console.log("origin block\n" + JSON.stringify(originBlockchain, null, 4));

    await updateChain(originBlockchain);
    return originBlockchain.chain[0];
  }

  let newChain: Blockchain = data;

  const newBlock = newChain.addNewBlock(minerAddr);
  if (!newChain.checkChainValidity()) throw new Error("Invalid blockchain");
  // console.log("New chain\n" + JSON.stringify(newChain, null, 4));

  await updateChain(newChain).catch((err) => {
    throw err;
  });

  let total = 0;
  newBlock.transactions.forEach((t) => {
    total += t.amount;
    t.timestamp = newBlock.timestamp;
  });

  return { ...newBlock, total, txns: newBlock.transactions.length };
};

export default createNewBlock;
