import { Dispatch } from 'redux';
import { AppState } from 'store/store';
import moment from 'moment';


export const START_TIME = '[TIMER] START_TIME';
export const STOP_TIME = '[TIMER] STOP_TIME';
export const ADD_TIME = '[TIMER] ADD_TIME';
export const RESET_TIME = '[TIMER] RESET_TIME';

export interface TimerStartTimerAction {
    type: typeof START_TIME;
    payload: number
}
export interface TimerStopTimerAction {
    type: typeof STOP_TIME;
}
export interface TimerResetTimerAction {
    type: typeof RESET_TIME;
}
export interface TimerAddTimerAction {
    type: typeof ADD_TIME;
    payload: number
}

export const startTimer = () => {
    return (dispatch: Dispatch<TimerActionsType>, getState: () => AppState): number => {
        let timer = window.setInterval(() => {
            dispatch({ type: ADD_TIME, payload: 1000 })
        }, 1000)
        dispatch({ type: START_TIME, payload: timer });
        return timer
    }
};

export const addTime = (value: number) => {
    return (dispatch: Dispatch<TimerActionsType>, getState: () => AppState): void => {
        dispatch({ type: ADD_TIME, payload: value });
    }
}
export const stopTimer = () => {
    return (dispatch: Dispatch<TimerActionsType>, getState: () => AppState): void => {
        dispatch({type:STOP_TIME});
    }
};
export const resetTimer = () => {
    return (dispatch: Dispatch<TimerActionsType>, getState: () => AppState): void => {
        dispatch({type:RESET_TIME});
    }
};
export const getTimeString = () => {
    return (dispatch: Dispatch<TimerActionsType>, getState: () => AppState): string => {
        let time = getState().timer.time,
            dr = moment.duration(time),
            string = moment().hour(dr.hours()).minute(dr.minutes()).second(dr.seconds()).format('HH:mm:ss');
        return string;
    }
}
export type TimerActionsType =
    TimerStartTimerAction | TimerStopTimerAction | TimerAddTimerAction | TimerResetTimerAction;