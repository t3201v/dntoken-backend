import { Request, Response } from "express";
import { ITransaction } from "../classes/transaction";
import addTransaction from "../services/transaction/add.service";

const handleAddTransaction = (req: Request, res: Response) => {
  const {
    trans,
    priv,
  }: { trans: ITransaction; pub: string; priv: string } = req.body;

  addTransaction(trans, { priv })
    .then((ok) => {
      if (ok)
        res.status(200).json({ message: "Your transaction has been added" });
      else res.status(409).json({ message: "Something went wrong" });
    })
    .catch((err) => {
      throw err;
    });
};

export default { handleAddTransaction };
