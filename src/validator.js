const validationMessges = {
    invalidInputs: "Invalid inputs!"
}
//to validate the marker 
const validateMarker = (marker) => {
    let isProperMarker = true;
    if (marker.title || marker.title === "" || marker.title.length < 3) {
        isProperMarker = false;
    }
    if (marker.latitude || marker.latitude === "" || marker.latitude === 0) {
        isProperMarker = false;
    }
    if (marker.longitude || marker.longitude === "" || marker.longitude === 0) {
        isProperMarker = false;
    }
    return isProperMarker;
}

module.exports = {
    validateMarker,
    validationMessges
}