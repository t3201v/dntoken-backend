import IConsensus from "./consensus/IConsensus";
import ProofOfWork from "./consensus/pow";
import Block, { IBlock } from "./block";
import Transaction, { ITransaction } from "./transaction";

export interface IBlockchain {
  difficulty: number;
  miningReward: number;
  chain: IBlock[];
  pendingTransactions: ITransaction[];
}

export default class Blockchain implements IBlockchain {
  consensus: IConsensus;

  chain: Block[];

  difficulty: number;

  miningReward: number;

  pendingTransactions: Transaction[];

  constructor({
    chain,
    consensus = new ProofOfWork(),
    difficulty = 2,
    miningReward = 100,
    pendingTransactions = [],
  }: {
    chain?: Block[];
    consensus?: IConsensus;
    difficulty?: number;
    miningReward?: number;
    pendingTransactions?: Transaction[];
  } = {}) {
    this.chain = chain || [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.miningReward = miningReward;
    this.pendingTransactions = pendingTransactions;
    this.consensus = consensus;
  }

  static toBlockchain(object: IBlockchain) {
    return new Blockchain({
      difficulty: object.difficulty,
      miningReward: object.miningReward,
      chain: object.chain?.map((block) => Block.toBlock(block)),
      pendingTransactions: object.pendingTransactions?.map((tx) =>
        Transaction.toTransaction(tx)
      ),
    });
  }

  private createGenesisBlock() {
    return new Block({
      index: 0,
      timestamp: new Date("04/25/2022"),
      transactions: [new Transaction({ amount: 0, from: "", to: "" })],
      precedingHash: "0",
    });
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock(minerAddr: string): Block {
    // block will be mined
    let newBlock = new Block({
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      precedingHash: this.getLatestBlock().hash,
    });

    // miner reward
    this.pendingTransactions = [
      new Transaction({ amount: this.miningReward, from: "", to: minerAddr }),
    ];

    newBlock = this.consensus.generateBlock(newBlock, this.difficulty);

    newBlock.miner = minerAddr;
    this.chain.push(newBlock);
    return newBlock;
  }

  addTransaction(trans: Transaction) {
    if (trans.amount < 0)
      throw new Error("The amount sent must be equal or greater than 0");

    if (!trans.from || !trans.to) {
      throw new Error("Transaction must include from and to address");
    }

    if (!trans.isValid()) {
      throw new Error("Cannot add invalid transaction to the chain");
    }

    this.pendingTransactions.push(trans);
  }

  getBalanceOfAddress(pubKey: string, address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.from === pubKey) {
          balance -= trans.amount;
        }
        if (trans.to === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  getTxHistoryOfAddress(pubKey: string, address: string): Transaction[] {
    let tx: Transaction[] = [];

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.from === pubKey) {
          trans.timestamp = block.timestamp;
          tx.push(trans);
        }
        if (trans.to === address) {
          trans.timestamp = block.timestamp;
          tx.push(trans);
        }
      }
    }

    return tx;
  }

  checkChainValidity(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const precedingBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) return false;

      const hashCalc: string = this.consensus.calculateHash(currentBlock);
      if (currentBlock.hash !== hashCalc) {
        // console.log("current block hash: " + currentBlock.hash);
        // console.log("expected hash: " + hashCalc);
        // console.log("current block: " + JSON.stringify(currentBlock, null, 4));
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}
