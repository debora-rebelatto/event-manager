const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const authConfig = require("../../config/auth.json");

const User = require('../models/User');

exports.register = async function (req, res, next) {
  const { email } = req.body;
  try {
    if(await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' });

    const user = await User.create({ ...req.body, received: 0.0 });

    user.password = undefined;

    return res.status(200).send({ user })
  } catch(err) {
    console.log(err);
    return res.status(400).send({'error': err })
  }
};

exports.authenticate = async function (req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('password');

  if(!user)
    return res.status(400).send({ error: 'User not found' });

  if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid' })

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id })});
};

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
}
