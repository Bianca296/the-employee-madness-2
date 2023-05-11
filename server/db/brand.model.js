const { Schema, model } = require("mongoose");

const BrandSchema = new Schema({
    name: String,
});

module.exports = model("Brand", BrandSchema);