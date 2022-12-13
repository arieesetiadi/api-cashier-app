import mongodb from "../database/connection.js";

// Create database schema
const schema = mongodb.Schema(
    {
        name: {
            type: String,
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

// Create Category model
const Category = mongodb.model("Category", schema);

export default Category;
