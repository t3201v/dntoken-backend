import { getDatabase, ref, set } from "firebase/database";
import Transaction from "../classes/transaction";

const basePath: string = "chain/pendingTransactions";

export const updatePendingTransaction = async (
  pendingTransactions: Transaction[]
): Promise<boolean> => {
  const db = getDatabase();
  const transRef = ref(db, basePath);

  let rs: boolean = false;
  await set(transRef, pendingTransactions)
    .then(() => (rs = true))
    .catch((err) => {
      throw err;
    });

  return rs;
};
