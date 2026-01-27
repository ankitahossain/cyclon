const joi = require("joi");
const { customError } = require("../utils/customError");

const categoryValidationSchema = joi
  .object({
    name: joi.string().trim().required().messages({
      "string.base": "Category name must be a string.",
      "string.empty": "Category name is required.",
      "any.required": "Category name is required.",
      "string.trim": "Category name should not contain extra spaces.",
    }),
  })
  .options({ abortEarly: false, allowUnknown: true });

//todo:Async funtion to validate category

exports.validateCategory = async (req) => {
  try {
    const value = await categoryValidationSchema.validateAsync(req.body);

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];

    // 1. Check if the file exists safely
    const imageFile = req.files?.image?.[0];

    if (!imageFile) {
      throw new customError(400, "Image is required.");
    }

    // 2. Validate MIME Type
    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      throw new customError(400, "Only JPG, JPEG, and PNG image files are allowed");
    }

    // 3. Validate Size (5MB = 5 * 1024 * 1024 bytes)
    const MAX_SIZE = 5 * 1024 * 1024; 
    console.log("File Size in Bytes:", imageFile.size);

    if (imageFile.size > MAX_SIZE) {
      throw new customError(400, "Image size must be below 5 MB");
    }

    return value;
  } catch (error) {
    // Re-throw custom errors directly, otherwise wrap Joi/Generic errors
    if (error instanceof customError) {
      throw error;
    }
    
    const message = error.details ? error.details[0].message : error.message;
    throw new customError(400, `Category Validation Failed: ${message}`);
  }
};