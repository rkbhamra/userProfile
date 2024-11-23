const express = require('express');
const router = express.Router();
const Fleet = require('../models/fleet');

// Debug logging
console.log('Fleet routes loading...');

/**
 * @api {get} / Get Fleet Size Form
 * @apiName GetFleetSizeForm
 * @apiGroup Fleet
 *
 * @apiSuccess {String} layout The layout being rendered.
 * @apiSuccess {Array} vehicles Array of vehicles in the fleet.
 * @apiSuccess {Number} fleetSize The size of the fleet.
 * @apiSuccess {String|null} error Any error message to be displayed.
 */
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

/**
 * @api {post} / Add Vehicle to Fleet
 * @apiName AddVehicle
 * @apiGroup Fleet
 *
 * @apiBody {String} plateNumber Vehicle's plate number.
 * @apiBody {String} make Vehicle's make.
 * @apiBody {String} model Vehicle's model.
 * @apiBody {Number} year Vehicle's year.
 *
 * @apiSuccess {String} redirect Redirection URL after successful addition.
 * @apiError {String} error Error message if fleet size limit is reached.
 */
router.post('/', async (req, res) => {
    console.log('POST /fleetsize route hit');
    try {
        const { plateNumber, make, model, year } = req.body;
        const tempUserId = '65f3c5d1e214e123456789ab';

        let fleet = await Fleet.findOne({ userId: tempUserId });

        if (!fleet) {
            fleet = new Fleet({
                userId: tempUserId,
                fleetSize: 0,
                vehicles: []
            });
        }

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

/**
 * @api {delete} /:plateNumber Remove Vehicle from Fleet
 * @apiName RemoveVehicle
 * @apiGroup Fleet
 *
 * @apiParam {String} plateNumber The plate number of the vehicle to remove.
 *
 * @apiSuccess {String} redirect Redirection URL after successful deletion.
 * @apiError {String} error Error message if deletion fails.
 */
router.delete('/:plateNumber', async (req, res) => {
    try {
        const tempUserId = '65f3c5d1e214e123456789ab';
        const plateNumber = req.params.plateNumber;

        const fleet = await Fleet.findOne({ userId: tempUserId });

        if (!fleet) {
            return res.status(404).send('Fleet not found');
        }

        fleet.vehicles = fleet.vehicles.filter(vehicle => vehicle.plateNumber !== plateNumber);

        fleet.fleetSize = fleet.vehicles.length;

        await fleet.save();
        res.redirect('/fleetsize');
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).send('Error deleting vehicle');
    }
});

module.exports = router;
