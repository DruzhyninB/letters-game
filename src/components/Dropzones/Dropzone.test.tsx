import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import * as Actions from '../../store/actions';
import {AppState} from '../../store/store';
import rootReducer from '../../store/reducers';
import DropzoneComponent,{Dropzone} from "./Dropzone";

const mockStore = configureStore<AppState>([thunk]);

let store = mockStore();
const renderBlock = (reduxStateOverrides?: any, props?: any) => {
    store = mockStore({
        ...rootReducer(undefined,{type:''}),
        ...reduxStateOverrides
    });
    let dropzone = store.getState().dropzone.list[0]
    return mount<Dropzone>(
        <DropzoneComponent {...dropzone} store={store} />
    ).childAt(0);
};


describe("<Dropzone>", () => {

    it("Should render Dropzone", async () => {
        const tree = renderBlock();
        expect(tree.exists()).toBe(true);
    });

    it("Should set position on mount", async ()=>{
        const tree = renderBlock();
        let setPositionActions = store.getActions().find(action=>action.type === Actions.SET_DROPZONE_POS);
        expect(setPositionActions).not.toBeUndefined();
    })

});
