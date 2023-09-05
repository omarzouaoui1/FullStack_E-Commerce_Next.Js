const { Schema } = require("mongoose");

const ProductSchema = new Schema({
    title: {
        typeof: String,
        required: true,
    },
    description: String,
    price: {
        typeof: Number,
        required: true,
    },
});

export const Product = model('product', ProductSchema);