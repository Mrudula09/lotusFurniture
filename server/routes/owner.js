const router = require('express').Router();
const Owner = require('../models/owner');

// POST request - create a new owner

router.post("/owners", async (req, res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;

        await owner.save();

        res.json({
            status: true,
            message: "Successfully created a new owner"
        })
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
});

// GET request - retrives all owners

router.get('/owners', async (req, res) => {
    try {
        let owners = await Owner.find();
        res.json({
            success: true,
            owners: owners
        })
    } catch(err) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
});

module.exports = router;