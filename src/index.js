import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';
import App from 'components/App';
import * as reducers from 'reducers';
import './stylesheet.scss';

const store = createStore(combineReducers({ ...reducers, routing: routerReducer }));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect from="/scratch-paper" to="/"/>
        <Route exact path="/:categoryKey/:algorithmKey" component={App}/>
        <Route path="/" component={App}/>
      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
