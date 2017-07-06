/**
 * game-master-stub.js
 */

import Observable from '../util/observable';

import GameEvent from './event/game-event';
import MessageEvent from './event/message-event';
import NotifiablePokemonInfo from './rule/notifiable-pokemon-info';
import Party from './rule/party';
import Player from './rule/player';
import PlayerID from './rule/playerID';



export default class GameMasterStub extends Observable {
    
    constructor() {
        super();
        this.PLAYER_ID = new PlayerID(1);
        this.OPPONENT_ID = new PlayerID(2);
        this._info = new NotifiablePokemonInfo();
    }
    
    addObserver(observer) {
        this._info.addObserver(observer);
        super.addObserver(observer);
    }
    
    change(playerID, targetPokemonIndex) {
        this._info.setActivePokemon(playerID, targetPokemonIndex);
        this._info.notifyAllObserver(MessageEvent.TURN_READY);
        this._info.notifyAllObserver(GameEvent.TURN_READY);
    }
    
    changeByBaton(playerID, targetPokemonIndex) {
        this._info.setActivePokemon(playerID, targetPokemonIndex);
        this._info.notifyAllObserver(MessageEvent.TURN_READY);
        this._info.notifyAllObserver(GameEvent.TURN_READY);
    }
    
    changeBySkill(playerID, targetPokemonIndex) {
        this._info.setActivePokemon(playerID, targetPokemonIndex);
        this._info.notifyAllObserver(MessageEvent.TURN_READY);
        this._info.notifyAllObserver(GameEvent.TURN_READY);
    }
    
    close() {
    }
    
    confirmResign(playerID) {
        this._notifyAllObserver(MessageEvent.CONFIRM_RESIGN, playerID);
    }
    
    end(force = false) {
    }
    
    help(playerID) {
        this._notifyAllObserver(MessageEvent.HELP_GAME, playerID, this._status);
    }
    
    initialize(playerName, opponentName) {
        this._info.clear();
        this._info.playerTable = this._createPlayerTable(playerName, opponentName);
    }
    
    next(playerID, targetPokemonIndex) {
        this._info.setActivePokemon(playerID, targetPokemonIndex);
        this._info.notifyAllObserver(MessageEvent.TURN_READY);
        this._info.notifyAllObserver(GameEvent.TURN_READY);
    }
    
    ready(playerResource, opponentResource) {
        this._info.partyTable = this._createPartyTable(playerResource, opponentResource);
        this._info.notifyAllObserver(MessageEvent.GAME_READY);
        this._info.notifyAllObserver(GameEvent.GAME_READY);
    }
    
    requestChangeMenu(playerID, cancelable = true) {
        this._notifyAllObserver(MessageEvent.REQUEST_CHANGE_MENU, playerID, cancelable);
        this._notifyAllObserver(GameEvent.REQUEST_CHANGE_MENU, playerID, cancelable);
    }
    
    requestSkillMenu(playerID, cancelable = true) {
        this._notifyAllObserver(MessageEvent.REQUEST_SKILL_MENU, playerID, cancelable);
        this._notifyAllObserver(GameEvent.REQUEST_SKILL_MENU, playerID, cancelable);
    }
    
    resign(playerID) {
        this._info.notifyAllObserver(MessageEvent.RESIGN);
        this._info.notifyAllObserver(MessageEvent.GAME_SET, playerID.opponentID);
        this._info.notifyAllObserver(GameEvent.GAME_SET, playerID.opponentID);
    }
    
    select(playerID, selectedPokemonIndexList) {
        this._info.select(playerID, selectedPokemonIndexList);
        this._info.notifyAllObserver(MessageEvent.GAME_START);
        this._info.notifyAllObserver(GameEvent.GAME_START);
        this._info.notifyAllObserver(MessageEvent.TURN_READY);
        this._info.notifyAllObserver(GameEvent.TURN_READY);
    }
    
    skill(playerID, targetSkillIndex) {
        this._info.notifyAllObserver(MessageEvent.TURN_READY);
        this._info.notifyAllObserver(GameEvent.TURN_READY);
    }
    
    get info() {
        return this._info.clone();
    }
    
    _createPartyTable(playerResource, opponentResource) {
        const table = {};
        table[this.PLAYER_ID.value] = new Party(playerResource);
        table[this.OPPONENT_ID.value] = new Party(opponentResource);
        return table;
    }
    
    _createPlayerTable(playerName, opponentName) {
        const table = {};
        table[this.PLAYER_ID.value] = new Player(this.PLAYER_ID, playerName);
        table[this.OPPONENT_ID.value] = new Player(this.OPPONENT_ID, opponentName);
        return table;
    }
    
    _notifyAllObserver(event, playerID = undefined, value = undefined) {
        this.notifyAllObserver({ event: event, playerID: playerID, value: value });
    }
    
}

