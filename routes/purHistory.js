const express = require('express');
const router = express.Router();
const PurchaseHistory = require('../models/buyHistory'); // Database model for purchase history

/**
 * @api {get} /purchasehistory Get Purchase History
 * @apiName GetPurchaseHistory
 * @apiGroup PurchaseHistory
 *
 * @apiSuccess {Array} purchaseHistory List of purchase history records.
 * @apiSuccess {String} layout The layout being used for rendering.
 * @apiError {Array} purchaseHistory Empty array in case of error fetching the purchase history.
 */
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
