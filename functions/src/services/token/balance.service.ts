import { getFullChain } from "../../repositories/token.repository";
import { pritoPubAndAddr } from "../../utils/token";

const getAddressBalance = async (privKey: string): Promise<number> => {
  const chain = await getFullChain();

  if (!chain) {
    throw new Error("Empty blockchain");
  }

  const [pubKey, addr] = pritoPubAndAddr(privKey);
  // console.log("pub: " + pubKey);
  // console.log("addr: " + addr);

  return chain.getBalanceOfAddress(pubKey, addr);
};

export default getAddressBalance;
