/**
 * game-view-controller.js
 * 
 * @author yuki
 */

import Observer from '../../../util/observer';

import BrowserAnnouncer from '../../announcer/browser-announcer';
import GameEvent from '../../event/game-event';
import GameMaster from '../../game-master';

import ConfirmEvent from '../../../event/confirm-event';
import GameMenuController from './game-menu-controller';
import GameSceneController from './game-scene-controller';
import SamplePartyList from '../../sample-party-list';
import SceneType from './scene-type';
import UserEvent from '../../../event/user-event';



export default class GameViewController extends Observer {
    
    constructor(view) {
        super();
        this._scene = this._createSceneController(view);
        this._menu = this._createMenuController(view);
        this._announcer = this._createAnnouncer(view);
        this._master = this._createGameMaster();
        this._gameEvent = undefined;
        this._menu.addObserver(this);
        this._master.addObserver(this);
        this._master.addObserver(this._scene);
        this._master.addObserver(this._announcer);
        
        this._opponentPokemonIndex = 0;
    }
    
    initialize() {
        this._scene.initialize();
        this._menu.initialize();
        this._master.initialize('プレイヤー', '対戦相手');
        this._master.ready(SamplePartyList[0], SamplePartyList[1]);
        this._changeScene(SceneType.SELECT, true);
        this._scene.requestSelectedPokemonInfo(this._master.info.getParty(this._master.PLAYER_ID).sourcePokemonList);
    }
    
    update(target, param) {
        switch (param.event) {
        case UserEvent.TO_SELECT_SCENE:
            this._changeScene(SceneType.SELECT, true);
            this._scene.requestSelectedPokemonInfo(this._master.info.getParty(this._master.PLAYER_ID).sourcePokemonList);
            break;
        case UserEvent.TO_BATTLE_SCENE:
            this._changeScene(SceneType.BATTLE);
            break;
        case UserEvent.TO_SKILL_SCENE:
            this._changeScene(SceneType.SKILL, true);
            break;
        case UserEvent.TO_CHANGE_SCENE:
            this._changeScene(SceneType.CHANGE, true);
            break;
        case UserEvent.TO_CONFIRM_SCENE:
            this._changeScene(SceneType.CONFIRM, param.disableOKButton, param.disableCancelButton);
            break;
        case UserEvent.CONFIRM_OK:
            this._menu.onConfirmOK(target.confirmEvent);
            break;
        case UserEvent.CONFIRM_CANCEL:
            this._menu.onConfirmCancel(target.confirmEvent);
            break;
        case UserEvent.SELECT_POKEMON:
        case UserEvent.UNSELECT_POKEMON:
            this._scene.requestSelectedPokemonInfo(this._master.info.getParty(this._master.PLAYER_ID).sourcePokemonList, param.value);
            break;
        case UserEvent.START_BATTLE:
            this._master.select(this._master.OPPONENT_ID, [ 0, 1, 2 ]);
            this._master.select(this._master.PLAYER_ID, param.value);
            this._changeScene(SceneType.BATTLE);
            break;
        case UserEvent.SELECT_SKILL:
            this._master.skill(this._master.PLAYER_ID, param.value);
            this._master.skill(this._master.OPPONENT_ID, 0);
            break;
        case UserEvent.SELECT_CHANGE:
            switch (this._gameEvent) {
            case GameEvent.CHANGE_BY_SKILL:
                this._gameEvent = undefined;
                this._master.changeBySkill(this._master.PLAYER_ID, param.value);
                break;
            case GameEvent.CHANGE_BY_BATON:
                this._gameEvent = undefined;
                this._master.changeByBaton(this._master.PLAYER_ID, param.value);
                break;
            case GameEvent.CHANGE_FOR_NEXT:
                this._gameEvent = undefined;
                this._master.next(this._master.PLAYER_ID, param.value);
                break;
            default:
                this._master.change(this._master.PLAYER_ID, param.value);
                this._master.skill(this._master.OPPONENT_ID, 0);
                break;
            }
            break;
        case UserEvent.SELECT_RESIGN_CHECK:
            this._scene.requestConfirmMessage('勝負を諦めて降参しますか？');
            break;
        case UserEvent.SELECT_RESIGN_OK:
            this._master.resign(this._master.PLAYER_ID);
            this._master.skill(this._master.OPPONENT_ID, 0);
            break;
        case GameEvent.CHANGE_BY_SKILL:
        case GameEvent.CHANGE_BY_BATON:
            if (param.playerID.value === this._master.PLAYER_ID.value) {
                this._gameEvent = param.event;
                this._changeScene(SceneType.CHANGE, true, true);
            }
            break;
        case GameEvent.CHANGE_FOR_NEXT:
            if (param.playerID.value === this._master.PLAYER_ID.value) {
                this._gameEvent = param.event;
                this._changeScene(SceneType.CHANGE, true, true);
            }
            else {
                this._master.next(param.playerID, this._opponentPokemonIndex + 1);
                this._opponentPokemonIndex++;
            }
            break;
        case GameEvent.GAME_SET:
            this._menu.confirmEvent = ConfirmEvent.GAME_SET;
            this._changeScene(SceneType.CONFIRM, false, true);
            break;
        default:
            break;
        }
    }
    
    _changeScene(scene, disableOKButton = undefined, disableCancelButton = undefined) {
        this._menu.changeScene(scene, disableOKButton, disableCancelButton);
        this._scene.changeScene(scene, this._master.info, this._master.PLAYER_ID);
    }
    
    _createAnnouncer(view) {
        return new BrowserAnnouncer(view);
    }
    
    _createSceneController(view) {
        return new GameSceneController(view);
    }
    
    _createMenuController(view) {
        return new GameMenuController(view);
    }
    
    _createGameMaster() {
        return new GameMaster();
    }
    
    _createPartySelector() {
        return new PartySelector();
    }
    
}
