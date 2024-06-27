const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Add new product
router.get('/add', (req, res) => {
    res.render('addProduct');
});

router.post('/add', async (req, res) => {
    const { name, category, size, stock, price } = req.body;
    const newProduct = new Product({ name, category, size, stock, price });
    await newProduct.save();
    res.redirect('/');
});

// Invoice creation
router.get('/invoice', async (req, res) => {
    const products = await Product.find();
    res.render('invoice', { products });
});

router.post('/invoice', async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    const total = product.price * quantity;
    const gst = total * 0.18;
    const grandTotal = total + gst;
    res.render('invoice', { product, quantity, total, gst, grandTotal });
});

// Edit product
router.get('/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('editProduct', { product });
});

router.post('/edit/:id', async (req, res) => {
    const { name, category, size, stock, price } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, category, size, stock, price });
    res.redirect('/');
});

// Delete product
router.post('/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
