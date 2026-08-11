const pool = require("../../src/config/db");
const request = require("supertest");
const app = require("../../src/app");

describe("Booking concurrency test", () => {

    let appointmentId;
    let rahulToken;
    let amitToken;

    beforeAll(async () => {

        const rahulLogin = await request(app)
            .post("/api/auth/login")
            .send({
                email: "rahul@gmail.com",
                password: "123456"
            });

        const amitLogin = await request(app)
            .post("/api/auth/login")
            .send({
                email: "amit.test@gmail.com",
                password: "123456"
            });

        rahulToken = rahulLogin.body.token;
        amitToken = amitLogin.body.token;

        const result = await pool.query(
            `INSERT INTO appointments
            (doctor_id, date, start_time, end_time, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [3, "2026-08-15", "16:00:00", "16:30:00", "available"]
        );

        appointmentId = result.rows[0].id;
    });

    test("only one patient should be able to book the same appointment", async () => {

        const [rahulResponse, amitResponse] = await Promise.all([

            request(app)
                .post(`/api/bookings/createBooking/${appointmentId}`)
                .set("Authorization", `Bearer ${rahulToken}`),

            request(app)
                .post(`/api/bookings/createBooking/${appointmentId}`)
                .set("Authorization", `Bearer ${amitToken}`)
        ]);

        

        const responses = [
            rahulResponse,
            amitResponse
        ];

        const successfulBookings = responses.filter(
            response => response.status === 201
        );

        expect(successfulBookings).toHaveLength(1);
    });

    afterAll(async () => {

        await pool.query(
            `DELETE FROM bookings
             WHERE appointment_id = $1`,
            [appointmentId]
        );

        await pool.query(
            `DELETE FROM appointments
             WHERE id = $1`,
            [appointmentId]
        );

        await pool.end();
    });
});