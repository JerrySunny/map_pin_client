
import {
    GET_MARKERS, GET_MARKERS_REQUEST, GET_MARKERS_FAILURE,
    ADD_MARKER_SUCCESS, ADD_MARKER_FAILURE, ADD_MARKER_REQUEST,
    UPDATE_MARKER_SUCCESS, UPDATE_MARKER_FAILURE, UPDATE_MARKER_REQUEST,
    DELETE_MARKER_SUCCESS, DELETE_MARKER_FAILURE, DELETE_MARKER_REQUEST
} from './actions'

const initialState = {
    marker: {},
    markers: [],
    error: {},
    getMarkersRequest: false,
    addMarkerRequest: false,
    updateMarkerRequest: false,
    deleteMarkerRequest: false,
}
const markers = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKERS_REQUEST:
            return Object.assign({}, state, {
                getMarkersRequest: true,
            });
        case GET_MARKERS_FAILURE:
            return Object.assign({}, state, {
                markers: [],
                getMarkersRequest: false,
            });
        case GET_MARKERS:
            return Object.assign({}, state, {
                markers: action.markers,
                getMarkersRequest: false,
            });
        case ADD_MARKER_REQUEST:
            return Object.assign({}, state, {
                addMarkerRequest: true,
            });
        case ADD_MARKER_SUCCESS:
            return Object.assign({}, state, {
                marker: action.marker,
                createTagsRequest: false,
            });
        case ADD_MARKER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                addMarkerRequest: false,
            });
        case UPDATE_MARKER_REQUEST:
            return Object.assign({}, state, {
                updateMarkerRequest: true,
            });
        case UPDATE_MARKER_SUCCESS:
            return Object.assign({}, state, {
                marker: action.marker,
                updateMarkerRequest: false,
            });
        case UPDATE_MARKER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                updateMarkerRequest: false,
            });
        case DELETE_MARKER_REQUEST:
            return Object.assign({}, state, {
                deleteMarkerRequest: true,
            });
        case DELETE_MARKER_SUCCESS:
            return Object.assign({}, state, {
                deleteMarkerRequest: false,
            });
        case DELETE_MARKER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                deleteMarkerRequest: false,
            });
        default:
            return state
    }
}
export default markers;