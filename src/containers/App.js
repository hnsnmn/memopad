import React from 'react';
import { connect } from 'react-redux';

import { Header } from 'components';

class App extends React.Component {
    render(){
        /* Check whether current route is login or register using regex */
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
        console.log(this.props.location.pathname);

        return (
            <div>
                { !isAuth ? (<Header/>) : (<div/>) }
                { this.props.children }
            </div>
        );
    }
}


export default App;
