import React from 'react';
import './index.css';
import './semantic-ui/semantic.min.css';

class LoginButton extends React.Component {

    render() {
        return(
            <div className="ui grid">
                <div className="five wide column"></div>
                <div className="six wide column">
                    <div className="ui segment center aligned" id="loginPanel">
                        <button id="loginButton" className="ui facebook button" onClick={this.props.handleClick}>
                            <i className="facebook icon"></i>
                            Login with Facebook
                        </button>
                    </div>
                </div>
                <div className="five wide column"></div>
            </div>
        )
    }
}

export default LoginButton;
