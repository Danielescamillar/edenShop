const mongoose = require('mongoose'); //import mongoose

// tea schema
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    keywords: String,
    stock: Number,
    comments: [{ text: String, date: { type: String, default: new Date() } }]
});

const Product = mongoose.model('Product', ProductSchema); //convert to model named Tea
module.exports = Product; //export for controller use