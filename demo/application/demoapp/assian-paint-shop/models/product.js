const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    size: String, // e.g., 1 ltr, 5 ltr, 10 ltr, etc.
    stock: Number,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
