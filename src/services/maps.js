import fetch from 'isomorphic-fetch';
import { google_api_url, maps_api_key } from '../config';
import { readResponse } from '../utils';

const getAddress = async (latitude, longitude) => {
    let response;
    const url = `${google_api_url}latlng=${latitude},${longitude}&key=${maps_api_key}`;
    response = await fetch(url, {
        method: 'GET',
    });
    return await readResponse(response);
}
export default{
    getAddress
}