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

    //Allowed MIME Types

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];

    // 1. First, check if the file exists at all
    const imageFile = req.files?.image?.[0];

    const mimeType = imageFile.mimetype || imageFile.file?.mimetype;

    if (!allowedMimeTypes.includes(mimeType)) {
      throw new customError("Only JPG,JPEG, and PNG image files are allowed");
    }
    // console.log(req.files);

    //limit number of files(example:max 1 file allowed)
    if (req.files?.image?.length == 0) {
      throw new customError(401, "Image not found.");
    }

    
    console.log(req.files.image[0].size);

    if(req?.files?.image[0]?.size >= 5000){
        throw new customError(401,"Image size below 5 MB");
    }


    return value;
  } catch (error) {
    
    console.log(error);
    if(error.details){

         console.log("Error from validateCategory: ",error.details[0].message);
    throw new customError(400, `Category Validation failed:${error.message}`);

    }else{
        console.log("Error from validateCategor: ",error);
        throw new customError(400,`Categroy Validation Failed: ${error.message}`);
    }

   
  }
};