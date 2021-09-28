const express = require('express'); //import express

// 1.
const router = express.Router();
// 2.
const shopController = require('../controllers/edenShop');
// 3.
router.get('/getAllProducts', shopController.getAllProducts);
router.get('/getOneProduct/:name', shopController.getOneProduct);
router.post('/newProduct', shopController.uploadImg, shopController.newProduct);
router.delete('/updateStock/:name', shopController.updateStock);
// 4. 
module.exports = router; // export to use in server.js