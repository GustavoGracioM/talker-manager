const express = require('express');
const randtoken = require('rand-token');

const router = express.Router();

const validationEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
  if (!regex.test(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  next();
};

const validationPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  if (password.length <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};

router.post('/', validationEmail, validationPassword, (req, res) => {
  const token = randtoken.generate(16);
  return res.status(200).json({ token });
});

module.exports = router;