const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).send({ Error: 'Registration failed', body: err});
  }
});

module.exports = app => app.use('/auth', router);