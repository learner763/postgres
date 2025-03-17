import express from "express";
import pkg from "pg";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port =  8080;

// Set __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL Connection
const pool = new pkg.Pool({
  connectionString: 'postgresql://neondb_owner:npg_sw58OFiXJGeC@ep-odd-truth-a5etezja-pooler.us-east-2.aws.neon.tech/neondb?sslmode=requires',
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
  res.sendFile(path.join(__dirname, "index.html"));
});

// API Route to Fetch Data
app.get("/data", (req, res) => {
  
    pool.query("SELECT * FROM public.b;", (err, results) => {
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