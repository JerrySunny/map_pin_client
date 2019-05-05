import React, { Component } from 'react';
import { Button, GridList, Divider } from 'react-md';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { maps_api_key, default_latitude, default_longitude } from '../config';
import './MapContainer.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMarkers, addMarker, updateMarker, deleteMarker } from '../store/markers/actions';
import MarkerDialog from '../components/MarkerDialog';
import MarkerList from '../components/MarkerList'
import validator from '../validator';
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: null,
            cordinates: '',
            showDialog: false,
            marker: {
                latitude: null,
                longitude: null,
                title: '',
                _id: null
            },
            isEdit: false,
            isError: false,
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    openDialog() {
        this.setState({ showDialog: true });
    }
    editMarker(markerEditObj) {
        const marker = { ...this.state.marker };
        marker._id = markerEditObj._id;
        marker.title = markerEditObj.title;
        marker.latitude = markerEditObj.latitude;
        marker.longitude = markerEditObj.longitude;
        this.setState({ showDialog: true, marker, isEdit: true });
    }
    addMarker = () => {
        const { dispatch } = this.props;
        const marker = { ...this.state.marker }
        if (validator.validateMarker(marker)) {
            const markerObj = {
                _id: marker._id,
                latitude: marker.latitude,
                longitude: marker.longitude,
                title: marker.title
            };
            if (this.state.isEdit) {
                dispatch(updateMarker(markerObj))
            }
            else {
                dispatch(addMarker(markerObj));
            }
            this.hideDialog();
        }
        else {
            this.setState({ isError: true });
        }
    };
    deleteMarker(markerId) {
        const { dispatch } = this.props;
        dispatch(deleteMarker(markerId))
    }
    handleChange(value, id) {
        const marker = { ...this.state.marker }
        if (id === 'title') {
            marker.title = value;
        }
        else if (id === 'latitude') {
            marker.latitude = value;
        }
        else if (id === 'longitude') {
            marker.longitude = value;
        }
        this.setState({ marker });

    }
    hideDialog = () => {
        this.setState({
            showDialog: false, isEdit: false, isError: false, marker: {
                latitude: null,
                longitude: null,
                title: '',
                _id: null
            }
        });
    };
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: marker.name
        });
        alert(marker.name);
    };
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getMarkers());
    }
    render() {
        const { markers } = this.props;
        return (
            <div>
                <MarkerDialog
                    visible={this.state.showDialog}
                    hide={() => this.hideDialog()}
                    addMarker={() => this.addMarker()}
                    marker={this.state.marker}
                    handleChange={(value, id) => this.handleChange(value, id)}
                    isEdit={this.state.isEdit}
                    isError={this.state.isError}
                >
                </MarkerDialog>
                <GridList container="pictures" size={6} component="section" >
                    <Map google={this.props.google} zoom={14} className="Map-Container"
                        initialCenter={{
                            lat: default_latitude,
                            lng: default_longitude
                        }}>
                        {markers.map(marker => (
                            <Marker
                                key={marker._id}
                                title={'The marker`s title will appear as a tooltip.'}
                                name={'SOMA'}
                                position={{ lat: marker.latitude, lng: marker.longitude }}
                                onClick={this.onMarkerClick} />
                        ))}
                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                                <h1>{this.state.selectedPlace}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                    <div className="Pin-Container" name='markers'>
                        <div>
                            <Button flat primary swapTheming onClick={() => this.openDialog()} className="addBtn">Add Marker</Button>
                        </div>
                        <Divider className="Pin-Container--divider" />
                        <MarkerList markers={markers}
                            editMarker={(marker) => this.editMarker(marker)}
                            deleteMarker={(markerId) => this.deleteMarker(markerId)}
                        />
                    </div>
                </GridList>

            </div>
        );
    }
}
MapContainer.propTypes = {
    markers: PropTypes.array,
    dispatch: PropTypes.func
};
const mapStateToProps = state => ({
    markers: state.markers ? state.markers.markers : null,
})
export default connect(
    mapStateToProps
)(GoogleApiWrapper({
    apiKey: (maps_api_key)
})(MapContainer))