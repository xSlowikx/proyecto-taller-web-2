const express = require('express');

const { getAllTasks, createTask, getDetail, updateTask, deleteTask } = require('../controllers/task-controller');
const router = express.Router();


router.get('/all', getAllTasks);
router.get('/get-detail/:id', getDetail);
router.post('/create', createTask);
router.put('/update/:id', updateTask);
router.put('/delete/:id', deleteTask);

module.exports = router;
