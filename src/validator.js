import { default_country } from './config';
const validationMessges = {
    invalidInputs: "Invalid inputs!",
    invalidAddress:`Not a valid address in ${default_country}`,
    invalidGoogleResponse:'Error on google api'
}
const latitudePattern = new RegExp('^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$');
const longitudePattern = new RegExp('^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$');
//to validate the marker 
const validateMarker = (marker) => {
    let isProperMarker = true;
    if (!marker.title || marker.title === "" || marker.title.length < 3) {
        isProperMarker = false;
    }
    if (!marker.latitude || marker.latitude === ""
        || marker.latitude === 0 || !latitudePattern.test(marker.latitude)) {
        isProperMarker = false;
    }
    if (!marker.longitude || marker.longitude === ""
        || marker.longitude === 0 || !longitudePattern.test(marker.longitude)) {
        isProperMarker = false;
    }
    return isProperMarker;
}

const validateAddress = (address) => {
    let isValid = true;
    if (address) {
        const addressCode = address.plus_code.compound_code.split(',');
        const country = addressCode[addressCode.length - 1];
        if (country.trim() !== default_country.trim()) {
            isValid = false;
        }
    }
    return isValid;
}

export default {
    validateMarker,
    validateAddress,
    validationMessges,
}