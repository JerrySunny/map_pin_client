export const GET_MARKERS = 'GET_MARKERS';
export const ADD_MARKER = 'ADD_MARKER';
export const getMarkers = () => {
    const markers = getMarkersList();
    return { type: GET_MARKERS, markers };
}
export const addTodo = (marker) => {
    return {
        type: ADD_MARKER,
        marker
    }
}
const getMarkersList = () => {
    const markers = [
        {
            key: 1,
            position: {
                lat: 37.768465,
                lng: -122.434738,
            },
            title: 'lepiz'
        },
        {
            key: 2,
            position: {
                lat: 37.771348,
                lng: -122.412575,
            },
            title: 'san fransisco'
        }
    ]
    return markers;
}