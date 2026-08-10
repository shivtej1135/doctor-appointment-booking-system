-- Stores a patient's booking for an appointment
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,

    -- The appointment being booked
    appointment_id INTEGER NOT NULL
        REFERENCES appointments(id)
        ON DELETE CASCADE,

    -- The patient who made the booking
    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    -- Current status of the booking
    status VARCHAR(20) NOT NULL DEFAULT 'confirmed'
        CHECK (status IN ('confirmed', 'cancelled')),

    -- When the booking was created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Only one confirmed booking can exist for an appointment
CREATE UNIQUE INDEX unique_confirmed_booking
ON bookings (appointment_id)
WHERE status = 'confirmed';