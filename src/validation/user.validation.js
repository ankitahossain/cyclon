const Joi = require("joi")
const { customError } = require("../utils/customError");

const userValidateSchema = Joi.object({
    firstName: Joi.string()
        .required()
        // FIX: Replaced .empty() with .min(1) for clearer required rule
        .min(1)
        .trim()
        .messages({
            "string.empty": "Name is required.",
            "string.min": "Name is required.",
            "string.trim": "Name cannot contain extra spaces",
    }),
    phoneNumber: Joi.string()
        .optional()
        .trim()
        .allow(null, "")
        .pattern(/^(?:\+880|880|0)1[3-9]\d{8}$/)
        .messages({
            "string.pattern.base":
                "Phone number must be a valid Bangladeshi number (e.g. 01XXXXXXXXX, 8801XXXXXXXXX, or +8801XXXXXXXXX)",
            "string.base": "Phone number must be a string",
            "string.empty": "Phone number cannot be empty",
        }),

    email: Joi.string()
        .trim()
        .required() // FIX: Made email explicitly required by removing .allow(null, "")
        .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
        .messages({
            "string.empty": "Email is required.",
            "any.required": "Email is required.",
            "string.trim": "Email should not contain extra spaces.",
            "string.pattern.base": "Email format is invalid.",
    }),

    password: Joi.string()
        .trim()
        .required() // Changed from .empty() to .required() for clarity
        // FIX: Expanded Regex to allow a wider range of standard special characters
        .pattern(
            new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*-+=?_])[a-zA-Z0-9!@#$%^&*-+=?_]{8,16}$/)
        )
        .messages({
            "string.empty": "Password is required.",
            "any.required": "Password is required.",
            "string.trim": "Password should not contain extra spaces.",
            "string.pattern.base":
                "Password must be 8-16 characters long, include at least one number and one special character.",
        }),
}).options({
    abortEarly: true,
    allowUnknown: true,
});

// FIX: Corrected typo from 'valdateUser' to 'validateUser'
exports.validateUser = async(data) =>{
    try {
        // Assume 'data' is req.body, which contains the user fields
        const value = await userValidateSchema.validateAsync(data)
        return value
    } catch (error) {
        console.log("error from validate user",error);
        // FIX: Changed 401 (Unauthorized) to 400 (Bad Request) for validation errors
        throw new customError(400,`User validation failed. ${error.message}`)
    }
}