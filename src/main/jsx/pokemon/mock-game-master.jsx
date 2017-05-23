/**
 * mock-game-master.jsx
 * 
 * @author yuki
 */



export default class MockGameMaster {
    
    constructor() {
        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
    }
    
    getParty(playerID) {
        return [
            {}, {}, {}, {}, {}, {},
        ];
    }
    
    getSelectedPokemonList(playerID) {
        return [
            {}, {}, {},
        ];
    }
    
}
