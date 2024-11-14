const { poolPromise } = require("../config/db-connection");

const getAllStates = async (req, res) => {
  try {

    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM state");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching states"});
  }
};

module.exports = { getAllStates };