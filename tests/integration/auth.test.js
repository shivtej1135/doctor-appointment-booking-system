const pool = require("../../src/config/db");
const request = require("supertest");
const app = require("../../src/app");

describe("Authentication integration tests", () => {

    test("should reject invalid registration data", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "",
                email: "invalid-email",
                password: "12",
                role: "admin"
            });

        expect(response.status).toBe(400);
    });

    test("should register a new patient", async () => {
        const email = `test${Date.now()}@gmail.com`;

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Integration Test Patient",
                email,
                password: "123456",
                role: "patient"
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User registered successfully");
    });

    test("should reject invalid login data", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "invalid-email",
                password: ""
            });

        expect(response.status).toBe(400);
    });

    test("should login an existing patient", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "rahul@gmail.com",
                password: "123456"
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

});