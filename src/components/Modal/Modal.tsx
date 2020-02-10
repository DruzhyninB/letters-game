import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as Actions from 'store/actions';

//Types
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from "react-router";
import { AppState } from 'store/store';


import './Modal.scss'


interface ModalProps { }
type Props = ModalProps & LinkStateProp & LinkDispatchprop & RouteComponentProps;
class Modal extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      countdown: 10,
      interval: null
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible !== prevProps.visible && this.props.visible) {
      this.startCountdown();
    }
    if (this.props.visible !== prevProps.visible && !this.props.visible) {
      this.setState({ countdown: 10 });
    }
  }

  startCountdown = () => {
    let interval = setInterval(() => {
      if (this.state.countdown === 0) {
        clearInterval(this.state.interval);
        this.props.restartGame()
      } else {
        this.setState({ countdown: this.state.countdown - 1 });
      }
    }, 1000);
    this.setState({ interval })
  }

  render() {
    let { visible } = this.props;
    let { countdown } = this.state;
    return (visible &&
      <div className={cn("modal")}>
        <div className={'modal-body'}>
          Congratulation! You win!
        <p>Your score:  <span className="modal-timer-value">{this.props.getTimeString()}</span></p>
          <p className="restart">Restart in...{countdown}</p>
        </div>
      </div>
    )
  }
}

interface LinkDispatchprop {
  getTimeString: () => any,
  restartGame: () => void
}
function mdtp(dispatch: ThunkDispatch<any, any, Actions.AppActions>, ownProps: Props): LinkDispatchprop {
  return bindActionCreators({
    getTimeString: Actions.getTimeString,
    restartGame: Actions.restartGame
  }, dispatch);
}

interface LinkStateProp {
  visible: boolean
}
function mstp(state: AppState, ownProps: Props): LinkStateProp {
  return {
    visible: state.general.modal.visible
  }
}

export default connect(mstp, mdtp)(Modal) as any;
