const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    item_name TEXT,
    specification TEXT,
    quantity INTEGER,
    unit TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'Pending',
    supplier_response JSONB DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const ordersRouter = require("./routes/orders");
app.use("/api/orders", ordersRouter(pool));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
