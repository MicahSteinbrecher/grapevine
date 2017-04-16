import React from 'react';
import './index.css';
import './semantic-ui/semantic.min.css';


class EventDisplay extends React.Component {

    render () {
        return (
            <div className="ui segments" id="eventDisplay">
                <div className="ui segment">
                    <img className="medium ui image" src={this.props.event.coverPicture} />
                </div>
                <div className="ui segment">
                    <p>{this.props.event.name}</p>
                </div>
                <div className="ui segment">
                    <p>{this.props.event.description}</p>
                </div>
                <div className="ui segment">
                    <p>{this.props.event.venue.location.street}, {this.props.event.venue.location.city}, {this.props.event.venue.location.state}</p>
                </div>
                <div className="ui segment">
                    <p>{this.props.event.time}</p>
                </div>
                <div className="ui segment">
                    <p>Attending: {this.props.event.stats.attending}<br />
                    Maybe: {this.props.event.stats.maybe}</p>
                </div>
            </div>
        );
    }

}

export default EventDisplay;