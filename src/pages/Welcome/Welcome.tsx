import React, { ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'store/actions';

// Types
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from "react-router";
import { AppState } from 'store/store';

// Styles
import './Welcome.scss'

interface WelcomeProps { }
type Props = WelcomeProps & LinkStateProp & LinkDispatchProp & RouteComponentProps;

class Welcome extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {

  }

  onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { target } = event;
    this.setState({ name: target.value });
  }

  onContinue = () => {
    let {name} = this.state;
    if(!name){
      return;
    }
    this.props.setName(this.state.name);
    this.props.history.push('/game');
  }

  render() {

    return (
      <React.Fragment>
        <div className="welcome-wrapper">
          <h1 className="welcome-title">Hello friend, tell me your name...</h1>
          <div className="welcome-input">
            <input type="text" placeholder="Your name here" value={this.state.name} onChange={this.onNameChange} />
          </div>
          <div className="welcome-continue">
            <button onClick={this.onContinue}>Let's go →</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

interface LinkDispatchProp {
  setName: (name: string) => void;
}
function mdtp(dispatch: ThunkDispatch<any, any, Actions.GeneralActionsType>, ownProps: Props): LinkDispatchProp {
  return bindActionCreators({
    setName: Actions.setName,
  }, dispatch);
}

interface LinkStateProp {
  name: string,
}
function mstp(state: AppState, ownProps: Props): LinkStateProp {
  return {
    name: state.general.name,
  }
}

export default withRouter(connect(mstp, mdtp)(Welcome)) as any;
