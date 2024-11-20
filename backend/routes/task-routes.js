const express = require('express');
// const { isAuthenticated } = require('../middlewares/auth-middleware');  Esta feature quedara postergada a una futura iteracion
const { getAllTasks, createTask, getDetail, updateTask, deleteTask } = require('../controllers/task-controller');
const router = express.Router();

// Rutas protegidas
router.get('/all', getAllTasks);
router.get('/get-detail/:id', getDetail);
router.post('/create', createTask);
router.post('/update/:id', updateTask);
router.post('/delete/:id', deleteTask);

module.exports = router;
