import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo.js';
import Map from './Map.js';
import Search from './Search.js';


const App = React.createClass({

    render() {
        return (
            <div>
                <Map />
                <Search />
            </div>
        );
    }

});

export default App