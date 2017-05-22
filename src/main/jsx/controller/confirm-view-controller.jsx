/**
 * confirm-view-controller.jsx
 * 
 * @author yuki
 */

import Observable from '../util/observable';

import BattleViewController from './battle-view-controller';
import Event from '../event/event';



export default class ConfirmViewController extends Observable {
    
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
    
    initialize() {
        Array.prototype.forEach.call(this._view.getElementsByClassName('select'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('battle'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('skill'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('change'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('confirm'), (element) => {
            element.style.display = 'inline';
        });
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
    
    get parent() {
        return this._parent;
    }
    
    _notifyAllObserver(event, controller) {
        this.notifyAllObserver({ event: event, controller: controller });
    }
    
    _addEvent() {
        this._view.getElementById('button-confirm-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
        this._view.getElementById('button-confirm-back').addEventListener('click', this._listenerTable['onClickBackButton']);
    }
    
    _removeEvent() {
        this._view.getElementById('button-confirm-ok').removeEventListener('click', this._listenerTable['onClickOKButton']);
        this._view.getElementById('button-confirm-back').removeEventListener('click', this._listenerTable['onClickBackButton']);
    }
    
}

