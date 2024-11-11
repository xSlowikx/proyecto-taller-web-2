const { NVarChar } = require("mssql");
const { sql, poolPromise } = require("../config/db-connection");

const getTasks = async (req, res) => {
  try {
    const userId = req.session.user.id; // Obtener el ID del usuario autenticado

    // Consulta para obtener tareas específicas del usuario
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM task WHERE user_id = @userId");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching tasks" });
  }
};

const taskDetail = async (req, res) => {
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
        const { title, description, status, priority } = req.body; // Datos recibidos del cliente
        const pool = await poolPromise; // Conexión a la base de datos

        const result = await pool
            .request()
            .input("title", sql.NVarChar, title)
            .input("description", sql.NVarChar, description) // Corrección en el tipo de dato
            .input("status", sql.Int, status)
            .input("priority", sql.Int, priority)
            .query(`
                INSERT INTO task (title, description, status, priority)
                VALUES (@title, @description, @status, @priority);
                SELECT SCOPE_IDENTITY() AS taskId;
            `);

        const taskId = result.recordset[0].taskId; // Obtener el ID del task recién creado
        res.status(201).json({ message: 'Task created successfully', taskId });
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Something went wrong while creating the task' });
    }
};


const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Capturar el ID dinámico
    const { title, description, status, priority } = req.body; // Capturar los datos del body
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("id", sql.Int, taskId)
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .input("status", sql.Int, status)
      .input("priority", sql.Int, priority).query(`
                UPDATE tasks
                SET title = @title, description = @description, status = @status, priority = @priority
                WHERE id_task = @id
            `);

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or no changes made" });
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

    const result = await pool.request().input("id", sql.Int, taskId).query(`
                UPDATE task
                SET status = 5 WHERE id = @id
            `);
    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or no changes made" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

module.exports = { getTasks, createTask, taskDetail, updateTask, deleteTask };
