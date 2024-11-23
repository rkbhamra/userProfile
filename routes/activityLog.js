const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * @api {get} /activitylog Get Activity Logs
 * @apiName GetActivityLogs
 * @apiGroup ActivityLogs
 *
 * @apiSuccess {Array} activityLogs List of activity logs fetched from the external API.
 * @apiError {String} message Error message when fetching activity logs data fails.
 */
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://cps714-backend.onrender.com/activities');
        const activityLogs = response.data; 

        res.render('activityLog', { activityLogs }); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching activity logs data');
    }
});

module.exports = router;
