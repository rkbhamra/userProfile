const mongoose = require('mongoose');

const buyHistorySchema = new mongoose.Schema({
    purchaseId: { type: Number, required: true },
    userId: { type: String, ref: 'User', required: true },
    plateNumber: { type: Number, ref: 'Fleet', required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
});


module.exports = mongoose.model('PurchaseHistory', buyHistorySchema);
