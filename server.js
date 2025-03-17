import express from "express";
import pkg from "pg";

const app = express();
const port = 4000;

// PostgreSQL Connection
const pool = new pkg.Pool({
  connectionString: 'postgresql://neondb_owner:npg_sw58OFiXJGeC@ep-odd-truth-a5etezja-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
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

// API Route to Fetch Data
app.get("/data", (req, res) => {
  pool.query("drop table public.a;", (err, results) => {
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