import { getFullChain } from "../../repositories/token.repository";
import { pritoPubAndAddr } from "../../utils/token";

export default async function getDataInDashboard(priKey: string) {
  const chain = await getFullChain();

  if (!chain) throw new Error("Empty blockchain");

  const [pubKey, addr] = pritoPubAndAddr(priKey);

  return {
    balance: chain.getBalanceOfAddress(pubKey, addr),
    txHistory: chain.getTxHistoryOfAddress(pubKey, addr).reverse(),
    latestBlock: chain.getLatestBlock().index + 1,
  };
}
