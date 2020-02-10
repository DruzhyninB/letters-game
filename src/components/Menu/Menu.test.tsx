import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import * as Actions from '../../store/actions';

import Menu from "./Menu";
import Timer from '../Timer/Timer';

let history = createMemoryHistory();

const mockStore = configureStore([thunk]);
let store = mockStore({});
const renderMenu = (reduxStateOverrides?: any, props?: any) => {
    store = mockStore({
        ...reduxStateOverrides
    });
    history = createMemoryHistory();

    return mount(
    <ReduxProvider store={store}>

        <Router history={history}>
            <Menu store={store} />
        </Router>
        </ReduxProvider>
    );
};

let initialState = {
    general:{
        name:"John"
    },
    timer:{
        timer:undefined,
        time:0
    }
};

describe("<Menu>", () => {

    it("Should render Menu", async () => {
        let tree = renderMenu(initialState);
        expect(tree.exists).toBeTruthy();
    });

    it("Should render user name", async () => {
        let tree = renderMenu(initialState);
        let menutitle = tree.find('.menu-title').text();
        expect(menutitle).toBe('Good luck, John!')
    });

    it("Should render Timer", async () => {
        let tree = renderMenu(initialState);
        let TimerEl = tree.find(Timer);
        expect(TimerEl.exists).toBeTruthy();
    });

});
