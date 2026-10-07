import React, { useState, useEffect } from 'react'

import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {

        const fetchEvents = async () => {

            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)

            } catch (error) {
                console.error('Error fetching events:', error)
            }

        }

        fetchEvents()

    }, [])

    return (

        <div className="all-events">

            <h2>All Events</h2>
            <main>

                {events.length > 0 ? (
                    events.map((event) => (
                        <Event
                            key={event.id}
                            event={event}
                        />
                    ))

                ) : (
                    <h2>No events scheduled yet!</h2>
                )}

            </main>

        </div>

    )
}

export default Events