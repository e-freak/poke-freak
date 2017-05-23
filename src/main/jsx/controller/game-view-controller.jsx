/**
 * game-view-controller.jsx
 * 
 * @author yuki
 */

import Observer from '../util/observer';

import Event from '../event/event';
import GameMaster from '../pokemon/mock-game-master';
import SelectSceneController from './select-scene-controller';



export default class GameViewController extends Observer {
    
    constructor(view) {
        super();
        this._view = view;
        this._scene = this._createFirstSceneController(view);
        this._master = this._createGameMaster();
    }
    
    initialize() {
        this._scene.addObserver(this);
        this._scene.initialize(this._master);
    }
    
    update(target, param) {
        switch (param.event) {
        case Event.CHANGE_VIEW:
            this._scene = param.scene;
            this._scene.addObserver(this);
            this._scene.initialize(this._master);
            break;
        case Event.CONFIRM_OK:
            this._scene = param.scene;
            this._scene.addObserver(this);
            this._scene.onConfirmOK();
            break;
        case Event.CONFIRM_CANCEL:
            this._scene = param.scene;
            this._scene.addObserver(this);
            this._scene.onConfirmCancel();
            break;
        default:
            break;
        }
    }
    
    _createFirstSceneController(view) {
        return new SelectSceneController(view);
    }
    
    _createGameMaster() {
        return new GameMaster();
    }
    
}

