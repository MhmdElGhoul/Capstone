const express = require("express");

module.exports = (pool) => {
  const router = express.Router();

  // Get all orders
  router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(result.rows);
  });

  // Create a new order
  router.post("/", async (req, res) => {
    const { itemName, specification, quantity, unit, imageURL, status, supplierResponse } = req.body;
    const result = await pool.query(
      `INSERT INTO orders (item_name, specification, quantity, unit, image_url, status, supplier_response)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [itemName, specification, quantity, unit, imageURL, status, supplierResponse]
    );
    res.status(201).json(result.rows[0]);
  });

  // Update an order
  router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { itemName, specification, quantity, unit, imageURL, status, supplierResponse } = req.body;

    const result = await pool.query(
      `UPDATE orders SET
        item_name=$1,
        specification=$2,
        quantity=$3,
        unit=$4,
        image_url=$5,
        status=$6,
        supplier_response=$7
       WHERE id=$8 RETURNING *`,
      [itemName, specification, quantity, unit, imageURL, status, supplierResponse, id]
    );
    res.json(result.rows[0]);
  });

  return router;
};
