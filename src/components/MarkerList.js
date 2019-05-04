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
                        <Card key={marker.key} style={style}>
                            <CardTitle title={marker.title}
                                subtitle={marker.title}
                            />
                            <p>
                                latitude:{marker.position.lat}
                                <br />
                                longitude:{marker.position.lng}
                            </p>
                            <CardActions className="md-divider-border md-divider-border--top" centered   >
                                <Button flat primary>Edit</Button>
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
    dispatch: PropTypes.func
};
export default MarkerList;