
import { GET_MARKERS, ADD_MARKER } from './actions'

const markers = (state = [], action) => {
    switch (action.type) {
        case GET_MARKERS:
            return [
                ...state,
                ...action.markers
            ]
        case ADD_MARKER:
            return [
                ...state,
                action.marker
            ]
        default:
            return state
    }
}
export default markers;