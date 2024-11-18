const { NVarChar } = require("mssql");
const { sql, poolPromise } = require("../config/db-connection");

const getAllTasks = async (req, res) => {
  try {
    // to do
    //const userId = req.session.user.id; // Obtener el ID del usuario autenticado

    // Consulta para obtener tareas específicas del usuario
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM task");

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
    const { title, description, priority } = req.body;
    const userId = req.session.user.id;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .input("priority", sql.Int, priority)
      .input("userId", sql.Int, userId).query(`
                INSERT INTO task (title, description, priority_id, user_id)
                VALUES (@title, @description, @priority, @userId);
                SELECT SCOPE_IDENTITY() AS taskId;
            `);
    const taskId = result.recordset[0].taskId;
    res.status(201).json({ message: "Task created successfully", taskId });
  } catch (err) {
    console.error("Error creating task:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, priority } = req.body;
    const pool = await poolPromise;

    let query = `
      UPDATE task
      SET title = @title, 
          description = @description, 
          state_id = @status, 
          priority_id = @priority, 
          modified_at = @modified_at
    `;

    if (status === 4) {
      query += `, completed_at = @completed_at`;
    }

    query += ` WHERE id_task = @id`;

    const request = pool
      .request()
      .input("id", sql.Int, taskId)
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .input("status", sql.Int, status)
      .input("modified_at", sql.DateTime, new Date())
      .input("priority", sql.Int, priority);

    if (status === 4) {
      request.input("completed_at", sql.DateTime, new Date());
    }

    const result = await request.query(query);

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
    const taskId = req.params.id; // Capturar ID de la tarea
    const userId = req.session.user?.id; // Capturar ID del usuario autenticado desde la sesión

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" }); // Si no hay sesión activa
    }

    const pool = await poolPromise;

    // Verificar que la tarea pertenece al usuario autenticado
    const ownerCheck = await pool.request()
      .input("id", sql.Int, taskId)
      .input("userId", sql.Int, userId)
      .query(`
        SELECT id_task 
        FROM task 
        WHERE id_task = @id AND user_id = @userId
      `);

    if (ownerCheck.recordset.length === 0) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }

    // Actualizar estado de la tarea a "eliminada" (state_id = 5)
    const result = await pool.request()
      .input("id", sql.Int, taskId)
      .input("status", sql.Int, 5) // Estado de eliminado
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
