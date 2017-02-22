import React from 'react';
import './index.css';
import './semantic-ui/semantic.min.css';


const Search = React.createClass({

    handleClick: function(e) {
        this.props.search();
    },
    render: function () {
        return (
            <button className="ui icon button" id="search" onClick={this.handleClick}>
                <i className="search icon"></i>
            </button>
        );
    },
});

export default Search;