import markerService from '../../services/markers';
import maps from '../../services/maps';
import validator from '../../validator';
import { createErrorMessage, createSuccessMessage } from '../flashMessage/actions';
export const GET_MARKERS = 'GET_MARKERS';
export const GET_MARKERS_REQUEST = 'GET_MARKERS_REQUEST';
export const GET_MARKERS_FAILURE = 'GET_MARKERS_FAILURE';
export const ADD_MARKER_SUCCESS = 'ADD_MARKER_SUCCESS';
export const ADD_MARKER_REQUEST = 'ADD_MARKER_REQUEST';
export const ADD_MARKER_FAILURE = 'ADD_MARKER_FAILURE';
export const UPDATE_MARKER_SUCCESS = 'UPDATE_MARKER_SUCCESS';
export const UPDATE_MARKER_REQUEST = 'UPDATE_MARKER_REQUEST';
export const UPDATE_MARKER_FAILURE = 'UPDATE_MARKER_FAILURE';
export const DELETE_MARKER_SUCCESS = 'DELETE_MARKER_SUCCESS';
export const DELETE_MARKER_REQUEST = 'DELETE_MARKER_REQUEST';
export const DELETE_MARKER_FAILURE = 'DELETE_MARKER_FAILURE';


export const getMarkers = () => {
    return async dispatch => {
        dispatch(getMarkersRequest());
        try {
            const markers = await markerService.getMarkersList();
            if (markers)
                dispatch(getMarkersSuccess(markers));
        }
        catch (error) {
            dispatch(getMarkersFailure());
            dispatch(createErrorMessage());
        }
    }
}
export const addMarker = (marker) => {
    return async dispatch => {
        dispatch(addMarkerRequest());
        try {
            const googleResponse = await maps.getAddress(marker.latitude, marker.longitude);
            if (googleResponse.status === 'OK') {
                if (validator.validateAddress(googleResponse)) {
                    const response = await markerService.createMarker(marker);
                    if (response) {
                        dispatch(addMarkerSuccess(response));
                        dispatch(getMarkers());
                        dispatch(createSuccessMessage("Marker added successfully."))
                    }
                }
                else {
                    dispatch(createErrorMessage(validator.validationMessges.invalidAddress));
                }
            }
            else {
                dispatch(createErrorMessage(validator.validationMessges.invalidGoogleResponse));
            }
        }
        catch (error) {
            dispatch(getMarkersFailure());
            dispatch(addMarkerFailure(error));
        }
    }
}

export const updateMarker = (marker) => {
    return async dispatch => {
        dispatch(updateMarkerRequest());
        try {
            const googleResponse = await maps.getAddress(marker.latitude, marker.longitude);
            if (googleResponse.status === 'OK') {
                if (validator.validateAddress(googleResponse)) {
                    const response = await markerService.updateMarker(marker);
                    if (response) {
                        dispatch(updateMarkerSuccess(response));
                        dispatch(getMarkers());
                        dispatch(createSuccessMessage("Marker saved successfully."))
                    }
                }
                else {
                    dispatch(createErrorMessage(validator.validationMessges.invalidAddress));
                }
            }
            else {
                dispatch(createErrorMessage(validator.validationMessges.invalidGoogleResponse));
            }

        }
        catch (error) {
            dispatch(getMarkersFailure());
            dispatch(updateMarkerFailure(error));
        }
    }
}
export const deleteMarker = (markerId) => {
    return async dispatch => {
        dispatch(deleteMarkerRequest());
        try {
            const response = await markerService.deleteMarker(markerId);
            if (response) {
                dispatch(deleteMarkerSuccess());
                dispatch(getMarkers());
                dispatch(createSuccessMessage("Marker deleted successfully."))
            }
        }
        catch (error) {
            dispatch(getMarkersFailure());
            dispatch(deleteMarkerFailure(error));
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

export const deleteMarkerSuccess = () => {
    return { type: DELETE_MARKER_SUCCESS };
}
export function deleteMarkerRequest() {
    return { type: DELETE_MARKER_REQUEST };
}
export const deleteMarkerFailure = (error) => {
    return { type: DELETE_MARKER_FAILURE, error };
}

