const mongoose = require("mongoose"); 
const shoesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 1000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        company: {
            type: String,
            ref: "Company",
            required: true
        },
        size:{
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            type: String,
        },
        shipping: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shoes", shoesSchema);
