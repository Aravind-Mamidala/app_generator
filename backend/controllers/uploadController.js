const pool = require("../db/pool");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

exports.uploadCSV = [
  upload.single("file"),
  async (req, res) => {
    try {
      const entity = req.params.entity;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const results = [];

      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          try {
            console.log("Upload hit");
            console.log("CSV Rows:", results);
            console.log("User ID:", req.userId);

            if (results.length === 0) {
              return res.status(400).json({ error: "CSV is empty" });
            }

            for (let row of results) {
              // 🔥 attach user_id
              row.user_id = req.userId;

              const keys = Object.keys(row);
              const values = Object.values(row);

              const columns = keys.join(", ");
              const placeholders = keys
                .map((_, i) => `$${i + 1}`)
                .join(", ");

              const query = `
                INSERT INTO ${entity} (${columns})
                VALUES (${placeholders})
              `;

              console.log("Running Query:", query, values);

              await pool.query(query, values);
            }

            // delete uploaded file
            fs.unlinkSync(req.file.path);

            res.json({ message: "CSV uploaded successfully" });
          } catch (err) {
            console.error("INSERT ERROR:", err);
            res.status(500).json({ error: err.message });
          }
        })
        .on("error", (err) => {
          console.error("CSV READ ERROR:", err);
          res.status(500).json({ error: err.message });
        });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  },
];