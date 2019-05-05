import React, { PureComponent } from 'react';
import { Button, DialogContainer, TextField } from 'react-md';
import validator from '../validator';
import PropTypes from 'prop-types'

export class MarkerDialog extends PureComponent {
    render() {
        const { visible, marker, isEdit, isError } = this.props;
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
                        type="number"
                    />
                    <TextField
                        id="marker-long"
                        label="Longitude"
                        placeholder="Longitude"
                        value={marker.longitude}
                        onChange={(value) => this.props.handleChange(value, 'longitude')}
                        required
                        type="number"
                    />
                    {isError && <div className="validation-message">{validator.validationMessges.invalidInputs}</div>}
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