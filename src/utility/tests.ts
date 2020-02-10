import thunk, { ThunkDispatch } from 'redux-thunk';
import createMockStore from "redux-mock-store";
import { AnyAction } from 'redux';
import { AppState } from '../store/store';

type DispatchExts = ThunkDispatch<any, void, AnyAction>;
interface domRectProps {
    t?: number
    l?: number
    h?: number
    w?: number
    r?: number
    b?: number
}

export default class testUtility {

    static mockStore(state?: any) {
        let store = createMockStore<any, DispatchExts>([thunk])(state);
        return store;
    }

    static createBlock(): HTMLDivElement {
        let block = document.createElement('div');
        return block;
    }

    static getDomRect(props: domRectProps = {}) {
        let { t, l, w, h, r, b } = props;

        const _assignValue = (value: number | undefined) => {
            if (typeof value != undefined) {
                return value
            } else {
                return this.rand();
            }
        }
        
        return {
            bottom: _assignValue(b),
            height: _assignValue(h),
            left: _assignValue(l),
            right: _assignValue(r),
            top: _assignValue(t),
            width: _assignValue(w)
        } as DOMRect;
    }

    static rand() {
        return Math.floor(Math.random() * 100);
    }

}