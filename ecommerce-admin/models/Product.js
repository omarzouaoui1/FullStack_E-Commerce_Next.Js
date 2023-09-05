// const { Schema, default: mongoose } = require("mongoose");

// const ProductSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     price: {
//         type: Number,
//         required: true,
//     },
// });

// export const Product = mongoose.model('Product', ProductSchema);

const { models, model, Schema } = require("mongoose");

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
});

export const Product = models.Product || model('Product', ProductSchema);