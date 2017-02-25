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
            <div className="ui grid" id="searchContainer">
                <div className="sixteen wide column ui input">
                    <input type="text" placeholder="Search..." id="searchInput"/>
                    <button className="ui icon button" id="search" onClick={this.handleClick}>
                        <i className="search icon"></i>
                    </button>
                </div>
                <div className="sixteen wide column">
                    <Menu events={this.props.events} />
                </div>
            </div>


        );
    },
});

export default Search;