import React from 'react';
import './index.css';
import './semantic-ui/semantic.min.css';


class Menu extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseOver(e) {
        this.props.onMouseOver(e);
    }

    handleMouseLeave(e) {
        this.props.onMouseLeave(e);
    }

    render() {
        var menuItems = '';
        if (this.props.hasOwnProperty("events")) {
            menuItems = this.props.events.map((event) =>
                <a className="item menuItem" id={event.id} name='menuItem' key={event.id}>
                    {event.name}
                </a>
            );
        }
        return (
            <div className="ui inverted vertical menu" id="eventPanel"
                 ref={(menu) => { menu = menu; }}
                 onMouseOver={this.handleMouseOver}
                 onMouseLeave={this.handleMouseLeave}>
                {menuItems}
            </div>
        );
    }
}

export default Menu;