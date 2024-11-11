const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-middleware');
const { getTasks, createTask, taskDetail, updateTask, deleteTask } = require('../controllers/task-controller');
const router = express.Router();

// Rutas protegidas
router.get('/get-tasks', isAuthenticated, getTasks);
router.get('/task-detail/:id', isAuthenticated, taskDetail);
router.post('/task/create-task', isAuthenticated, createTask);
router.put('/task/update-task/:id', isAuthenticated, updateTask);
router.put('/task/delete-task/:id', isAuthenticated, deleteTask);

module.exports = router;
