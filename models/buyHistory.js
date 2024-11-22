const mongoose = require('mongoose');

const buyHistorySchema = new mongoose.Schema({
    purchaseId: { type: Number, required: true },
    plateNumber: { type: String, ref: 'Fleet', required: true },
    purchaseDate: { type: Date, required: true },
    points: { type: String, required: true },
});


module.exports = mongoose.model('PurchaseHistory', buyHistorySchema);
