import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { App, Login, Register, Home } from 'containers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const rootElement = document.getElementById('root');
ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
            </Route>
        </Router>, rootElement);
