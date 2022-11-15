const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlengh:32,
        },
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Map", mapSchema);
