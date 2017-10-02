/**
 * game-menu-controller-test.js
 */

import assert from 'assert';

import GameMenuController from './game-menu-controller';

import ConfirmEvent from '../../../event/confirm-event';
import SceneType from './scene-type';

import MockObserver from '../../../util/mock-observer';
import MockView from '../mock-view';



describe('GameMenuControllerTest', () => {
    
    describe('changeScene()', () => {
        
        it('Change to select scene.', () => {
            const scene = SceneType.SELECT;
            const view = createMockView();
            const observer = createMockObserver();
            const controller = createGameMenuController(view);
            controller.addObserver(observer);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 4);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'default-menu');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-menu');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'button-ok');
            checkDeactivetedButton(view.getElementByIdList[2].element);
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'button-back');
            checkActivetedButton(view.getElementByIdList[3].element, 'bound onClickSelectBackButton');
        });
        
        it('Change to battle scene.', () => {
            const scene = SceneType.BATTLE;
            const view = createMockView();
            const observer = createMockObserver();
            const controller = createGameMenuController(view);
            controller.addObserver(observer);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 2);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'default-menu');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-menu');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'inline');
        });
        
        it('Change to skill scene.', () => {
            const scene = SceneType.SKILL;
            const view = createMockView();
            const observer = createMockObserver();
            const controller = createGameMenuController(view);
            controller.addObserver(observer);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 4);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'default-menu');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-menu');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'button-ok');
            checkDeactivetedButton(view.getElementByIdList[2].element);
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'button-back');
            checkActivetedButton(view.getElementByIdList[3].element, 'bound onClickSkillBackButton');
        });
        
        it('Change to change scene.', () => {
            const scene = SceneType.CHANGE;
            const disableCancelButton = false;
            const view = createMockView();
            const observer = createMockObserver();
            const controller = createGameMenuController(view);
            controller.addObserver(observer);
            
            controller.changeScene(scene, undefined, disableCancelButton);
            
            assert.strictEqual(view.getElementByIdList.length, 4);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'default-menu');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-menu');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'button-ok');
            checkDeactivetedButton(view.getElementByIdList[2].element);
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'button-back');
            checkActivetedButton(view.getElementByIdList[3].element, 'bound onClickChangeBackButton');
        });
        
        it('Change to change scene with disable cancel button.', () => {
            const scene = SceneType.CHANGE;
            const disableCancelButton = true;
            const view = createMockView();
            const observer = createMockObserver();
            const controller = createGameMenuController(view);
            controller.addObserver(observer);
            
            controller.changeScene(scene, undefined, disableCancelButton);
            
            assert.strictEqual(view.getElementByIdList.length, 4);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'default-menu');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-menu');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'button-ok');
            checkDeactivetedButton(view.getElementByIdList[2].element);
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'button-back');
            checkDeactivetedButton(view.getElementByIdList[3].element);
        });
        
        it('Change to confirm scene.', () => {
            [ true, false ].forEach((disableOKButton) => {
                [ true, false ].forEach((disableCancelButton) => {
                    const scene = SceneType.CONFIRM;
                    const view = createMockView();
                    const observer = createMockObserver();
                    const controller = createGameMenuController(view);
                    controller.addObserver(observer);
                    
                    controller.changeScene(scene, disableOKButton, disableCancelButton);
                    
                    assert.strictEqual(view.getElementByIdList.length, 4);
                    assert.strictEqual(view.getElementByIdList[0].fieldID, 'default-menu');
                    assert.strictEqual(view.getElementByIdList[0].element.style.display, 'inline');
                    assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-menu');
                    assert.strictEqual(view.getElementByIdList[1].element.style.display, 'none');
                    assert.strictEqual(view.getElementByIdList[2].fieldID, 'button-ok');
                    if (disableOKButton) {
                        checkDeactivetedButton(view.getElementByIdList[2].element);
                    }
                    else {
                        checkActivetedButton(view.getElementByIdList[2].element, 'bound onClickConfirmOKButton');
                    }
                    assert.strictEqual(view.getElementByIdList[3].fieldID, 'button-back');
                    if (disableCancelButton) {
                        checkDeactivetedButton(view.getElementByIdList[3].element);
                    }
                    else {
                        checkActivetedButton(view.getElementByIdList[3].element, 'bound onClickConfirmBackButton');
                    }
                });
            });
        });
        
    });
    
    describe('initialize()', () => {
        const view = createMockView();
        const observer = createMockObserver();
        const controller = createGameMenuController(view);
        controller.addObserver(observer);
        
        controller.initialize();
        
        assert.strictEqual(view.getElementByIdList.length, 16);
        assert.strictEqual(view.getElementByIdList[0].fieldID, 'image-player-pokemon-0');
        assert.strictEqual(view.getElementByIdList[0].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[0].element.addEventListenerList[0].listener.name, 'bound onClickSelectTarget');
        assert.strictEqual(view.getElementByIdList[1].fieldID, 'image-player-pokemon-1');
        assert.strictEqual(view.getElementByIdList[1].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[1].element.addEventListenerList[0].listener.name, 'bound onClickSelectTarget');
        assert.strictEqual(view.getElementByIdList[2].fieldID, 'image-player-pokemon-2');
        assert.strictEqual(view.getElementByIdList[2].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[2].element.addEventListenerList[0].listener.name, 'bound onClickSelectTarget');
        assert.strictEqual(view.getElementByIdList[3].fieldID, 'image-player-pokemon-3');
        assert.strictEqual(view.getElementByIdList[3].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[3].element.addEventListenerList[0].listener.name, 'bound onClickSelectTarget');
        assert.strictEqual(view.getElementByIdList[4].fieldID, 'image-player-pokemon-4');
        assert.strictEqual(view.getElementByIdList[4].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[4].element.addEventListenerList[0].listener.name, 'bound onClickSelectTarget');
        assert.strictEqual(view.getElementByIdList[5].fieldID, 'image-player-pokemon-5');
        assert.strictEqual(view.getElementByIdList[5].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[5].element.addEventListenerList[0].listener.name, 'bound onClickSelectTarget');
        assert.strictEqual(view.getElementByIdList[6].fieldID, 'frame-skill-0');
        assert.strictEqual(view.getElementByIdList[6].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[6].element.addEventListenerList[0].listener.name, 'bound onClickSkillFrame');
        assert.strictEqual(view.getElementByIdList[7].fieldID, 'frame-skill-1');
        assert.strictEqual(view.getElementByIdList[7].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[7].element.addEventListenerList[0].listener.name, 'bound onClickSkillFrame');
        assert.strictEqual(view.getElementByIdList[8].fieldID, 'frame-skill-2');
        assert.strictEqual(view.getElementByIdList[8].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[8].element.addEventListenerList[0].listener.name, 'bound onClickSkillFrame');
        assert.strictEqual(view.getElementByIdList[9].fieldID, 'frame-skill-3');
        assert.strictEqual(view.getElementByIdList[9].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[9].element.addEventListenerList[0].listener.name, 'bound onClickSkillFrame');
        assert.strictEqual(view.getElementByIdList[10].fieldID, 'frame-pokemon-0');
        assert.strictEqual(view.getElementByIdList[10].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[10].element.addEventListenerList[0].listener.name, 'bound onClickChangeFrame');
        assert.strictEqual(view.getElementByIdList[11].fieldID, 'frame-pokemon-1');
        assert.strictEqual(view.getElementByIdList[11].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[11].element.addEventListenerList[0].listener.name, 'bound onClickChangeFrame');
        assert.strictEqual(view.getElementByIdList[12].fieldID, 'frame-pokemon-2');
        assert.strictEqual(view.getElementByIdList[12].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[12].element.addEventListenerList[0].listener.name, 'bound onClickChangeFrame');
        assert.strictEqual(view.getElementByIdList[13].fieldID, 'button-skill');
        assert.strictEqual(view.getElementByIdList[13].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[13].element.addEventListenerList[0].listener.name, 'bound onClickBattleSkillButton');
        assert.strictEqual(view.getElementByIdList[14].fieldID, 'button-change');
        assert.strictEqual(view.getElementByIdList[14].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[14].element.addEventListenerList[0].listener.name, 'bound onClickBattleChangeButton');
        assert.strictEqual(view.getElementByIdList[15].fieldID, 'button-resign');
        assert.strictEqual(view.getElementByIdList[15].element.addEventListenerList.length, 1);
        assert.strictEqual(view.getElementByIdList[15].element.addEventListenerList[0].listener.name, 'bound onClickBattleResignButton');
    });
    
    describe('onConfirmCancel()', () => {
        const view = createMockView();
        const observer = createMockObserver();
        const controller = createGameMenuController(view);
        controller.addObserver(observer);
        
        // controller.onConfirmCancel();
    });
    
    
    
    function checkActivetedButton(element, listenerName) {
        assert.strictEqual(element.className, 'button');
        assert.strictEqual(element.addEventListenerList.length, 1);
        assert.strictEqual(element.addEventListenerList[0].listener.name, listenerName);
    }
    
    function checkDeactivetedButton(element) {
        assert.strictEqual(element.className, 'button button-disable');
        assert.strictEqual(element.addEventListenerList.length, 0);
    }
    
    function createGameMenuController(view) {
        return new GameMenuController(view);
    }
    
    function createMockObserver() {
        return new MockObserver();
    }
    
    function createMockView() {
        return new MockView();
    }
    
});
