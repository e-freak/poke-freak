/**
 * mock-game-scene-controller.js
 */

import MockObserver from '../../../util/mock-observer';



export default class MockGameSceneController extends MockObserver {
    
    constructor(view) {
        super();
        this.changeSceneList = [];
        this.initializeCount = 0;
        this.requestBattleInfoList = [];
        this.requestChangeMenuList = [];
        this.requestConfirmMessageList = [];
        this.requestSelectedPokemonInfoList = [];
        this.requestSelectMenuList = [];
        this.requestSkillMenuList = [];
    }
    
    changeScene(scene) {
        this.changeSceneList.push({ scene: scene });
    }
    
    initialize() {
        this.initializeCount++;
    }
    
    requestBattleInfo(info, playerID) {
        this.requestBattleInfoList.push({ info: info, playerID: playerID });
    }
    
    requestChangeMenu(info, playerID) {
        this.requestChangeMenuList.push({ info: info, playerID: playerID });
    }
    
    requestConfirmMessage(message) {
        this.requestConfirmMessageList.push({ message: message });
    }
    
    requestSelectedPokemonInfo(sourcePokemonList, selectedPokemonIndex = []) {
        this.requestSelectedPokemonInfoList.push({ sourcePokemonList: sourcePokemonList, selectedPokemonIndex: selectedPokemonIndex });
    }
    
    requestSelectMenu(info, playerID) {
        this.requestSelectMenuList.push({ info: info, playerID: playerID });
    }
    
    requestSkillMenu(info, playerID) {
        this.requestSkillMenuList.push({ info: info, playerID: playerID });
    }
    
}
