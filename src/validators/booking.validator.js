const Joi = require("joi");

const bookingIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    bookingIdSchema
};