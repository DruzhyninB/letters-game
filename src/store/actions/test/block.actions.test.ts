import * as Actions from '../block.actions';
import testUtl from 'utility/tests';
let store = testUtl.mockStore();

beforeEach(() => {
    store = testUtl.mockStore();
})

describe("Block Actions", () => {
    it('Should invoke setInitialPos correctly', async () => {
        const expectedActions = [{
            type: Actions.SET_INITIAL_POS,
            payload: { id: 'id', x: 1, y: 1 }
        }]
        store.dispatch(
            Actions.setInitialPos('id', { x: 1, y: 1 })
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
    it('Should invoke setPosition correctly', async () => {
        const expectedActions = [{
            type: Actions.SET_POSITION,
            payload: { id: 'id', x: 1, y: 1 }
        }]
        store.dispatch(
            Actions.setPosition('id', { x: 1, y: 1 })
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
    it('Should invoke setPosition correctly', async () => {
        const expectedActions = [{
            type: Actions.RESET_BLOCKS
        }]
        store.dispatch(
            Actions.resetBlocks()
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
});