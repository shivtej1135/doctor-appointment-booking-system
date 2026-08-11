const Joi = require("joi");

const createAppointmentSchema = Joi.object({
    date: Joi.date().required(),

    startTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
        .required(),

    endTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
        .required()
}).custom((value, helpers) => {
    if (value.startTime >= value.endTime) {
        return helpers.error("any.invalid");
    }

    return value;
}, "appointment time validation");



const updateAppointmentSchema = Joi.object({
    date: Joi.date().required(),

    start_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
        .required(),

    end_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
        .required()
}).custom((value, helpers) => {
    if (value.start_time >= value.end_time) {
        return helpers.error("any.invalid");
    }

    return value;
}, "appointment time validation");

module.exports = {
    createAppointmentSchema,
    updateAppointmentSchema
};