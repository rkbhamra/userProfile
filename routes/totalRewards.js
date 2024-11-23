const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * @api {get} /totalrewards Get Total Rewards
 * @apiName GetTotalRewards
 * @apiGroup Rewards
 *
 * @apiSuccess {Array} rewards List of rewards fetched from the external API.
 * @apiSuccess {Number} totalRewards The total points from all the rewards.
 * @apiError {String} message Error message when fetching rewards data fails.
 */
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://cps714-backend.onrender.com/activities');
        const rewards = response.data; 

        res.render('totalRewards', { 
            rewards, 
            totalRewards: rewards.reduce((sum, r) => sum + r.points_reward, 0) 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching rewards data');
    }
});

module.exports = router;
