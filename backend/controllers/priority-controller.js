const { poolPromise } = require("../config/db-connection");

const getAllPriorities = async (req, res) => {
  try {

    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM priority order by value asc");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching states"});
  }
};

module.exports = { getAllPriorities };