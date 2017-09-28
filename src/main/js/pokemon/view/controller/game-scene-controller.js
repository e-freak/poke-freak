/**
 * game-scene-controller.js
 * 
 * @author yuki
 */

import Observer from '../../../util/observer';

import ImageResource from '../../../resource/image-resource';
import SceneType from './scene-type';
import ViewWrapper from '../view-wrapper';

import UpdateEvent from '../../event/update-event';



export default class GameSceneController extends Observer {
    
    constructor(view) {
        super();
        this._view = this._createViewWrapper(view);
    }
    
    changeScene(scene, info, playerID) {
        switch (scene) {
        case SceneType.SELECT:
            this._changeToSelectScene(info, playerID);
            break;
        case SceneType.BATTLE:
            this._changeToBattleScene(info, playerID);
            break;
        case SceneType.SKILL:
            this._changeToSkillScene(info, playerID);
            break;
        case SceneType.CHANGE:
            this._changeToChangeScene(info, playerID);
            break;
        case SceneType.CONFIRM:
            // do nothing
            break;
        default:
            throw new Error(`Unknown scene : ${scene}`);
        }
    }
    
    initialize() {
    }
    
    update(target, param) {
        switch (param.event) {
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
    
    requestSelectedPokemonInfo(sourcePokemonList, selectedPokemonIndex = []) {
        const buffer = [];
        buffer.push('使用するポケモンを選んでください');
        selectedPokemonIndex.forEach((index, count) => {
            buffer.push(`${count + 1}： ${sourcePokemonList[index].label}`);
        });
        const textarea = this._view.getElementById('text-message');
        textarea.innerHTML = buffer.join('<br />');
    }
    
    requestChangeMenu(info, playerID) {
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
            this._view.getElementById(imageID).src = ImageResource.getPokemonImage(pokemon.pokemonID);
            this._view.getElementById(itemID).src = ImageResource.getItemImage(pokemon.item);
            this._view.getElementById(statusAilmentID).textContent = pokemon.statusAilment.label;
            this._setPokemonElement(elementFieldID, pokemon);
            setPokemonSkill(skillNameFieldID, skillPPFieldID, pokemon);
            
            const percentage = Math.ceil(pokemon.activeH / pokemon.maxH * 100);
            this._view.getElementById(`party-player-pokemon-hp-${index}`).style.width = `${percentage}%`;
            this._view.getElementById(`party-player-pokemon-hp-count-${index}`).textContent = pokemon.activeH;
        });
    }
    
    requestConfirmMessage(message) {
        const textarea = this._view.getElementById('text-message');
        textarea.innerHTML = message;
    }
    
    requestBattleInfo(info, playerID) {
        info.forEachPlayer((player) => {
            const targetID = player.playerID;
            const leftSide = targetID.value === playerID.value;
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
            this._view.getElementById(itemID).src = ImageResource.getItemImage(activePokemon.item);
            this._view.getElementById(statusAilmentID).textContent = activePokemon.statusAilment.label;
            this._setPokemonElement(elementFieldID, activePokemon);
            const partyField = this._view.getAppendableField(partyFieldID);
            const className = leftSide ? 'player-pokemon icon-pokemon' : 'icon-pokemon';
            info.getParty(targetID).forEachSelected((pokemon) => {
                partyField.appendChild(this._view.createImageTag(ImageResource.getPokemonImage(pokemon.pokemonID), className));
            });
            this._view.getElementById(activePokemonIconID).src = ImageResource.getPokemonImage(activePokemon.pokemonID);
        });
    }
    
    requestSelectMenu(info, playerID) {
        info.forEachPlayer((player) => {
            const targetID = player.playerID;
            const playerLabel = (targetID.value === playerID.value) ? 'player' : 'opponent';
            const playerNameID = `${playerLabel}-name`;
            this._view.getElementById(playerNameID).textContent = player.name;
            info.getParty(targetID).forEach((pokemon, index) => {
                const imageID = `image-${playerLabel}-pokemon-${index}`;
                this._view.getElementById(imageID).src = ImageResource.getPokemonImage(pokemon.pokemonID);
            });
        });
    }
    
    requestSkillMenu(info, playerID) {
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
    
    _changeFieldHeight(field, value) {
        field.style.height = `${value}px`;
        field.style['max-height'] = `${value}px`;
        field.style['min-height'] = `${value}px`;
    }
    
    _changeToBattleScene(info, playerID) {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 200);
        this._changeFieldHeight(this._view.getElementById('text-message'), 360);
        this.requestBattleInfo(info, playerID);
    }
    
    _changeToChangeScene(info, playerID) {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'inline';
        this._changeFieldHeight(this._view.getElementById('info-field'), 460);
        this._changeFieldHeight(this._view.getElementById('text-message'), 100);
        this.requestChangeMenu(info, playerID);
    }
    
    _changeToSelectScene(info, playerID) {
        this._view.getElementById('select-info').style.display = 'inline';
        this._view.getElementById('battle-info').style.display = 'none';
        this._view.getElementById('skill-info').style.display = 'none';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 380);
        this._changeFieldHeight(this._view.getElementById('text-message'), 180);
        this.requestSelectMenu(info, playerID);
    }
    
    _changeToSkillScene(info, playerID) {
        this._view.getElementById('select-info').style.display = 'none';
        this._view.getElementById('battle-info').style.display = 'inline';
        this._view.getElementById('skill-info').style.display = 'inline';
        this._view.getElementById('change-info').style.display = 'none';
        this._changeFieldHeight(this._view.getElementById('info-field'), 460);
        this._changeFieldHeight(this._view.getElementById('text-message'), 100);
        this.requestSkillMenu(info, playerID);
    }
    
    _createPPLabel(pokemon, skillIndex) {
        return `PP： ${('  ' + pokemon.getPP(skillIndex)).slice(-2)}`;
    }
    
    _createViewWrapper(view) {
        return new ViewWrapper(view);
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
        this._view.getElementById(itemID).src = ImageResource.getItemImage(activePokemon.item);
        this._view.getElementById(statusAilmentID).textContent = activePokemon.statusAilment.label;
        this._setPokemonElement(elementFieldID, activePokemon);
        this._view.getElementById(activePokemonIconID).src = ImageResource.getPokemonImage(activePokemon.pokemonID);
        
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

