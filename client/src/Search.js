import React from 'react';
import {GetEvents} from './Client';
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

        if (value === '') {
            this.setState({
                nodes: [],
                showRemoveIcon: false,
            });
        } else {
            GetEvents({auth:this.props.auth, value: value}, (result) => {
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