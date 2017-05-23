/**
 * change-scene-controller.jsx
 * 
 * @author yuki
 */

import AbstractSceneController from './abstract-scene-controller';

import BattleSceneController from './battle-scene-controller';
import Event from '../event/event';



export default class ChangeSceneController extends AbstractSceneController {
    
    constructor(view) {
        super();
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }
    
    initialize(master) {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'inline';
        this._view.getElementById('select-menu').style.display = 'none';
        this._view.getElementById('battle-menu').style.display = 'none';
        this._view.getElementById('skill-menu').style.display = 'none';
        this._view.getElementById('change-menu').style.display = 'inline';
        this._view.getElementById('confirm-menu').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 460);
        this._changeFieldHeight(this._view.getElementById('text-message'), 100);
        this._addEvent();
    }
    
    onClickBackButton() {
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createBattleSceneController());
    }
    
    onClickOKButton() {
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createBattleSceneController());
    }
    
    _createBattleSceneController() {
        return new BattleSceneController(this._view);
}
    
    _addEvent() {
        this._view.getElementById('button-change-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
        this._view.getElementById('button-change-back').addEventListener('click', this._listenerTable['onClickBackButton']);
    }
    
}

