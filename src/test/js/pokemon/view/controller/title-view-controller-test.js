/**
 * title-view-controller-test.js
 */

import assert from 'assert';

import TitleViewController from './title-view-controller';

import MockView from '../mock-view';



describe('TitleViewControllerTest', () => {
    
    describe('initialize()', () => {
            
            it('Initialize.', () => {
                const view = createMockView();
                const controller = createTitleViewController(view);
                
                controller.initialize();
                
                assert.strictEqual(view.getElementByIdList.length, 2);
                assert.strictEqual(view.getElementByIdList[0].fieldID, 'button-battle');
                assert.strictEqual(view.getElementByIdList[0].element.addEventListenerList.length, 1);
                assert.strictEqual(view.getElementByIdList[0].element.addEventListenerList[0].listener.name, 'bound onClickBattleButton');
                assert.strictEqual(view.getElementByIdList[1].fieldID, 'button-edit');
                assert.strictEqual(view.getElementByIdList[1].element.addEventListenerList.length, 1);
                assert.strictEqual(view.getElementByIdList[1].element.addEventListenerList[0].listener.name, 'onClickEditButton');
            });
            
    });
    
    describe('onClickBattleButton()', () => {
            
            it('Battle button.', () => {
                const view = createMockView();
                const controller = createTitleViewController(view);
                
                controller.onClickBattleButton();
                
                assert.strictEqual(view.location.href, './battle.html');
            });
            
    });
    
    describe('onClickEditButton()', () => {
            
            it('Edit button.', () => {
                const view = createMockView();
                const controller = createTitleViewController(view);
                
                // controller.onClickEditButton();
                
                // TODO Edit button
            });
            
    });
    
    
    
    function createMockView() {
        return new MockView();
    }
    
    function createTitleViewController(view) {
        return new TitleViewController(view);
    }
    
});
