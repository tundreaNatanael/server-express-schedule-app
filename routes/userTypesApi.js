import express from "express";
import { UserTypes } from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const id = Number(req.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid user type ID" });
  }

  const userType = await UserTypes.findOne({
    where: { id },
  });

  if (!userType) {
    return res.status(404).send({ message: "User type not found" });
  }
  return res.status(200).json(userType);
});

router.get("/all", async (req, res) => {
  const userTypes = await UserTypes.findAll({
    order: [["nr_minutes_per_week", "ASC"]],
  });

  if (!userTypes || userTypes.length === 0) {
    return res.status(200).send({ message: "No user types found" });
  }
  return res.status(200).json(userTypes);
});

router.post("/create", async (req, res) => {
  const { name, nrMinutesPerWeek } = req.body;
  if (!name || !nrMinutesPerWeek) {
    return res.status(400).send({ message: "Missing fields" });
  }

  const newUserType = await UserTypes.create({
    name,
    nr_minutes_per_week: nrMinutesPerWeek,
  });

  if (!newUserType) {
    return res
      .status(500)
      .send({ message: "Failed to create the new user type." });
  }
  return res.status(200).json(newUserType);
});

router.patch("/update", async (req, res) => {
  const { id, name, nrMinutesPerWeek } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing booking ID" });
  }
  if (name === undefined && nrMinutesPerWeek === undefined) {
    return res.status(400).send({ message: "No update fields provided" });
  }

  const response = await UserTypes.update(
    {
      ...(name !== undefined && { name }),
      ...(nrMinutesPerWeek !== undefined && {
        nr_minutes_per_week: nrMinutesPerWeek,
      }),
    },
    {
      where: { id },
    }
  );

  if (!response[0]) {
    return res.status(404).send({ message: "User Type not found" });
  }
  return res.status(200).send({ message: "User Type successfully updated" });
});

router.delete("/delete", async (req, res) => {
  const id = Number(req.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid user type ID" });
  }

  const response = await UserTypes.destroy({
    where: {
      id,
    },
  });

  if (!response) {
    return res.status(404).send({ message: "User type not found" });
  }
  return res.status(200).send({ message: "User type successfully deleted" });
});

export default router;
