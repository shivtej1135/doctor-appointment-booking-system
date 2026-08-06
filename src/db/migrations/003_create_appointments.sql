CREATE TABLE IF NOT EXISTS appointments(
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER NOT NULL
        REFERENCES doctors(id)
        ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available'
        CHECK (status IN ('available', 'booked', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (end_time > start_time),
    UNIQUE (doctor_id, date, start_time)
);