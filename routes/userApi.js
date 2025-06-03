import express from "express";
import { Users, UserTypes } from "../db/db.js";
import { literal } from "sequelize";
const router = express.Router();

router.get("/", async (req, res) => {
  const id = Number(req.query?.id);
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }

  const user = await Users.findOne({
    where: { id },
    attributes: [
      "id",
      "firstname",
      "lastname",
      "email",
      "createdAt",
      [
        literal(`(
          SELECT COALESCE(SUM(duration_minutes), 0)
          FROM Bookings
          WHERE Bookings.user_id = Users.id
        )`),
        "sumUsedMinutes",
      ],
    ],
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

  return res.status(200).json({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    createdAt: user.createdAt,
    userType: user.User_Type
      ? {
          id: user.User_Type.id,
          name: user.User_Type.name,
          nrMinutesPerWeek: user.User_Type.nr_minutes_per_week,
        }
      : null,
    sumUsedMinutes: Number(user.dataValues.sumUsedMinutes) || 0,
  });
});

router.get("/all", async (req, res) => {
  const users = await Users.findAll({
    order: [["lastname", "ASC"]],
    attributes: [
      "id",
      "firstname",
      "lastname",
      "email",
      "createdAt",
      [
        literal(`(
          SELECT COALESCE(SUM(\`duration_minutes\`), 0)
          FROM \`Bookings\`
          WHERE \`Bookings\`.\`user_id\` = \`Users\`.\`id\`
        )`),
        "sumUsedMinutes",
      ],
    ],
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
  return res.status(200).json(
    users.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      createdAt: user.createdAt,
      userType: user.User_Type
        ? {
            id: user.User_Type.id,
            name: user.User_Type.name,
            nrMinutesPerWeek: user.User_Type.nr_minutes_per_week,
          }
        : null,
      sumUsedMinutes: Number(user.dataValues.sumUsedMinutes) || 0,
    }))
  );
});

router.post("/create", async (req, res) => {
  const { firstname, lastname, email, userType } = req.body;
  if (!firstname || !lastname || !email || !userType) {
    return res.status(400).send({ message: "Missing fields" });
  }

  const newUser = await Users.create({
    firstname,
    lastname,
    email,
    user_type: userType,
  });

  if (!newUser) {
    return res.status(500).send({ message: "Failed to create the new user." });
  }
  return res.status(200).json({ message: "User succesfully created" });
});

router.patch("/update", async (req, res) => {
  const { id, firstname, lastname, email, userType } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).send({ message: "Invalid or missing user ID" });
  }
  if (!(firstname || lastname || email || userType)) {
    return res.status(400).send({ message: "No updates fields" });
  }

  const sequelize = Users.sequelize;
  const transaction = await sequelize.transaction();
  const response = await Users.update(
    {
      ...(firstname !== undefined && { firstname }),
      ...(lastname !== undefined && { lastname }),
      ...(email !== undefined && { email }),
      ...(userType !== undefined && { user_type: userType }),
    },
    {
      where: { id },
    },
    transaction
  );

  if (!response[0]) {
    await transaction.rollback();
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
