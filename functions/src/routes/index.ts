import express, { Router } from "express";
import tokenRouter from "./token.route";
import transRouter from "./trans.route";

const router: Router = express.Router();

router.use("/token", tokenRouter);
router.use("/trans", transRouter);

export default router;
