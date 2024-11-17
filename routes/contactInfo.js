const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const User = require('../models/user'); // Import the User model

// Route to display user contact information
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate the userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID format');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('contactInfo/index', { user });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user information', error: err.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { userId, 
            UserName, 
            UserEmail, 
            UserPhone, 
            UserAddress } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID format');
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { UserName, 
                UserEmail, 
                UserPhone, 
                UserAddress },
            { new: true, upsert: false } // Return the updated document, prevent creating a new one
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.redirect(`/contactInfo/${userId}`);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user information', error: err.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { UserName, 
            UserEmail, 
            UserPhone, 
            UserAddress } = req.body;

        const newUser = new User({
            UserName,
            UserEmail,
            UserPhone,
            UserAddress
        });

        await newUser.save();

        res.redirect(`/contactInfo/${newUser._id}`);
    } catch (err) {
        res.status(500).json({ message: 'Error creating new user', error: err.message });
    }
});

module.exports = router;
