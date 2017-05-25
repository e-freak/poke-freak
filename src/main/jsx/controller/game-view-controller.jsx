/**
 * game-view-controller.jsx
 * 
 * @author yuki
 */

import Observer from '../util/observer';

import Event from '../event/event';
import GameMaster from '../pokemon/mock-game-master';
import GameMenuController from './game-menu-controller';
import GameSceneController from './game-scene-controller';
import SceneType from './scene-type';



export default class GameViewController extends Observer {
    
    constructor(view) {
        super();
        this._view = view;
        this._scene = this._createSceneController(view);
        this._menu = this._createMenuController(view);
        this._master = this._createGameMaster();
    }
    
    initialize() {
        this._menu.addObserver(this);
        this._changeScene(SceneType.SELECT);
    }
    
    update(target, param) {
        switch (param.event) {
        case Event.TO_SELECT_SCENE:
            this._changeScene(SceneType.SELECT);
            break;
        case Event.TO_BATTLE_SCENE:
            this._changeScene(SceneType.BATTLE);
            break;
        case Event.TO_SKILL_SCENE:
            this._changeScene(SceneType.SKILL);
            break;
        case Event.TO_CHANGE_SCENE:
            this._changeScene(SceneType.CHANGE);
            break;
        case Event.TO_CONFIRM_SCENE:
            this._changeScene(SceneType.CONFIRM, param.disableOKButton, param.disableCancelButton);
            break;
        case Event.CONFIRM_OK:
            this._menu.onConfirmOK(target.confirmType);
            break;
        case Event.CONFIRM_CANCEL:
            this._menu.onConfirmCancel(target.confirmType);
            break;
        default:
            break;
        }
    }
    
    _changeScene(scene, disableOKButton = undefined, disableCancelButton = undefined) {
        this._menu.changeScene(scene, disableOKButton, disableCancelButton);
        this._scene.changeScene(scene);
    }
    
    _createSceneController(view) {
        return new GameSceneController(view);
    }
    
    _createMenuController(view) {
        return new GameMenuController(view);
    }
    
    _createGameMaster() {
        return new GameMaster();
    }
    
}

