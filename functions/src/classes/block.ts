import { SHA256 } from "crypto-js";
import Transaction, { ITransaction } from "./transaction";

export interface IBlock {
  index: number;
  timestamp: Date | string | number;
  transactions: ITransaction[];
  precedingHash: string;
  hash?: string;
  nonce?: number;
  miner?: string;
}

export default class Block implements IBlock {
  index: number;

  timestamp: Date | string | number;

  transactions: Transaction[];

  precedingHash: string;

  hash: string;

  nonce: number;

  miner?: string;

  constructor({
    index,
    timestamp,
    transactions,
    precedingHash = "",
    hash,
    nonce = 0,
    miner = "",
  }: IBlock) {
    this.index = index;
    this.timestamp = timestamp || Date.now();
    this.transactions =
      transactions?.map((t) => Transaction.toTransaction(t)) || [];
    this.precedingHash = precedingHash;
    this.hash = hash || this.computeHash();
    this.nonce = nonce;
    this.miner = miner;
  }

  static toBlock({
    index,
    timestamp,
    transactions,
    precedingHash,
    hash,
    nonce,
    miner,
  }: IBlock): Block {
    return new Block({
      index,
      timestamp,
      transactions,
      precedingHash,
      hash,
      nonce,
      miner,
    });
  }

  computeHash(): string {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  hasValidTransactions(): boolean {
    for (const tx of this.transactions) {
      if (!tx.isValid()) return false;
    }
    return true;
  }
}
