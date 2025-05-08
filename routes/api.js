const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, usePlatformData } = require('../data/index.js');

router.get('/users', (req, res) => {
  res.json(getAllUsers());
});

router.get('/user/:id', (req, res) => {
  res.json(getUser(Number(req?.params?.id)));
});

router.post('/create/user', (req, res) => {
  res.status(200).send(req?.body);
});

router.put('/update/user/:id', (req, res) => {
  res.status(200).send(req?.body);
});

router.delete('/delete/user/:id', (req, res) => {
  res.status(200).send(req?.params?.id);
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

// Export the router
module.exports = router;
