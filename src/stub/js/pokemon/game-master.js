/**
 * game-master.js
 * 
 * @author yuki
 */



export default class GameMaster {
    
    constructor() {
        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
        this._info = {};
    }
    
    addObserver(observer) {
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
    
    next(playerID, targetPokemonIndex) {
    }
    
    ready(playerResource, opponentResource) {
    }
    
    requestChangeMenu(playerID, cancelable = true) {
    }
    
    requestSkillMenu(playerID, cancelable = true) {
    }
    
    resign(playerID) {
    }
    
    select(playerID, selectedPokemonIndexList) {
    }
    
    skill(playerID, targetSkillIndex) {
    }
    
    get info() {
        return this._info;
    }
    
}

