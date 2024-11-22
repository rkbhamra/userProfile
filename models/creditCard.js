const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
  cardholderName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    // In production, you should encrypt this field
  },
  expirationMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  expirationYear: {
    type: Number,
    required: true
  },
  cvv: {
    type: String,
    required: true,
    // In production, you should encrypt this field
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CreditCard', creditCardSchema); 