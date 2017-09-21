/**
 * bgm-controller.js
 */

import Scene from './scene';



export default class BGMController {
    
    constructor(view) {
        this._view = view;
    }
    
    select(scene) {
        this.stop();
        
        switch (scene) {
        case Scene.TITLE:
            this._selected = 'bgm-title';
            break;
        case Scene.SELECT:
            this._selected = 'bgm-select';
            break;
        case Scene.BATTLE:
            this._selected = 'bgm-battle';
            break;
        default:
            this._selected = undefined;
            break;
        }
    }
    
    start(at) {
        if (this._selected) {
            if (at !== undefined) {
                this._view.getElementById(this._selected).currentTime = at;
            }
            this._view.getElementById(this._selected).play();
        }
    }
    
    stop() {
        if (this._selected) {
            this._view.getElementById(this._selected).pause();
        }
    }
    
}

