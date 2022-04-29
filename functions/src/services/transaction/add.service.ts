import Blockchain from "../../classes/blockchain";
import Transaction, { ITransaction } from "../../classes/transaction";
import { getFullChain } from "../../repositories/token.repository";
import { updatePendingTransaction } from "../../repositories/trans.repository";

const addTransaction = async (
  trans: ITransaction,
  { priv }: { priv: string }
): Promise<boolean> => {
  const tx: Transaction = Transaction.toTransaction(trans);

  tx.signTransaction(priv);

  const chain = await getFullChain();

  if (!chain) throw new Error("Empty blockchain");
  const c: Blockchain = Blockchain.toBlockchain(chain);
  c.addTransaction(tx);

  if (!c.checkChainValidity()) throw new Error("Invalid Blockchain");

  updatePendingTransaction(c.pendingTransactions);

  return true;
};

export default addTransaction;
