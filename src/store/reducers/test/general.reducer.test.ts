
import * as Actions from '../../actions';
import generalReducer,{initialState} from '../general.reducer';

describe("Dropzone reducer", () => {
    it('Should have initial state', async ()=>{
        let state = generalReducer(undefined, {});
        expect(state).toEqual(initialState);
    });
    it('Should handle SET_NAME', async ()=>{
        let state = generalReducer(undefined, {
            type:Actions.SET_NAME,
            payload:'John'
        });
        expect(state.name).toEqual('John');
    });
    it('Should handle SHOW_MODAL', async ()=>{
        let state = generalReducer(undefined, {
            type:Actions.SHOW_MODAL
        });
        expect(state.modal.visible).toEqual(true);
    });
    it('Should handle HIDE_MODAL', async ()=>{
        let state = generalReducer(undefined, {});
        state.modal.visible = true
        let handledState = generalReducer(state, {
            type:Actions.HIDE_MODAL
        });
        expect(handledState.modal.visible).toEqual(false);
    });

});