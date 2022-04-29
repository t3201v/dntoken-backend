import express, { Router } from "express";
import tokenController from "../controllers/token.controller";

const tokenRouter: Router = express.Router();

tokenRouter.post("/add", tokenController.handleAddNewBlock);

tokenRouter.post("/remove", tokenController.handleRemoveBlockChain);

export default tokenRouter;
