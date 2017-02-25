/*global FB*/
import './semantic-ui/semantic.min.css';
import React from 'react';
import App from './App.js';
import LoginButton from './LoginButton.js';
import './index.css';



const LoginControl = React.createClass({

    getInitialState() {
       return {authenticated: false};
    },

    componentDidMount: function () {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1846877582224824',
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.1' // use version 2.1
            });
            FB.getLoginStatus(function (response) {
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);

        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },

    testAPI: function (authData) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
        });
        this.setState({authenticated: true,
                        auth: authData});
    },

    statusChangeCallback: function (response) {
        console.log('statusChangeCallback');
        console.log(response);

        if (response.status === 'connected') {
            this.testAPI(response.authResponse);
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
        }
    },

    handleClick: function () {
        FB.login(function(response) {
            this.statusChangeCallback(response);
        }.bind(this),
            {scope: 'email,user_likes,user_events'}
        );
    },

    render() {
        if (this.state.authenticated == false) {
            return (
                <LoginButton handleClick={this.handleClick}/>
            )
        } else {
            return (
                <App auth={this.state.auth}/>
            )
        }
    }

});

export default LoginControl
