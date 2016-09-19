// react, redux, and routing
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

// state and reducers
import {reducers as pageReducers, initialState as pageState} from 'src/components/page';
import {reducers as loginFormReducers, initialState as loginFormState} from 'src/components/form';

// page components
import LoginPage from './pages/login';
import GreetingsPage from './pages/greetings';
import NotAuthorizedPage from './pages/not-authorized';

// mix it all together and fire the app up...
let reducers = combineReducers(Object.assign({}, pageReducers, loginFormReducers)),
    initialState = Object.assign({}, pageState, loginFormState);

let App = (  
    <Provider store={createStore(reducers, initialState)}>
      <Router history={browserHistory}>
        <Route path="/" component={LoginPage} />
        <Route path="/greetings" component={GreetingsPage} requiresAuthorization={true} />
        <Route path="/not-authorized" component={NotAuthorizedPage} />
      </Router>
    </Provider>);

ReactDOM.render(App, document.getElementById('app-root'));
