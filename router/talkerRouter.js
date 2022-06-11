const express = require('express');
const fs = require('fs');

const router = express.Router();

const getTalker = (req, res, next) => {
  const response = fs.readFileSync('./talker.json');
  if (!response) return res.status(200).json([]);
  const talker = JSON.parse(response);
  req.talker = talker;
  next();
};

router.get('/', getTalker, (req, res) => {
  const { talker } = req;
  console.log(talker);
  res.status(200).json(talker);
});

router.get('/:id', getTalker, (req, res) => {
  const { talker } = req;
  const { id } = req.params;
  const x = talker.find((t) => t.id === Number(id));
  if (!x) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(x);
});

module.exports = router;