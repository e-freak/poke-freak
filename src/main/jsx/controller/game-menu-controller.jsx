/**
 * game-menu-controller.jsx
 * 
 * @author yuki
 */

import Observable from '../util/observable';

import ConfirmType from '../event/confirm-type';
import Event from '../event/event';
import SceneType from './scene-type';



export default class GameMenuController extends Observable {
    
    constructor(view) {
        super();
        this._view = view;
        this._confirmType = ConfirmType.NONE;
    }
    
    changeScene(scene, disableOKButton = undefined, disableCancelButton = undefined) {
        switch (scene) {
        case SceneType.SELECT:
            this._changeToSelectScene();
            break;
        case SceneType.BATTLE:
            this._changeToBattleScene();
            break;
        case SceneType.SKILL:
            this._changeToSkillScene();
            break;
        case SceneType.CHANGE:
            this._changeToChangeScene();
            break;
        case SceneType.CONFIRM:
            this._changeToConfirmScene(disableOKButton, disableCancelButton);
            break;
        default:
            throw new Error(`Unknown scene : ${scene}`);
        }
    }
    
    onConfirmCancel(confirmType) {
        switch (confirmType) {
        case ConfirmType.RESIGN:
            this._confirmType = ConfirmType.NONE;
            this._notifyAllObserver(Event.TO_BATTLE_SCENE);
            break;
        case ConfirmType.GAME_SET:
            // do nothing
            break;
        default:
            throw new Error(`Unknown confirm type : ${confirmType}`);
        }
    }
    
    onConfirmOK(confirmType) {
        switch (confirmType) {
        case ConfirmType.RESIGN:
            this._confirmType = ConfirmType.GAME_SET;
            this._notifyAllObserver(Event.TO_CONFIRM_SCENE, false, true);
            break;
        case ConfirmType.GAME_SET:
            this._view.location.href = './title.html';
            break;
        default:
            throw new Error(`Unknown confirm type : ${confirmType}`);
        }
    }
    
    get confirmType() {
        return this._confirmType;
    }
    
    onClickBattleChangeButton() {
        this._notifyAllObserver(Event.TO_CHANGE_SCENE);
    }
    
    onClickBattleResignButton() {
        this._confirmType = ConfirmType.RESIGN;
        this._notifyAllObserver(Event.TO_CONFIRM_SCENE);
    }
    
    onClickBattleSkillButton() {
        this._notifyAllObserver(Event.TO_SKILL_SCENE);
    }
    
    onClickChangeBackButton() {
        this._notifyAllObserver(Event.TO_BATTLE_SCENE);
    }
    
    onClickChangeOKButton() {
        this._notifyAllObserver(Event.TO_BATTLE_SCENE);
    }
    
    onClickConfirmBackButton() {
        this._notifyAllObserver(Event.CONFIRM_CANCEL);
    }
    
    onClickConfirmOKButton() {
        this._notifyAllObserver(Event.CONFIRM_OK);
    }
    
    onClickSelectBackButton() {
        this._view.location.href = './title.html';
    }
    
    onClickSelectOKButton() {
        this._notifyAllObserver(Event.TO_BATTLE_SCENE);
    }
    
    onClickSkillBackButton() {
        this._notifyAllObserver(Event.TO_BATTLE_SCENE);
    }
    
    onClickSkillOKButton() {
        this._notifyAllObserver(Event.TO_BATTLE_SCENE);
    }
    
    _activateButton(buttonID, listener) {
        this._view.getElementById(buttonID).className = 'button';
        this._view.getElementById(buttonID).addEventListener('click', listener);
    }
    
    _deactivateButton(buttonID) {
        this._view.getElementById(buttonID).className = 'button button-disable';
        this._removeAllEventListener(this._view.getElementById(buttonID));
    }
    
    _changeToBattleScene() {
        this._view.getElementById('default-menu').style.display = 'none';
        this._view.getElementById('battle-menu').style.display = 'inline';
        this._view.getElementById('button-skill').addEventListener('click', this.onClickBattleSkillButton.bind(this));
        this._view.getElementById('button-change').addEventListener('click', this.onClickBattleChangeButton.bind(this));
        this._view.getElementById('button-resign').addEventListener('click', this.onClickBattleResignButton.bind(this));
    }
    
    _changeToChangeScene() {
        this._view.getElementById('default-menu').style.display = 'inline';
        this._view.getElementById('battle-menu').style.display = 'none';
        this._deactivateButton('button-ok');
        this._activateButton('button-back', this.onClickChangeBackButton.bind(this));
    }
    
    _changeToConfirmScene(disableOKButton, disableCancelButton) {
        this._view.getElementById('default-menu').style.display = 'inline';
        this._view.getElementById('battle-menu').style.display = 'none';
        if (disableOKButton) {
            this._deactivateButton('button-ok');
        }
        else {
            this._activateButton('button-ok', this.onClickConfirmOKButton.bind(this));
        }
        if (disableCancelButton) {
            this._deactivateButton('button-back');
        }
        else {
            this._activateButton('button-back', this.onClickConfirmBackButton.bind(this));
        }
    }
    
    _changeToSelectScene() {
        this._view.getElementById('default-menu').style.display = 'inline';
        this._view.getElementById('battle-menu').style.display = 'none';
        this._deactivateButton('button-ok');
        this._activateButton('button-back', this.onClickSelectBackButton.bind(this));
        
        // デバッグ用に暫定でボタンを有効化
        this._view.getElementById('button-ok').addEventListener('click', this.onClickSelectOKButton.bind(this));
    }
    
    _changeToSkillScene() {
        this._view.getElementById('default-menu').style.display = 'inline';
        this._view.getElementById('battle-menu').style.display = 'none';
        this._deactivateButton('button-ok');
        this._activateButton('button-back', this.onClickSkillBackButton.bind(this));
    }
    
    _notifyAllObserver(event, disableOKButton = false, disableCancelButton = false) {
        this._removeAllEventListener(this._view.getElementById('button-ok'));
        this._removeAllEventListener(this._view.getElementById('button-back'));
        this._removeAllEventListener(this._view.getElementById('button-skill'));
        this._removeAllEventListener(this._view.getElementById('button-change'));
        this._removeAllEventListener(this._view.getElementById('button-resign'));
        this.notifyAllObserver({ event: event, disableOKButton: disableOKButton, disableCancelButton: disableCancelButton });
    }
    
    _removeAllEventListener(element) {
        const parent = element.parentNode;
        parent.removeChild(element);
        parent.appendChild(element.cloneNode(true));
    }
    
}

