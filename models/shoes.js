const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//// name ,color, type,availability, size, 
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
            type: ObjectId,
            ref: "Category",
            required: true
        },
        size:{
            type: Number
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
            required: false,
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shoes", shoesSchema);
