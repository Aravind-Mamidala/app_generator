const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*", // for now (later restrict)
}));

app.use(express.json());

// 🔥 Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/dynamicRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));

app.listen(5001, () => {
  console.log("Server running on port 5001");
});