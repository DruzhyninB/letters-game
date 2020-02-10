
import * as Actions from '../../actions';
import timerReducer,{initialState} from '../timer.reducer';

describe("Dropzone reducer", () => {
    it('Should have initial state', async ()=>{
        let state = timerReducer(undefined, {} as Actions.AppActions);
        expect(state).toEqual(initialState);
    });

    it('Should handle ADD_TIME', async ()=>{
        let state = timerReducer(undefined, {
            type:Actions.ADD_TIME,
            payload:1000
        });
        let handledState = timerReducer(state, {
            type:Actions.ADD_TIME,
            payload:1000
        });
        expect(state.time).toEqual(1000);
    });
    it('Should handle START_TIME', async ()=>{
        let timer = window.setInterval(()=>{},1000);
        let state = timerReducer(undefined, {
            type:Actions.START_TIME,
            payload:timer
        });
        expect(state.timer).toEqual(timer);
    });
    it('Should handle RESET_TIME', async ()=>{
        let expectedState = {
            timer:undefined,
            time:0
        }
        let state = timerReducer(undefined, {
            type:Actions.RESET_TIME
        });
        expect(state).toEqual(expectedState);
    });
});