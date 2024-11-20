const express = require('express');
const router = express.Router();
const PurchaseHistory = require('../models/buyHistory'); // Correct import

// GET route to display purchase history
router.get('/', async (req, res) => {
    try {
        // Fetch purchase history from the database
        const purchaseHistory = await PurchaseHistory.find();

        // Render the EJS template and pass the data
        res.render('purchaseHistory/purHistory', {
            purchaseHistory, 
            layout: 'layouts/layout' 
        });
    } catch (error) {
        console.error('Error fetching purchase history:', error);

        // Render the page with an empty array if an error occurs
        res.render('purchaseHistory/purHistory', {
            purchaseHistory: [],
            layout: 'layouts/layout'
        });
    }
});

module.exports = router;
