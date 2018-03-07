/**
 * automaton.js
 * 
 * @author yuki
 */



export default class Automaton {
    
    constructor(core = undefined) {
    }
    
    changeByBaton(activePokemonID) {
        return this._createAction('CHANGE_BY_BATON');
    }
    
    changeBySkill(activePokemonID) {
        return this._createAction('CHANGE_BY_SKILL');
    }
    
    initialize(playerID, playerResource, opponentResource) {
    }
    
    next(activePokemonID) {
        return this._createAction('NEXT');
    }
    
    selectAction(activePokemonID) {
        return this._createAction('SKILL');
    }
    
    selectParty() {
        return [ 0, 1, 2 ];
    }
    
    update(target, param) {
    }
    
    get core() {
        return this._core;
    }
    
    set core(value) {
        this._core = value;
    }
    
    _createAction(type) {
        return { playerID: { value: 2 }, type: type, target: 0 };
    }
    
}
