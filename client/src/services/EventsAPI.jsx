const EventsAPI = {

    // Return all events
    getAllEvents: async () => {
        const response = await fetch('/api/events')

        if (!response.ok) {
            throw new Error('Error when fetching events, try again')
        }

        return await response.json()
    },

    // Return all events on location
    getEventsByLocation: async (locationId) => {
        const response = await fetch(`/api/events/location/${locationId}`)

        if (!response.ok) {
            throw new Error('Error when fetching events, try again')
        }

        return await response.json()
    }

}

export default EventsAPI