import { pool } from './database.js'
import eventData from '../data/events.js'
import locationData from '../data/locations.js'


const createTables = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            time VARCHAR(50) NOT NULL,
            date DATE NOT NULL,
            location_id INTEGER NOT NULL REFERENCES locations(id),
            artist VARCHAR(255) NOT NULL
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 tables created successfully')
    } catch (err) {
        console.error('⚠️ error creating tables', err)
    }
}


const seedLocations = async () => {
    for (const location of locationData) {
        const insertQuery = {
            text: `
                INSERT INTO locations (name, image, address)
                VALUES ($1, $2, $3)
            `,
            values: [
                location.name,
                location.image,
                location.address
            ]
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${location.name} added successfully`)
        } catch (err) {
            console.error(`⚠️ error inserting ${location.name}`, err)
        }
    }

    console.log('🎉 All locations seeded successfully')
}


const seedEvents = async () => {
    for (const event of eventData) {
        const insertQuery = {
            text: `
                INSERT INTO events
                    (name, image, time, date, location_id, artist)
                VALUES ($1, $2, $3, $4, $5, $6)
            `,
            values: [
                event.name,
                event.image,
                event.time,
                event.date,
                event.location_id,
                event.artist
            ]
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${event.name} added successfully`)
        } catch (err) {
            console.error(`⚠️ error inserting ${event.name}`, err)
        }
    }

    console.log('🎉 All events seeded successfully')
}


const resetDatabase = async () => {
    try {
        await createTables()
        await seedLocations()
        await seedEvents()

        console.log('🎉 Database reset successfully')
    } catch (err) {
        console.error('⚠️ error resetting database', err)
    } finally {
        await pool.end()
    }
}


resetDatabase()