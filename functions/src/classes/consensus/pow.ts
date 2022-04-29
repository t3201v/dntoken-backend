import { SHA256 } from "crypto-js";
import Block from "../block";
import IConsensus from "./IConsensus";

export default class ProofOfWork implements IConsensus {
  calculateHash(block: Block): string {
    return SHA256(
      block.precedingHash +
        block.timestamp +
        JSON.stringify(block.transactions) +
        block.nonce
    ).toString();
  }

  generateBlock(block: Block, difficulty: number): Block {
    while (
      block.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      block.nonce++;
      block.hash = this.calculateHash(block);
    }
    console.log("Block mined:" + block.hash);
    // console.log(JSON.stringify(block, null, 4));

    return block;
  }
}
