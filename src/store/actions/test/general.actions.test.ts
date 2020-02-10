import * as Actions from '../general.action';
import * as timerActions from '../timer.action';
import * as blockActions from '../block.actions';
import * as dropzoneActions from '../dropzone.actions';
import testUtl from 'utility/tests';
let store = testUtl.mockStore();

beforeEach(() => {
    store = testUtl.mockStore();
})

describe("General Actions", () => {
    it('Should invoke setName', async ()=>{
        const expectedActions = [{
            type: Actions.SET_NAME,
            payload:'John'
        }];

        store.dispatch(
            Actions.setName('John')
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should invoke showModal', async ()=>{
        const expectedActions = [{
            type: Actions.SHOW_MODAL
        }];

        store.dispatch(
            Actions.showModal()
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should invoke hideModal', async ()=>{
        const expectedActions = [{
            type: Actions.HIDE_MODAL
        }];

        store.dispatch(
            Actions.hideModal()
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should correctly invoke checkAnswers when user win', async ()=>{
        let dropzoneList = ['z', 'o', 'o', 'v', 'u'].map((letter, index) => {
            let contain = testUtl.createBlock();
            contain.dataset.letter = letter;
            return {
                id: `${index}-dropzone`,
                position: testUtl.getDomRect({
                    t: 100, l: index * 100, w: 100, h: 100
                }),
                accepting: letter,
                order: index,
                contain
            }
        });
        let store = testUtl.mockStore({
            timer:{timer:0},
            general:{
                answer:['z', 'o', 'o', 'v', 'u']
            },
            dropzone:{
                list:dropzoneList
            }
        });

        const expectedActions = [{
            type: timerActions.STOP_TIME
        },
        {
            type: Actions.SHOW_MODAL
        }]

        store.dispatch(
            Actions.checkAnswers()
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should correctly invoke checkAnswers when user not win', async ()=>{
        let dropzoneList = ['z', 'o', 'o', 'v', 'u'].map((letter, index) => {
            let contain = testUtl.createBlock();
            contain.dataset.letter = 'u';
            return {
                id: `${index}-dropzone`,
                position: testUtl.getDomRect({
                    t: 100, l: index * 100, w: 100, h: 100
                }),
                accepting: letter,
                order: index,
                contain
            }
        });
        let store = testUtl.mockStore({
            timer:{timer:0},
            general:{
                answer:['z', 'o', 'o', 'v', 'u']
            },
            dropzone:{
                list:dropzoneList
            }
        });

        const expectedActions:any = []

        store.dispatch(
            Actions.checkAnswers()
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('Should invoke userWin', async ()=>{
        const expectedActions = [{
            type: timerActions.STOP_TIME
        },
        {
            type: Actions.SHOW_MODAL
        }];
        store.dispatch(
            Actions.userWin()
        )
        expect(store.getActions()).toEqual(expectedActions);

    });
    it('Should invoke restartGame', async ()=>{
        const expectedActions = [{
            type: timerActions.RESET_TIME
        },{
            type: blockActions.RESET_BLOCKS
        },{
            type: dropzoneActions.RESET_DROPZONE
        },{
            type: Actions.HIDE_MODAL
        }];
        store.dispatch(
            Actions.restartGame()
        )
        expect(store.getActions()).toEqual(expectedActions);
    });
});
