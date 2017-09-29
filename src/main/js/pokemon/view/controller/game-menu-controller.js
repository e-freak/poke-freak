/**
 * game-menu-controller.js
 * 
 * @author yuki
 */

import Observable from '../../../util/observable';

import ConfirmEvent from '../../../event/confirm-event';
import SceneType from './scene-type';
import UserEvent from '../../../event/user-event';



export default class GameMenuController extends Observable {
    
    constructor(view) {
        super();
        this._view = view;
        this._confirmEvent = ConfirmEvent.NONE;
        this._selectedPokemonIndexList = [];
        this._selectedSkillIndex = undefined;
        this._selectedChangeIndex = undefined;
        this._messageBackup = '';
    }
    
    changeScene(scene, disableOKButton = false, disableCancelButton = false) {
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
            this._changeToChangeScene(disableCancelButton);
            break;
        case SceneType.CONFIRM:
            this._changeToConfirmScene(disableOKButton, disableCancelButton);
            break;
        default:
            throw new Error(`Unknown scene : ${scene}`);
        }
    }
    
    initialize() {
        for (let i = 0; i < 6; i++) {
            const frame = this._view.getElementById(`image-player-pokemon-${i}`);
            frame.addEventListener('click', this.onClickSelectTarget.bind(this, i));
        }
        for (let i = 0; i < 4; i++) {
            const frame = this._view.getElementById(`frame-skill-${i}`);
            frame.addEventListener('click', this.onClickSkillFrame.bind(this, i));
        }
        for (let i = 0; i < 3; i++) {
            const frame = this._view.getElementById(`frame-pokemon-${i}`);
            frame.addEventListener('click', this.onClickChangeFrame.bind(this, i));
        }
        this._view.getElementById('button-skill').addEventListener('click', this.onClickBattleSkillButton.bind(this));
        this._view.getElementById('button-change').addEventListener('click', this.onClickBattleChangeButton.bind(this));
        this._view.getElementById('button-resign').addEventListener('click', this.onClickBattleResignButton.bind(this));
    }
    
    onConfirmCancel(confirmEvent) {
        switch (confirmEvent) {
        case ConfirmEvent.RESIGN:
            this._view.getElementById('text-message').innerHTML = this._messageBackup;
            this._messageBackup = '';
            this._confirmEvent = ConfirmEvent.NONE;
            this._notifyAllObserver(UserEvent.TO_BATTLE_SCENE);
            break;
        case ConfirmEvent.GAME_SET:
            // do nothing
            break;
        default:
            throw new Error(`Unknown confirm type : ${confirmEvent}`);
        }
    }
    
    onConfirmOK(confirmEvent) {
        switch (confirmEvent) {
        case ConfirmEvent.RESIGN:
            this._confirmEvent = ConfirmEvent.GAME_SET;
            this._notifyAllObserver(UserEvent.SELECT_RESIGN_OK);
            this._notifyAllObserver(UserEvent.TO_CONFIRM_SCENE, undefined, false, true);
            break;
        case ConfirmEvent.GAME_SET:
            this._view.location.href = './title.html';
            break;
        default:
            throw new Error(`Unknown confirm type : ${confirmEvent}`);
        }
    }
    
    get confirmEvent() {
        return this._confirmEvent;
    }
    
    set confirmEvent(value) {
        this._confirmEvent = value;
    }
    
    onClickBattleChangeButton() {
        this._notifyAllObserver(UserEvent.TO_CHANGE_SCENE);
    }
    
    onClickBattleResignButton() {
        this._messageBackup = this._view.getElementById('text-message').innerHTML;
        this._confirmEvent = ConfirmEvent.RESIGN;
        this._notifyAllObserver(UserEvent.SELECT_RESIGN_CHECK);
        this._notifyAllObserver(UserEvent.TO_CONFIRM_SCENE);
    }
    
    onClickBattleSkillButton() {
        this._notifyAllObserver(UserEvent.TO_SKILL_SCENE);
    }
    
    onClickChangeBackButton() {
        this._unselectChange();
        this._notifyAllObserver(UserEvent.TO_BATTLE_SCENE);
    }
    
    onClickChangeFrame(index) {
        if (this._selectedChangeIndex !== index) {
            this._unselectChange();
            this._selectChange(index);
            this._activateButton('button-ok', this.onClickChangeOKButton.bind(this));
        }
        else {
            this._unselectChange();
            this._deactivateButton('button-ok');
        }
    }
    
    onClickChangeOKButton() {
        const index = this._unselectChange();
        this._notifyAllObserver(UserEvent.TO_BATTLE_SCENE);
        this._notifyAllObserver(UserEvent.SELECT_CHANGE, index);
    }
    
    onClickConfirmBackButton() {
        this._notifyAllObserver(UserEvent.CONFIRM_CANCEL);
    }
    
    onClickConfirmOKButton() {
        this._notifyAllObserver(UserEvent.CONFIRM_OK);
    }
    
    onClickSelectBackButton() {
        this._view.location.href = './title.html';
    }
    
    onClickSelectOKButton() {
        const indexList = this._resetPokemonIndexList();
        this._notifyAllObserver(UserEvent.START_BATTLE, indexList);
    }
    
    onClickSelectTarget(index) {
        const isLimit = (list) => {
            return list.length >= 3;
        };
        const element = this._view.getElementById(`image-player-pokemon-${index}`);
        if (!this._selectedPokemonIndexList.includes(index)) {
            if (!isLimit(this._selectedPokemonIndexList)) {
                this._selectedPokemonIndexList.push(index);
                this._notifyAllObserver(UserEvent.SELECT_POKEMON, this._selectedPokemonIndexList);
                this._view.getElementById(`image-player-pokemon-${index}`).style.borderColor = '#0000FF';
                if (isLimit(this._selectedPokemonIndexList)) {
                    this._activateButton('button-ok', this.onClickSelectOKButton.bind(this));
                }
                this._activateButton('button-back', this.onClickSelectBackButton.bind(this));
            }
        }
        else {
            this._selectedPokemonIndexList.some((value, i) => {
                if (value === index) {
                    this._selectedPokemonIndexList.splice(i, 1);
                    return true;
                }
                return false;
            }); 
            this._notifyAllObserver(UserEvent.UNSELECT_POKEMON, this._selectedPokemonIndexList);
            this._view.getElementById(`image-player-pokemon-${index}`).style.borderColor = '#FFFFFF';
            this._deactivateButton('button-ok');
            this._activateButton('button-back', this.onClickSelectBackButton.bind(this));
        }
    }
    
    onClickSkillBackButton() {
        this._unselectSkill();
        this._notifyAllObserver(UserEvent.TO_BATTLE_SCENE);
    }
    
    onClickSkillFrame(index) {
        if (this._selectedSkillIndex !== index) {
            this._unselectSkill();
            this._selectSkill(index);
            this._activateButton('button-ok', this.onClickSkillOKButton.bind(this));
        }
        else {
            this._unselectSkill();
            this._deactivateButton('button-ok');
        }
    }
    
    onClickSkillOKButton() {
        const index = this._unselectSkill();
        this._notifyAllObserver(UserEvent.TO_BATTLE_SCENE);
        this._notifyAllObserver(UserEvent.SELECT_SKILL, index);
    }
    
    _activateButton(buttonID, listener) {
        const button = this._view.getElementById(buttonID);
        button.className = 'button';
        button.addEventListener('click', listener);
    }
    
    _deactivateButton(buttonID) {
        const button = this._view.getElementById(buttonID);
        button.className = 'button button-disable';
        this._removeAllEventListener(button);
    }
    
    _changeToBattleScene() {
        this._view.getElementById('default-menu').style.display = 'none';
        this._view.getElementById('battle-menu').style.display = 'inline';
    }
    
    _changeToChangeScene(disableCancelButton) {
        this._view.getElementById('default-menu').style.display = 'inline';
        this._view.getElementById('battle-menu').style.display = 'none';
        this._deactivateButton('button-ok');
        if (disableCancelButton) {
            this._deactivateButton('button-back');
        }
        else {
            this._activateButton('button-back', this.onClickChangeBackButton.bind(this));
        }
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
    }
    
    _changeToSkillScene() {
        this._view.getElementById('default-menu').style.display = 'inline';
        this._view.getElementById('battle-menu').style.display = 'none';
        this._deactivateButton('button-ok');
        this._activateButton('button-back', this.onClickSkillBackButton.bind(this));
    }
    
    _notifyAllObserver(event, value = undefined, disableOKButton = false, disableCancelButton = false) {
        this._removeAllEventListener(this._view.getElementById('button-ok'));
        this._removeAllEventListener(this._view.getElementById('button-back'));
        this.notifyAllObserver({ event: event, value: value, disableOKButton: disableOKButton, disableCancelButton: disableCancelButton });
    }
    
    _removeAllEventListener(element) {
        const parent = element.parentNode;
        parent.removeChild(element);
        parent.appendChild(element.cloneNode(true));
    }
    
    _resetPokemonIndexList() {
        try {
            return this._selectedPokemonIndexList;
        }
        finally {
            this._selectedPokemonIndexList = [];
        }
    }
    
    _resetChangeIndex() {
        try {
            return this._selectedChangeIndex;
        }
        finally {
            this._selectedChangeIndex = undefined;
        }
    }
    
    _resetSkillIndex() {
        try {
            return this._selectedSkillIndex;
        }
        finally {
            this._selectedSkillIndex = undefined;
        }
    }
    
    _selectChange(index) {
        this._selectedChangeIndex = index;
        this._view.getElementById(`frame-pokemon-${index}`).style.borderColor = '#0000FF';
    }
    
    _selectSkill(index) {
        this._selectedSkillIndex = index;
        this._view.getElementById(`frame-skill-${index}`).style.borderColor = '#0000FF';
    }
    
    _unselectChange() {
        const index = this._resetChangeIndex();
        if (index !== undefined) {
            this._view.getElementById(`frame-pokemon-${index}`).style.borderColor = '#D0D0D0';
        }
        return index;
    }
    
    _unselectSkill() {
        const index = this._resetSkillIndex();
        if (index !== undefined) {
            this._view.getElementById(`frame-skill-${index}`).style.borderColor = '#D0D0D0';
        }
        return index;
    }
    
}

