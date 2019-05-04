import React, { Component } from 'react';
import { Button, GridList, Divider } from 'react-md';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { api_key } from '../config';
import './MapContainer.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMarkers, addTodo } from '../store/markers/actions';
import MarkerDialog from '../components/MarkerDialog';
import MarkerList from '../components/MarkerList'
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: null,
            cordinates: '',
            showDialog: false,
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        // this.addPin = this.addMarker.bind(this);
    }

    openDialog() {
        this.setState({ showDialog: true });
    }
    addMarker = (marker) => {
        // alert('hi');
        const { dispatch } = this.props;
        const markerObj = {
            key: marker.title,
            position: {
                lat: marker.latitude,
                lng: marker.longitude
            },
            title: marker.title
        };
        //     // this.setState({
        //     //     markers: [...this.state.markers, marker]
        //     // })
        dispatch(addTodo(markerObj));
        this.hideDialog();
    };

    hideDialog = () => {
        this.setState({ showDialog: false });
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
        // console.log(markers);
        return (
            <div>
                <MarkerDialog
                    visible={this.state.showDialog}
                    hide={() => this.hideDialog()}
                    handleKeyDown={() => this.handleKeyDownForDialog()}
                    addMarker={(marker) => this.addMarker(marker)}
                >
                </MarkerDialog>
                <GridList container="pictures" size={6} component="section" >
                    <Map google={this.props.google} zoom={14} className="Map-Container">
                        {markers.map(marker => (
                            <Marker
                                key={marker.key}
                                title={'The marker`s title will appear as a tooltip.'}
                                name={'SOMA'}
                                position={marker.position}
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
                        <MarkerList markers={markers} />
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
    markers: state.markers ? state.markers : null,
})
export default connect(
    mapStateToProps
)(GoogleApiWrapper({
    apiKey: (api_key)
})(MapContainer))