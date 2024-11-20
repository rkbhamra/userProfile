const mongoose = require('mongoose');

const FleetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the User
    fleetSize: { type: Number, required: true },
    vehicles: [
        {

            plateNumber: { 
            type: String, 
            required: true },

            make: { 
            type: String, 
            required: true },

            model: { 
            type: String, 
            required: true },

            year: { 
            type: Number, 
            required: true },
        },
    ],
});

module.exports = mongoose.model('Fleet', FleetSchema);
