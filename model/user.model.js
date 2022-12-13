import mongodb from "../database/connection.js";

// Create database schema
const schema = mongodb.Schema(
    {
        name: {
            type: String,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "cashier", "employee"],
            default: "employee",
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

// Create User model
const User = mongodb.model("User", schema);

export default User;
