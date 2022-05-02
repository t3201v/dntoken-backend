import { Request, Response } from "express";
import { io } from "../..";
import { ITransaction } from "../classes/transaction";
import addTransaction from "../services/transaction/add.service";
import { newTxEv } from "../utils/events";

const handleAddTransaction = (req: Request, res: Response) => {
  const { trans, pri }: { trans: ITransaction; pub: string; pri: string } =
    req.body;

  addTransaction(trans, pri)
    .then((tx) => {
      if (tx) {
        io.emit(newTxEv, { tx });

        res.status(200).json({ message: "Your transaction has been added" });
      } else res.status(409).json({ message: "Something went wrong" });
    })
    .catch((err) => {
      res.status(409).json({ message: err.message });
    });
};

export default { handleAddTransaction };
