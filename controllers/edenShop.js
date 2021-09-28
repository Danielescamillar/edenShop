//import product model
const product = require('../models/edenShop');
const multer = require('multer');

//POST tea
const newProduct = (req, res) => {
    //check if the product name already exists in db
    product.findOne({ name: req.body.name }, (data) => {

        //if product not in db, add it
        if (data === null) {
            //create a new product object using the Tea model and req.body
            const newProduct = new product({
                name: req.body.name,
                image: req.file.path, // placeholder for now
                keywords: req.body.keywords,
                stock: req.body.stock,
            })

            // save this object to database
            newProduct.save((err, data) => {
                    if (err) return res.json({ Error: err });
                    return res.json(data);
                })
                //if product is in db, return a message to inform it exists            
        } else {
            return res.json({ message: "Product already exists" });
        }
    })
};

const updateStock = (req, res) => {

    let name = req.params.name; //get the product sold
    let productSold = req.body.stock;

    //find the tea object
    product.findOne({ name: name }, (err, data) => {
        if (err || !data || !productSold || (data.stock - productSold < 0)) {
            return res.json({ message: "Product doesn't exist or stocks aren't avalaible ." });
        } else {
            //add comment to comments array of the tea object
            data.stock = data.stock - productSold;
            //save changes to db
            data.save(err => {
                if (err) {
                    return res.json({ message: "Comment failed to add.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

const getAllProducts = (req, res) => {
    product.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

const getOneProduct = (req, res) => {
    let name = req.params.name; //get the product name

    //find the specific product with that name
    product.findOne({ name: name }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Product doesn't exist." });
        } else return res.json(data); //return the product object if found
    });
};

//Create Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({ storage: storage }).single('image');

module.exports = { newProduct, updateStock, getAllProducts, getOneProduct, uploadImg };