import express from "express";
import { Bookings } from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const id = Number(req?.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid booking ID" });
  }

  const booking = await Bookings.findOne({
    where: { id },
  });

  if (!booking) {
    return res.status(404).send({ message: "Booking not found" });
  }
  return res.status(200).json(booking);
});

router.get("/all", async (req, res) => {
  const bookings = await Bookings.findAll({
    order: [["start", "DESC"]],
  });

  if (!bookings || bookings.length === 0) {
    return res.status(200).send({ message: "No bookings found" });
  }
  return res.status(200).json(bookings);
});

router.post("/create", async (req, res) => {
  const { start, userId, durationMinutes } = req.body;
  if (!start || !userId || !durationMinutes) {
    return res.status(400).send({ message: "Missing fields" });
  }

  const newBooking = await Bookings.create({
    start,
    user_id: userId,
    duration_minutes: durationMinutes,
  });

  if (!newBooking) {
    return res.status(500).send({ message: "Failed to create booking" });
  }
  return res.status(200).json(newBooking);
});

router.patch("/update", async (req, res) => {
  const { id, start, userId, durationMinutes } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing booking ID" });
  }
  if (
    start === undefined &&
    userId === undefined &&
    durationMinutes === undefined
  ) {
    return res.status(400).send({ message: "No update fields provided" });
  }

  const updateFields = {};
  if (start !== undefined) updateFields.start = start;
  if (userId !== undefined) updateFields.user_id = userId;
  if (durationMinutes !== undefined)
    updateFields.duration_minutes = durationMinutes;

  const response = await Bookings.update(updateFields, {
    where: { id },
  });

  if (!response[0]) {
    return res.status(404).send({ message: "Booking not found" });
  }
  return res.status(200).send({ message: "Booking successfully updated" });
});

router.delete("/delete", async (req, res) => {
  const id = Number(req.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid booking ID" });
  }

  const response = await Bookings.destroy({
    where: {
      id,
    },
  });

  if (!response) {
    return res.status(404).send({ message: "Booking not found" });
  }
  return res.status(200).send({ message: "Booking successfully deleted" });
});

export default router;
