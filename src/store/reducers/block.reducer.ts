import * as Actions from '../actions';
import { BlockObject } from 'components/Block/Block'
import Utl from 'utility';

type BlockReducerType = {
    list: BlockObject[]
}

export const initialState: BlockReducerType = {
    list: ['z', 'o', 'o', 'v', 'u'].sort(() => Math.random() - 0.5).map(letter => {
        return {
            id: Utl.generateGUID(),
            letter,
            initialPos: null,
            position: { top: 'unset', left: 'unset', position: 'relative' }
        }
    })
};

const platformerReducer = function (state = initialState, action: Actions.AppActions): BlockReducerType {
    switch (action.type) {
        case Actions.RESET_BLOCKS: {
            let list = state.list.sort(() => Math.random() - 0.5).map(element => {
                element.id = Utl.generateGUID();
                if (element.initialPos)
                    element.position = {
                        ...element.position,
                        top: element.initialPos.y,
                        left: element.initialPos.x
                    }
                return { ...element }
            })
            return {
                ...state,
                list: [...list]
            }
        }
        case Actions.SET_INITIAL_POS: {
            let block = state.list.find(x => {
                return x.id === action.payload.id;
            });
            if(block){
                block.initialPos = {
                    y: action.payload.y,
                    x: action.payload.x,
                }
                block.position = {
                    position: 'absolute',
                    left: action.payload.x,
                    top: action.payload.y
                }
            }
            return {
                ...state,
                list: [...state.list]
            }
        }
        case Actions.SET_POSITION: {
            let block = state.list.find(x => {
                return x.id === action.payload.id;
            });
            if(block){
                block.position = {
                    ...block.position,
                    left: action.payload.x,
                    top: action.payload.y
                }
            }
            return {
                ...state,
                list: [...state.list]
            }
        }
        default:
            {
                return state;
            }
    }
};

export default platformerReducer;