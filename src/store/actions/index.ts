import { GameActionsType } from 'pages/Game/store/actions';
import { GeneralActionsType } from './general.action';
import { TimerActionsType } from './timer.action';
import { DropzoneActionsType } from './dropzone.actions';
import { BlockActionsType } from './block.actions';

export * from './general.action';
export * from './timer.action';
export * from './dropzone.actions';
export * from './block.actions';

export type AppActions = GameActionsType | GeneralActionsType | TimerActionsType | DropzoneActionsType | BlockActionsType;