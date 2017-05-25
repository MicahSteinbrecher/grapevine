import React from 'react';
import Menu from './Menu.js';
import './index.css';
import './semantic-ui/semantic.min.css';


const Search = React.createClass({

    handleClick: function(e) {
        this.props.search();
    },
    render: function () {
        return (
            <div>
                <button className="ui icon button" id="search" onClick={this.handleClick}>
                    <i className="search icon"></i>
                </button>
                <div className="ui grid" id="searchContainer">
                    <Menu events={this.props.events} activeEventId={this.props.activeEventId} onMouseOver={this.props.onMouseOver} onMouseLeave={this.props.onMouseLeave} onMouseClick={this.props.onMouseClick} selectedEventId={this.props.selectedEventId}/>
                </div>
            </div>
        );
    },
});

export default Search;