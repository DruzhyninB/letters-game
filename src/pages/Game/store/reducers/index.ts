import * as Actions from '../actions';

type PlatformerReducerType = {

}

const initialState: PlatformerReducerType = {

};

const platformerReducer = function ( state = initialState, action: Actions.GameActionsType ): PlatformerReducerType {
    switch ( action.type ) {

        default:
            {
                return state;
            }
    }
};

export default platformerReducer;