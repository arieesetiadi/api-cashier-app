import mongodb from "../database/connection.js";

// Create database schema
const schema = mongodb.Schema(
    {
        name: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        price: {
            type: Number,
        },
        categoryId: {
            type: mongodb.Schema.Types.ObjectId,
        },
        status: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Number,
        },
        updatedAt: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Create Product model
const Product = mongodb.model("Product", schema);

export default Product;
