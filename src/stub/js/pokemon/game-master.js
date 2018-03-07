/**
 * game-master.js
 * 
 * @author yuki
 */

import Observable from '../util/observable';

import PokemonInfo from './rule/pokemon-info';
import UserEvent from '../event/user-event';



export default class GameMaster extends Observable {
    
    constructor() {
        super();
        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
        this._info = new PokemonInfo();
    }
    
    change(playerID, targetPokemonIndex) {
    }
    
    changeByBaton(playerID, targetPokemonIndex) {
    }
    
    changeBySkill(playerID, targetPokemonIndex) {
    }
    
    close() {
    }
    
    confirmResign(playerID) {
    }
    
    end(force = false) {
    }
    
    help(playerID) {
    }
    
    initialize(playerName, opponentName) {
    }
    
    isClosed() {
        return false;
    }
    
    next(playerID, targetPokemonIndex) {
    }
    
    ready(playerResource, opponentResource) {
    }
    
    requestChangeMenu(playerID, cancelable = true) {
    }
    
    requestSkillMenu(playerID, cancelable = true) {
    }
    
    resign(playerID) {
        this.notifyAllObserver({ event: UserEvent.GAME_PAUSE });
    }
    
    select(playerID, selectedPokemonIndexList) {
        this.notifyAllObserver({ event: UserEvent.GAME_PAUSE });
    }
    
    skill(playerID, targetSkillIndex) {
    }
    
    get info() {
        return this._info;
    }
    
}

