/**
 * battle-scene-controller.jsx
 * 
 * @author yuki
 */

import AbstractSceneController from './abstract-scene-controller';

import ChangeSceneController from './change-scene-controller';
import ConfirmType from '../event/confirm-type';
import ConfirmSceneController from './confirm-scene-controller';
import Event from '../event/event';
import SkillSceneController from './skill-scene-controller';



export default class BattleSceneController extends AbstractSceneController {
    
    constructor(view) {
        super();
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickSkillButton'] = this.onClickSkillButton.bind(this);
        this._listenerTable['onClickChangeButton'] = this.onClickChangeButton.bind(this);
        this._listenerTable['onClickResignButton'] = this.onClickResignButton.bind(this);
    }
    
    initialize(master) {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'none';
        this._activateBattleMenu();
        this._changeFieldHeight(this._view.getElementById('info-field'), 200);
        this._changeFieldHeight(this._view.getElementById('text-message'), 360);
        Array.prototype.forEach.call(this._view.getElementsByClassName('icon-pokemon'), (image) => {
            image.onerror = () => {
                image.src = '../image/dummy.jpg';
                image.onerror = undefined;
            };
        });
        
        master.getSelectedPokemonList(master.PLAYER_ID).forEach((pokemon, index) => {
            const imageID = `icon-player-pokemon-${index}`;
            this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
        });
        master.getSelectedPokemonList(master.OPPONENT_ID).forEach((pokemon, index) => {
            const imageID = `icon-opponent-pokemon-${index}`;
            this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
        });
        this._addEvent();
    }
    
    onConfirmCancel() {
        this._clearConfirm();
        this._activateBattleMenu();
    }
    
    onConfirmOK() {
        const confirmType = this._confirmType;
        this._clearConfirm();
        this._activateBattleMenu();
        
        switch (confirmType) {
        case ConfirmType.RESIGN:
            this._confirmType = ConfirmType.GAME_SET;
            this._notifyAllObserver(Event.CHANGE_VIEW, this._createConfirmSceneController(false, true));
            break;
        case ConfirmType.GAME_SET:
            this._view.location.href = './title.html';
            break;
        default:
            break;
        }
    }
    
    onClickChangeButton() {
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createChangeSceneController());
    }
    
    onClickResignButton() {
        this._confirmType = ConfirmType.RESIGN;
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createConfirmSceneController());
    }
    
    onClickSkillButton() {
        this._notifyAllObserver(Event.CHANGE_VIEW, this._createSkillSceneController());
    }
    
    _createChangeSceneController() {
        return new ChangeSceneController(this._view);
    }
    
    _createConfirmSceneController(disableOK = false, disableCancel = false) {
        return new ConfirmSceneController(this._view, this, disableOK, disableCancel);
    }
    
    _createSkillSceneController() {
        return new SkillSceneController(this._view);
    }
    
    _activateBattleMenu() {
        this._view.getElementById('select-menu').style.display = 'none';
        this._view.getElementById('battle-menu').style.display = 'inline';
        this._view.getElementById('skill-menu').style.display = 'none';
        this._view.getElementById('change-menu').style.display = 'none';
        this._view.getElementById('confirm-menu').style.display = 'none';
    }
    
    _addEvent() {
        this._view.getElementById('button-skill').addEventListener('click', this._listenerTable['onClickSkillButton']);
        this._view.getElementById('button-change').addEventListener('click', this._listenerTable['onClickChangeButton']);
        this._view.getElementById('button-resign').addEventListener('click', this._listenerTable['onClickResignButton']);
    }
    
}

