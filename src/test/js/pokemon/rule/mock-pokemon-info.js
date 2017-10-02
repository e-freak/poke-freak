/**
 * mock-pokemon-info.js
 * 
 * @author yuki
 */



export default class MockPokemonInfo {
    
    constructor() {
        this.pokemon = {
            skillList: [],
        };
    }
    
    clear() {
    }
    
    forEachPlayer(lambda) {
    }
    
    getActivePokemon(playerID) {
        return this.pokemon;
    }
    
    getParty(playerID) {
        return {
            sourcePokemonList: [],
            forEach: (lambda) => {},
            forEachSelected: (lambda) => {},
        };
    }
    
}

