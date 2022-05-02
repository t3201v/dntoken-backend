import Transaction, { ITransaction } from "../../classes/transaction";
import { getFullChain } from "../../repositories/token.repository";
import { updatePendingTransaction } from "../../repositories/trans.repository";
import { pritoPubAndAddr } from "../../utils/token";

const addTransaction = async (
  trans: ITransaction,
  priv: string
): Promise<Transaction> => {
  const tx: Transaction = Transaction.toTransaction(trans);

  tx.signTransaction(priv);

  const chain = await getFullChain();

  if (!chain) throw new Error("Empty blockchain");

  const [pub, addr] = pritoPubAndAddr(priv);
  if (chain.getBalanceOfAddress(pub, addr) < trans.amount)
    throw new Error("Don't have enough balance to make this transaction");

  chain.addTransaction(tx);

  if (!chain.checkChainValidity()) throw new Error("Invalid Blockchain");

  updatePendingTransaction(chain.pendingTransactions);

  return tx;
};

export default addTransaction;
