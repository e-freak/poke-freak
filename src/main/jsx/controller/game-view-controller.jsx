/**
 * game-view-controller.jsx
 * 
 * @author yuki
 */

import Observer from '../util/observer';

import BrowserAnnouncer from '../pokemon/announcer/browser-announcer';
import GameEvent from '../pokemon/event/game-event';
import GameMaster from '../pokemon/game-master';
import GameMenuController from './game-menu-controller';
import GameSceneController from './game-scene-controller';
import SamplePartyList from '../pokemon/data/sample-party-list';
import SceneType from './scene-type';
import UserEvent from '../event/user-event';

import PartyFactory from '../pokemon/party-factory';



export default class GameViewController extends Observer {
    
    constructor(view) {
        super();
        this._view = view;
        this._scene = this._createSceneController(view);
        this._menu = this._createMenuController(view);
        this._announcer = this._createAnnouncer(view);
        this._master = this._createGameMaster();
        this._gameEvent = undefined;
        this._menu.addObserver(this);
        this._menu.addObserver(this._announcer);
        this._master.addObserver(this);
        this._master.addObserver(this._announcer);
        
        const factory = new PartyFactory();
        this._playerParty = factory.create(this._master.PLAYER_ID, SamplePartyList[0]);
        this._opponentParty = factory.create(this._master.OPPONENT_ID, SamplePartyList[1]);
        this._playerParty.select([ 0, 1, 2 ]);
        this._opponentParty.select([ 0, 1, 2 ]);
        this._started = false;
        this._opponentPokemonIndex = 0;
    }
    
    initialize() {
        this._menu.initialize();
        this._changeScene(SceneType.SELECT);
        this._master.initialize('プレイヤー', '対戦相手');
        this._master.ready(this._playerParty, this._opponentParty);
    }
    
    update(target, param) {
        switch (param.event) {
        case UserEvent.TO_SELECT_SCENE:
            this._changeScene(SceneType.SELECT);
            break;
        case UserEvent.TO_BATTLE_SCENE:
            this._changeScene(SceneType.BATTLE);
            if (!this._started) {
                this._started = true;
                this._master.start();
            }
            break;
        case UserEvent.TO_SKILL_SCENE:
            this._changeScene(SceneType.SKILL);
            this._master.requestSkillMenu(this._master.PLAYER_ID);
            break;
        case UserEvent.TO_CHANGE_SCENE:
            this._changeScene(SceneType.CHANGE);
            this._master.requestChangeMenu(this._master.PLAYER_ID);
            break;
        case UserEvent.TO_CONFIRM_SCENE:
            this._changeScene(SceneType.CONFIRM, param.disableOKButton, param.disableCancelButton);
            break;
        case UserEvent.CONFIRM_OK:
            this._menu.onConfirmOK(target.confirmType);
            break;
        case UserEvent.CONFIRM_CANCEL:
            this._menu.onConfirmCancel(target.confirmType);
            break;
        case UserEvent.SELECT_SKILL:
            this._master.skill(this._master.PLAYER_ID, param.value);
            this._master.skill(this._master.OPPONENT_ID, 0);
            break;
        case UserEvent.SELECT_CHANGE:
            switch (this._gameEvent) {
            case GameEvent.CHANGE_FOR_NEXT:
                this._gameEvent = undefined;
                this._master.next(this._master.PLAYER_ID, param.value);
                break;
            case GameEvent.RETURN_TO_HAND_BY_SKILL:
            case GameEvent.RETURN_TO_HAND_BY_EJECT_BUTTON:
                this._gameEvent = undefined;
                this._master.changeBySkill(this._master.PLAYER_ID, param.value);
                break;
            default:
                this._master.change(this._master.PLAYER_ID, param.value);
                this._master.skill(this._master.OPPONENT_ID, 0);
                break;
            }
            break;
        case UserEvent.SELECT_RESIGN_CHECK:
            this._master.confirmResign(this._master.PLAYER_ID);
            break;
        case UserEvent.SELECT_RESIGN_OK:
            this._master.resign(this._master.PLAYER_ID);
            this._master.skill(this._master.OPPONENT_ID, 0);
            break;
        case GameEvent.CHANGE_FOR_NEXT:
            if (param.playerID.value === this._master.PLAYER_ID.value) {
                this._gameEvent = param.event;
                this._changeScene(SceneType.CHANGE, true, true);
                this._master.requestChangeMenu(param.playerID, false);
            }
            else {
                this._master.next(param.playerID, this._opponentPokemonIndex + 1);
                this._opponentPokemonIndex++;
            }
            break;
        case GameEvent.RETURN_TO_HAND_BY_SKILL:
        case GameEvent.RETURN_TO_HAND_BY_EJECT_BUTTON:
            if (param.playerID.value === this._master.PLAYER_ID.value) {
                this._gameEvent = param.event;
                this._changeScene(SceneType.CHANGE, true, true);
                this._master.requestChangeMenu(param.playerID, false);
            }
            break;
        default:
            break;
        }
    }
    
    _changeScene(scene, disableOKButton = undefined, disableCancelButton = undefined) {
        this._menu.changeScene(scene, disableOKButton, disableCancelButton);
        this._scene.changeScene(scene);
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
    
}

