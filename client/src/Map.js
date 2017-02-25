import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';
import {SetLocation} from './Client';


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
        // This binding is necessary to make `this` work in the callback
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (this.props != nextProps){
            this.state = nextProps;
        }
    }

    handleDrag() {
        var center = this.map.getMap().getCenter();
        var location = {
            lat: center.lat(),
            lng: center.lng()
        }
        this.props.onDrag(location);
    }

    render() {
        var events = this.props.events;
        var markers = events.map((event) =>
            <Marker key={event.id}
                lat={event.venue.location.latitude}
                lng={event.venue.location.longitude}
            />
        );
            return (
            <Gmaps
                height={'100vh'}
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={13}
                params={{v: '3.exp', key: 'AIzaSyCnRGJFJHYPNnAJcqRpcAHGjWotJZlKCE4'}}
                ref={(map) => { this.map = map; }}
                onDrag={this.handleDrag}>
                {markers}
            </Gmaps>
        );
    }

}

export default Map