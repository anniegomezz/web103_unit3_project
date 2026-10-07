const LocationsAPI = {

    getAllLocations: async () => {
        const response = await fetch('/api/locations')

        if (!response.ok) {
            throw new Error('Error when fetching location, please try again')
        }

        return await response.json()
    },

    getLocationById: async (id) => {
        const response = await fetch(`/api/locations/${id}`)

        if (!response.ok) {
            throw new Error('Error when fething location, please try again')
        }

        return await response.json()
    }

}

export default LocationsAPI