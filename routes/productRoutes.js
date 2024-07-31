const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// POST a new product
router.post("/", async (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = new Product({ name, price, description });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET a product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// UPDATE a product
router.put("/:id", async (req, res) => {
  const { name, price, description } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, description },
    { new: true }
  );
  res.json(product);
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
