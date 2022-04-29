import { deleteChain } from "../../repositories/token.repository";

const removeTheEntireBlockchain = (): Promise<boolean> => {
  return deleteChain();
};

export default removeTheEntireBlockchain;
