const { Users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, password: hashedPassword });
    res.status(201).send({ error: false, message: 'User registered.', statusCode: 201, data: user });
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error registering user.', statusCode: 500, data: null });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ error: true, message: 'User not found.', statusCode: 404, data: null });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: true, message: 'Incorrect password.', statusCode: 401, data: null });
    }

    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '24h' });
    res.send({ error: false, message: 'User logged in.', statusCode: 200, data: { token: token } });
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error logging in user.', statusCode: 500, data: null });
  }
};

module.exports = { register, login };
