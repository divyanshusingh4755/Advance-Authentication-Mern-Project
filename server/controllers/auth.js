import User from "../models/User.js";
import errorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username, email, password
        });

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorResponse("Please provide email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new errorResponse("Invalid credentails", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new errorResponse("Invalid credentails", 401));
        }

        res.status(200).json({
            success: true,
            token: "sdkfljksd",
        });
    } catch (error) {
        next(error);
    }
}

export const forgotpassword = async (req, res, next) => {
    res.send("Forgot Password Route");
}

export const resetpassword = async (req, res, next) => {
    res.send("Reset Password Route");
}