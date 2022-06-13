const express = require('express');
const fs = require('fs');
const { 
  getTalker,
  validationToken, 
  validationName, 
  validationAge, 
  validationTalk, 
  validateWachedAt, 
  validateRate } = require('../middlewares/talkerMiddleware');

const router = express.Router();

router.get('/', getTalker, (req, res) => {
  const { talker } = req;
  res.status(200).json(talker);
});

router.get('/:id', getTalker, (req, res) => {
  const { talker } = req;
  const { id } = req.params;
  const x = talker.find((t) => t.id === Number(id));
  if (!x) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(x);
});

router.post('/', 
  validationToken, 
  validationName, 
  validationAge, 
  validationTalk, 
  validateWachedAt, 
  validateRate,
  getTalker, 
  (req, res) => {
    const { talker } = req;
    const { name, age, talk } = req.body;
    const id = talker[talker.length - 1].id + 1;
    const newTalk = { name, age, id, talk };
    talker.push(newTalk);
    fs.writeFileSync('./talker.json', JSON.stringify(talker));
    res.status(201).json(newTalk);
});

router.put('/:id',
  validationToken, 
  validationName, 
  validationAge, 
  validationTalk, 
  validateWachedAt, 
  validateRate,
  getTalker, 
  (req, res) => {
    const { talker } = req;
    const id = Number(req.params.id);
    const { name, age, talk } = req.body;
    const editTalker = { name, age, id, talk };
    const listTalker = talker.map((t) => (t.id === id ? editTalker : t));
    fs.writeFileSync('./talker.json', JSON.stringify(listTalker));
    res.status(200).json(editTalker);
});

module.exports = router;