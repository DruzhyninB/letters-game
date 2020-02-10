import React, { createRef, CSSProperties } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as Actions from 'store/actions';

//Types
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from "react-router";
import { AppState } from 'store/store';
import { DropzoneObject } from 'components/Dropzones/Dropzone';

//Assets
import letterZ from 'assets/zoovu-z.svg';
import letterV from 'assets/zoovu-v.svg';
import letterO from 'assets/zoovu-o.svg';
import letterU from 'assets/zoovu-u.svg';

import './Block.scss'

const imageMap:any = {
    'z': letterZ,
    'v': letterV,
    'u': letterU,
    'o': letterO,
};
export type BlockObject = {
    id: string
    letter: string
    initialPos: {
        x: number
        y: number
    } | null
    position: CSSProperties
}

interface BlockProps {

}
type Props = BlockProps & BlockObject & LinkStateProp & LinkDispatchprop & RouteComponentProps;

export class Block extends React.Component<Props, any> {
    private block = createRef<HTMLDivElement>();

    private inDropzone: DropzoneObject | null;
    private startPos: DOMRect|null;

    private toSwap: {
        elem: HTMLDivElement,
        position: DOMRect,
        dropTo: DropzoneObject | null
    } | null;

    constructor(props: Props) {
        super(props);
        this.state = {
            icon: null,
            shift: {},
        }
        this.inDropzone = null;
        this.startPos = null;
        this.toSwap = null;
    }
    componentDidMount() { 
        if(this.block.current){
            let initialPos = this.block.current.getBoundingClientRect();
            this.props.setInitialPos(this.props.id, { x: initialPos.left, y: initialPos.top });
        }
        this.setState({icon:imageMap[this.props.letter]});
    }
    componentDidUpdate(prevProps:Props){
        if(this.props.letter !== prevProps.letter){
            this.setState({icon:imageMap[this.props.letter]})
        }
    }
    onmousedown = (event: React.MouseEvent) => {
        this.startPos = (event.currentTarget as Element).getBoundingClientRect();
        if(!this.props.timer){
            this.props.startTimer();
        }
        this.setState({
            shift: {
                x: event.clientX - this.startPos.left,
                y: event.clientY - this.startPos.top
            }
        });
        document.addEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);
    }
    mousemove = (event: MouseEvent) => {
        if(!this.block.current) return;
        let { shift } = this.state;
        let newTop = event.clientY - shift.y;
        let newLeft = event.clientX - shift.x;

        // Tranlations
        this.block.current.style.top = `${newTop}px`;
        this.block.current.style.left = `${newLeft}px`;

        this.inDropzone = this.props.movingAt({ x: event.clientX, y: event.clientY });

        // Swap blocks
        if (this.inDropzone && this.inDropzone.contain && this.inDropzone.contain.id !== this.block.current.id && !this.toSwap && this.startPos) {
            this.toSwap = {
                elem: this.inDropzone.contain,
                position: this.inDropzone.contain.getBoundingClientRect(),
                dropTo: this.props.movingAt({ x: this.startPos.x, y: this.startPos.y })
            };
            this.toSwap.elem.style.top = `${this.startPos.y}px`;
            this.toSwap.elem.style.left = `${this.startPos.x}px`;
        }

        if (!this.inDropzone && this.toSwap) {
            let { position } = this.toSwap;
            this.toSwap.elem.style.top = `${position.y}px`;
            this.toSwap.elem.style.left = `${position.x}px`;
            this.toSwap = null
        }
    }
    mouseup = (event: MouseEvent) => {
        if(!this.block.current) return;
        let { shift } = this.state;
        let newTop = event.clientY - shift.y;
        let newLeft = event.clientX - shift.x;

        if (this.inDropzone && this.inDropzone.position) {
            this.move({
                x: this.inDropzone.position.x,
                y: this.inDropzone.position.y
            });
            this.props.setPosition(this.props.id, { x: this.inDropzone.position.x, y: this.inDropzone.position.y });
            this.props.removeBlockFromDropzones(this.block.current.id);
            this.props.dropToDropzone(this.block.current, this.inDropzone.id);

            if (this.inDropzone.accepting !== this.props.letter) {
                this.props.addTime(10000)
            }
        } else {
            this.props.removeBlockFromDropzones(this.block.current.id);
            this.props.setPosition(this.props.id, { x: newLeft, y: newTop });
        }

        if (this.toSwap && this.toSwap.dropTo && this.toSwap.dropTo.position) {
            this.props.dropToDropzone(this.toSwap.elem, this.toSwap.dropTo.id);
            this.props.setPosition(this.toSwap.elem.id, { x: this.toSwap.dropTo.position.x, y: this.toSwap.dropTo.position.y });
            this.toSwap = null
        }

        this.props.checkAnswers();
        document.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseup', this.mouseup);
    }

    move = ({ x, y }: { x: number, y: number }) => {
        if(this.block.current){
            this.block.current.style.top = `${y}px`;
            this.block.current.style.left = `${x}px`;
        }
    }
    render() {
        let { icon } = this.state;
        let { letter, id, position } = this.props;
        return (
            <div
                id={id}
                ref={this.block}
                className={cn("dnd-block")}
                onMouseDown={this.onmousedown}
                data-letter={letter}
                style={{...position}}
            >
                <img draggable={false} src={icon} alt={letter} />
            </div>
        )
    }
}

interface LinkDispatchprop {
    movingAt: (coord: { x: number, y: number }) => any;
    dropToDropzone: (block: HTMLDivElement, id: string) => void
    cleanDropzone: (id: string) => void
    removeBlockFromDropzones: (id: string) => void
    checkAnswers: () => void
    addTime: (value: number) => void,
    setInitialPos: (id: string, position: { x: number, y: number }) => void
    setPosition: (id: string, position: { x: number, y: number }) => void
    startTimer:()=>void;
}
function mdtp(dispatch: ThunkDispatch<any, any, Actions.AppActions>, ownProps: Props): LinkDispatchprop {
    return bindActionCreators({
        movingAt: Actions.movingAt,
        dropToDropzone: Actions.dropToDropzone,
        cleanDropzone: Actions.cleanDropzone,
        removeBlockFromDropzones: Actions.removeBlockFromDropzones,
        checkAnswers: Actions.checkAnswers,
        addTime: Actions.addTime,
        setInitialPos: Actions.setInitialPos,
        setPosition: Actions.setPosition,
        startTimer: Actions.startTimer,
    }, dispatch);
}

interface LinkStateProp {
    timer:number | undefined
}
function mstp(state: AppState, ownProps: Props): LinkStateProp {
    return {
        timer:state.timer.timer
    }
}

export default connect(mstp, mdtp)(Block) as any;
