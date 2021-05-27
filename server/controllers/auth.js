import User from "../models/User.js";
import errorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res);
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

        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
}

export const forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new errorResponse("Email could be sent", 404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {

        } catch (error) {

        }

    } catch (error) {

    }
}

export const resetpassword = async (req, res, next) => {
    res.send("Reset Password Route");
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
}