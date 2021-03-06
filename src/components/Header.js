import React from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutRequest } from 'actions/authentication';
import { searchToggle } from 'actions/search';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleSearch() {
        this.props.dispatch(searchToggle());
    }

    handleLogout() {
        this.props.dispatch(logoutRequest()).then(
            () => {
                Materialize.toast('Good Bye!', 2000);

                // EMPTIES THE SESSION OBJECT STORED IN COOKIE
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };
                document.cookie= 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

    render() {

        let loginButton = (
            <ul>
                <li>
                    <Link to="login">
                        <i className="material-icons">vpn_key</i>
                    </Link>
                </li>
            </ul>
        );

        let loginStatus = (
            <ul>
                <li><a href="#" onClick={this.handleLogout}><i className="material-icons">lock_open</i></a></li>
            </ul>
        );

        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">MEMOPAD</Link>

                    <ul>
                        <li><a onClick={this.toggleSearch}><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        { this.props.loginStatus.isLoggedIn ? loginStatus : loginButton  }
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.authentication.status
    };
};

export default connect(mapStateToProps)(Header);
