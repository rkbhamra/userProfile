const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user'); // Import the User model

/**
 * @api {get} /api/contactinfo Get Contact Info
 * @apiName GetContactInfo
 * @apiGroup ContactInfo
 *
 * @apiSuccess {Object} user User contact information.
 * @apiError {String} message Error message if no user is found or invalid ID format.
 */
router.get('/', async (req, res) => {
    try {
        if (req.session.userId) {
            return res.redirect(`/contactInfo/${req.session.userId}`);
        }

        res.render('contactInfo/add');
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user information', error: err.message });
    }
});

/**
 * @api {get} /api/contactinfo/add Render "Add User" Form
 * @apiName GetAddUserForm
 * @apiGroup ContactInfo
 *
 * @apiSuccess {String} form Rendered form for adding new user.
 */
router.get('/add', (req, res) => {
    res.render('contactInfo/add');
});

/**
 * @api {post} /api/contactinfo/add Add New User
 * @apiName PostAddUser
 * @apiGroup ContactInfo
 *
 * @apiParam {String} UserName Name of the user.
 * @apiParam {String} UserEmail Email of the user.
 * @apiParam {String} UserPhone Phone number of the user.
 * @apiParam {String} UserAddress Address of the user.
 *
 * @apiSuccess {String} userId User ID after successful creation.
 * @apiError {String} message Error message if user creation fails.
 */
router.post('/add', async (req, res) => {
    try {
        const { UserName, UserEmail, UserPhone, UserAddress } = req.body;

        const newUser = new User({
            UserName,
            UserEmail,
            UserPhone,
            UserAddress,
        });

        await newUser.save();
        req.session.userId = newUser._id;
        res.redirect(`/contactInfo/${newUser._id}`);
    } catch (err) {
        res.status(500).json({ message: 'Error creating new user', error: err.message });
    }
});

/**
 * @api {get} /api/contactinfo/:userId View User Contact Info
 * @apiName GetUserContactInfo
 * @apiGroup ContactInfo
 *
 * @apiParam {String} userId User's unique ID.
 *
 * @apiSuccess {Object} user User's contact information.
 * @apiError {String} message Error message if the user is not found or ID format is invalid.
 */
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID format');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        req.session.userId = user._id;
        res.render('contactInfo/index', { user });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user information', error: err.message });
    }
});

/**
 * @api {post} /api/contactinfo/update Update User Contact Info
 * @apiName UpdateUserContactInfo
 * @apiGroup ContactInfo
 *
 * @apiParam {String} userId User's unique ID.
 * @apiParam {String} UserName Updated name of the user.
 * @apiParam {String} UserEmail Updated email of the user.
 * @apiParam {String} UserPhone Updated phone number of the user.
 * @apiParam {String} UserAddress Updated address of the user.
 *
 * @apiSuccess {String} message Success message with updated user ID.
 * @apiError {String} message Error message if update fails.
 */
router.post('/update', async (req, res) => {
    try {
        const { userId, UserName, UserEmail, UserPhone, UserAddress } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID format');
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { UserName, UserEmail, UserPhone, UserAddress },
            { new: true, upsert: false }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        req.session.userId = user._id;
        res.redirect(`/contactInfo/${userId}`);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user information', error: err.message });
    }
});

module.exports = router;
