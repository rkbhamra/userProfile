const express = require('express');
const axios = require('axios');

const router = express.Router();

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
