import Category from "../model/category.model.js";

const controller = () => {
    return {
        get: async (req, res) => {
            const categories = await Category.find({ status: true });

            res.status(200).json({
                status: true,
                message: "success",
                categories,
            });
        },
        store: async (req, res) => {
            try {
                const name = req.body.name;

                // Name required
                if (!name) {
                    throw {
                        code: 428,
                        message: "Category's name is required",
                    };
                }

                const category = new Category({ name });
                const result = await category.save();

                // Throw error if store failed
                if (!result) {
                    throw {
                        code: 500,
                        message: "Store category failed",
                    };
                }

                return res.status(200).json({
                    status: true,
                    message: "Store category success",
                });
            } catch (error) {
                // Catch if store error
                return res.status(error.code).json({
                    status: false,
                    message: error.message,
                });
            }
        },
    };
};

export default controller();
