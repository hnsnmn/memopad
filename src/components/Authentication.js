import React from 'react';
import {Link} from 'react-router';
import {Row, Input, Button} from 'react-materialize';
import { connect } from 'react-redux';
import { login } from 'actions/authentication';

class Authentication extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    handleClick() {
        if(this.props.mode===0) {
            /* LOGIN */

            this.props.dispatch(login(this.state.username, this.state.password)).then(
                () => {
                    console.log(this.props.loginResponse);
                }
            );

        } else {
            /* REGISTER */
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
                            onChange={this.handleChange}/>
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
                            onChange={this.handleChange}/>
                        <Input s={12}
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}/>
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
        loginResponse: state.loginResponse
    };
};

export default connect(mapStateToProps)(Authentication);
