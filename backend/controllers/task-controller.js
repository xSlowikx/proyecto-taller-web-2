const { NVarChar } = require("mssql");
const { sql, poolPromise } = require("../config/db-connection");

const getAllTasks = async (req, res) => {
  try {
   

    const pool = await poolPromise;
    const result = await pool
      .request()
     
      .query("SELECT * FROM task where state_id != 5");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching tasks" });
  }
};

const getDetail = async (req, res) => {
  try {
    const taskId = req.params.id;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, taskId)
      .query("SELECT * FROM task WHERE id_task = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task: result.recordset[0] });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority_id } = req.body;
    console.log('Received data:', req.body); 
    if (!title || !description || !priority_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description)
      .input('priority', sql.Int, priority_id)
      .query(`
        INSERT INTO task (title, description, priority_id)
        VALUES (@title, @description, @priority);
        SELECT SCOPE_IDENTITY() AS taskId;
      `);
    const taskId = result.recordset[0].taskId;
    res.status(201).json({ message: 'Task created successfully', taskId });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Something went wrong while creating the task' });
  }
};


const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, state_id, priority_id } = req.body;

    if (!title || !description || state_id == null || priority_id == null) {
      return res.status(400).json({ error: "Missing required fields: title, description, state_id, or priority_id" });
    }

    const pool = await poolPromise;
    let query = `
      UPDATE task
      SET title = @title, 
          description = @description, 
          state_id = @state_id, 
          priority_id = @priority_id, 
          modified_at = @modified_at
    `;

    if (state_id === 4) {
      query += `, completed_at = @completed_at`;
    } else {
      query += `, completed_at = NULL`;
    }

    query += ` WHERE id_task = @id`;

    const request = pool
      .request()
      .input("id", sql.Int, taskId)
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .input("state_id", sql.Int, state_id)
      .input("priority_id", sql.Int, priority_id)
      .input("modified_at", sql.DateTime, new Date());

    if (state_id === 4) {
      request.input("completed_at", sql.DateTime, new Date());
    }

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Task not found or no changes made" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
};



const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id; 

    const pool = await poolPromise;

    const ownerCheck = await pool.request()
      .input("id", sql.Int, taskId)
      
      .query(`
        SELECT id_task 
        FROM task 
        WHERE id_task = @id
      `);

    if (ownerCheck.recordset.length === 0) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }

    
    const result = await pool.request()
      .input("id", sql.Int, taskId)
      .input("status", sql.Int, 5) 
      .input("modified_at", sql.DateTime, new Date())
      .query(`
        UPDATE task
        SET state_id = @status, modified_at = @modified_at
        WHERE id_task = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or no changes made" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
};


module.exports = { getAllTasks, createTask, getDetail, updateTask, deleteTask };
