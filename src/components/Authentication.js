import React from 'react';
import {Link} from 'react-router';
import {Row, Input, Button} from 'react-materialize';

class Authentication extends React.Component {
    render() {

        const loginView = (
            <div>
                <div className="card-content">
                    <Row>
                        <Input s={12} label="Username" />
                        <Input s={12} type="password" label="Password" />
                        <a className="waves-effect waves-light btn">SUBMIT</a>
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
                        <Input s={12} label="Username" />
                        <Input s={12} type="password" label="Password" />
                        <a className="waves-effect waves-light btn">CREATE</a>
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

export default Authentication;
