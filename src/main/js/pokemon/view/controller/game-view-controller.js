/**
 * game-view-controller.js
 * 
 * @author yuki
 */

import Observer from '../../../util/observer';

import Action from '../../rule/action';
import Automaton from '../../automaton/automaton';
import BrowserAnnouncer from '../../announcer/browser-announcer';
import DefaultAI from '../../automaton/simple-AI';
import FileUtil from '../../../util/file-util';
import GameEvent from '../../event/game-event';
import GameMaster from '../../game-master';

import ConfirmEvent from '../../event/confirm-event';
import GameMenuController from './game-menu-controller';
import GameSceneController from './game-scene-controller';
import ImageResource from '../../../resource/image-resource';
import SamplePartyList from '../../sample-party-list';
import SceneType from './scene-type';
import UserEvent from '../../../event/user-event';



export default class GameViewController extends Observer {
    
    constructor(view) {
        super();
        this._announcer = this._createAnnouncer(view);
        this._scene = this._createSceneController(view);
        this._menu = this._createMenuController(view);
        this._master = this._createGameMaster();
        this._automaton = new Automaton();
        this._gameEvent = 'NONE';
        this._master.addObserver(this);
        this._master.addObserver(this._scene);
        this._master.addObserver(this._announcer);
        this._menu.addObserver(this);
        this._playerResource = undefined;
        this._opponentResource = undefined;
    }
    
    close() {
        this._master.end(true);
    }
    
    initialize() {
        this._playerResource = SamplePartyList[0];
        this._opponentResource = SamplePartyList[1];
        const preload = (p) => { ImageResource.getInstance().preload(p.pokemonID) };
        Object.values(this._playerResource).forEach(preload);
        Object.values(this._opponentResource).forEach(preload);
        
        this._scene.initialize();
        this._menu.initialize();
        this._master.initialize('プレイヤー', '対戦相手');
        this._shuffleList(SamplePartyList);
        this._loadAI('app/ai/simple-AI.poke', this._master.OPPONENT_ID, this._opponentResource, this._playerResource);
        
        this._master.ready(this._playerResource, this._opponentResource);
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
            this._master.select(this._master.OPPONENT_ID, this._automaton.selectParty());
            this._master.select(this._master.PLAYER_ID, param.value);
            this._changeScene(SceneType.BATTLE);
            break;
        case UserEvent.SELECT_SKILL:
            this._master.skill(this._master.PLAYER_ID, param.value);
            this._opponentAction(this._automaton.selectAction(this._getOpponentActivePokemon().pokemonID));
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
                this._opponentAction(this._automaton.selectAction(this._getOpponentActivePokemon().pokemonID));
                break;
            }
            break;
        case UserEvent.SELECT_RESIGN_CHECK:
            this._scene.requestConfirmMessage('勝負を諦めて降参しますか？');
            break;
        case UserEvent.SELECT_RESIGN_OK:
            this._master.resign(this._master.PLAYER_ID);
            this._opponentAction(this._automaton.selectAction(this._getOpponentActivePokemon().pokemonID));
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
        case UserEvent.GAME_PAUSE:
            this._scene.clearMessage();
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
    
    _getOpponentActivePokemon() {
        return this._master.info.getActivePokemon(this._master.OPPONENT_ID);
    }
    
    _loadAI(sourceCodePath, playerID, playerResource, opponentResource) {
        try {
            const sourceCode = FileUtil.readText(sourceCodePath);
            this._automaton.core = (0, eval)(sourceCode);
        }
        catch (e) {
            this._automaton.core = new DefaultAI();
        }
        this._automaton.initialize(playerID.value, playerResource, opponentResource);
    }
    
    _opponentAction(action) {
        if (this._master.isClosed()) {
            return;
        }
        switch (action.type) {
        case Action.SKILL:
            this._master.skill(this._master.OPPONENT_ID, action.target);
            break;
        case Action.CHANGE:
            this._master.change(this._master.OPPONENT_ID, action.target);
            break;
        case Action.CHANGE_BY_BATON:
            this._master.changeByBaton(this._master.OPPONENT_ID, action.target);
            break;
        case Action.CHANGE_BY_SKILL:
            this._master.changeBySkill(this._master.OPPONENT_ID, action.target);
            break;
        case Action.NEXT:
            this._master.next(this._master.OPPONENT_ID, action.target);
            break;
        default:
            throw new Error(`Invalid action : ${action.type}`);
        }
    }
    
    _shuffleList(target) {
        for (let n = target.length; n > 0; n--) {
            const s = n - 1;
            const t = Math.floor(Math.random() * n);
            const temp = target[s];
            target[s] = target[t];
            target[t] = temp;
        }
    }
    
}
