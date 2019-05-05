import markerService from '../../services/markers';
export const GET_MARKERS = 'GET_MARKERS';
export const GET_MARKERS_REQUEST = 'GET_MARKERS_REQUEST';
export const GET_MARKERS_FAILURE = 'GET_MARKERS_FAILURE';
export const ADD_MARKER_SUCCESS = 'ADD_MARKER_SUCCESS';
export const ADD_MARKER_REQUEST = 'ADD_MARKER_REQUEST';
export const ADD_MARKER_FAILURE = 'ADD_MARKER_FAILURE';
export const UPDATE_MARKER_SUCCESS = 'UPDATE_MARKER_SUCCESS';
export const UPDATE_MARKER_REQUEST = 'UPDATE_MARKER_REQUEST';
export const UPDATE_MARKER_FAILURE = 'UPDATE_MARKER_FAILURE';


export const getMarkers = () => {
    return async dispatch => {
        dispatch(getMarkersRequest());
        try {
            const markers = await markerService.getMarkersList();
            if (markers)
                dispatch(getMarkersSuccess(markers));
        }
        catch (error) {
            dispatch(getMarkersFailure);
        }
    }
}
export const addMarker = (marker) => {
    return async dispatch => {
        dispatch(addMarkerRequest());
        try {
            const response = await markerService.createMarker(marker);
            if (response)
                dispatch(addMarkerSuccess(response));
            dispatch(getMarkers());
        }
        catch (error) {
            dispatch(addMarkerFailure(error));
        }
    }
}

export const updateMarker = (marker) => {
    return async dispatch => {
        dispatch(updateMarkerRequest());
        try {
            const response = await markerService.updateMarker(marker);
            if (response)
                dispatch(updateMarkerSuccess(response));
            dispatch(getMarkers());
        }
        catch (error) {
            dispatch(updateMarkerFailure(error));
        }
    }
}
export const getMarkersSuccess = (markers) => {
    return { type: GET_MARKERS, markers };
}
export function getMarkersRequest() {
    return { type: GET_MARKERS_REQUEST };
}
export function getMarkersFailure() {
    return { type: GET_MARKERS_FAILURE };
}

export const addMarkerSuccess = (marker) => {
    return { type: ADD_MARKER_SUCCESS, marker };
}
export function addMarkerRequest() {
    return { type: ADD_MARKER_REQUEST };
}
export const addMarkerFailure = (error) => {
    return { type: ADD_MARKER_SUCCESS, error };
}
export const updateMarkerSuccess = (marker) => {
    return { type: UPDATE_MARKER_SUCCESS, marker };
}
export function updateMarkerRequest() {
    return { type: UPDATE_MARKER_REQUEST };
}
export const updateMarkerFailure = (error) => {
    return { type: UPDATE_MARKER_FAILURE, error };
}
