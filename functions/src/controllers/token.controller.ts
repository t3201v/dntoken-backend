import { Request, Response } from "express";
import { io } from "../..";
import createNewBlock from "../services/token/create.service";
import getDataInDashboard from "../services/token/dashboard.service";
import getBlockchainAnalytics from "../services/token/getAnalytics";
import removeTheEntireBlockchain from "../services/token/remove.service";
import { newBkEv } from "../utils/events";

const handleAddNewBlock = (req: Request, res: Response) => {
  const { minerAddr }: { minerAddr: string | null } = req.body;
  createNewBlock(minerAddr || "")
    .then((b) => {
      io.emit(newBkEv, { b });

      res.status(200).json({ message: "Added a new block" });
    })
    .catch((err) => res.status(409).json({ message: err }));
};

// mainly for testing only
const handleRemoveBlockChain = (req: Request, res: Response) => {
  removeTheEntireBlockchain()
    .then(() => res.status(200).json({ message: "Deleted the blockchain" }))
    .catch((err) => res.status(409).json({ message: err }));
};

const handleGetDataInDashboard = (req: Request, res: Response) => {
  const priKey = req.query.priKey;

  if (!priKey)
    return res.status(404).json({ message: "Private key not found" });

  if (typeof priKey !== "string")
    return res.status(500).json({ message: "Invalid private key" });

  getDataInDashboard(priKey)
    .then((data) =>
      res.status(200).json({ message: "Successfully Fetched", col: data })
    )
    .catch((err) => res.status(409).json({ message: err.message }));
};

const handleGetBlockchainAnalytics = (req: Request, res: Response) => {
  getBlockchainAnalytics()
    .then((data) =>
      res.status(200).json({ message: "Successfully Fetched", col: data })
    )
    .catch((err) => res.status(409).json({ message: err.message }));
};

export default {
  handleAddNewBlock,
  handleRemoveBlockChain,
  handleGetDataInDashboard,
  handleGetBlockchainAnalytics,
};
