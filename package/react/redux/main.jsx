/* global __codeSplitType__ */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// router lib
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history'

import AsyncComponent from './components/AsyncComponent';

//main containers
import App from './containers/App';
import NoMatch from './containers/NoMatch';

//前置注入全局常量
import config from './api/config';
import service from './api/service';
import util from './api/util';

window.config = config;
window.service = service;
window.util = util;

const { mode, split } = window.config.router;

const history = mode === 'hash' ? createHashHistory() : createBrowserHistory();

import routes from './router/__routerMode__'

// store.subscribe(() => {
//     console.log(store.getState());
// })

const routeConfig = (routes) => {
    return (
        <App >
            <Router history={history} >
                <Switch>
                    {
                        routes.map((item, index) => (
                            <Route key={index} path={item.path} exact={item.exact} component={item.component} />
                        ))
                    }
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </App >
    )
}

render(
    <Provider store={store}>
        {routeConfig(routes)}
    </Provider>,
    document.getElementById('app')
);
