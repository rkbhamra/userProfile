const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const User = require('../models/user'); // Import the User model

// Route to handle the "Contact Info" link
router.get('/', async (req, res) => {
    try {
        // Check if a user ID exists in the session
        if (req.session.userId) {
            // If a user ID is in the session, redirect to their contact info page
            return res.redirect(`/contactInfo/${req.session.userId}`);
        }

        // If no session exists, render the "Add User" form
        res.render('contactInfo/add');
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user information', error: err.message });
    }
});

// Route to render the "Add User" form
router.get('/add', (req, res) => {
    res.render('contactInfo/add');
});

// Route to handle "Add User" form submission
router.post('/add', async (req, res) => {
    try {
        const { UserName, UserEmail, UserPhone, UserAddress } = req.body;

        // Create a new user in the database
        const newUser = new User({
            UserName,
            UserEmail,
            UserPhone,
            UserAddress,
        });

        await newUser.save();

        // Save the new user's ID in the session
        req.session.userId = newUser._id;

        // Redirect to the new user's contact info page
        res.redirect(`/contactInfo/${newUser._id}`);
    } catch (err) {
        res.status(500).json({ message: 'Error creating new user', error: err.message });
    }
});

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

        // Save the user's ID in the session
        req.session.userId = user._id;

        // Render the user's contact info page
        res.render('contactInfo/index', { user });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user information', error: err.message });
    }
});

// Route to update user contact information
router.post('/update', async (req, res) => {
    try {
        const { userId, UserName, UserEmail, UserPhone, UserAddress } = req.body;

        // Validate the userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID format');
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { UserName, UserEmail, UserPhone, UserAddress },
            { new: true, upsert: false } // Return the updated document, prevent creating a new one
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update the session with the current user's ID
        req.session.userId = user._id;

        // Redirect to the updated user's contact info page
        res.redirect(`/contactInfo/${userId}`);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user information', error: err.message });
    }
});

module.exports = router;
