/**
 * pokemon-info.js
 */

import Observable from '../../util/observable';

import Field from './field';
import Party from './party';
import Player from './player';
import StatusAilment from './status-ailment';
import TurnInfo from './turn-info';



export default class PokemonInfoStub extends Observable {
    
    constructor(field = undefined, playerTable = undefined, partyTable = undefined) {
        super();
        this.field = field;
        this.playerTable = playerTable;
        this.partyTable = partyTable;
    }
    
    clear() {
        this.field = null;
        this.playerTable = null;
        this.partyTable = null;
    }
    
    clone() {
        return new PokemonInfoStub(this._field, this._playerTable, this._partyTable);
    }
    
    forEachPlayer(lambda) {
        Object.values(this._playerTable).forEach(lambda);
    }
    
    getActivePokemon(playerID) {
        return this._partyTable[playerID.value].getActivePokemon();
    }
    
    getMainPlayerID() {
        return 1;
    }
    
    getParty(playerID) {
        return common.deepCopy(this._partyTable[playerID.value]);
    }
    
    getPlayer(playerID) {
        return common.deepCopy(this._playerTable[playerID.value]);
    }
    
    isMainPlayer(playerID) {
        return playerID == 1;
    }
    
    notifyAllObserver(event, playerID = undefined, value = undefined) {
        super.notifyAllObserver({ event: event, info: this, playerID: playerID, value: value });
    }
    
    select(playerID, selectedPokemonIndexList) {
        this._partyTable[playerID.value].select(selectedPokemonIndexList);
    }
    
    setActivePokemonIndex(playerID, activePokemonIndex) {
        this._partyTable[playerID.value].activePokemonIndex = activePokemonIndex;
    }
    
    updateActivePokemon(playerID, pokemon) {
        const party = this._partyTable[playerID.value];
        party.updateActivePokemon(common.deepCopy(pokemon));
    }
    
    get field() {
        return this._field.clone();
    }
    
    get playerTable() {
        return common.deepCopy(this._playerTable);
    }
    
    get partyTable() {
        return common.deepCopy(this._partyTable);
    }
    
    get weather() {
        return this._field.weather;
    }
    
    set field(value) {
        this._field = value ? value.clone() : new Field();
    }
    
    set playerTable(value) {
        this._playerTable = value ? common.deepCopy(value) : { 1: new Player(), 2: new Player() };
    }
    
    set partyTable(value) {
        this._partyTable = value ? common.deepCopy(value) : { 1: new Party(), 2: new Party() };
    }
    
}

