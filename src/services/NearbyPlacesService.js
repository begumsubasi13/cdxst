import axios from 'axios';

const GET_NEARBY_API_BASE_URL = "http://127.0.0.1:8070/api/v1/location/getNearby";

class NearbyPlacesService {

    getLocation(latitude, longitude, radius) {
        return axios.get(GET_NEARBY_API_BASE_URL, {
            params: {
                latitude: latitude,
                longitude: longitude,
                radius: radius
            }
        });
        
    }
    

}

export default new NearbyPlacesService()