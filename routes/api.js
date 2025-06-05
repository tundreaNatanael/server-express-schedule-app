import express from "express";
import userApiRoutes from "./userApi.js";
import bookingApiRoutes from "./bookingApi.js";
import userTypesApiRoutes from "./userTypesApi.js";
import platformApiRoutes from "./platformApi.js";
const router = express.Router();

router.use("/user", userApiRoutes);

router.use("/booking", bookingApiRoutes);

router.use("/user-type", userTypesApiRoutes);

router.use("/platform", platformApiRoutes);

router.put("/update/platform", (req, res) => {
  res.status(200).send(req?.body);
});

export default router;
