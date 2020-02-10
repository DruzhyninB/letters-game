import * as React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Game from './Game';

import store from './store/store';
import {routes} from './config/routes';

import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/letters-game">
            <Game routes={routes}  />
        </BrowserRouter>
    </Provider>
    , document.getElementById( 'root' ) );
