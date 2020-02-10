import React, { createRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as Actions from 'store/actions';

//Types
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from "react-router";
import { AppState } from 'store/store';

import './Dropzone.scss'
export type DropzoneObject = {
    id: string,
    position: DOMRect | null,
    accepting: string,
    order: number,
    contain: null | HTMLDivElement;
}
interface DropzoneProps {
}
type Props = DropzoneProps & DropzoneObject & LinkStateProp & LinkDispatchprop & RouteComponentProps;

export class Dropzone extends React.Component<Props, any> {
    private element = createRef<HTMLDivElement>();

    componentDidMount() {
        if(this.element.current){
            let position = this.element.current.getBoundingClientRect()
            this.props.setDropzonePosition(this.props.id,position)
        }
    }
    render() {
        return (
            <div
                ref={this.element}
                className={cn("dnd-dropzone")}
            ></div>
        )
    }
}

interface LinkDispatchprop {
    setDropzonePosition: (id:string,position: DOMRect) => void
}
function mdtp(dispatch: ThunkDispatch<any, any, Actions.AppActions>, ownProps: Props): LinkDispatchprop {
    return bindActionCreators({
        setDropzonePosition: Actions.setDropzonePosition,
    }, dispatch);
}

interface LinkStateProp {

}
function mstp(state: AppState, ownProps: Props): LinkStateProp {
    return {

    }
}

export default connect(mstp, mdtp)(Dropzone) as any;
