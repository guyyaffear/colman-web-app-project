const mongoose = require("mongoose");

const Cart = mongoose.Schema({
  email: String,
  shoes: [
    {
      shoesId: { type: mongoose.Schema.Types.ObjectId, ref: "Shoes" },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", Cart);
