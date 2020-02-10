import * as Actions from '../dropzone.actions';
import testUtl from 'utility/tests';
let store = testUtl.mockStore();

beforeEach(() => {
    store = testUtl.mockStore();
})


describe("Block Actions", () => {
    it('Should invoke setDropzonePosition', async () => {
        let position = testUtl.getDomRect();
        const expectedActions = [{
            type: Actions.SET_DROPZONE_POS,
            payload: {
                id: 'id',
                position
            }
        }]
        store.dispatch(
            Actions.setDropzonePosition('id', position)
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
    it('Should invoke dropToDropzone', async () => {
        let block = document.createElement('div')
        const expectedActions = [{
            type: Actions.ADD_TO_DROPZONE,
            payload: {
                id: 'id',
                block
            }
        }]
        store.dispatch(
            Actions.dropToDropzone(block, 'id')
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
    it('Should invoke removeBlockFromDropzones', async () => {
        const expectedActions = [{
            type: Actions.REMOVE_BLOCK_DROPZONE,
            payload: 'id'
        }]
        store.dispatch(
            Actions.removeBlockFromDropzones('id')
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
    it('Should invoke cleanDropzone', async () => {
        const expectedActions = [{
            type: Actions.CLEAN_DROPZONE,
            payload: 'id'
        }]
        store.dispatch(
            Actions.cleanDropzone('id')
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
    it('Should invoke resetDropzones', async () => {
        const expectedActions = [{
            type: Actions.RESET_DROPZONE
        }]
        store.dispatch(
            Actions.resetDropzones()
        );
        expect(store.getActions()).toEqual(expectedActions)
    });
    it('Should invoke movingAt', async () => {
        let dropzonesList = ['z', 'o', 'o', 'v', 'u'].map((letter, index) => {
            return {
                id: `${index}-dropzone`,
                position: testUtl.getDomRect({
                    t: 100, l: index * 100, w: 100, h: 100
                }),
                accepting: letter,
                order: index,
                contain: null
            }
        });
        let store = testUtl.mockStore({
            dropzone: {
                list: dropzonesList
            }
        })
        
        const expectedActions:any = [];
        const expectedDropzone = dropzonesList[0];

        let findedDropzone = store.dispatch(
            Actions.movingAt({x:50,y:150})
        );
        expect(store.getActions()).toEqual(expectedActions);
        expect(findedDropzone).toEqual(expectedDropzone);
    });
});