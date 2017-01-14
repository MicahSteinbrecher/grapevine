import React from 'react';
import Client from './Client';
import './index.css';
import './semantic-ui/semantic.min.css';


const Search = React.createClass({
    getInitialState: function () {
        return {
            nodes: []
        };
    },
    handleSearchChange: function (e) {
        const value = e.target.value;
        this.setState({
            searchValue: value,
        });

        if (value === '') {
            this.setState({
                nodes: [],
                showRemoveIcon: false,
            });
        } else {
            this.setState({
                showRemoveIcon: true,
            });

            Client.search(value, (result) => {
                console.log(result);
            });
        }
    },
    handleSearchCancel: function () {
        this.setState({
            nodes: [],
            showRemoveIcon: false,
            searchValue: '',
        });
    },
    render: function () {
        return (
            <div id="searchContainer" className='ui input'>
                <input
                    id='search'
                    type='text'
                    placeholder='Search events...'
                    onChange={this.handleSearchChange}
                />
            </div>
        );
    },
});

export default Search;