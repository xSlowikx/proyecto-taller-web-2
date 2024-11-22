const express = require('express');

const { getAllStates } = require('../controllers/state-controller');
const router = express.Router();

router.get('/all', getAllStates);

module.exports = router;
