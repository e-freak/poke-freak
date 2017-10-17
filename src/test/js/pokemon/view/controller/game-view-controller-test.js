/**
 * game-view-controller-test.js
 */

import assert from 'assert';

import GameViewController from './game-view-controller';

import ConfirmEvent from '../../event/confirm-event';
import GameEvent from '../../event/game-event';
import SceneType from './scene-type';
import UserEvent from '../../../event/user-event';

import MockGameMaster from '../../mock-game-master';
import MockGameMenuController from './mock-game-menu-controller';
import MockGameSceneController from './mock-game-scene-controller';
import MockObserver from '../../../util/mock-observer';
import MockView from '../mock-view';



describe('GameViewControllerTest', () => {
    
    describe('initialize()', () => {
        
        it('Initialize.', () => {
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            
            controller.initialize();
            
            assert.strictEqual(controller._menu.initializeCount, 1);
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.SELECT);
            assert.ok(controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(!controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.SELECT);
            assert.strictEqual(controller._master.initializeList.length, 1);
            assert.strictEqual(controller._master.initializeList[0].playerName, 'プレイヤー');
            assert.strictEqual(controller._master.initializeList[0].opponentName, '対戦相手');
            assert.strictEqual(controller._master.readyList.length, 1);
            assert.strictEqual(Object.keys(controller._master.readyList[0].playerResource).length, 6);
            assert.strictEqual(Object.keys(controller._master.readyList[0].opponentResource).length, 6);
        });
        
    });
    
    describe('update()', () => {
        
        it('TO_SELECT_SCENE', () => {
            const event = UserEvent.TO_SELECT_SCENE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.SELECT);
            assert.ok(controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(!controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.SELECT);
        });
        
        it('TO_BATTLE_SCENE', () => {
            const event = UserEvent.TO_BATTLE_SCENE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.BATTLE);
            assert.ok(!controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(!controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.BATTLE);
        });
        
        it('TO_SKILL_SCENE', () => {
            const event = UserEvent.TO_SKILL_SCENE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.SKILL);
            assert.ok(controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(!controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.SKILL);
            // assert.strictEqual(controller._master.requestSkillMenuList.length, 1);
            // assert.strictEqual(controller._master.requestSkillMenuList[0].playerID.value, controller._master.PLAYER_ID.value);
            // assert.ok(controller._master.requestSkillMenuList[0].cancelable);
        });
        
        it('TO_CHANGE_SCENE', () => {
            const event = UserEvent.TO_CHANGE_SCENE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.CHANGE);
            assert.ok(controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(!controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.CHANGE);
            // assert.strictEqual(controller._master.requestChangeMenuList.length, 1);
            // assert.strictEqual(controller._master.requestChangeMenuList[0].playerID.value, controller._master.PLAYER_ID.value);
            // assert.ok(controller._master.requestChangeMenuList[0].cancelable);
        });
        
        it('TO_CONFIRM_SCENE', () => {
            [ true, false ].forEach((disableOKButton) => {
                [ true, false ].forEach((disableCancelButton) => {
                    const event = UserEvent.TO_CONFIRM_SCENE;
                    const view = createMockView();
                    const controller = createGameViewController(view);
                    controller._scene = createMockGameSceneController();
                    controller._menu = createMockGameMenuController();
                    controller._announcer = createMockObserver();
                    controller._master = createMockGameMaster();
                    const param = { event: event, disableOKButton: disableOKButton, disableCancelButton: disableCancelButton };
                    
                    controller.update(controller._menu, param);
                    
                    assert.strictEqual(controller._menu.changeSceneList.length, 1);
                    assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.CONFIRM);
                    assert.strictEqual(controller._menu.changeSceneList[0].disableOKButton, disableOKButton);
                    assert.strictEqual(controller._menu.changeSceneList[0].disableCancelButton, disableCancelButton);
                    assert.strictEqual(controller._scene.changeSceneList.length, 1);
                    assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.CONFIRM);
                });
            });
        });
        
        it('CONFIRM_OK', () => {
            Object.values(ConfirmEvent).forEach((confirmEvent) => {
                const event = UserEvent.CONFIRM_OK;
                const view = createMockView();
                const controller = createGameViewController(view);
                controller._scene = createMockGameSceneController();
                controller._menu = createMockGameMenuController();
                controller._announcer = createMockObserver();
                controller._master = createMockGameMaster();
                controller._menu._confirmEvent = confirmEvent;
                const param = { event: event };
                
                controller.update(controller._menu, param);
                
                assert.strictEqual(controller._menu.onConfirmOKList.length, 1);
                assert.strictEqual(controller._menu.onConfirmOKList[0].confirmEvent, controller._menu.confirmEvent);
            });
        });
        
        it('CONFIRM_CANCEL', () => {
            Object.values(ConfirmEvent).forEach((confirmEvent) => {
                const event = UserEvent.CONFIRM_CANCEL;
                const view = createMockView();
                const controller = createGameViewController(view);
                controller._scene = createMockGameSceneController();
                controller._menu = createMockGameMenuController();
                controller._announcer = createMockObserver();
                controller._master = createMockGameMaster();
                controller._menu._confirmEvent = confirmEvent;
                const param = { event: event };
                
                controller.update(controller._menu, param);
                
                assert.strictEqual(controller._menu.onConfirmCancelList.length, 1);
                assert.strictEqual(controller._menu.onConfirmCancelList[0].confirmEvent, controller._menu.confirmEvent);
            });
        });
        
        it('START_BATTLE', () => {
            const event = UserEvent.START_BATTLE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const selectedPokemonIndexList = [ 3, 1, 5 ];
            const param = { event: event, value: selectedPokemonIndexList };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.BATTLE);
            assert.ok(!controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(!controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.BATTLE);
            assert.strictEqual(controller._master.selectList.length, 2);
            assert.strictEqual(controller._master.selectList[0].playerID.value, controller._master.OPPONENT_ID.value);
            assert.strictEqual(controller._master.selectList[0].selectedPokemonIndexList.length, 3);
            assert.strictEqual(controller._master.selectList[1].playerID.value, controller._master.PLAYER_ID.value);
            assert.deepStrictEqual(controller._master.selectList[1].selectedPokemonIndexList, selectedPokemonIndexList);
        });
        
        it('SELECT_SKILL', () => {
            const event = UserEvent.SELECT_SKILL;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const targetSkillIndex = 2;
            const param = { event: event, value: targetSkillIndex };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._master.skillList.length, 2);
            assert.strictEqual(controller._master.skillList[0].playerID.value, controller._master.PLAYER_ID.value);
            assert.strictEqual(controller._master.skillList[0].targetSkillIndex, targetSkillIndex);
            assert.strictEqual(controller._master.skillList[1].playerID.value, controller._master.OPPONENT_ID.value);
        });
        
        it('SELECT_CHANGE - defalut.', () => {
            const event = UserEvent.SELECT_CHANGE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const targetPokemonIndex = 2;
            const param = { event: event, value: targetPokemonIndex };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, undefined);
            assert.strictEqual(controller._master.changeList.length, 1);
            assert.strictEqual(controller._master.changeList[0].playerID.value, controller._master.PLAYER_ID.value);
            assert.strictEqual(controller._master.changeList[0].targetPokemonIndex, targetPokemonIndex);
            assert.strictEqual(controller._master.skillList.length, 1);
            assert.strictEqual(controller._master.skillList[0].playerID.value, controller._master.OPPONENT_ID.value);
        });
        
        it('SELECT_CHANGE - by skill.', () => {
            const event = UserEvent.SELECT_CHANGE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            controller._gameEvent = GameEvent.CHANGE_BY_SKILL;
            const targetPokemonIndex = 2;
            const param = { event: event, value: targetPokemonIndex };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, undefined);
            assert.strictEqual(controller._master.changeBySkillList.length, 1);
            assert.strictEqual(controller._master.changeBySkillList[0].playerID.value, controller._master.PLAYER_ID.value);
            assert.strictEqual(controller._master.changeBySkillList[0].targetPokemonIndex, targetPokemonIndex);
        });
        
        it('SELECT_CHANGE - by baton.', () => {
            const event = UserEvent.SELECT_CHANGE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            controller._gameEvent = GameEvent.CHANGE_BY_BATON;
            const targetPokemonIndex = 2;
            const param = { event: event, value: targetPokemonIndex };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, undefined);
            assert.strictEqual(controller._master.changeByBatonList.length, 1);
            assert.strictEqual(controller._master.changeByBatonList[0].playerID.value, controller._master.PLAYER_ID.value);
            assert.strictEqual(controller._master.changeByBatonList[0].targetPokemonIndex, targetPokemonIndex);
        });
        
        it('SELECT_CHANGE - for next.', () => {
            const event = UserEvent.SELECT_CHANGE;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            controller._gameEvent = GameEvent.CHANGE_FOR_NEXT;
            const targetPokemonIndex = 2;
            const param = { event: event, value: targetPokemonIndex };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, undefined);
            assert.strictEqual(controller._master.nextList.length, 1);
            assert.strictEqual(controller._master.nextList[0].playerID.value, controller._master.PLAYER_ID.value);
            assert.strictEqual(controller._master.nextList[0].targetPokemonIndex, targetPokemonIndex);
        });
        
        it('SELECT_RESIGN_CHECK', () => {
            const event = UserEvent.SELECT_RESIGN_CHECK;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event };
            
            controller.update(controller._menu, param);
            
            // assert.strictEqual(controller._master.confirmResignList.length, 1);
            // assert.strictEqual(controller._master.confirmResignList[0].playerID.value, controller._master.PLAYER_ID.value);
        });
        
        it('SELECT_RESIGN_OK', () => {
            const event = UserEvent.SELECT_RESIGN_OK;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._master.resignList.length, 1);
            assert.strictEqual(controller._master.resignList[0].playerID.value, controller._master.PLAYER_ID.value);
            assert.strictEqual(controller._master.skillList.length, 1);
            assert.strictEqual(controller._master.skillList[0].playerID.value, controller._master.OPPONENT_ID.value);
        });
        
        it('CHANGE_BY_SKILL - player.', () => {
            const event = GameEvent.CHANGE_BY_SKILL;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event, playerID: controller._master.PLAYER_ID };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, event);
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.CHANGE);
            assert.ok(controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.CHANGE);
            // assert.strictEqual(controller._master.requestChangeMenuList.length, 1);
            // assert.strictEqual(controller._master.requestChangeMenuList[0].playerID.value, controller._master.PLAYER_ID.value);
            // assert.ok(!controller._master.requestChangeMenuList[0].cancelable);
        });
        
        it('CHANGE_BY_SKILL - opponent.', () => {
            const event = GameEvent.CHANGE_BY_SKILL;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event, playerID: controller._master.OPPONENT_ID };
            
            // controller.update(controller._menu, param);
            
            // TODO
        });
        
        it('CHANGE_BY_BATON - player.', () => {
            const event = GameEvent.CHANGE_BY_BATON;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event, playerID: controller._master.PLAYER_ID };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, event);
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.CHANGE);
            assert.ok(controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.CHANGE);
            // assert.strictEqual(controller._master.requestChangeMenuList.length, 1);
            // assert.strictEqual(controller._master.requestChangeMenuList[0].playerID.value, controller._master.PLAYER_ID.value);
            // assert.ok(!controller._master.requestChangeMenuList[0].cancelable);
        });
        
        it('CHANGE_BY_BATON - opponent.', () => {
            const event = GameEvent.CHANGE_BY_BATON;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event, playerID: controller._master.OPPONENT_ID };
            
            // controller.update(controller._menu, param);
            
            // TODO
        });
        
        it('CHANGE_FOR_NEXT - player.', () => {
            const event = GameEvent.CHANGE_FOR_NEXT;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event, playerID: controller._master.PLAYER_ID };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, event);
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.CHANGE);
            assert.ok(controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.CHANGE);
            // assert.strictEqual(controller._master.requestChangeMenuList.length, 1);
            // assert.strictEqual(controller._master.requestChangeMenuList[0].playerID.value, controller._master.PLAYER_ID.value);
            // assert.ok(!controller._master.requestChangeMenuList[0].cancelable);
        });
        
        it('CHANGE_FOR_NEXT - opponent.', () => {
            const event = GameEvent.CHANGE_FOR_NEXT;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event, playerID: controller._master.OPPONENT_ID };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._gameEvent, undefined);
            assert.strictEqual(controller._master.nextList.length, 1);
            assert.strictEqual(controller._master.nextList[0].playerID.value, controller._master.OPPONENT_ID.value);
            assert.strictEqual(controller._master.nextList[0].targetPokemonIndex, controller._opponentPokemonIndex);
        });
        
        it('GAME_SET.', () => {
            const event = GameEvent.GAME_SET;
            const view = createMockView();
            const controller = createGameViewController(view);
            controller._scene = createMockGameSceneController();
            controller._menu = createMockGameMenuController();
            controller._announcer = createMockObserver();
            controller._master = createMockGameMaster();
            const param = { event: event, playerID: controller._master.OPPONENT_ID };
            
            controller.update(controller._menu, param);
            
            assert.strictEqual(controller._menu.confirmEvent, ConfirmEvent.GAME_SET);
            assert.strictEqual(controller._menu.changeSceneList.length, 1);
            assert.strictEqual(controller._menu.changeSceneList[0].scene, SceneType.CONFIRM);
            assert.ok(!controller._menu.changeSceneList[0].disableOKButton);
            assert.ok(controller._menu.changeSceneList[0].disableCancelButton);
            assert.strictEqual(controller._scene.changeSceneList.length, 1);
            assert.strictEqual(controller._scene.changeSceneList[0].scene, SceneType.CONFIRM);
        });
        
    });
    
    
    
    function createGameViewController(view) {
        return new GameViewController(view);
    }
    
    function createMockGameMaster() {
        return new MockGameMaster();
    }
    
    function createMockGameMenuController() {
        return new MockGameMenuController();
    }
    
    function createMockGameSceneController() {
        return new MockGameSceneController();
    }
    
    function createMockObserver() {
        return new MockObserver();
    }
    
    function createMockView() {
        return new MockView();
    }
    
});
