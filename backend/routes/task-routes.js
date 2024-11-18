const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-middleware');
const { getAllTasks, createTask, getDetail, updateTask, deleteTask } = require('../controllers/task-controller');
const router = express.Router();

// Rutas protegidas
router.get('/all', getAllTasks);
router.get('/get-detail/:id', isAuthenticated, getDetail);
router.post('/create', isAuthenticated, createTask);
router.post('/update/:id', isAuthenticated, updateTask);
router.post('/delete/:id', isAuthenticated, deleteTask);

module.exports = router;
