import React from 'react';
import {Link} from 'react-router';
import {Row, Input, Button} from 'react-materialize';
import { connect } from 'react-redux';
import { loginRequest, registerRequest } from 'actions/authentication';

import { browserHistory } from 'react-router';


class Authentication extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    handleClick() {
        if(this.props.mode===0) {
            /* LOGIN */

            this.props.dispatch(loginRequest(this.state.username, this.state.password)).then(
                () => {
                    if(this.props.loginStatus.status === "SUCCESS") {
                        let loginData = {
                            isLoggedIn: true,
                            username: this.props.currentUser
                        };

                        // SETS THE COOKIE 
                        document.cookie= 'key=' + btoa(JSON.stringify(loginData));

                        Materialize.toast('Welcome, ' + this.props.currentUser + '!', 2000);
                        browserHistory.push('/');
                    }else {
                        let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                        Materialize.toast($toastContent, 2000);
                        this.setState({
                            password: ''
                        });
                        this.loginPassword.focus();
                    }
                }
            );

        } else {
            /* REGISTER */
            this.props.dispatch(registerRequest(this.state.username, this.state.password)).then(
                () => {
                    if(this.props.registerStatus.status === "SUCCESS") {
                        Materialize.toast('Success! Please Log in', 2000);
                        browserHistory.push('/login');
                    } else {
                        const errorMessage = [
                            'Bad Username',
                            'Password is too short',
                            'Username already exists',
                        ];

                        let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.registerStatus.error - 1] + '</span>');
                        Materialize.toast($toastContent, 2000);
                        this.setState({
                            username: '',
                            password: ''
                        });
                    }
                }
            );

        }

    }

    handleKeyPress(e) {
        if(e.charCode==13) {
            this.handleClick();
        }
    }

    render() {

        const loginView = (
            <div>
                <div className="card-content">
                    <Row>
                        <Input s={12}
                            name="username"
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleChange} />
                        <Input s={12}
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            ref= { (ref) => {
                                this.loginPassword = ref;
                            }}
                            onKeyPress={this.handleKeyPress}/>
                        <a className="waves-effect waves-light btn" onClick={this.handleClick}>SUBMIT</a>
                    </Row>
                </div>


                <div className="footer">
                    <div className="card-content">
                        <div className="right"
                            >New Here? <Link to="register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        const registerView = (
            <div>
                <div className="card-content">
                    <Row>
                        <Input s={12}
                            name="username"
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            ref= { (ref) => {
                                this.registerUsername = ref;
                            }}/>
                        <Input s={12}
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            ref= { (ref) => {
                                this.registerPassword = ref;
                            }}
                            onKeyPress={this.handleKeyPress}/>
                        <a className="waves-effect waves-light btn" onClick={this.handleClick}>CREATE</a>
                    </Row>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="home">MEMOPAD</Link>
                <div className="card">
                    <div className="header blue white-text">
                        <div className="card-content">
                            { this.props.mode === 0 ? "LOGIN" : "REGISTER" }
                        </div>
                    </div>
                    {this.props.mode === 0 ? loginView : registerView}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.authentication.login,
        registerStatus: state.authentication.register,
        currentUser: state.authentication.status.currentUser
    };
};

export default connect(mapStateToProps)(Authentication);
