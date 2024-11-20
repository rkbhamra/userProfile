const express = require('express');
const router = express.Router();
const Fleet = require('../models/fleet');

// Debug logging
console.log('Fleet routes loading...');

// GET route to display the fleet size form
router.get('/', async (req, res) => {
    try {
        const tempUserId = '65f3c5d1e214e123456789ab';
        const fleet = await Fleet.findOne({ userId: tempUserId });
        res.render('fleet/fleetsize', {
            layout: 'layouts/layout',
            vehicles: fleet ? fleet.vehicles : [],
            fleetSize: fleet ? fleet.vehicles.length : 0,
            error: null
        });
    } catch (error) {
        console.error('Error fetching fleet:', error);
        res.render('fleet/fleetsize', {
            layout: 'layouts/layout',
            vehicles: [],
            fleetSize: 0,
            error: null
        });
    }
});

// POST route to handle form submission
router.post('/', async (req, res) => {
    console.log('POST /fleetsize route hit');
    try {
        const { plateNumber, make, model, year } = req.body;
        const tempUserId = '65f3c5d1e214e123456789ab';
        
        // Find existing fleet for user or create new one
        let fleet = await Fleet.findOne({ userId: tempUserId });
        
        if (!fleet) {
            fleet = new Fleet({
                userId: tempUserId,
                fleetSize: 0,
                vehicles: []
            });
        }

        // Check if fleet size limit is reached
        if (fleet.vehicles.length >= 5) {
            return res.render('fleet/fleetsize', {
                layout: 'layouts/layout',
                vehicles: fleet.vehicles,
                error: 'Maximum fleet size of 5 vehicles reached'
            });
        }

        fleet.vehicles.push({
            plateNumber,
            make,
            model,
            year: parseInt(year)
        });
        
        fleet.fleetSize = fleet.vehicles.length;
        
        await fleet.save();
        res.redirect('/fleetsize');
    } catch (error) {
        console.error('Error saving fleet:', error);
        res.status(500).send('Error saving vehicle data');
    }
});

// Add this new route after your existing routes
router.delete('/:plateNumber', async (req, res) => {
    try {
        const tempUserId = '65f3c5d1e214e123456789ab';
        const plateNumber = req.params.plateNumber;
        
        // Find the fleet
        const fleet = await Fleet.findOne({ userId: tempUserId });
        
        if (!fleet) {
            return res.status(404).send('Fleet not found');
        }
        
        // Remove the vehicle with matching plate number
        fleet.vehicles = fleet.vehicles.filter(vehicle => vehicle.plateNumber !== plateNumber);
        
        // Update fleet size
        fleet.fleetSize = fleet.vehicles.length;
        
        await fleet.save();
        res.redirect('/fleetsize');
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).send('Error deleting vehicle');
    }
});

module.exports = router;
