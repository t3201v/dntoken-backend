import express, { Router } from "express";
import transController from "../controllers/trans.controller";

const transRouter: Router = express.Router();

transRouter.post("/add", transController.handleAddTransaction);

export default transRouter;
