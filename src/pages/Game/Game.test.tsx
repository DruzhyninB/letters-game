import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from "react-redux";

import * as Actions from '../../store/actions';
import { AppState } from '../../store/store';
import rootReducer from '../../store/reducers';
import GameComponent, { Game } from "./Game";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';


const mockStore = configureStore<AppState>([thunk]);

let history = createMemoryHistory();
let store = mockStore();
const renderBlock = (reduxStateOverrides?: any, props?: any) => {
    store = mockStore({
        ...rootReducer(undefined, { type: '' }),
        ...reduxStateOverrides
    });
    history = createMemoryHistory();

    return mount(
        <ReduxProvider store={store}>
            <Router history={history}>
                <GameComponent />
            </Router>
        </ReduxProvider>
    ).childAt(0);
};


describe("<Game>", () => {

    it("Should render Game", async () => {
        const tree = renderBlock();
        expect(tree.exists()).toBe(true);
    });

    it("Should render proper amount of blocks", async () => {
        const tree = renderBlock();
        let expectedAmountOfBlocks = store.getState().block.list.length;
        let renderedAmountOfblocks = tree.find('.dnd-block').length;
        expect(renderedAmountOfblocks).toEqual(expectedAmountOfBlocks);
    });

    it("Should render proper amount of dropzones", async () => {
        const tree = renderBlock();
        let expectedAmountOfDropzones = store.getState().dropzone.list.length;
        let renderedAmountOfDropzones  = tree.find('.dnd-dropzone').length;
        expect(renderedAmountOfDropzones).toEqual(expectedAmountOfDropzones);
    });

    it("Should render Menu", async () => {
        const tree = renderBlock();
        expect(tree.find('.menu').exists()).toBeTruthy();
    });
    it("Should render Modal", async () => {
        const tree = renderBlock({
            general:{
                modal:{
                    visible:true
                }
            }
        });
        expect(tree.find('.modal').exists()).toBeTruthy();
    });
});
