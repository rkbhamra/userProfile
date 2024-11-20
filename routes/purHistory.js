const express = require('express');
const router = express.Router();
const PurchaseHistory = require('../models/buyHistory'); //database file

router.get('/', async (req, res) => {
    try {
        const purchaseHistory = await PurchaseHistory.find();

        res.render('purchaseHistory/purHistory', {
            purchaseHistory, 
            layout: 'layouts/layout' 
        });
    } catch (error) {
        console.error('Error fetching purchase history:', error);

        res.render('purchaseHistory/purHistory', {
            purchaseHistory: [],
            layout: 'layouts/layout'
        });
    }
});

module.exports = router;
