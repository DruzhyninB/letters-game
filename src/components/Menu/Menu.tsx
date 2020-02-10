import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'store/store';
import * as Actions from 'store/actions';

import Timer from 'components/Timer/Timer';
import './Menu.scss'

interface MenuProps { }
type Props = MenuProps & LinkStateProp & LinkDispatchprop & RouteComponentProps;
class Menu extends React.Component<Props, any> {

    componentDidMount() {
        if (!this.props.name){
            this.props.history.push('/welcome')
        }
    }


    render() {
        let {name} = this.props;
        return (
            <div className="menu">
                <div className="menu-wrapper">
                    <div className="menu-col">
                        <h1  className="menu-title">Good luck, {name}!</h1>
                        <p className="menu-subtitle">Pick up the right cards</p>
                    </div>
                    <div  className="menu-col">
                        <Timer />
                        <p className="menu-subtitle">The faster the better!</p>
                    </div>
                </div>
            </div>
        )
    }
}

interface LinkDispatchprop {
  
}
function mdtp( dispatch: ThunkDispatch<any, any, Actions.AppActions>, ownProps: Props ): LinkDispatchprop {
  return bindActionCreators( {

  }, dispatch );
}

interface LinkStateProp {
    name:string
}
function mstp( state: AppState, ownProps: Props ): LinkStateProp {
  return {
    name: state.general.name
  }
}

export default withRouter( connect( mstp, mdtp )( Menu ) ) as any;

