import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

class Map extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.onDrag = this.onDrag.bind(this);
    }

    onDrag(e) {
        console.log(e);
    }

    render() {
        var events = this.props.events;
        var markers = events.map((event) =>
            <Marker
                lat={event.venue.location.latitude}
                lng={event.venue.location.longitude}
            />
        );
            return (
            <Gmaps
                height={'100vh'}
                lat={this.props.lat}
                lng={this.props.lng}
                zoom={13}
                params={{v: '3.exp', key: 'AIzaSyCnRGJFJHYPNnAJcqRpcAHGjWotJZlKCE4'}}
                onDrag={this.onDrag}>
                {markers}
            </Gmaps>
        );
    }

}

export default Map