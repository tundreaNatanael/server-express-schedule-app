import express from "express";
import { usePlatformData } from "../data/index.js";
import userApiRoutes from "./userApi.js";
import bookingApiRoutes from "./bookingApi.js";
import userTypesApiRoutes from "./userTypesApi.js";
const router = express.Router();

router.use("/user", userApiRoutes);

router.use("/booking", bookingApiRoutes);

router.use("/user-type", userTypesApiRoutes);

router.get("/platform", (req, res) => {
  res.json(usePlatformData());
});

router.put("/update/platform", (req, res) => {
  res.status(200).send(req?.body);
});

export default router;
