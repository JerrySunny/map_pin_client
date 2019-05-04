import React, { Component } from 'react';
import { Button, GridList, Divider } from 'react-md';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { api_key } from '../config';
import './MapContainer.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMarkers, addMarker } from '../store/markers/actions';
import MarkerDialog from '../components/MarkerDialog';
import MarkerList from '../components/MarkerList'
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
        const marker = { ...this.state.marker }
        const { dispatch } = this.props;
        const markerObj = {
            _id: marker._id,
            latitude: marker.latitude,
            longitude: marker.longitude,
            title: marker.title
        };
        dispatch(addMarker(markerObj));
        this.hideDialog();
    };
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
            showDialog: false, isEdit: false, marker: {
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
                >
                </MarkerDialog>
                <GridList container="pictures" size={6} component="section" >
                    <Map google={this.props.google} zoom={14} className="Map-Container">
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
                        <MarkerList markers={markers} editMarker={(marker) => this.editMarker(marker)} />
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
    apiKey: (api_key)
})(MapContainer))