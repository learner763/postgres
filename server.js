import express from "express";
import pkg from "pg";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Set __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL Connection
/*const pool = new pkg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to PostgreSQL");
});
*/
// Middleware to serve static HTML
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API Route to Fetch Data
/*app.get("/data", (req, res) => {
  pool.query("INSERT INTO public.a (column1) VALUES ('hey');", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    pool.query("SELECT * FROM public.a;", (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results.rows);
    });
  });
});*/

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});