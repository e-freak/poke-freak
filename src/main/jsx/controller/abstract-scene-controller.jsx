/**
 * abstract-scene-controller.jsx
 * 
 * @author yuki
 */

import Observable from '../util/observable';

import ConfirmType from '../event/confirm-type';



export default class AbstractSceneController extends Observable {
    
    constructor() {
        super();
        this._confirmType = ConfirmType.NONE;
    }
    
    initialize(master) {
        throw new Error("Not implemented : initialize()");
    }
    
    onConfirmCancel() {
        this._clearConfirm();
    }
    
    onConfirmOK() {
        this._clearConfirm();
    }
    
    _changeFieldHeight(field, value) {
        field.style.height = `${value}px`;
        field.style['max-height'] = `${value}px`;
        field.style['min-height'] = `${value}px`;
        field.scrollTop = field.scrollHeight;
    }
    
    _clearConfirm() {
        this._confirmType = ConfirmType.NONE;
    }
    
    _notifyAllObserver(event, scene) {
        this.notifyAllObserver({ event: event, scene: scene });
    }
    
}

