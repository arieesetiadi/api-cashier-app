import mongoose from "mongoose";
import Category from "../model/category.model.js";
import Product from "../model/product.model.js";

const controller = () => {
    return {
        get: async (req, res) => {
            try {
                const products = await Product.find({ status: true });

                if (!products) {
                    throw {
                        code: 500,
                        message: "Get products failed",
                    };
                }

                res.status(200).json({
                    status: true,
                    count: products.length,
                    products,
                });
            } catch (error) {}
        },
        store: async (req, res) => {
            try {
                // Check if product exist
                const isProductExist = await Product.findOne({ name: req.body.name });
                if (isProductExist) {
                    throw {
                        code: 428,
                        message: "Product is already exist",
                    };
                }

                // Check if categoryId is valid
                const isCategoryIdValid = mongoose.Types.ObjectId.isValid(req.body.categoryId);
                if (!isCategoryIdValid) {
                    throw {
                        code: 428,
                        message: "CategoryId is invalid",
                    };
                }

                // Check if category exist
                const isCategoryExist = await Category.findById(req.body.categoryId);
                if (!isCategoryExist) {
                    throw {
                        code: 428,
                        message: "Category is not exist",
                    };
                }

                const name = req.body.name;
                const thumbnail = req.body.thumbnail;
                const price = req.body.price;
                const categoryId = req.body.categoryId;

                const product = new Product({
                    name,
                    thumbnail,
                    price,
                    categoryId,
                });
                const result = await product.save();

                // Throw error if store failed
                if (!result) {
                    throw {
                        code: 500,
                        message: "Store product failed",
                    };
                }

                return res.status(200).json({
                    status: true,
                    message: "Store product success",
                });
            } catch (error) {
                // Catch if store error
                return res.status(error.code).json({
                    status: false,
                    message: error.message,
                });
            }
        },
        update: async (req, res) => {
            res.json({
                status: "Update",
                params: req.params,
                body: req.body,
            });
        },
        delete: async (req, res) => {
            res.json({
                status: "Delete",
                params: req.params,
                body: req.body,
            });
        },
    };
};

export default controller();
