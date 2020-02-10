import * as React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { matchRoutes, renderRoutes } from 'react-router-config';
import { AppState } from './store/store';
import { ThunkDispatch } from 'redux-thunk';

interface GameProps { routes: Array<object> }
type Props = GameProps & LinkStateProp & LinkDispatchprop & RouteComponentProps;

class Game extends React.Component<Props, any> {
  constructor( props: Props ) {
    super( props );
    this.checkRoute();
  }

  componentDidUpdate( prevProps: Props ) {
    if ( !_.isEqual( this.props.location.pathname, prevProps.location.pathname ) ) {
      this.checkRoute();
    }
  }
  checkRoute() {
    const matched = matchRoutes( this.props.routes, this.props.location.pathname )[0];
    if ( matched ) {
      console.log( 'checkRoute -> ', matched );
    }
  }

  render() {
    let { routes } = this.props;
    return (
      <React.Fragment>
        <div className="decorations"></div>
        {renderRoutes( routes )}
      </React.Fragment>
    )
  }
}

interface LinkDispatchprop {

}
function mdtp( dispatch: ThunkDispatch<any, any, any>, ownProps: Props ): LinkDispatchprop {
  return bindActionCreators( {

  }, dispatch );
}

interface LinkStateProp {

}
function mstp( state: AppState, ownProps: Props ): LinkStateProp {
  return {

  }
}

export default withRouter( connect( mstp, mdtp )( Game ) ) as any;
