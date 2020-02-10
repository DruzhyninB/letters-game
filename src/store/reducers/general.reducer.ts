import * as Actions from '../actions';

type generalPropsReducerType = {
    name: string,
    answer: string[],
    modal:{
        visible:boolean
    }
}
export const initialState: generalPropsReducerType = {
    name: '',
    answer: ['z', 'o', 'o', 'v', 'u'],
    modal:{
        visible: false
    }
};

const initialPropsReducer = function (state = initialState, action: Actions.AppActions): generalPropsReducerType {
    switch (action.type) {
        case Actions.HIDE_MODAL:{
            return{
                ...state,
                modal:{
                    ...state.modal,
                    visible:false
                }
            }
        }
        case Actions.SHOW_MODAL:{
            return{
                ...state,
                modal:{
                    ...state.modal,
                    visible:true
                }
            }
        }
        case Actions.SET_NAME: {
            return {
                ...state,
                name: action.payload
            }
        }
        default:
            {
                return state;
            }
    }
};

export default initialPropsReducer;