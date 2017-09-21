/**
 * game-scene-controller-test.js
 */

import assert from 'assert';

import GameSceneController from './game-scene-controller';

import SceneType from './scene-type';

import MockView from '../mock-view';



describe('GameSceneControllerTest', () => {
    
    describe('changeScene()', () => {
        
        it('Change to select scene.', () => {
            const scene = SceneType.SELECT;
            const view = createMockView();
            const controller = createGameMenuController(view);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 6);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'select-info');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-info');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'skill-info');
            assert.strictEqual(view.getElementByIdList[2].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'change-menu');
            assert.strictEqual(view.getElementByIdList[3].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[4].fieldID, 'info-field');
            assert.strictEqual(view.getElementByIdList[4].element.style.height, '380px');
            assert.strictEqual(view.getElementByIdList[4].element.style['max-height'], '380px');
            assert.strictEqual(view.getElementByIdList[4].element.style['min-height'], '380px');
            assert.strictEqual(view.getElementByIdList[5].fieldID, 'text-message');
            assert.strictEqual(view.getElementByIdList[5].element.style.height, '180px');
            assert.strictEqual(view.getElementByIdList[5].element.style['max-height'], '180px');
            assert.strictEqual(view.getElementByIdList[5].element.style['min-height'], '180px');
        });
        
        it('Change to battle scene.', () => {
            const scene = SceneType.BATTLE;
            const view = createMockView();
            const controller = createGameMenuController(view);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 6);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'select-info');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-info');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'skill-info');
            assert.strictEqual(view.getElementByIdList[2].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'change-menu');
            assert.strictEqual(view.getElementByIdList[3].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[4].fieldID, 'info-field');
            assert.strictEqual(view.getElementByIdList[4].element.style.height, '200px');
            assert.strictEqual(view.getElementByIdList[4].element.style['max-height'], '200px');
            assert.strictEqual(view.getElementByIdList[4].element.style['min-height'], '200px');
            assert.strictEqual(view.getElementByIdList[5].fieldID, 'text-message');
            assert.strictEqual(view.getElementByIdList[5].element.style.height, '360px');
            assert.strictEqual(view.getElementByIdList[5].element.style['max-height'], '360px');
            assert.strictEqual(view.getElementByIdList[5].element.style['min-height'], '360px');
        });
        
        it('Change to skill scene.', () => {
            const scene = SceneType.SKILL;
            const view = createMockView();
            const controller = createGameMenuController(view);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 6);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'select-info');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-info');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'skill-info');
            assert.strictEqual(view.getElementByIdList[2].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'change-menu');
            assert.strictEqual(view.getElementByIdList[3].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[4].fieldID, 'info-field');
            assert.strictEqual(view.getElementByIdList[4].element.style.height, '460px');
            assert.strictEqual(view.getElementByIdList[4].element.style['max-height'], '460px');
            assert.strictEqual(view.getElementByIdList[4].element.style['min-height'], '460px');
            assert.strictEqual(view.getElementByIdList[5].fieldID, 'text-message');
            assert.strictEqual(view.getElementByIdList[5].element.style.height, '100px');
            assert.strictEqual(view.getElementByIdList[5].element.style['max-height'], '100px');
            assert.strictEqual(view.getElementByIdList[5].element.style['min-height'], '100px');
        });
        
        it('Change to change scene.', () => {
            const scene = SceneType.CHANGE;
            const view = createMockView();
            const controller = createGameMenuController(view);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 6);
            assert.strictEqual(view.getElementByIdList[0].fieldID, 'select-info');
            assert.strictEqual(view.getElementByIdList[0].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[1].fieldID, 'battle-info');
            assert.strictEqual(view.getElementByIdList[1].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[2].fieldID, 'skill-info');
            assert.strictEqual(view.getElementByIdList[2].element.style.display, 'none');
            assert.strictEqual(view.getElementByIdList[3].fieldID, 'change-menu');
            assert.strictEqual(view.getElementByIdList[3].element.style.display, 'inline');
            assert.strictEqual(view.getElementByIdList[4].fieldID, 'info-field');
            assert.strictEqual(view.getElementByIdList[4].element.style.height, '460px');
            assert.strictEqual(view.getElementByIdList[4].element.style['max-height'], '460px');
            assert.strictEqual(view.getElementByIdList[4].element.style['min-height'], '460px');
            assert.strictEqual(view.getElementByIdList[5].fieldID, 'text-message');
            assert.strictEqual(view.getElementByIdList[5].element.style.height, '100px');
            assert.strictEqual(view.getElementByIdList[5].element.style['max-height'], '100px');
            assert.strictEqual(view.getElementByIdList[5].element.style['min-height'], '100px');
        });
        
        it('Change to confirm scene.', () => {
            const scene = SceneType.CONFIRM;
            const view = createMockView();
            const controller = createGameSceneController(view);
            
            controller.changeScene(scene);
            
            assert.strictEqual(view.getElementByIdList.length, 0);
        });
        
    });
    
    
    
    function createGameSceneController(view) {
        return new GameSceneController(view);
    }
    
    function createMockView() {
        return new MockView();
    }
    
});
