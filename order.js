const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  itemName: String,
  specification: String,
  quantity: Number,
  unit: String,
  imageURL: String,
  status: String,
  supplierResponse: {
    notAvailable: Boolean,
    availableQuantity: Number,
    price: Number,
    wellReceived: Boolean,
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
