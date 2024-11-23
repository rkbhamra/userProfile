const express = require('express');
const router = express.Router();
const CreditCard = require('../models/creditCard');

/**
 * @api {get} /api/rewards Get Rewards
 * @apiName GetRewards
 * @apiGroup Rewards
 *
 * @apiSuccess {Boolean} success Indicates success.
 * @apiSuccess {Array} rewards List of rewards.
 */

/**
 * @api {get} /purchasepref Show Credit Cards
 * @apiName ShowCreditCards
 * @apiGroup CreditCards
 *
 * @apiSuccess {Array} creditCards List of credit cards saved in the database.
 * @apiSuccess {String} layout The layout being used for rendering.
 */
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

/**
 * @api {post} /purchasepref/add Add Credit Card
 * @apiName AddCreditCard
 * @apiGroup CreditCards
 *
 * @apiParam {String} cardholderName The name of the cardholder.
 * @apiParam {String} cardNumber The card number.
 * @apiParam {Number} expirationMonth The expiration month of the card.
 * @apiParam {Number} expirationYear The expiration year of the card.
 * @apiParam {String} cvv The CVV of the card.
 *
 * @apiSuccess {String} redirect Redirection URL after the card is added.
 * @apiError {String} redirect Redirection URL if an error occurs.
 */
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

/**
 * @api {delete} /purchasepref/:id Delete Credit Card
 * @apiName DeleteCreditCard
 * @apiGroup CreditCards
 *
 * @apiParam {String} id The unique ID of the credit card to be deleted.
 *
 * @apiSuccess {String} redirect Redirection URL after the card is deleted.
 * @apiError {String} redirect Redirection URL if an error occurs.
 */
router.delete('/:id', async (req, res) => {
    try {
        await CreditCard.findByIdAndDelete(req.params.id);
        res.redirect('/purchasepref');
    } catch (err) {
        res.redirect('/purchasepref');
    }
});

module.exports = router;
