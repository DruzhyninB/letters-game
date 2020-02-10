import React, { createRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';

import * as Actions from 'store/actions';

//Types
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from "react-router";
import { AppState } from 'store/store';

import './Timer.scss'

interface TimerProps {
    letter: string
}
type Props = TimerProps & LinkStateProp & LinkDispatchprop & RouteComponentProps;

class Timer extends React.Component<Props, any> {
    private block = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let {getTimeString} = this.props;
        return (
            <div
                className={cn("timer")}
            >
                Your score {getTimeString()}
            </div>
        )
    }
}

interface LinkDispatchprop {
    stopTimer:()=>void;
    getTimeString:()=>void;
}
function mdtp(dispatch: ThunkDispatch<any, any, Actions.AppActions>, ownProps: Props): LinkDispatchprop {
    return bindActionCreators({
        stopTimer: Actions.stopTimer,
        getTimeString: Actions.getTimeString,
    }, dispatch);
}

interface LinkStateProp {
    time:number;
}
function mstp(state: AppState, ownProps: Props): LinkStateProp {
    return {
        time: state.timer.time
    }
}

export default connect(mstp, mdtp)(Timer) as any;
