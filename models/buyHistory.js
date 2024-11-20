const mongoose = require('mongoose');

const buyHistorySchema = new mongoose.Schema({
    purchaseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
});


module.exports = mongoose.model('PurchaseHistory', buyHistorySchema);