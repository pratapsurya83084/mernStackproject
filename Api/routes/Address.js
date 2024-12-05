import express from "express";
import { Authenticated } from "../middlewares/Auth.js";
import { AddressUser,getUserAddress } from "../controllers/AddressUser.js";

const router = express.Router();
//add address router
router.post("/addaddress", Authenticated, AddressUser);
//get address router
router.get("/getUserAddress",Authenticated, getUserAddress);

export default router;
