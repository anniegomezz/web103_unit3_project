import React from 'react'

import '../css/Event.css'

const Event = ({ event }) => {

    return (
        <article className="event-information">

            <img src={event.image} alt={event.name} />

            <div className="event-information-overlay">

                <div className="text">

                    <h3>{event.name}</h3>

                    <p>
                        <i className="fa-regular fa-calendar"></i>
                        {' '}
                        {event.date.slice(0, 10)}
                    </p>

                    <p>
                        <i className="fa-regular fa-clock"></i>
                        {' '}
                        {event.time}
                    </p>

                    <p>
                        <strong>Artist:</strong> {event.artist}
                    </p>

                </div>

            </div>

        </article>
    )
}

export default Event