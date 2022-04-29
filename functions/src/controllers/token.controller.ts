import { Request, Response } from "express";
import createNewBlock from "../services/token/create.service";
import removeTheEntireBlockchain from "../services/token/remove.service";

const handleAddNewBlock = (req: Request, res: Response) => {
  const { minerAddr }: { minerAddr: string | null } = req.body;
  createNewBlock(minerAddr || "")
    .then((data) =>
      res.status(200).json({ message: "Added a new block", col: data })
    )
    .catch((err) => res.status(409).json({ message: err }));
};

// mainly for testing only
const handleRemoveBlockChain = (req: Request, res: Response) => {
  removeTheEntireBlockchain()
    .then(() => res.status(200).json({ message: "Deleted the blockchain" }))
    .catch((err) => res.status(409).json({ message: err }));
};

export default { handleAddNewBlock, handleRemoveBlockChain };
