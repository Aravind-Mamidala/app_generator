const pool = require("../db/pool");

exports.createData = async (req, res) => {
  try {
    const entity = req.params.entity;
    const data = req.body;

    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
      INSERT INTO ${entity} (${columns}, user_id)
      VALUES (${placeholders}, $${values.length + 1})
    `;

    await pool.query(query, [...values, req.userId]);

    res.json({ message: `${entity} saved` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getData = async (req, res) => {
  try {
    const entity = req.params.entity;

    const result = await pool.query(
      `SELECT * FROM ${entity} WHERE user_id=$1`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};