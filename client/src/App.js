import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo.js';
import Map from './Map.js';
import Search from './Search.js';
import {GetEvents} from './Client';
import {SetLocation} from './Client';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 40.730610,
            lng: -73.935242,
            events: []
        };
        this.search = this.search.bind(this);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                SetLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }, (result) => {
                    console.log('saved location');
                });
            });
        }
    }

    getLocation() {

    }

    search() {
        GetEvents({auth: this.props.auth}, (result) => {
            console.log(result);
            this.setState({
                events: result.events,
            })
        });
    }

    render() {
        return (
            <div>
                <Map {...this.state}/>
                <Search auth={this.props.auth} search={this.search}/>
            </div>
        );
    }

}

export default App