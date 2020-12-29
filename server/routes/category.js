const router = require('express').Router();
const Category = require('../models/category');

// POST request - create a new category

router.post("/categories", async (req, res) => {
    try {
        let category = new Category();
        category.type = req.body.type;;

        await category.save();

        res.json({
            status: true,
            message: "Successfully created a new category"
        })
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
});

// GET request - retrives all categories

router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find();
        res.json({
            success: true,
            categories: categories
        })
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
});

module.exports = router;