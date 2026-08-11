const Joi = require("joi");

const registerDoctorSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).max(100).required(),

    specialization: Joi.string().trim().min(2).max(100).required()
});

module.exports = {
    registerDoctorSchema
};