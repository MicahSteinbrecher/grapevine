import React from 'react';
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var coords = {
    lat: 40.730610,
    lng: -73.935242
};

class Map extends React.Component {

    render() {
        return (
            <Gmaps
                height={'96vh'}
                lat={this.props.lat}
                lng={this.props.lng}
                zoom={12}
                params={{v: '3.exp', key: 'AIzaSyCnRGJFJHYPNnAJcqRpcAHGjWotJZlKCE4'}}>
            </Gmaps>
        );
    }

}

export default Map