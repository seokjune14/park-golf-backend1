const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db");
const lessonRoutes = require("./routes/lessonRoutes"); 
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const findRoutes = require("./routes/findRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/login", loginRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/find", findRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/cart", cartRoutes);


app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.send(`DB 연결 성공! 결과: ${rows[0].result}`);
  } catch (err) {
    console.error("DB 연결 실패:", err);
    res.status(500).send("DB 연결 실패");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중! http://localhost:${PORT}`);
});
