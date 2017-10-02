/**
 * mock-game-master.js
 */

import Observable from '../util/observable';

import GameStatus from './game-status';
import PokemonInfo from './rule/pokemon-info';



export default class MockGameMaster extends Observable {
    
    constructor() {
        super();
        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
        this._info = new PokemonInfo();
        this.addObserverList = [];
        this.changeList = [];
        this.changeByBatonList = [];
        this.changeBySkillList = [];
        this.closeCount = 0;
        this.endList = [];
        this.initializeList = [];
        this.nextList = [];
        this.readyList = [];
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
    
    end(force) {
        this.endList.push({ force: force });
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

