
import {
    GET_MARKERS, GET_MARKERS_REQUEST, GET_MARKERS_FAILURE,
    ADD_MARKER_SUCCESS, ADD_MARKER_FAILURE, ADD_MARKER_REQUEST
} from './actions'

const initialState = {
    marker: {},
    markers: [],
    error: {},
    getMarkersRequest: false,
    addMarkerRequest: false,
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
                createTagsRequest: false,
            });
        default:
            return state
    }
}
export default markers;