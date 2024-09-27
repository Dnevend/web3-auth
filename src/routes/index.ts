import express from "express";
import authRoutes from "./auth.route";
import openController from "../controllers/open.controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("web3-auth");
});

router.use("/auth", authRoutes);

router.get("/proxy", openController.fetchWithProxy);
router.get("/eigen/amounts", openController.getEigenlayerAmounts);
router.get("/eigen/credentials", openController.getEigenlayerCredentials);

export default router;
