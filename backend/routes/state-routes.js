const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-middleware');
const { getAllStates } = require('../controllers/state-controller');
const router = express.Router();

router.get('/all', isAuthenticated, getAllStates);

module.exports = router;