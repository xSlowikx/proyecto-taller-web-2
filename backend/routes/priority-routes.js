const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-middleware');
const { getAllPriorities } = require('../controllers/priority-controller');
const router = express.Router();

router.get('/all', isAuthenticated, getAllPriorities);

module.exports = router;
