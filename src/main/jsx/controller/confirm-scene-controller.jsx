/**
 * confirm-scene-controller.jsx
 * 
 * @author yuki
 */

import AbstractSceneController from './abstract-scene-controller';

import Event from '../event/event';



export default class ConfirmSceneController extends AbstractSceneController {
    
    constructor(view, parent, disableOK = false, disableCancel = false) {
        super();
        this._view = view;
        this._parent = parent;
        this._disableOK = disableOK;
        this._disableCancel = disableCancel;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }
    
    initialize(master) {
        this._view.getElementById('select-menu').style.display = 'none';
        this._view.getElementById('battle-menu').style.display = 'none';
        this._view.getElementById('skill-menu').style.display = 'none';
        this._view.getElementById('change-menu').style.display = 'none';
        this._view.getElementById('confirm-menu').style.display = 'inline';
        this._addEvent();
    }
    
    onClickBackButton() {
        this._removeEvent();
        this._notifyAllObserver(Event.CONFIRM_CANCEL, this._parent);
    }
    
    onClickOKButton() {
        this._removeEvent();
        this._notifyAllObserver(Event.CONFIRM_OK, this._parent);
    }
    
    _addEvent() {
        if (this._disableOK) {
            this._view.getElementById('button-confirm-ok').className = 'button button-disable';
        }
        else {
            this._view.getElementById('button-confirm-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
        }
        if (this._disableCancel) {
            this._view.getElementById('button-confirm-back').className = 'button button-disable';
        }
        else {
            this._view.getElementById('button-confirm-back').addEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }
    
    _removeEvent() {
        this._view.getElementById('button-confirm-ok').removeEventListener('click', this._listenerTable['onClickOKButton']);
        this._view.getElementById('button-confirm-back').removeEventListener('click', this._listenerTable['onClickBackButton']);
    }
    
}

