import { ec } from "elliptic";
import { getFullChain } from "../../repositories/token.repository";
import pubKeyToAddress from "../../utils/token";

const EC = new ec("secp256k1");

const getAddressBalance = async (privKey: string): Promise<number> => {
  const chain = await getFullChain();

  if (!chain) {
    throw new Error("Empty blockchain");
  }

  const keys: ec.KeyPair = EC.keyFromPrivate(privKey);
  const pubKey = keys.getPublic(true, "hex");
  const addr = pubKeyToAddress(pubKey);
  console.log("pub: " + pubKey);
  console.log("addr: " + addr);

  return chain.getBalanceOfAddress(pubKey, addr);
};

export default getAddressBalance;
