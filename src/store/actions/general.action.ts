import { Dispatch } from 'redux';
import { AppState } from 'store/store';
import { stopTimer } from './timer.action';
import { AppActions } from '.';
import { resetBlocks } from './block.actions';
import { resetDropzones } from './dropzone.actions';
import { resetTimer } from './timer.action';

export const SET_NAME = '[GENERAL] SET_NAME';
export const SHOW_MODAL = '[GENERAL] SHOW_MODAL';
export const HIDE_MODAL = '[GENERAL] HIDE_MODAL';

export interface GeneralSetNameAction {
    type: typeof SET_NAME;
    payload: string
}
export interface GeneralShowModalAction {
    type: typeof SHOW_MODAL;
}
export interface GeneralHideModalAction {
    type: typeof HIDE_MODAL;
}

export const setName = (name: string) => {
    return (dispatch: Dispatch<GeneralActionsType>, getState: () => AppState): void => {
        dispatch({ type: SET_NAME, payload: name });
    }
};
export const showModal = () => {
    return (dispatch: Dispatch<GeneralActionsType>, getState: () => AppState): void => {
        dispatch({ type: SHOW_MODAL });
    }
};
export const hideModal = () => {
    return (dispatch: Dispatch<GeneralActionsType>, getState: () => AppState): void => {
        dispatch({ type: HIDE_MODAL });
    }
};
export const checkAnswers = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): void => {
        let answers =
            getState().dropzone.list
                .sort((a, b) => a.order - b.order)
                .map(x => {
                    return x.contain ? x.contain.dataset.letter : null;
                });
        let target = getState().general.answer;

        for (const step in target) {
            if (answers[step] !== target[step]) {
                return;
            }
        }
        dispatch(userWin());
    }
};
export const userWin = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): void => {
        dispatch(stopTimer());
        dispatch(showModal());
    }
};
export const restartGame = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): void => {
        dispatch(resetTimer());
        dispatch(resetBlocks());
        dispatch(resetDropzones());
        dispatch(hideModal());
    }
};
export type GeneralActionsType =
    GeneralSetNameAction | GeneralShowModalAction |GeneralHideModalAction;