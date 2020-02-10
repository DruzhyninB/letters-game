import * as Actions from '../timer.action';
import testUtl from 'utility/tests';
let store = testUtl.mockStore();

beforeEach(() => {
    store = testUtl.mockStore();
})


describe("Block Actions", () => {
    it('Should invoke startTimer', async ()=>{
        let expectedActions = [{
            type: Actions.START_TIME,
            payload:0
        }];

        let timer = store.dispatch(
            Actions.startTimer()
        )
        expectedActions[0].payload = timer;
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should invoke addTime', async ()=>{
        let expectedActions = [{
            type: Actions.ADD_TIME,
            payload:1000
        }];

        store.dispatch(
            Actions.addTime(1000)
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should invoke stopTimer', async ()=>{
        let expectedActions = [{
            type: Actions.STOP_TIME
        }];

        store.dispatch(
            Actions.stopTimer()
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should invoke resetTimer', async ()=>{
        let expectedActions = [{
            type: Actions.RESET_TIME
        }];

        store.dispatch(
            Actions.resetTimer()
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should invoke getTimeString', async ()=>{
        let expectedActions:any = [];
        let store = testUtl.mockStore({
            timer:{
                time:5000
            }
        })
        let timerString = store.dispatch(
            Actions.getTimeString()
        )
        expect(store.getActions()).toEqual(expectedActions);
        expect(timerString).toEqual('00:00:05');
    });
});