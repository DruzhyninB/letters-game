import {combineReducers} from 'redux';

import general from './general.reducer';
import timer from './timer.reducer';
import dropzone from './dropzone.reducer';
import game from 'pages/Game/store/reducers';
import block from './block.reducer';

const rootReducer = combineReducers({
    general,
    game,
    block,
    timer,
    dropzone
});

export default rootReducer;
