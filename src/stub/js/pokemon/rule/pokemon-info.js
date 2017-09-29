/**
 * pokemon-info.js
 * 
 * @author yuki
 */



export default class PokemonInfo {
    
    constructor() {
        this._dummyPokemon = {
            pokemonID: 0,
            name:'ダミー',
            label: 'ダミー',
            elementList: [ { key: 'NONE', label: '　' } ],
            skillList: [],
            statusAilment: { label: '　' },
        };
    }
    
    clear() {
    }
    
    forEachPlayer(lambda) {
        lambda(this.getPlayer({ value: 1 }));
        lambda(this.getPlayer({ value: 2 }));
    }
    
    gameOver() {
    }
    
    getActivePokemon(playerID) {
        return this._dummyPokemon;
    }
    
    getFieldEffect(playerID, effect) {
        return {};
    }
    
    getMainPlayerID() {
        return { value: 1 };
    }
    
    getParty(playerID) {
        const pokemon = this._dummyPokemon;
        return {
            sourcePokemonList: [ pokemon, pokemon, pokemon, pokemon, pokemon, pokemon ],
            forEach: (lambda) => {
                for (let i = 0; i < 6; i++) {
                    lambda(pokemon, i);
                }
            },
            forEachSelected: (lambda) => {
                for (let i = 0; i < 3; i++) {
                    lambda(pokemon, i);
                }
            },
        };
    }
    
    getPlayer(playerID) {
        if (playerID.value === 1) {
            return { playerID: { value: 1 }, name: 'プレイヤー' };
        }
        else {
            return { playerID: { value: 2 }, name: '対戦相手' };
        }
    }
    
    isMainPlayer(playerID) {
        return playerID.value === this.getMainPlayerID().value;
    }
    
    notifyAllObserver(event, playerID = undefined, value = undefined) {
    }
    
    select(playerID, selectedPokemonIndexList) {
    }
    
    setAction(playerID, actionType, target = undefined) {
    }
    
    setActivePokemonIndex(playerID, activePokemonIndex) {
    }
    
    updateActivePokemon(playerID, pokemon) {
    }
    
    get field() {
        return {};
    }
    
    get terrain() {
        return {};
    }
    
    get weather() {
        return {};
    }
    
}

