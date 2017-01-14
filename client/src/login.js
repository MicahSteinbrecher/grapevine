import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo.js';

import LoginControl from './LoginControl.js';


const Login = React.createClass({

    render() {
        return (
            <div>
                <LoginControl />
            </div>
        );
    }

});

export default Login