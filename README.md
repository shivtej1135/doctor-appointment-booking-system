# Doctor Appointment Booking System

A backend system for managing doctors, appointments, and patient bookings, built with Node.js, Express.js, and PostgreSQL.

The main engineering challenge of this project is preventing **double booking of the same appointment when multiple patients attempt to book it concurrently**.

## Key Problem

Consider an appointment that is currently available.

Two patients send booking requests at almost the same time.

A naive implementation might do:

1. Check whether the appointment is available.
2. Create the booking.
3. Mark the appointment as booked.

This creates a race condition because both requests can read the appointment as `available` before either request updates it.

The result could be:

```text
Patient A ──→ Check available ──→ YES ──→ Book
Patient B ──→ Check available ──→ YES ──→ Book

This can result in the same appointment being booked by two patients.

Solution

This project uses PostgreSQL transactions and row-level locking with:

SELECT *
FROM appointments
WHERE id = $1
FOR UPDATE;

The booking operation runs inside a transaction.

The appointment row is locked before checking and updating its booking state. Therefore, concurrent requests attempting to book the same appointment cannot successfully modify it at the same time.

The system is verified using an integration test that sends two booking requests concurrently and confirms that exactly one booking succeeds.

Features
Authentication
User registration
User login
JWT-based authentication
Role-based authorization
Patient, doctor, and admin roles
Password hashing using bcrypt
Doctor Management
Admin can register doctors
View all doctors
View doctor by ID
Update doctor specialization
Delete doctors
Appointment Management
Doctors can create appointments
View appointments
View appointments by doctor
Update appointments
Delete appointments
Cancel appointments
Booking Management
Patients can book appointments
Patients can view their bookings
Patients can cancel bookings
Prevent double booking
Transaction-based booking
PostgreSQL row-level locking
Validation & Error Handling
Request validation using Joi
Centralized error handling
Role-based authorization
Route parameter validation
Appointment time validation
Login rate limiting
Tech Stack
Node.js
Express.js
PostgreSQL
JWT
bcrypt
Joi
express-rate-limit
Jest
Supertest
Architecture

The project follows a layered backend architecture:

Client
  │
  ▼
Routes
  │
  ▼
Middlewares
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Models
  │
  ▼
PostgreSQL
Layers

Routes

Define API endpoints and connect middleware with controllers.

Middlewares

Handle authentication, authorization, validation, rate limiting, and errors.

Controllers

Handle HTTP requests and responses.

Services

Contain the application's business logic.

Models

Handle database operations.

PostgreSQL

Stores users, doctors, appointments, and bookings.

Database Design

The system contains four main entities:

Users
  │
  └── Doctors
        │
        └── Appointments
              │
              └── Bookings
Users

Stores patients, doctors, and administrators.

Main fields:

id
name
email
password
role
created_at
Doctors

Stores doctor information and links doctors to users.

Main fields:

id
user_id
specialization
created_at
Appointments

Represents a bookable time slot belonging to a doctor.

Main fields:

id
doctor_id
date
start_time
end_time
status
created_at
Bookings

Represents a patient's booking of an appointment.

Main fields:

id
appointment_id
user_id
status
created_at
Concurrency Control

The booking operation uses a PostgreSQL transaction.

Conceptually:

Request A                         Request B
   │                                 │
 BEGIN                            BEGIN
   │                                 │
   ▼                                 ▼
SELECT ... FOR UPDATE            SELECT ... FOR UPDATE
   │                                 │
   │                            waits for row lock
   ▼
Check appointment
availability
   │
   ▼
Create booking
   │
   ▼
Mark appointment
as booked
   │
   ▼
COMMIT
                                     │
                                     ▼
                              Acquires row lock
                                     │
                                     ▼
                              Sees appointment
                              is already booked
                                     │
                                     ▼
                              Booking rejected

This prevents two concurrent requests from successfully booking the same appointment.

Testing

The project uses Jest and Supertest for integration testing.

The most important test verifies the concurrency guarantee.

Two patients attempt to book the same appointment concurrently:

await Promise.all([
    request(app)
        .post(`/api/bookings/createBooking/${appointmentId}`)
        .set("Authorization", `Bearer ${rahulToken}`),

    request(app)
        .post(`/api/bookings/createBooking/${appointmentId}`)
        .set("Authorization", `Bearer ${amitToken}`)
]);

The test verifies that:

Successful bookings = 1

Current integration tests cover:

Invalid registration
Valid registration
Invalid login
Valid login
Concurrent booking

Run the tests with:

npm test
API Overview
Authentication
POST /api/auth/register
POST /api/auth/login
Doctors
POST   /api/doctors/registerDoctor
GET    /api/doctors/getAllDoctors
GET    /api/doctors/getDoctorById/:id
PUT    /api/doctors/updateDoctor/:id
DELETE /api/doctors/deleteDoctor/:id
Appointments
POST   /api/appointments/createAppointment
GET    /api/appointments/getAllAppointments
GET    /api/appointments/getAppointmentById/:id
GET    /api/appointments/getAppointmentsByDoctorId
PUT    /api/appointments/updateAppointments/:id
DELETE /api/appointments/deleteAppointment/:id
Bookings
POST  /api/bookings/createBooking/:id
GET   /api/bookings/getBookingByUserId
PATCH /api/bookings/cancelBooking/:id

Protected endpoints require a valid JWT.

Project Structure
src/
├── app.js
├── server.js
│
├── config/
│   ├── db.js
│   ├── env.js
│   └── index.js
│
├── controllers/
│   ├── appointment.controller.js
│   ├── auth.controller.js
│   ├── booking.controller.js
│   └── doctor.controller.js
│
├── db/
│   ├── migrations/
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_doctors.sql
│   │   ├── 003_create_appointments.sql
│   │   └── 004_create_bookings.sql
│   └── seeds/
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── rateLimiter.middleware.js
│   ├── role.middleware.js
│   └── validation.middleware.js
│
├── models/
│   ├── appointment.model.js
│   ├── booking.model.js
│   ├── doctor.model.js
│   └── user.model.js
│
├── routes/
│   ├── appointment.routes.js
│   ├── auth.routes.js
│   ├── booking.routes.js
│   ├── doctor.routes.js
│   └── index.js
│
├── services/
│   ├── appointment.service.js
│   ├── auth.service.js
│   ├── booking.service.js
│   └── doctor.service.js
│
├── utils/
│   ├── errors.js
│   ├── logger.js
│   └── response.js
│
└── validators/
    ├── appointment.validator.js
    ├── auth.validator.js
    ├── booking.validator.js
    └── doctor.validator.js

tests/
├── integration/
│   ├── auth.test.js
│   └── booking.test.js
└── unit/
Installation

Clone the repository:

git clone <repository-url>
cd doctor-appointment-booking-system

Install dependencies:

npm install

Create a PostgreSQL database and configure the environment variables.

Run the database migrations.

Create a .env file in the project root.

Environment Variables
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_NAME=doctor_appointment_system

JWT_SECRET=your_strong_random_secret
JWT_EXPIRES_IN=7d

Never commit .env to the repository.

Running the Project

Start the server using the project's configured start command.

Run tests using:

npm test
Future Improvements

Potential future improvements include:

Doctor availability schedules
Appointment waitlists
Email/SMS notifications
Refresh tokens
Automated migration tooling
Production deployment
Monitoring and logging
Expanded integration and unit test coverage
License

This project was developed as a backend engineering project focused on concurrency control, database transactions, authentication, and REST API design.


### Important

**Don't change anything else right now.** Paste this into `README.md`, save it, and then we'll do a final accuracy check against your actual code before committing it.