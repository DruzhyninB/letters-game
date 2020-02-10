import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import * as Actions from 'store/actions';

import Welcome from "./Welcome";

const mockStore = configureStore([thunk]);

let history = createMemoryHistory();
let store = mockStore({});

const renderWelcome = (reduxStateOverrides?:any, props?:any) => {
  store  = mockStore({
    general:{
      name:''
    },
    ...reduxStateOverrides
  });
  history = createMemoryHistory();

  return mount(
    <ReduxProvider store={store}>
      <Router history={history}>
        <Welcome {...props} />
      </Router>
    </ReduxProvider>
  );
};


describe("<Welcome>", () => {

  it("Should render empty input", async () => {
    const tree = renderWelcome();
    expect(tree.find("input")).toHaveValue("");
  });

  it("Should accept user input", async () => {
    const tree = renderWelcome();
    tree.find('input').simulate('change',{target:{value:'John'}});
    expect(tree.find("input")).toHaveValue("John");
  });

  it("Should reject continue with empty input", async () => {
    const tree = renderWelcome();

    tree.find('input').simulate('change',{target:{value:''}});
    tree.find('button').simulate('click');
    
    expect(history.length).toEqual(1);
  });

  it("Should dispatch Name and move to game on continue", async () =>{
    const expectedActions = [{
      type:Actions.SET_NAME,
      payload:'John'
    }]
    const tree = renderWelcome();
    tree.find('input').simulate('change',{target:{value:'John'}});
    tree.find('button').simulate('click');
    expect(history.location.pathname).toBe('/game');
    expect(store.getActions()).toEqual(expectedActions);
  })
});
