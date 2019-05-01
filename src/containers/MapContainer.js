import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { api_key } from '../config';
import './MapContainer.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMarkers, addTodo } from '../store/markers/actions';
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: null,
            cordinates: '',
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.addPin = this.addPin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addPin = (map) => {
        alert(this.state.cordinates);
        const { dispatch } = this.props;
        const cords = this.state.cordinates;
        const splitedCords = cords ? cords.split(',') : null;
        if (splitedCords.length === 2) {
            const marker = {
                key: splitedCords[0],
                position: {
                    lat: splitedCords[0],
                    lng: splitedCords[1]
                }
            }
            // this.setState({
            //     markers: [...this.state.markers, marker]
            // })
            dispatch(addTodo(marker));
        }
    };

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: marker.name
        });
        alert(marker.name);
    };
    handleChange(e) {
        this.setState({ cordinates: e.target.value });
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getMarkers());
    }
    render() {
        const { markers } = this.props;
        console.log(markers);
        return (
            <div className="">
                <div className="">

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
                </div>
                <div className="Pin-Container--btn">
                    <button onClick={this.addPin} className="addBtn">Add Map</button>

                </div>
                <div className="Pin-Container--text">
                    <input
                        value={this.state.cordinates}
                        onChange={this.handleChange}
                        type="text"
                        pattern='[0-9]+(\.[0-9][0-9]?)?,[0-9]+(\.[0-9][0-9]?)?'
                        name="cordinates"
                        placeholder="lat,lng"
                        title="Three letter country code">
                    </input>
                </div>

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