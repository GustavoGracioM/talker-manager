const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', async (req, res) => {
  const response = fs.readFileSync('./talker.json');
  if (!response) return res.status(200).json([]);
  const talker = JSON.parse(response);
  res.status(200).json(talker);
});

module.exports = router;