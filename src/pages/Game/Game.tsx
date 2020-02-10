import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as Actions from 'store/actions';

import Menu from 'components/Menu/Menu';
import Block, { BlockObject } from 'components/Block/Block';
import Modal from 'components/Modal/Modal';

//Types
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from "react-router";
import { AppState } from 'store/store';


import './Game.scss'
import Dropzone, { DropzoneObject } from 'components/Dropzones/Dropzone';


interface GameProps { }
type Props = GameProps & LinkStateProp & LinkDispatchprop & RouteComponentProps;
export class Game extends React.Component<Props, any> {

  render() {
    let { blocks, dropzones } = this.props;
    return (
      <div className={cn("game")}>
        <Menu />
        <div className="game-area">
          <div className="game-objects">
            {blocks.map((block: BlockObject, index: number) => {
              return (
                <Block key={block.id} {...block} />
              )
            })}
          </div>
          <div className="game-zones">
            {
              dropzones.map((dropzone: DropzoneObject, index: number) => {
                return <Dropzone key={dropzone.id} {...dropzone} />
              })
            }
          </div>
        </div>
        <Modal />
      </div>
    )
  }
}

interface LinkDispatchprop {

}
function mdtp(dispatch: ThunkDispatch<any, any, Actions.AppActions>, ownProps: Props): LinkDispatchprop {
  return bindActionCreators({

  }, dispatch);
}

interface LinkStateProp {
  blocks: BlockObject[]
  dropzones: DropzoneObject[]
}
function mstp(state: AppState, ownProps: Props): LinkStateProp {
  return {
    blocks: state.block.list,
    dropzones: state.dropzone.list
  }
}

export default connect(mstp, mdtp)(Game) as any;
