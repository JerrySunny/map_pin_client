import React, { PureComponent } from 'react';
import { Button, DialogContainer, TextField } from 'react-md';
import PropTypes from 'prop-types'
import { continueStatement } from '@babel/types';

export class MarkerDialog extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { visible, marker, isEdit } = this.props;
        const actions = [];
        const buttonText = isEdit ? "Save" : "Add";
        actions.push({ secondary: true, children: 'Cancel', onClick: this.props.hide });
        actions.push(<Button flat primary onClick={() => this.props.addMarker()}>{buttonText}</Button>);

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
                        value={marker.title}
                        onChange={(value) => this.props.handleChange(value, 'title')}
                        required
                    />
                    <TextField
                        id="marker-lat"
                        label="Latitude"
                        placeholder="latitude"
                        value={marker.latitude}
                        onChange={(value) => this.props.handleChange(value, 'latitude')}
                        required
                    />
                    <TextField
                        id="marker-long"
                        label="Longitude"
                        placeholder="Longitude"
                        value={marker.longitude}
                        onChange={(value) => this.props.handleChange(value, 'longitude')}
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
    marker: PropTypes.object
};
export default MarkerDialog;