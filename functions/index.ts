import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import router from "./src/routes";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./db/firebase";
// import getAddressBalance from "./src/services/token/balance.service";
// import { getFullChain } from "./src/repositories/token.repository";
// import removeTheEntireBlockchain from "./src/services/token/remove.service";
// import createNewBlock from "./src/services/token/create.service";
// import addTransaction from "./src/services/transaction/add.service";
// import { ec } from "elliptic";
// import pubKeyToAddress from "./src/utils/token";

dotenv.config();

initializeApp(firebaseConfig);

const app: Express = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1", router);

const port = process.env.PORT;
app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

  // const EC = new ec("secp256k1");
  // const keys = EC.keyFromPrivate(
  //   "977934c2452bd01c42ff27083d89d4f26ec4ec690b39ed4609d69ce13f81e10d"
  // );
  // console.log(
  //   "public address: " + pubKeyToAddress(keys.getPublic().encodeCompressed())
  // );
  // console.log("public key: " + keys.getPublic().encodeCompressed("hex"));
  // console.log("private: " + keys.getPrivate().toString("hex"));

  // addTransaction(
  //   {
  //     amount: 100,
  //     from: "038861565bcd170f022c7a2628bedad606a015d0064dbbc8e3c5d947aba8aa66d9",
  //     to: "0xAb1546219caCb1E17dDDE6Ec09788715b0E4f4F6",
  //   },
  //   {
  //     priv: "977934c2452bd01c42ff27083d89d4f26ec4ec690b39ed4609d69ce13f81e10d",
  //   }
  // ).then((ok) => ok && console.log("sent"));

  // createNewBlock("test_miner_address").then((b) =>
  //   console.log(JSON.stringify(b, null, 4))
  // );

  // getAddressBalance(
  //   "977934c2452bd01c42ff27083d89d4f26ec4ec690b39ed4609d69ce13f81e10d"
  // ).then((n) => console.log(n));
  // getAddressBalance(
  //   "aec156c5565e2777ddded3baa6cc881d961d0c9c0306d0593cb0a0213919a3f2"
  // ).then((n) => console.log(n));

  // getFullChain().then((data) => console.log(JSON.stringify(data, null, 4)));
  // removeTheEntireBlockchain().then(() => console.log("ok"));
});
