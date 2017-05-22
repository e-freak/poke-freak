/**
 * battle-view-controller.jsx
 * 
 * @author yuki
 */

import Observable from '../util/observable';

import ChangeViewController from './change-view-controller';
import ConfirmType from '../event/confirm-type';
import ConfirmViewController from './confirm-view-controller';
import Event from '../event/event';
import SkillViewController from './skill-view-controller';



export default class BattleViewController extends Observable {
    
    constructor(view) {
        super();
        this._view = view;
        this._confirmType = ConfirmType.NONE;
        this._listenerTable = {};
        this._listenerTable['onClickSkillButton'] = this.onClickSkillButton.bind(this);
        this._listenerTable['onClickChangeButton'] = this.onClickChangeButton.bind(this);
        this._listenerTable['onClickResignButton'] = this.onClickResignButton.bind(this);
    }
    
    initialize() {
        Array.prototype.forEach.call(this._view.getElementsByClassName('select'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('battle'), (element) => {
            element.style.display = 'inline';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('skill'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('change'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('confirm'), (element) => {
            element.style.display = 'none';
        });
        this._addEvent();
    }
    
    onConfirmCancel() {
        this._clearConfirm();
    }
    
    onConfirmOK() {
        const confirmType = this._confirmType;
        this._clearConfirm();
        
        switch (confirmType) {
        case ConfirmType.RESIGN:
            // TODO リザイン
            break;
        default:
            break;
        }
    }
    
    onClickChangeButton() {
        this._removeEvent();
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createChangeViewController());
    }
    
    onClickResignButton() {
        this._confirmType = ConfirmType.RESIGN;
        this._removeEvent();
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createConfirmViewController());
    }
    
    onClickSkillButton() {
        this._removeEvent();
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createSkillViewController());
    }
    
    _clearConfirm() {
        this._confirmType = ConfirmType.NONE;
    }
    
    _createChangeViewController() {
        return new ChangeViewController(this._view);
    }
    
    _createConfirmViewController() {
        return new ConfirmViewController(this._view, this);
    }
    
    _createSkillViewController() {
        return new SkillViewController(this._view);
    }
    
    _notifyAllObserver(event, controller) {
        this.notifyAllObserver({ event: event, controller: controller });
    }
    
    _addEvent() {
        this._view.getElementById('button-skill').addEventListener('click', this._listenerTable['onClickSkillButton']);
        this._view.getElementById('button-change').addEventListener('click', this._listenerTable['onClickChangeButton']);
        this._view.getElementById('button-resign').addEventListener('click', this._listenerTable['onClickResignButton']);
    }
    
    _removeEvent() {
        this._view.getElementById('button-skill').removeEventListener('click', this._listenerTable['onClickSkillButton']);
        this._view.getElementById('button-change').removeEventListener('click', this._listenerTable['onClickChangeButton']);
        this._view.getElementById('button-resign').removeEventListener('click', this._listenerTable['onClickResignButton']);
    }
    
}

