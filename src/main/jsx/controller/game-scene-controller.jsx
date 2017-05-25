/**
 * game-scene-controller.jsx
 * 
 * @author yuki
 */

import SceneType from './scene-type';



export default class GameSceneController {
    
    constructor(view) {
        this._view = view;
        this._initialize();
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
        field.scrollTop = field.scrollHeight;
    }
    
    _changeToBattleScene() {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 200);
        this._changeFieldHeight(this._view.getElementById('text-message'), 360);
        
        // master.getSelectedPokemonList(master.PLAYER_ID).forEach((pokemon, index) => {
        //     const imageID = `icon-player-pokemon-${index}`;
        //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
        // });
        // master.getSelectedPokemonList(master.OPPONENT_ID).forEach((pokemon, index) => {
        //     const imageID = `icon-opponent-pokemon-${index}`;
        //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
        // });
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
        
        // master.getParty(master.PLAYER_ID).forEach((pokemon, index) => {
        //     const imageID = `image-player-pokemon-${index}`;
        //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
        // });
        // master.getParty(master.OPPONENT_ID).forEach((pokemon, index) => {
        //     const imageID = `image-opponent-pokemon-${index}`;
        //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
        // });
    }
    
    _changeToSkillScene() {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'inline';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 460);
        this._changeFieldHeight(this._view.getElementById('text-message'), 100);
    }
    
    _initialize() {
        // GitHubにはポケモンの画像をアップロードしないため、その対策
        const setDummyImage = (image) => {
            image.onerror = () => {
                image.src = '../image/dummy.jpg';
                image.onerror = undefined;
            };
        };
        Array.prototype.forEach.call(this._view.getElementsByClassName('image-pokemon'), setDummyImage);
        Array.prototype.forEach.call(this._view.getElementsByClassName('icon-pokemon'), setDummyImage);
    }
    
}

