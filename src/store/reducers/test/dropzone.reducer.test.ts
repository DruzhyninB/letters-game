import * as Actions from '../../actions';

import dropzoneReducer from '../dropzone.reducer';

describe("Dropzone reducer", () => {
    it("Should have initial state", async () => {
        let state = dropzoneReducer(undefined, {});
        expect(state.list.length).toBeGreaterThan(0);
    });
    it('Should handle RESET_DROPZONE', async () => {
        let state = dropzoneReducer(undefined, {});
        state.list = state.list.map((dropzone, index) => {
            return {
                ...dropzone,
                contain: document.createElement('div')
            }
        });
        let handledState = dropzoneReducer(state, { type: Actions.RESET_DROPZONE });
        state.list.forEach(dropzone=>{
            dropzone.contain = null;
        })
        expect(handledState).toEqual(state);
    });

    it('Should handle REMOVE_BLOCK_DROPZONE', async () => {
        let state = dropzoneReducer(undefined, {});
        state.list[0].contain = document.createElement('div');
        state.list[0].contain.setAttribute('id','block');

        let handledState = dropzoneReducer(state, { 
            type: Actions.REMOVE_BLOCK_DROPZONE, 
            payload: 'block'
        });
        expect(handledState.list[0].contain).toEqual(null);
    });

    it('Should handle CLEAN_DROPZONE', async () => {
        let state = dropzoneReducer(undefined, {});
        state.list[0].contain = document.createElement('div');
        state.list[0].contain.setAttribute('id','block');

        let handledState = dropzoneReducer(state, { 
            type: Actions.CLEAN_DROPZONE, 
            payload: state.list[0].id
        });
        expect(handledState.list[0].contain).toEqual(null);
    });


    it('Should handle ADD_TO_DROPZONE', async () => {
        let state = dropzoneReducer(undefined, {});
        let block = document.createElement('div');
        block.setAttribute('id','block');

        let handledState = dropzoneReducer(state, { 
            type: Actions.ADD_TO_DROPZONE, 
            payload: {
                id:state.list[0].id,
                block
            }
        });

        expect(handledState.list[0].contain).toEqual(block);
    });

    it('Should handle SET_DROPZONE_POS', async () => {
        let state = dropzoneReducer(undefined, {});
        let position = document.createElement('div').getBoundingClientRect();
    
        let handledState = dropzoneReducer(state, { 
            type: Actions.SET_DROPZONE_POS, 
            payload: {
                id:state.list[0].id,
                position
            }
        });
        
        expect(handledState.list[0].position).toEqual(position);
    });
});
