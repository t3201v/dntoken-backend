import {
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import Block from "../classes/block";
import Blockchain from "../classes/blockchain";

const basePath: string = "chain";
const generalPath: string = "general";

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

  // store generic info on particular path
  const genericBCRef = ref(db, generalPath);
  await set(genericBCRef, {
    difficulty: blockchain.difficulty,
    miningReward: blockchain.miningReward,
    pendingTransactions: blockchain.pendingTransactions,
  })
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

export const getLatestBlocks = async (limit: number) => {
  const db = getDatabase();
  const chainRef = ref(db, basePath + "/chain");

  const q = query(chainRef, orderByChild("index"), limitToLast(limit));
  const chainSnap = await get(q);

  const generalRef = ref(db, generalPath);
  let generalBlockchainSnap = await get(generalRef);

  let bc;
  if (generalBlockchainSnap.exists())
    bc = Blockchain.toBlockchain(generalBlockchainSnap.val());

  if (!bc) return null;
  // console.log(JSON.stringify(generalBlockchainSnap.val(), null, 4));
  // console.log(JSON.stringify(chainSnap.val(), null, 4));

  if (chainSnap.exists()) {
    let c = [] as Block[];
    chainSnap.forEach((s) => {
      c.push(s.val());
    });
    bc.chain = c;
  }

  // console.log(JSON.stringify(bc, null, 4));
  return bc;
};
