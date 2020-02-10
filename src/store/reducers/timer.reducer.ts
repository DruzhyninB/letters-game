import * as Actions from '../actions';

type timerPropsReducerType = {
    time:number,
    timer:number | undefined,
}
export const initialState: timerPropsReducerType = {
    time: 0,
    timer:undefined
};

const initialPropsReducer = function ( state = initialState, action: Actions.TimerActionsType ): timerPropsReducerType {
    switch ( action.type ) {
        case Actions.ADD_TIME:{
            return {
                ...state,
                time:state.time + action.payload
            }
        }
        case Actions.START_TIME:{
            return {
                ...state,
                timer:action.payload
            }
        }
        case Actions.RESET_TIME:{
            return {
                ...state,
                timer:undefined,
                time:0
            }
        }
        case Actions.STOP_TIME:{
            clearInterval(state.timer);
            return {
                ...state,
                timer:undefined
            }
        }
        default:
            {
                return state;
            }
    }
};

export default initialPropsReducer;