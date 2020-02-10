import * as Actions from '../actions';
import { DropzoneObject } from 'components/Dropzones/Dropzone';
import Utl from 'utility';


type DropzoneReducerType = {
    list: DropzoneObject[]
}

const initialState: DropzoneReducerType = {
    list: ['z', 'o', 'o', 'v', 'u'].map((letter, index) => {
        return {
            id: Utl.generateGUID(),
            position: null,
            accepting: letter,
            order: index,
            contain: null
        }
    })
};

const platformerReducer = function (state = initialState, action: Actions.AppActions): DropzoneReducerType {
    switch (action.type) {
        case Actions.RESET_DROPZONE: {
            let list = state.list.map(element => {
                element.contain = null;
                return { ...element }
            })
            return {
                ...state,
                list: [...list]
            }
        }
        case Actions.REMOVE_BLOCK_DROPZONE: {
            let dropzone = state.list.find(x => {
                return x.contain && x.contain.id === action.payload;
            });
            if (dropzone) {
                dropzone.contain = null;
            }
            return {
                ...state,
                list: [...state.list]
            }
        }
        case Actions.CLEAN_DROPZONE: {
            let dropzone = state.list.find(x => x.id === action.payload);
            if (dropzone)
                dropzone.contain = null;
            return {
                ...state,
                list: [...state.list]
            }
        }
        case Actions.ADD_TO_DROPZONE: {
            let dropzone = state.list.find(x => x.id === action.payload.id);
            if (dropzone)
                dropzone.contain = action.payload.block;
            return {
                ...state,
                list: [...state.list]
            }
        }
        case Actions.SET_DROPZONE_POS: {
            let dropzone = state.list.find(x => {
                return x.id === action.payload.id;
            });
            if (dropzone)
                dropzone.position = action.payload.position;
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