import Joi from "joi";

const userValidator = Joi.object({
    username: Joi.string().min(5).max(20).required().messages({
        "string.min": 'Min 4 chars',
        "string.max": 'Max 20 chars',
        "any.required": 'This field is required'
    }),
    password: Joi.string().min(4).max(20).required().messages({
        "string.min": 'Min 4 chars',
        "string.max": 'Max 20 chars',
        "any.required": 'This field is required'
    })
})

export {
    userValidator
};