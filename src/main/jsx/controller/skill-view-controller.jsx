/**
 * skill-view-controller.jsx
 * 
 * @author yuki
 */

import Observable from '../util/observable';

import BattleViewController from './battle-view-controller';
import Event from '../event/event';



export default class SkillViewController extends Observable {
    
    constructor(view) {
        super();
        this._view = view;
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
            element.style.display = 'inline';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('change'), (element) => {
            element.style.display = 'none';
        });
        Array.prototype.forEach.call(this._view.getElementsByClassName('confirm'), (element) => {
            element.style.display = 'none';
        });
        this._addEvent();
    }
    
    onClickBackButton() {
        this._removeEvent();
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createBattleViewController());
    }
    
    onClickOKButton() {
        this._removeEvent();
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createBattleViewController());
    }
    
    _createBattleViewController() {
        return new BattleViewController(this._view);
    }
    
    _notifyAllObserver(event, controller) {
        this.notifyAllObserver({ event: event, controller: controller });
    }
    
    _addEvent() {
        this._view.getElementById('button-skill-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
        this._view.getElementById('button-skill-back').addEventListener('click', this._listenerTable['onClickBackButton']);
    }
    
    _removeEvent() {
        this._view.getElementById('button-skill-ok').removeEventListener('click', this._listenerTable['onClickOKButton']);
        this._view.getElementById('button-skill-back').removeEventListener('click', this._listenerTable['onClickBackButton']);
    }
    
}

