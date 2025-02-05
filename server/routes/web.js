import express from "express";
import { getWeb } from "../controllers/web.js";

const router = express.Router();

router.get("/", getWeb)

export default router;