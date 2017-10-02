/**
 * mock-game-menu-controller.js
 */

import Observable from '../../../util/observable';

import ConfirmEvent from '../../../event/confirm-event';



export default class MockGameMenuController extends Observable {
    
    constructor(view) {
        super();
        this._confirmEvent = ConfirmEvent.NONE;
        this.changeSceneList = [];
        this.initializeCount = 0;
        this.onConfirmCancelList = [];
        this.onConfirmOKList = [];
    }
    
    changeScene(scene, disableOKButton = undefined, disableCancelButton = undefined) {
        this.changeSceneList.push({ scene: scene, disableOKButton: disableOKButton, disableCancelButton: disableCancelButton });
    }
    
    initialize() {
        this.initializeCount++;
    }
    
    onConfirmCancel(confirmEvent) {
        this.onConfirmCancelList.push({ confirmEvent: confirmEvent });
    }
    
    onConfirmOK(confirmEvent) {
        this.onConfirmOKList.push({ confirmEvent: confirmEvent });
    }
    
    get confirmEvent() {
        return this._confirmEvent;
    }
    
    set confirmEvent(value) {
        this._confirmEvent = value;
    }
    
}
