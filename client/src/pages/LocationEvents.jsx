import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Event from '../components/Event'

import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {

    const { id } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])

    useEffect(() => {

        const fetchLocation = async () => {

            try {
                const locationData = await LocationsAPI.getLocationById(id)
                setLocation(locationData)

            } catch (error) {
                console.error('Error fetching location:', error)
            }

        }

        fetchLocation()

    }, [id])

    useEffect(() => {

        const fetchEvents = async () => {

            try {

                const eventsData = await EventsAPI.getEventsByLocation(id)

                setEvents(eventsData)

            } catch (error) {

                console.error('Error fetching events:', error)

            }

        }

        fetchEvents()

    }, [id])

    if (!location) {
        return <p>Loading location...</p>
    }

    return (

        <div className="location-events">
            <header>

                <div className="location-image">
                    <img
                        src={location.image}
                        alt={location.name}
                    />
                </div>

                <div className="location-info">
                    <h2>{location.name}</h2>
                    <p>{location.address}</p>
                </div>

            </header>

            <main>

                {events.length > 0 ? (

                    events.map((event) => (

                        <Event
                            key={event.id}
                            event={event}
                        />

                    ))

                ) : (

                    <h2>
                        <i className="fa-regular fa-calendar-xmark"></i>
                        {' '}
                        No events scheduled at this location yet!
                    </h2>

                )}

            </main>

        </div>

    )
}

export default LocationEvents