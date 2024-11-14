const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String, 
        required: true 
    },  
    UserEmail: { 
        type: String, 
        required: true 
    },  
    UserPhone: { 
        type: String 
    },    
    UserAddress: { 
        type: String 
    },
    fleets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fleet' }], // Reference to multiple fleets
});

module.exports = mongoose.model('User', UserSchema);
