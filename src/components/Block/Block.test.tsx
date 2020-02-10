import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import {AppState} from 'store/store';
import * as Actions from 'store/actions';
import rootReducer from 'store/reducers';
import BlockComponent,{Block} from "./Block";

const mockStore = configureStore<AppState>([thunk]);

let store = mockStore();
const renderBlock = (reduxStateOverrides?: any, props?: any) => {
    store = mockStore({
        ...rootReducer(undefined,{type:''}),
        ...reduxStateOverrides
    });
    let block = store.getState().block.list[0]

    return mount<Block>(
        <BlockComponent {...block} store={store} />
    ).childAt(0);
};


describe("<Block>", () => {

    it("Should render Block", async () => {
        const tree = renderBlock();
        expect(tree.exists()).toBe(true);
    });

    it("Should handle MouseDown event", async () => {
        const tree = renderBlock();
        document.addEventListener = jest.fn();
        tree.find('div.dnd-block').simulate('mousedown', {
            clientX: 100,
            clientY: 100
        });
        let startTimerAction = store.getActions().find(action=>action.type === Actions.START_TIME)

        expect(startTimerAction).not.toBeUndefined();
        expect(document.addEventListener).toBeCalledTimes(2);
    });

    it("Should handle MouseDown event", async () => {
        const tree = renderBlock();
        document.addEventListener = jest.fn();
        tree.find('div.dnd-block').simulate('mousedown', {
            clientX: 100,
            clientY: 100
        });
        let startTimerAction = store.getActions().find(action=>action.type === Actions.START_TIME)

        expect(startTimerAction).not.toBeUndefined();
        expect(document.addEventListener).toBeCalledTimes(2);
    });

    it("Should handle mousemove global event", async () => {
        const tree = renderBlock();
        const instance = tree.instance() as Block;
        jest.spyOn(instance,'mousemove');
        let global:any = {}
        document.addEventListener = jest.fn((event, cb)=>{
            global[event] = cb;
        });
        tree.find('div.dnd-block').simulate('mousedown', {
            clientX: 100,
            clientY: 100
        });

        global.mousemove({
            clientX: 100,
            clientY: 100
        });

        expect(instance.mousemove).toBeCalledTimes(1);
    });

    it("Should handle mouseup global event", async () => {
        const tree = renderBlock();
        const instance = tree.instance() as Block;
        jest.spyOn(instance,'mouseup');
        let global:any = {}
        document.addEventListener = jest.fn((event, cb)=>{
            global[event] = cb;
        });
        tree.find('div.dnd-block').simulate('mousedown', {
            clientX: 100,
            clientY: 100
        });

        global.mouseup({
            clientX: 100,
            clientY: 100
        });

        expect(instance.mouseup).toBeCalledTimes(1);
    });
});
