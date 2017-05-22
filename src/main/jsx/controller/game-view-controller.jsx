/**
 * game-view-controller.jsx
 * 
 * @author yuki
 */

import Observer from '../util/observer';

import Event from '../event/event';
import SelectViewController from './select-view-controller';



export default class GameViewController extends Observer {
    
    constructor(view) {
        super();
        this._view = view;
        this._core = this._createFirstViewController(view);
    }
    
    initialize() {
        this._core.addObserver(this);
        this._core.initialize();
    }
    
    update(target, param) {
        switch (param.event) {
        case Event.CHANGE_VIEW:
            this._core = param.controller;
            this._core.addObserver(this);
            this._core.initialize();
            break;
        case Event.CONFIRM_OK:
            this._core = param.controller;
            this._core.addObserver(this);
            this._core.initialize();
            this._core.onConfirmOK();
            break;
        case Event.CONFIRM_CANCEL:
            this._core = param.controller;
            this._core.addObserver(this);
            this._core.initialize();
            this._core.onConfirmCancel();
            break;
        default:
            break;
        }
    }
    
    _createFirstViewController(view) {
        return new SelectViewController(view);
    }
    
}

