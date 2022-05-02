import express, { Router } from "express";
import tokenController from "../controllers/token.controller";

const tokenRouter: Router = express.Router();

tokenRouter.post("/add", tokenController.handleAddNewBlock);

tokenRouter.post("/remove", tokenController.handleRemoveBlockChain);

tokenRouter.get("/dashboard", tokenController.handleGetDataInDashboard);

tokenRouter.get("/analytics", tokenController.handleGetBlockchainAnalytics);

export default tokenRouter;
