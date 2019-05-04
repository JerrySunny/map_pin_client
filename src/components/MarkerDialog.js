import React, { PureComponent } from 'react';
import { Button, DialogContainer, TextField } from 'react-md';
import PropTypes from 'prop-types'

export class MarkerDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            marker: {
                latitude: null,
                longitude: null,
                title: ''
            }
        };
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
    add() {
        this.props.addMarker(this.state.marker);
    }
    validate()
    {
        
    }
    render() {
        const { visible } = this.props;
        const actions = [];
        actions.push({ secondary: true, children: 'Cancel', onClick: this.props.hide });
        actions.push(<Button flat primary onClick={() => this.add()}>Confirm</Button>);

        return (
            <div>
                <DialogContainer
                    id="simple-action-dialog"
                    visible={visible}
                    onHide={this.props.hide}
                    actions={actions}
                    title="Marker"
                >
                    <TextField
                        id="marker-title"
                        label="Title"
                        placeholder="marker title"
                        value={this.state.title}
                        onChange={(value) => this.handleChange(value, 'title')}
                        required
                    />
                    <TextField
                        id="marker-lat"
                        label="Latitude"
                        placeholder="latitude"
                        value={this.state.latitude}
                        onChange={(value) => this.handleChange(value, 'latitude')}
                        required
                    />
                    <TextField
                        id="marker-long"
                        label="Longitude"
                        placeholder="Longitude"
                        value={this.state.longitude}
                        onChange={(value) => this.handleChange(value, 'longitude')}
                        required
                    />

                </DialogContainer>
            </div>
        );
    }
}
MarkerDialog.propTypes = {
    visible: PropTypes.bool,
    hide: PropTypes.func,
    addMarker: PropTypes.func,
};
export default MarkerDialog;