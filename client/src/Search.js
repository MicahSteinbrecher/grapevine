import React from 'react';
import './index.css';
import './semantic-ui/semantic.min.css';


const Search = React.createClass({

    handleChange: function(e) {
        this.props.search(e.target.value);
    },
    render: function () {
        return (
            <div id="searchContainer" className='ui input'>
                <input
                    id='search'
                    type='text'
                    placeholder='Search events...'
                    onChange={this.handleChange}
                />
            </div>
        );
    },
});

export default Search;