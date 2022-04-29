import { get, getDatabase, ref, remove, set } from "firebase/database";
import Blockchain from "../classes/blockchain";

const basePath: string = "chain";

export const getFullChain = async (): Promise<Blockchain | null> => {
  const db = getDatabase();
  const chainRef = ref(db, basePath);

  const chain = await get(chainRef);
  if (chain.exists()) return Blockchain.toBlockchain(chain.val());
  return null;
};

export const updateChain = async (blockchain: Blockchain): Promise<boolean> => {
  const db = getDatabase();
  const chainRef = ref(db, basePath);

  let rs: boolean = false;
  await set(chainRef, blockchain)
    .then(() => (rs = true))
    .catch((err) => {
      throw err;
    });

  return rs;
};

export const deleteChain = async (): Promise<boolean> => {
  const db = getDatabase();
  const chainRef = ref(db, basePath);

  let rs: boolean = false;
  await remove(chainRef)
    .then(() => (rs = true))
    .catch((err) => {
      throw err;
    });

  return rs;
};
