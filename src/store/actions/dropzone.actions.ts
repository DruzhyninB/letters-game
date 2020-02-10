
import { Dispatch } from 'redux';
import { AppState } from 'store/store';
import { DropzoneObject } from 'components/Dropzones/Dropzone';

export const SET_DROPZONE_POS = '[DROPZONE] SET_DROPZONE_POS';
export const ADD_TO_DROPZONE = '[DROPZONE] ADD_TO_DROPZONE';
export const CLEAN_DROPZONE = '[DROPZONE] UPDATE_DROPZONE';
export const REMOVE_BLOCK_DROPZONE = '[DROPZONE] REMOVE_BLOCK_DROPZONE';
export const RESET_DROPZONE = '[DROPZONE] RESET_DROPZONE';

export interface DropzoneSetpositionAction {
    type: typeof SET_DROPZONE_POS;
    payload: {
        id: string,
        position: DOMRect
    }
}
export interface DropzoneAddToDropzoneAction {
    type: typeof ADD_TO_DROPZONE;
    payload: {
        block: HTMLDivElement,
        id: string
    }
}
export interface DropzoneRemoveBlockAction {
    type: typeof REMOVE_BLOCK_DROPZONE;
    payload: string
}
export interface DropzoneCleanAction {
    type: typeof CLEAN_DROPZONE;
    payload: string
}
export interface DropzoneResetAction {
    type: typeof RESET_DROPZONE;
}


export const setDropzonePosition = (id: string, position: DOMRect) => {
    return (dispatch: Dispatch<DropzoneActionsType>, getState: () => AppState): void => {
        dispatch({
            type: SET_DROPZONE_POS, payload: {
                id, position
            }
        });
    }
};

export const dropToDropzone = (block: HTMLDivElement, dropzoneID: string) => {
    return (dispatch: Dispatch<DropzoneActionsType>, getState: () => AppState): void => {
        dispatch({
            type: ADD_TO_DROPZONE, payload: {
                block,
                id: dropzoneID
            }
        });
    }
}

export const removeBlockFromDropzones = (blockId: string) => {
    return (dispatch: Dispatch<DropzoneActionsType>, getState: () => AppState): void => {
        dispatch({
            type: REMOVE_BLOCK_DROPZONE, payload: blockId
        });
    }
}

export const cleanDropzone = (dropzoneID: string) => {
    return (dispatch: Dispatch<DropzoneActionsType>, getState: () => AppState): void => {
        dispatch({
            type: CLEAN_DROPZONE, payload: dropzoneID
        });
    }
}

export const resetDropzones = () => {
    return (dispatch: Dispatch<DropzoneActionsType>, getState: () => AppState): void => {
        dispatch({
            type: RESET_DROPZONE
        });
    }
}

export const movingAt = ({ x, y }: { x: number, y: number }) => {
    return (dispatch: Dispatch<DropzoneActionsType>, getState: () => AppState): DropzoneObject | null => {
        let dropzones = getState().dropzone.list;

        for (const dropzone of dropzones) {
            let { position: p } = dropzone;
            if (p &&
                y >= p.top &&
                y <= p.top + p.height &&
                x >= p.left &&
                x <= p.left + p.width
            ) {
                return dropzone;
            }
        }
        return null;
    }
}


export type DropzoneActionsType =
    DropzoneSetpositionAction | DropzoneAddToDropzoneAction | DropzoneCleanAction | DropzoneRemoveBlockAction | DropzoneResetAction;
