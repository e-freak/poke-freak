/**
 * game-scene-controller.js
 * 
 * @author yuki
 */

import SceneType from './scene-type';



export default class GameSceneController {
    
    constructor(view) {
        this._view = view;
    }
    
    changeScene(scene) {
        switch (scene) {
        case SceneType.SELECT:
            this._changeToSelectScene();
            break;
        case SceneType.BATTLE:
            this._changeToBattleScene();
            break;
        case SceneType.SKILL:
            this._changeToSkillScene();
            break;
        case SceneType.CHANGE:
            this._changeToChangeScene();
            break;
        case SceneType.CONFIRM:
            // do nothing
            break;
        default:
            throw new Error(`Unknown scene : ${scene}`);
        }
    }
    
    _changeFieldHeight(field, value) {
        field.style.height = `${value}px`;
        field.style['max-height'] = `${value}px`;
        field.style['min-height'] = `${value}px`;
    }
    
    _changeToBattleScene() {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 200);
        this._changeFieldHeight(this._view.getElementById('text-message'), 360);
    }
    
    _changeToChangeScene() {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'inline';
        this._changeFieldHeight(this._view.getElementById('info-field'), 460);
        this._changeFieldHeight(this._view.getElementById('text-message'), 100);
    }
    
    _changeToSelectScene() {
        this._view.getElementById('select-info').style.display = 'inline';
        this._view.getElementById('battle-info').style.display = 'none';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 380);
        this._changeFieldHeight(this._view.getElementById('text-message'), 180);
    }
    
    _changeToSkillScene() {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'inline';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 460);
        this._changeFieldHeight(this._view.getElementById('text-message'), 100);
    }
    
}

