import express from "express";
import { PlatformData } from "../db/db.js";
const router = express.Router();

router.get("/all", async (req, res) => {
  const platformData = await PlatformData.findAll({
    where: {
      item: ["maxPlatformDailyHours", "maxPlatformWeeklyHours"],
    },
  });

  if (!platformData) {
    return res.status(404).send({ message: "Platform data non-existing" });
  }

  return res.status(200).json(platformData);
});

export default router;
