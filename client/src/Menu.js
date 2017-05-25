import React from 'react';
import EventDisplay from './EventDisplay';
import './index.css';
import './semantic-ui/semantic.min.css';


class Menu extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);
    }

    handleMouseOver(e) {
        this.props.onMouseOver(e);
    }

    handleMouseLeave(e) {
        this.props.onMouseLeave(e);
    }

    handleMouseClick(e) {
        this.props.onMouseClick(e);
    }

    render() {
        var menu = '';
        var events = this.props.events;

        if (this.props.selectedEventId) {
            var event = '';
            for (var i in events) {
                if (events[i].id == this.props.selectedEventId) {
                    event = events[i];
                    break;
                }
            }
            menu = <EventDisplay event={event}/>
        }
        else if (this.props.hasOwnProperty("events")) {

            for (var i in events){
                if (events[i].id == this.props.activeEventId) {
                    events[i].class = "active item menuItem"
                } else {
                    events[i].class = "item menuItem"
                }
            }
            var eventList = events.map((event) =>
                <a className={event.class} id={event.id} name='menuItem' key={event.name} >
                    {event.name}
                </a>
            );
            menu =
                <div className="ui inverted vertical menu" id="eventPanel"
                    ref={(menu) => { menu = menu; }}
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave}
                     onClick={this.handleMouseClick}>
                    {eventList}
                </div>
        }
        return (
            <div>
            {menu}
            </div>
        );
    }
}

export default Menu;