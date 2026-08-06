CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER NOT NULL
        REFERENCES appointments(id)
        ON DELETE CASCADE,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    status VARCHAR(20) NOT NULL DEFAULT 'confirmed'
        CHECK (status IN ('confirmed', 'cancelled')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);