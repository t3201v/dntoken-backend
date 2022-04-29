import { SHA256 } from "crypto-js";
import { ec } from "elliptic";

const ecInstance = new ec("secp256k1");

export interface ITransaction {
  amount: number;
  from: string;
  to: string;
  signature?: string;
}

export default class Transaction implements ITransaction {
  amount: number;

  from: string;

  to: string;

  signature: string;

  constructor({ amount, from, to, signature }: ITransaction) {
    this.amount = amount;
    this.from = from;
    this.to = to;
    this.signature = signature || "";
  }

  static toTransaction(object: ITransaction): Transaction {
    return new Transaction({
      amount: object.amount,
      from: object.from,
      to: object.to,
      signature: object.signature,
    });
  }

  calculateHash(): string {
    return SHA256(this.amount + this.from + this.to).toString();
  }

  signTransaction(privKey: string) {
    const signingKey: ec.KeyPair = ecInstance.keyFromPrivate(privKey, "hex");
    // console.log("pub key: " + signingKey.getPublic(true, "hex"));
    // console.log("private: " + signingKey.getPrivate("hex"));

    if (signingKey.getPublic(true, "hex") !== this.from) {
      throw new Error("You can not sign transactions for other wallet!");
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid() {
    if (this.from === null || this.from === "") return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction");
    }

    const publicKey = ecInstance.keyFromPublic(this.from, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
