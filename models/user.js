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
   
});

module.exports = mongoose.model('User', UserSchema);
