import React from 'react';
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

const coords = {
    lat: 40.730610,
    lng: -73.935242
};

const Map = React.createClass({

    onMapCreated(map) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                map.setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    },


    render() {
        return (
            <Gmaps
                height={'96vh'}
                lat={coords.lat}
                lng={coords.lng}
                zoom={12}
                params={{v: '3.exp', key: 'AIzaSyCnRGJFJHYPNnAJcqRpcAHGjWotJZlKCE4'}}
                onMapCreated={this.onMapCreated}>
            </Gmaps>
        );
    }

});

export default Map