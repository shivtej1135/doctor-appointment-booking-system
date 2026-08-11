const Joi = require("joi");
const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string()
        .valid("patient")
        .required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
};