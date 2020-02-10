import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import * as Actions from '../../store/actions';

import Timer from '../Timer/Timer';

let history = createMemoryHistory();

const mockStore = configureStore([thunk]);
let store = mockStore({});
const renderTimer = (reduxStateOverrides?: any, props?: any) => {
    store = mockStore({
        ...reduxStateOverrides
    });
    history = createMemoryHistory();

    return mount(
        <ReduxProvider store={store}>
            <Timer store={store} />
        </ReduxProvider>
    );
};

let initialState = {
    timer: {
        timer: undefined,
        time: 5000
    }
};

describe("<Timer>", () => {

    it("Should render Timer", async () => {
        let tree = renderTimer(initialState);
        expect(tree.exists).toBeTruthy();
    });

    it("Should render propper time", async () => {
        let tree = renderTimer(initialState);
        let timerTxt = tree.find('.timer').text();
        expect(timerTxt).toBe('Your score 00:00:05');
    });
    
});
