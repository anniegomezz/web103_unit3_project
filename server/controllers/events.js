import { pool } from '../config/database.js'

export const getEvents = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM events
            ORDER BY date, time
        `)

        res.json(result.rows)
    } catch (err) {
        console.error('Error getting events:', err)
        res.status(500).json({ error: 'Failed to get events' })
    }
}

export const getEventsByLocation = async (req, res) => {
    const { locationId } = req.params

    try {
        const result = await pool.query(
            `
            SELECT *
            FROM events
            WHERE location_id = $1
            ORDER BY date, time
            `,
            [locationId]
        )

        res.json(result.rows)
    } catch (err) {
        console.error('Error getting events by location:', err)
        res.status(500).json({ error: 'Failed to get events' })
    }
}