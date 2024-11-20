const express = require('express');
// const { isAuthenticated } = require('../middlewares/auth-middleware');
const { getAllPriorities } = require('../controllers/priority-controller');
const router = express.Router();

router.get('/all', getAllPriorities);

module.exports = router;
