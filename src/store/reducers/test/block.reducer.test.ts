import * as Actions from '../../actions';
import blockReducer from '../block.reducer';

describe("Block reducer", () => {
    it("Should have initial state", async () => {
        let state = blockReducer(undefined, {});
        expect(state.list.length).toBeGreaterThan(0);
    });
    it('Should handle RESET_BLOCKS', async () => {
        let state = blockReducer(undefined, {});
        state.list = state.list.map((block, index) => {
            return {
                ...block,
                initialPos: {
                    x: index,
                    y: index,
                },
                position: {
                    top: index + 1,
                    left: index + 1
                }
            }
        });
        let handledState = blockReducer(state, { type: Actions.RESET_BLOCKS });
        state.list.forEach(block => {
            if (block.initialPos)
                block.position = {
                    ...block.position,
                    top: block.initialPos.y,
                    left: block.initialPos.x
                }
        })
        expect(handledState).toEqual(state);
    });
    it('Should handle SET_INITIAL_POS', async () => {
        let state = blockReducer(undefined, {});
        let handledState = blockReducer(state, {
            type: Actions.SET_INITIAL_POS,
            payload: {
                id: state.list[0].id,
                x: 1,
                y: 1
            }
        });
        expect(handledState.list[0].initialPos?.x).toEqual(1);
        expect(handledState.list[0].initialPos?.y).toEqual(1);
        expect(handledState.list[0].position?.position).toEqual('absolute');
        expect(handledState.list[0].position?.top).toEqual(1);
        expect(handledState.list[0].position?.left).toEqual(1);
    });
    it('Should handle SET_POSITION', async () => {
        let state = blockReducer(undefined, {});
        let handledState = blockReducer(state, {
            type: Actions.SET_POSITION,
            payload: {
                id: state.list[0].id,
                x: 1,
                y: 1
            }
        });
        expect(handledState.list[0].position?.top).toEqual(1);
        expect(handledState.list[0].position?.left).toEqual(1);
    })
});