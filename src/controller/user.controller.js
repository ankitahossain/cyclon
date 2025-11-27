const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asynchandler } = require("../utils/asynchandler");
const { validateUser } = require("../validation/user.validation");
const { emailSend } = require("../helper/helper");
const { RegistrationTemplate } = require("../template/template");

// Registration controller
exports.registration = asynchandler(async (req, res) => {
    // 1) Validate user input
    const value = await validateUser(req.body);
    const { firstName, email, password } = value;

    // 2) Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new customError(400, "UserExists", "User already exists with this email");
    }

    // 3) Save user to database
    const user = await User.create({ firstName, email, password });

    if (!user) {
        throw new customError(500, "RegistrationFailed", "Registration failed. Please try again");
    }

    // 4) Generate verification token
    const verifyToken = user.generateEmailToken(); // Implement in User model
    const verify_link = `https://yourdomain.com/verify-email/${verifyToken}`;

    // 5) Prepare HTML template
    const template = RegistrationTemplate(firstName, verify_link);

    // 6) Send verification email using Brevo
    try {
        await emailSend(email, template);
    } catch (err) {
        console.error("Email send failed:", err);
        throw new customError(500, "EmailFailed", "Failed to send verification email");
    }

    // 7) Success response
    apiResponse.sendsuccess(res, 201, "Registration successful. Check your email for verification.", {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
    });
});
