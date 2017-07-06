/**
 * mock-game-scene-controller.js
 */

import MockObserver from '../../../util/mock-observer';



export default class MockGameSceneController extends MockObserver {
    
    constructor(view) {
        super();
        this.changeSceneList = [];
    }
    
    changeScene(scene) {
        this.changeSceneList.push({ scene: scene });
    }
    
}
