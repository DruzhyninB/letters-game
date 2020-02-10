
import { Dispatch } from 'redux';
import { AppState } from 'store/store';

export const SET_INITIAL_POS = '[BLOCK] SET_INITIAL_POS';
export const SET_POSITION = '[BLOCK] SET_POSITION';
export const RESET_BLOCKS = '[BLOCK] RESET_BLOCKS';

export interface BlockSetInitialPosAction {
    type: typeof SET_INITIAL_POS;
    payload: {
        x: number,
        y: number,
        id: string
    }
}
export interface BlockSetPosAction {
    type: typeof SET_POSITION;
    payload: {
        x: number,
        y: number,
        id: string
    }
}
export interface BlockRefreshBlocksAction {
    type: typeof RESET_BLOCKS;
}


export const setInitialPos = (id: string, { x, y }: { x: number, y: number }) => {
    return (dispatch: Dispatch<BlockActionsType>, getState: () => AppState) => {
        dispatch({ type: SET_INITIAL_POS, payload: { x, y, id } });
    }
};

export const setPosition = (id: string, { x, y }: { x: number, y: number }) => {
    return (dispatch: Dispatch<BlockActionsType>, getState: () => AppState): void => {
        dispatch({ type: SET_POSITION, payload: { x, y, id } });
    }
}

export const resetBlocks = () => {
    return (dispatch: Dispatch<BlockActionsType>, getState: () => AppState): void => {
        dispatch({ type: RESET_BLOCKS });
    }
};
export type BlockActionsType =
    BlockSetInitialPosAction | BlockSetPosAction | BlockRefreshBlocksAction;
