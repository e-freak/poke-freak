/**
 * mock-game-master.jsx
 * 
 * @author yuki
 */

import Observable from '../util/observable';



export default class MockGameMaster extends Observable {
    
    constructor() {
        super();
        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
        this._info = {};
    }
    
    initialize(playerName, opponentName, playerResourceList, opponentResourceList) {
        this._info = {
            playerName: playerName,
            opponentName: opponentName,
            playerResourceList: playerResourceList,
            opponentResourceList: opponentResourceList,
        };
        this._notifyAllObserver(1);
    }
    
    requestChangeMenu() {
        this._notifyAllObserver(2);
    }
    
    requestSkillMenu() {
        this._notifyAllObserver(3);
    }
    
    _notifyAllObserver(event) {
        this.notifyAllObserver({ event: event, info: this._info });
    }
    
}
