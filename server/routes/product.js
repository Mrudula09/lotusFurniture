const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');

// POST request - create a new product
router.post("/products", upload.single("photo"), async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
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

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            success: true,
            products: products
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

// GET request - get a single product

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        res.json({
            success: true,
            product: product
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

// PUT request - updates a single product

router.put('/products/:id', upload.single("photo"), async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id }, 
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.categoryID,
                    owner: req.body.ownerID,
                    price: req.body.price,
                    stockQuantity: req.body.stockQuantity,
                    photo: req.file.location,
                },
            },
            { upsert: true },
        );
        res.json({
            success: true,
            updatedProduct: product
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

// DELETE request - deletes a single product

router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
        if (deletedProduct) {
            res.json({
                success: true,
                message: "Successfully deleted!!"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

module.exports = router;