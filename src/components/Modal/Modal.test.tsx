import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";
import thunk from 'redux-thunk';

import Modal from './Modal';


const mockStore = configureStore([thunk]);
let store = mockStore({});
const renderModal = (reduxStateOverrides?: any, props?: any) => {
    store = mockStore({
        ...reduxStateOverrides
    });

    return mount(
        <ReduxProvider store={store}>
            <Modal store={store} />
        </ReduxProvider>
    );
};

let initialState = {
    general: {
        modal: {
            visible: true
        }
    },
    timer: {
        timer: undefined,
        time: 5000
    }
};

describe("<Modal>", () => {

    it("Should render Modal", async () => {
        let tree = renderModal(initialState);
        expect(tree.exists()).toBeTruthy();
    });

    it("Should hide Modal if its not visible", async () => {
        let tree = renderModal({...initialState,...{general:{modal:{visible:false}}}});
        let modalEl = tree.find('.modal')
        expect(modalEl.exists()).not.toBeTruthy();
    });

    it("Should show Modal if its visible", async () => {
        let tree = renderModal({...initialState,...{general:{modal:{visible:true}}}});
        let modalEl = tree.find('.modal')
        expect(modalEl.exists()).toBeTruthy();
    });

    it("Should show proper timee value", async () => {
        let tree = renderModal(initialState);
        let timerValue = tree.find('.modal-timer-value').text();
        expect(timerValue).toBe('00:00:05');
    });
});
