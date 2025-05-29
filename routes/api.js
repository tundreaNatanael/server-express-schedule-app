import express from 'express';
import { getUser, usePlatformData } from '../data/index.js';
import { Users } from '../db/db.js';
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await Users.findAll({
    attributes: ['firstname', 'lastname'],
    order: [['lastname', 'DESC']],
  });
  res.json(users);
});

router.get('/user/:id', (req, res) => {
  res.json(getUser(Number(req?.params?.id)));
});

router.post('/create/user', async (req, res) => {
  const { firstname, lastname, userType } = req.body;
  const newUser = await Users.create({
    firstname,
    lastname,
    user_type: userType,
  });
  res.status(200).send(newUser);
});

router.put('/update/user/:id', (req, res) => {
  res.status(200).send(req?.body);
});

router.delete('/delete/user', async (req, res) => {
  const userId = Number(req?.body?.id);
  const resDeletedUser = await Users.destroy({
    where: {
      id: userId,
    },
  });
  res.status(200).send(resDeletedUser);
});

router.get('/bookings', (req, res) => {
  res.json([
    {
      id: 1,
      userId: 1,
      startDate: '2023-10-01',
      endDate: '2023-10-02',
    },
    {
      id: 2,
      userId: 2,
      startDate: '2023-10-03',
      endDate: '2023-10-04',
    },
    {
      id: 3,
      userId: 1,
      startDate: '2023-8-01',
      endDate: '2023-10-02',
    },
  ]);
});

router.post('/create/booking', (req, res) => {
  res.status(200).send(req?.body);
});

router.delete('/delete/booking/:id', (req, res) => {
  res.status(200).send(req?.params?.id);
});

router.get('/platform', (req, res) => {
  res.json(usePlatformData());
});

router.put('/update/platform', (req, res) => {
  res.status(200).send(req?.body);
});

export default router;
