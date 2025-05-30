import express from "express";
import { Users, UserTypes } from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const id = Number(req?.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }

  const user = await Users.findOne({
    where: { id },
    attributes: ["id", "firstname", "lastname", "createdAt"],
    include: [
      {
        model: UserTypes,
        attributes: ["id", "name", "nr_minutes_per_week"],
      },
    ],
  });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  return res.status(200).json(user);
});

router.get("/all", async (req, res) => {
  const users = await Users.findAll({
    order: [["lastname", "ASC"]],
    attributes: ["id", "firstname", "lastname", "createdAt"],
    include: [
      {
        model: UserTypes,
        attributes: ["id", "name", "nr_minutes_per_week"],
      },
    ],
  });

  if (!users || users.length === 0) {
    return res.status(200).send({ message: "No users found" });
  }
  return res.status(200).json(users);
});

router.post("/create", async (req, res) => {
  const { firstname, lastname, userType } = req.body;
  if (!firstname || !lastname || !userType) {
    return res.status(400).send({ message: "Missing fields" });
  }

  const newUser = await Users.create({
    firstname,
    lastname,
    user_type: userType,
  });

  if (!newUser) {
    return res.status(500).send({ message: "Failed to create the new user." });
  }
  return res.status(200).json(newUser);
});

router.patch("/update", async (req, res) => {
  const { id, firstname, lastname, userType } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing user ID" });
  }
  if (!(firstname || lastname || userType)) {
    return res.status(400).send({ message: "No updates fields" });
  }

  const response = await Users.update(
    {
      ...(firstname !== undefined && { firstname }),
      ...(lastname !== undefined && { lastname }),
      ...(userType !== undefined && { user_type: userType }),
    },
    {
      where: { id },
    }
  );

  if (!response[0]) {
    return res.status(404).send({ message: "User not found" });
  }
  return res.status(200).send({ message: "User successfully updated" });
});

router.delete("/delete", async (req, res) => {
  const id = Number(req.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }

  const response = await Users.destroy({
    where: {
      id,
    },
  });

  if (!response) {
    return res.status(404).send({ message: "User not found" });
  }
  return res.status(200).send({ message: "User successfully deleted" });
});

export default router;
