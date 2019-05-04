import fetch from 'isomorphic-fetch';
import { api_url } from '../config';
import { readResponse } from '../utils';
const getMarkersList = async () => {
    let response;
    const url = `${api_url}/markers`;
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await readResponse(response);
}
const createMarker = async (marker) => {
    let response;
    const url = `${api_url}/markers`;
    response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: marker.title,
            latitude: marker.latitude,
            longitude: marker.longitude
        }),
    });
    return await readResponse(response);
}
export default {
    getMarkersList,
    createMarker
}