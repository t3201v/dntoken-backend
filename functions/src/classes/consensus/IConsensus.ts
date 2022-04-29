import Block from "../block";

export default interface IConsensus {
  generateBlock(...args: any): Block;
  calculateHash(block: Block): string;
}
