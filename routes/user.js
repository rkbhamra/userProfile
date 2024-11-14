// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import the User model

// Define routes for user actions, e.g., viewing and editing contact information
router.get('/edit-contact-info', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // Assuming you have user ID available
    res.render('edit-contact-info', { user });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.post('/edit-contact-info', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.phone = req.body.phone;  // Update fields as needed
      user.vehicleFleetSize = req.body.vehicleFleetSize;
      user.purchasePreferences = req.body.purchasePreferences;
      await user.save();
      res.redirect('/profile');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/edit-contact-info');
  }
});

module.exports = router;
