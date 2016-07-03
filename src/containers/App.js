import React from 'react';
import { connect } from 'react-redux';

import { Header } from 'components';

import { getStatusRequest } from 'actions/authentication';

class App extends React.Component {

    componentDidMount() {
        let loginData = sessionStorage.loginData;
        // loginData is empty: do nothing
        if(typeof loginData === "undefined") return;

        // parse loginData to JSON object
        loginData = JSON.parse(loginData);

        // if it is not logged in, do nothing
        if(!loginData.isLoggedIn) return;

        console.log(loginData);
        this.props.dispatch(getStatusRequest()).then(
            () => {
                if(!this.props.check) {
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);

                    sessionStorage.loginData = JSON.stringify(loginData);
                }
            }
        );


    }

    render(){
        /* Check whether current route is login or register using regex */
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                { !isAuth ? (<Header/>) : (<div/>) }
                { this.props.children }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        check: state.authentication.status.check
    };
};

export default connect(mapStateToProps)(App);
