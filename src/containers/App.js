import React from 'react';
import { connect } from 'react-redux';

import { Header } from 'components';

import { getStatusRequest } from 'actions/authentication';

class App extends React.Component {

    componentDidMount() {

        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key');

        // loginData is empty: do nothing
        if(typeof loginData === "undefined") return;

        // decrypt base64 then parse to JSON object
        loginData = JSON.parse(atob(loginData));

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

                    document.cookie='key=' + btoa(JSON.stringify(loginData));
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
                <div className="wrapper">
                    { this.props.children }
                </div>
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
