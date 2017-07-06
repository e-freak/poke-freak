/**
 * mock-game-master.js
 */

import Observable from '../util/observable';

import GameStatus from './game-status';
import PlayerID from './rule/playerID';
import PokemonInfo from './rule/pokemon-info';



export default class MockGameMaster extends Observable {
    
    constructor() {
        super();
        this.PLAYER_ID = new PlayerID(1);
        this.OPPONENT_ID = new PlayerID(2);
        this._info = new PokemonInfo();
        this.addObserverList = [];
        this.changeList = [];
        this.changeByBatonList = [];
        this.changeBySkillList = [];
        this.closeCount = 0;
        this.confirmResignList = [];
        this.endList = [];
        this.helpList = [];
        this.initializeList = [];
        this.nextList = [];
        this.readyList = [];
        this.requestChangeMenuList = [];
        this.requestSkillMenuList = [];
        this.resignList = [];
        this.selectList = [];
        this.skillList = [];
    }
    
    addObserver(announcer) {
        this.addObserverList.push({ announcer: announcer });
    }
    
    change(playerID, targetPokemonIndex) {
        this.changeList.push({ playerID: playerID, targetPokemonIndex: targetPokemonIndex });
    }
    
    changeByBaton(playerID, targetPokemonIndex) {
        this.changeByBatonList.push({ playerID: playerID, targetPokemonIndex: targetPokemonIndex });
    }
    
    changeBySkill(playerID, targetPokemonIndex) {
        this.changeBySkillList.push({ playerID: playerID, targetPokemonIndex: targetPokemonIndex });
    }
    
    close() {
        this.closeCount++;
    }
    
    confirmResign(playerID) {
        this.confirmResignList.push({ playerID: playerID });
    }
    
    end(force) {
        this.endList.push({ force: force });
    }
    
    help(playerID) {
        this.helpList.push({ playerID: playerID });
    }
    
    initialize(playerName, opponentName) {
        this.initializeList.push({ playerName: playerName, opponentName: opponentName });
    }
    
    next(playerID, targetPokemonIndex) {
        this.nextList.push({ playerID: playerID, targetPokemonIndex: targetPokemonIndex });
    }
    
    ready(playerResource, opponentResource) {
        this.readyList.push({ playerResource: playerResource, opponentResource: opponentResource });
    }
    
    requestChangeMenu(playerID, cancelable = true) {
        this.requestChangeMenuList.push({ playerID: playerID, cancelable: cancelable });
    }
    
    requestSkillMenu(playerID, cancelable = true) {
        this.requestSkillMenuList.push({ playerID: playerID, cancelable: cancelable });
    }
    
    resign(playerID) {
        this.resignList.push({ playerID: playerID });
    }
    
    select(playerID, selectedPokemonIndexList) {
        this.selectList.push({ playerID: playerID, selectedPokemonIndexList: selectedPokemonIndexList });
    }
    
    skill(playerID, targetSkillIndex) {
        this.skillList.push({ playerID: playerID, targetSkillIndex: targetSkillIndex });
    }
    
    get info() {
        return this._info;
    }
    
    get status() {
        return GameStatus.CLOSED;
    }
    
}

