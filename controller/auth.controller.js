import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);
};

const controller = () => {
    return {
        register: async (req, res) => {
            try {
                const isUserExist = await User.findOne({ username: req.body.username });
                if (isUserExist) {
                    throw {
                        code: 428,
                        message: "Register Failed - Username is already exist",
                    };
                }

                const name = req.body.name;
                const username = req.body.username;
                const email = req.body.email;
                const password = await bcrypt.hash(req.body.password, 10);
                const role = req.body.role;
                const status = req.body.status;

                const user = new User({
                    name,
                    username,
                    email,
                    password,
                    role,
                    status,
                });

                const result = await user.save();
                // Throw error if store failed
                if (!result) {
                    throw {
                        code: 500,
                        message: "Register Failed",
                    };
                }

                return res.status(200).json({
                    status: true,
                    message: "Register Success",
                });
            } catch (error) {
                // Catch if register error
                return res.status(error.code || 500).json({
                    status: false,
                    message: error.message,
                });
            }
        },
        login: async (req, res) => {
            try {
                const user = await User.findOne({ username: req.body.username });
                if (!user) {
                    throw {
                        code: 428,
                        message: "Login Failed - User is not exist",
                    };
                }

                const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
                if (!isPasswordMatch) {
                    throw {
                        code: 428,
                        message: "Login Failed - Wrong password",
                    };
                }

                const payload = {
                    id: user._id,
                    role: user.role,
                };

                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken(payload);

                return res.status(200).json({
                    status: true,
                    message: "Login Success",
                    accessToken,
                    refreshToken,
                });
            } catch (error) {
                // Catch if register error
                return res.status(error.code || 500).json({
                    status: false,
                    message: error.message,
                });
            }
        },
        refreshToken: async (req, res) => {
            try {
                if (!req.body.refreshToken) {
                    throw {
                        code: 428,
                        message: "Refresh Failed - Refresh token is required",
                    };
                }

                const payload = await jwt.verify(req.body.refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
                if (!payload) {
                    throw {
                        code: 401,
                        message: "Refresh Failed - Refresh token is invalid",
                    };
                }

                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken(payload);

                return res.status(200).json({
                    status: true,
                    message: "Refresh Token Success",
                    accessToken,
                    refreshToken,
                });
            } catch (error) {
                // Catch if register error
                return res.status(error.code || 500).json({
                    status: false,
                    message: error.message,
                });
            }
        },
    };
};

export default controller();
