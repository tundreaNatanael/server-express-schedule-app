import express from "express";
import { usePlatformData } from "../data/index.js";
import userApiRoutes from "./userApi.js";
const router = express.Router();

router.use("/user", userApiRoutes);

router.get("/bookings", (req, res) => {
  res.json([
    {
      id: 1,
      userId: 1,
      startDate: "2023-10-01",
      endDate: "2023-10-02",
    },
    {
      id: 2,
      userId: 2,
      startDate: "2023-10-03",
      endDate: "2023-10-04",
    },
    {
      id: 3,
      userId: 1,
      startDate: "2023-8-01",
      endDate: "2023-10-02",
    },
  ]);
});

router.post("/create/booking", (req, res) => {
  res.status(200).send(req?.body);
});

router.delete("/delete/booking/:id", (req, res) => {
  res.status(200).send(req?.params?.id);
});

router.get("/platform", (req, res) => {
  res.json(usePlatformData());
});

router.put("/update/platform", (req, res) => {
  res.status(200).send(req?.body);
});

export default router;
