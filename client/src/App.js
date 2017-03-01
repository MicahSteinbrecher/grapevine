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
            events: [],
            activeEventId: ''
        };
        this.search = this.search.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onMarkerMouseOver = this.onMarkerMouseOver.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);



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

    search() {
        GetEvents({auth: this.props.auth}, (result) => {
            console.log(result);
            this.setState({
                events: result.events,
                selectedEventId: '',
                activeEventId: ''
            })
        });
    }

    onDrag(center) {
        this.setState({
            lat: center.lat,
            lng: center.lng
        });
        SetLocation({
            lat: this.state.lat,
            lng: this.state.lng
        }, (result) => {
            console.log('saved location');
        });
    }

    onMouseOver(e) {
        if (e.target.name=='menuItem') {
            this.setState({
                activeEventId: e.target.id
            });
        }
    }

    onMarkerMouseOver(data) {
        if (this.state.selectedEventId=='') {
            this.setState({
                activeEventId: data.event.id
            });
        }
    }

    onMouseLeave() {
        if (this.state.selectedEventId=='') {
            this.setState({
                activeEventId: ''
            })
        }
    }

    onMouseClick(e) {
        if (e.target.name=='menuItem') {
            this.setState({
                selectedEventId: e.target.id
            })
        }
    }

    onMarkerClick(data) {
        this.setState({
            selectedEventId: data.event.id,
            activeEventId: data.event.id
        });
    }

    render() {
        return (
            <div>
                <Map {...this.state} onDrag={this.onDrag} onMouseOver={this.onMarkerMouseOver} onClick={this.onMarkerClick} onMouseLeave={this.onMouseLeave}/>
                <Search {...this.state} search={this.search} onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave} onMouseClick={this.onMouseClick}/>
            </div>
        );
    }

}

export default App