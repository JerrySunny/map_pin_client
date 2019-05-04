import React, { PureComponent } from 'react';
import { GridList, Card, CardTitle, Button, CardActions } from 'react-md';
import PropTypes from 'prop-types'

export class MarkerList extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { markers } = this.props;
        const style = { maxWidth: 600 };

        return (
            <div className="Pin-Container--grid">
                <GridList container="markers" size={6} component="section">
                    {markers.map((marker) => (
                        <Card key={marker._id} style={style}>
                            <CardTitle title={marker.title}
                                subtitle={marker.title}
                            />
                            <p>
                                latitude:{marker.latitude}
                                <br />
                                longitude:{marker.longitude}
                            </p>
                            <CardActions className="md-divider-border md-divider-border--top" centered   >
                                <Button flat primary onClick={()=>this.props.editMarker(marker)}>Edit</Button>
                                <Button flat primary>Delete</Button>
                            </CardActions>
                        </Card>
                    ))}
                </GridList>

            </div>
        )
    }
}
MarkerList.propTypes = {
    markers: PropTypes.array,
    dispatch: PropTypes.func,
    editMarker:PropTypes.func,
};
export default MarkerList;