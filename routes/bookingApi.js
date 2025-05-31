import express from "express";
import { Op } from "sequelize";

import { Bookings, Users } from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const id = Number(req.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid booking ID" });
  }

  const booking = await Bookings.findOne({
    where: { id },
    attributes: ["id", "start", "duration_minutes", "createdAt"],
    include: [
      {
        model: Users,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });

  if (!booking) {
    return res.status(404).send({ message: "Booking not found" });
  }
  return res.status(200).json({
    id: booking.id,
    start: booking.start,
    durationMinutes: booking.duration_minutes,
    createdAt: booking.createdAt,
    user: booking.User
      ? {
          id: booking.User.id,
          firstname: booking.User.firstname,
          lastname: booking.User.lastname,
        }
      : null,
  });
});

router.get("/range", async (req, res) => {
  const { start, end } = req.body;
  if (!start || !end) {
    return res.status(400).send({ message: "Missing start or end date" });
  }

  const bookings = await Bookings.findAll({
    where: {
      start: {
        [Op.gte]: start,
        [Op.lte]: end,
      },
    },
    order: [["start", "DESC"]],
    attributes: ["id", "start", "duration_minutes", "createdAt"],
    include: [
      {
        model: Users,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });

  if (!bookings || bookings.length === 0) {
    return res.status(200).send({ message: "No bookings found in range" });
  }
  return res.status(200).json(
    bookings.map((booking) => ({
      id: booking.id,
      start: booking.start,
      durationMinutes: booking.duration_minutes,
      createdAt: booking.createdAt,
      user: booking.User
        ? {
            id: booking.User.id,
            firstname: booking.User.firstname,
            lastname: booking.User.lastname,
          }
        : null,
    }))
  );
});

router.get("/all", async (req, res) => {
  const bookings = await Bookings.findAll({
    order: [["start", "DESC"]],
    attributes: ["id", "start", "duration_minutes", "createdAt"],
    include: [
      {
        model: Users,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });

  if (!bookings || bookings.length === 0) {
    return res.status(200).send({ message: "No bookings found" });
  }

  console.log("Bookings found:", bookings);

  return res.status(200).json(
    bookings.map((booking) => ({
      id: booking.id,
      start: booking.start,
      durationMinutes: booking.duration_minutes,
      createdAt: booking.createdAt,
      user: booking.User
        ? {
            id: booking.User.id,
            firstname: booking.User.firstname,
            lastname: booking.User.lastname,
          }
        : null,
    }))
  );
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
    return res
      .status(500)
      .send({ message: "Failed to create the new booking." });
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
