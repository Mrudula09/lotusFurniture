const router = require('express').Router();

const Product = require('../models/product');
// POST request - create a new product
router.post("/products", async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.body.photo;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();

        res.json({
            status: true,
            message: "Successfully saved product!!"
        })
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
});


// GET request - get all products



// GET request - get a single product


// PUT request - updates a single product


// DELETE request - deletes a single product

module.exports = router;