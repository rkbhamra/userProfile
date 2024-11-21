const express = require('express');
const router = express.Router();
const CreditCard = require('../models/creditCard');

// Show main page with form and existing cards
router.get('/', async (req, res) => {
    try {
        const creditCards = await CreditCard.find();
        res.render('purchasePref/index', { 
            creditCards: creditCards,
            layout: 'layouts/purchasePrefLayout'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new card
router.post('/add', async (req, res) => {
    const creditCard = new CreditCard({
        cardholderName: req.body.cardholderName,
        cardNumber: req.body.cardNumber,
        expirationMonth: req.body.expirationMonth,
        expirationYear: req.body.expirationYear,
        cvv: req.body.cvv
    });

    try {
        await creditCard.save();
        res.redirect('/purchasepref');
    } catch (err) {
        res.redirect('/purchasepref');
    }
});

// Delete card
router.delete('/:id', async (req, res) => {
    try {
        await CreditCard.findByIdAndDelete(req.params.id);
        res.redirect('/purchasepref');
    } catch (err) {
        res.redirect('/purchasepref');
    }
});

module.exports = router; 