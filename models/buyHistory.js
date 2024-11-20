const mongoose = require('mongoose');

const buyHistorySchema = new mongoose.Schema({
    purchaseId: { type: Number, required: true },
    userId: { type: String, ref: 'User', required: true },
    productId: { type: Number, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
});


module.exports = mongoose.model('PurchaseHistory', buyHistorySchema);
