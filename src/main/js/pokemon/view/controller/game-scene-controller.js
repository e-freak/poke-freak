/**
 * game-scene-controller.js
 * 
 * @author yuki
 */

import Observer from '../../../util/observer';

import SceneType from './scene-type';
import ViewWrapper from '../view-wrapper';

import RequestEvent from '../../event/request-event';
import UpdateEvent from '../../event/update-event';



export default class GameSceneController extends Observer {
    
    constructor(view) {
        super();
        this._view = this._createViewWrapper(view);
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
    
    update(target, param) {
        switch (param.event) {
        case RequestEvent.SELECT_POKEMON:
            this._onSelectPokemon(target.info);
            break;
        case RequestEvent.BATTLE_INFO:
            this._onRequestBattleInfo(target.info);
            break;
        case RequestEvent.SKILL_MENU:
            this._onRequestSkillMenu(target.info, param.playerID);
            break;
        case RequestEvent.CHANGE_MENU:
            this._onRequestChangeMenu(target.info, param.playerID);
            break;
        case UpdateEvent.POKEMON_STATUS:
        case UpdateEvent.POKEMON_DEAD:
        case UpdateEvent.POKEMON_CHANGE:
        case UpdateEvent.STATUS_AILMENT_RESET:
            this._onUpdateActivePokemon(target, param.playerID);
            break;
        default:
            break;
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
    
    _createPPLabel(pokemon, skillIndex) {
        return `PP： ${('  ' + pokemon.getPP(skillIndex)).slice(-2)}`;
    }
    
    _createViewWrapper(view) {
        return new ViewWrapper(view);
    }
    
    _onSelectPokemon(info) {
        info.forEachPlayer((player) => {
            const targetID = player.playerID;
            const leftSide = info.isMainPlayer(targetID);
            const playerLabel = leftSide ? 'player' : 'opponent';
            const playerNameID = `${playerLabel}-name`;
            this._view.getElementById(playerNameID).textContent = player.name;
            info.getParty(targetID).forEach((pokemon, index) => {
                const imageID = `image-${playerLabel}-pokemon-${index}`;
                this._view.getElementById(imageID).src = `../image/pokemon/${('0000' + pokemon.pokemonID).slice(-4)}.png`;
                if (leftSide) {
                    // this._view.getElementById(imageID).addEventListener('click', this.onClickPokemon.bind(this, index));
                }
            });
        });
    }
    
    _onRequestBattleInfo(info) {
        info.forEachPlayer((player) => {
            const targetID = player.playerID;
            const leftSide = info.isMainPlayer(targetID);
            const playerLabel = leftSide ? 'player' : 'opponent';
            const activePokemon = info.getActivePokemon(targetID);
            const activePokemonIconID = `icon-${playerLabel}-active-pokemon`;
            const nameID = `${playerLabel}-active-pokemon-name`;
            const itemID = `${playerLabel}-active-pokemon-item`;
            const statusAilmentID = `${playerLabel}-active-pokemon-status-ailment`;
            const elementFieldID = `${playerLabel}-active-pokemon-element`;
            const partyFieldID = `icon-${playerLabel}-pokemon`;
            if (leftSide) {
                const hpCountID = `player-active-pokemon-hp-count`;
                this._view.getElementById(hpCountID).textContent = activePokemon.activeH;
            }
            this._view.getElementById(nameID).textContent = activePokemon.name;
            this._view.getElementById(itemID).src = '../image/item/item-blank.png';
            this._view.getElementById(statusAilmentID).textContent = activePokemon.statusAilment.label;
            this._setPokemonElement(elementFieldID, activePokemon);
            const partyField = this._view.getAppendableField(partyFieldID);
            const className = leftSide ? 'player-pokemon icon-pokemon' : 'icon-pokemon';
            info.getParty(targetID).forEachSelected((pokemon) => {
                partyField.appendChild(this._view.createImageTag(`../image/pokemon/${('0000' + pokemon.pokemonID).slice(-4)}.png`, className));
            });
            this._view.getElementById(activePokemonIconID).src = `../image/pokemon/${('0000' + activePokemon.pokemonID).slice(-4)}.png`;
        });
    }
    
    _onRequestSkillMenu(info, playerID) {
        const activePokemon = info.getActivePokemon(playerID);
        activePokemon.skillList.forEach((skill, index) => {
            const skillNameFieldID = `skill-name-${index}`;
            const skillElementFieldID = `skill-element-${index}`;
            const skillPPFieldID = `skill-pp-${index}`;
            this._view.getElementById(skillNameFieldID).textContent = skill.name;
            const skillElement = skill.elementList[0];
            const skillElementField = this._view.getElementById(skillElementFieldID);
            skillElementField.textContent = skillElement.label;
            skillElementField.className = this._view.createElementClassName(skillElement);
            this._view.getElementById(skillPPFieldID).textContent = this._createPPLabel(activePokemon, index);
        });
    }
    
    _onRequestChangeMenu(info, playerID) {
        const setPokemonSkill = (skillNameFieldID, skillPPFieldID, pokemon) => {
            const skillNameField = this._view.getAppendableField(skillNameFieldID);
            const skillPPField = this._view.getAppendableField(skillPPFieldID);
            pokemon.skillList.forEach((skill, index) => {
                skillNameField.appendChild(this._view.createSpanTag(skill.name));
                skillPPField.appendChild(this._view.createSpanTag(this._createPPLabel(pokemon, index)));
            });
        };
        info.getParty(playerID).forEachSelected((pokemon, index) => {
            const imageID = `party-icon-player-pokemon-${index}`;
            const itemID = `party-icon-player-pokemon-item-${index}`;
            const statusAilmentID = `party-player-pokemon-status-ailment-${index}`;
            const elementFieldID = `party-player-pokemon-element-${index}`;
            const skillNameFieldID = `party-player-pokemon-skill-name-${index}`;
            const skillPPFieldID = `party-player-pokemon-skill-pp-${index}`;
            // TODO 画像リソース
            this._view.getElementById(imageID).src = `../image/pokemon/${('0000' + pokemon.pokemonID).slice(-4)}.png`;
            // TODO アイテム画像
            this._view.getElementById(itemID).src = '../image/item/item-blank.png';
            this._view.getElementById(statusAilmentID).textContent = pokemon.statusAilment.label;
            this._setPokemonElement(elementFieldID, pokemon);
            setPokemonSkill(skillNameFieldID, skillPPFieldID, pokemon);
            
            const percentage = Math.ceil(pokemon.activeH / pokemon.maxH * 100);
            this._view.getElementById(`party-player-pokemon-hp-${index}`).style.width = `${percentage}%`;
            this._view.getElementById(`party-player-pokemon-hp-count-${index}`).textContent = pokemon.activeH;
        });
    }
    
    _onUpdateActivePokemon(info, playerID) {
        const leftSide = info.isMainPlayer(playerID);
        const playerLabel = leftSide ? 'player' : 'opponent';
        const activePokemon = info.getActivePokemon(playerID);
        const activePokemonIconID = `icon-${playerLabel}-active-pokemon`;
        const nameID = `${playerLabel}-active-pokemon-name`;
        const itemID = `${playerLabel}-active-pokemon-item`;
        const statusAilmentID = `${playerLabel}-active-pokemon-status-ailment`;
        const elementFieldID = `${playerLabel}-active-pokemon-element`;
        this._view.getElementById(nameID).textContent = activePokemon.name;
        this._view.getElementById(itemID).src = '../image/item/item-blank.png';
        this._view.getElementById(statusAilmentID).textContent = activePokemon.statusAilment.label;
        this._setPokemonElement(elementFieldID, activePokemon);
        this._view.getElementById(activePokemonIconID).src = `../image/pokemon/${('0000' + activePokemon.pokemonID).slice(-4)}.png`;
        
        const percentage = Math.ceil(activePokemon.activeH / activePokemon.maxH * 100);
        this._view.getElementById(`${playerLabel}-active-pokemon-hp`).style.width = `${percentage}%`;
        if (leftSide) {
            this._view.getElementById(`player-active-pokemon-hp-count`).textContent = activePokemon.activeH;
        }
    }
    
    _setPokemonElement(elementFieldID, pokemon) {
        const elementField = this._view.getAppendableField(elementFieldID);
        const elementList = pokemon.elementList;
        if (elementList.length === 1) {
            elementList.push({
                key: 'NONE',
                label: '　',
            });
        }
        elementList.forEach((element) => {
            elementField.appendChild(this._view.createElementTag(element));
        });
    }
    
}

