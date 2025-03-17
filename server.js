import express from "express";
import pkg from "pg";

const app = express();
const port = 4000;

// PostgreSQL Connection
const pool = new pkg.Pool({
  connectionString: process.env.Database
});
pool.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to PostgreSQL");
});

// Middleware to serve static HTML
app.use(express.static("."));
app.get("/", (req, res) => {
  res.send(2);
});
// API Route to Fetch Data
app.get("/data", (req, res) => {
  pool.query("insert into public.a(column1) values ('hey');", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});