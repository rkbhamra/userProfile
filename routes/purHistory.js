const express = require('express');
const router = express.Router();
const Fleet = require('../models/fleet');

// Debug logging
console.log('Fleet routes loading...');

// GET route to display the fleet size form
router.get('/', async (req, res) => {
    try {
        const tempUserId = '65f3c5d1e214e123456789ab';
        res.render('purchaseHistory/purHistory')
    }  catch (error) {
        console.error('Error fetching fleet:', error);
        res.render('purchaseHistory/purHistory', {
            layout: 'layouts/layout'
        });
    }
});


module.exports = router;
