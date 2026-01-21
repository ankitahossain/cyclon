//todo:model schema bananor jonno jemon mongoose temone validation schema bananor jonno joi

//todo:website joi.dev
const Joi = require('joi');
const { customError } = require('../utils/customError')


const userValidationSchema = Joi.object({
    firstName: Joi.string().trim().empty().messages({

        "any.required": "Name is required",
        "name.trim": "Name fill with extra space",
    }),
    phoneNumber: Joi.string().optional().trim().pattern(new RegExp('^(?:\\+88|0088)?01[3-9]\\d{8}$')).messages({
        "string.pattern.base": "Phone number format is invaid",
        "string.trim": "Phone number should not contain extra spaces",
        "string.empty": "Phone number cannot be empty",

    }),
    email: Joi.string().trim().email().empty().messages({
        "string.empty": "Email is required",
        "any.required": "Email is required",
        "string.trim": "Email should not contain extra spaces",
        "string.pattern.base": "Email format is invalid",

    }),
    password: Joi.string().trim().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
        "string.empty": "Password is required",
        'any.required': "Password is required",
        "string.min": "Password must be at least 8 characters long,include at least one number and one special character (@,$,!,%,*,?,&)",
        "string.pattern.base": "Pasword must be at least 8-16 long,include at least one number and one special character."
    })

}).optional({
    abortEarly: false,//ekadhik error thakle sob gulo error return korbe
    allowUnknown: true,//this allow extra fields in req.body without validation
});


const validateUser = async (req) => {
    try {
        const validatedData = await userValidationSchema.validateAsync(req.body);
        return validatedData;
    } catch (err) {
        console.log("error form validation", err);
        throw new customError(400, `user validation failed ${err}`);
    }
}


// const loginValidationSchema = Joi.object({
//     email: Joi.string().trim().email().optional(),
//     phoneNumber: Joi.string().trim().optional(),
//     password: Joi.string().required() // Only password is strictly required here
// }).or('email', 'phoneNumber'); // Requires at least one of these

// const validateLogin = async (req) => {
//     try {
//         const validatedData = await loginValidationSchema.validateAsync(req.body, {
//             abortEarly: false,
//         });
//         return validatedData;
//     } catch (err) {
//         // Extracting just the message for a cleaner error
//         const errorMessage = err.details ? err.details.map(i => i.message).join(', ') : err.message;
//         throw new customError(400, errorMessage);
//     }
// };

module.exports = { validateUser }