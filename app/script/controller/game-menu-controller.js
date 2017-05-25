/**
 * game-menu-controller.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilObservable = require('../util/observable');

var _utilObservable2 = _interopRequireDefault(_utilObservable);

var _eventConfirmType = require('../event/confirm-type');

var _eventConfirmType2 = _interopRequireDefault(_eventConfirmType);

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

var GameMenuController = (function (_Observable) {
    _inherits(GameMenuController, _Observable);

    function GameMenuController(view) {
        _classCallCheck(this, GameMenuController);

        _get(Object.getPrototypeOf(GameMenuController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._confirmType = _eventConfirmType2['default'].NONE;
    }

    _createClass(GameMenuController, [{
        key: 'changeScene',
        value: function changeScene(scene) {
            var disableOKButton = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
            var disableCancelButton = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            switch (scene) {
                case _sceneType2['default'].SELECT:
                    this._changeToSelectScene();
                    break;
                case _sceneType2['default'].BATTLE:
                    this._changeToBattleScene();
                    break;
                case _sceneType2['default'].SKILL:
                    this._changeToSkillScene();
                    break;
                case _sceneType2['default'].CHANGE:
                    this._changeToChangeScene();
                    break;
                case _sceneType2['default'].CONFIRM:
                    this._changeToConfirmScene(disableOKButton, disableCancelButton);
                    break;
                default:
                    throw new Error('Unknown scene : ' + scene);
            }
        }
    }, {
        key: 'onConfirmCancel',
        value: function onConfirmCancel(confirmType) {
            switch (confirmType) {
                case _eventConfirmType2['default'].RESIGN:
                    this._confirmType = _eventConfirmType2['default'].NONE;
                    this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
                    break;
                case _eventConfirmType2['default'].GAME_SET:
                    // do nothing
                    break;
                default:
                    throw new Error('Unknown confirm type : ' + confirmType);
            }
        }
    }, {
        key: 'onConfirmOK',
        value: function onConfirmOK(confirmType) {
            switch (confirmType) {
                case _eventConfirmType2['default'].RESIGN:
                    this._confirmType = _eventConfirmType2['default'].GAME_SET;
                    this._notifyAllObserver(_eventEvent2['default'].TO_CONFIRM_SCENE, false, true);
                    break;
                case _eventConfirmType2['default'].GAME_SET:
                    this._view.location.href = './title.html';
                    break;
                default:
                    throw new Error('Unknown confirm type : ' + confirmType);
            }
        }
    }, {
        key: 'onClickBattleChangeButton',
        value: function onClickBattleChangeButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_CHANGE_SCENE);
        }
    }, {
        key: 'onClickBattleResignButton',
        value: function onClickBattleResignButton() {
            this._confirmType = _eventConfirmType2['default'].RESIGN;
            this._notifyAllObserver(_eventEvent2['default'].TO_CONFIRM_SCENE);
        }
    }, {
        key: 'onClickBattleSkillButton',
        value: function onClickBattleSkillButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_SKILL_SCENE);
        }
    }, {
        key: 'onClickChangeBackButton',
        value: function onClickChangeBackButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickChangeOKButton',
        value: function onClickChangeOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickConfirmBackButton',
        value: function onClickConfirmBackButton() {
            this._notifyAllObserver(_eventEvent2['default'].CONFIRM_CANCEL);
        }
    }, {
        key: 'onClickConfirmOKButton',
        value: function onClickConfirmOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].CONFIRM_OK);
        }
    }, {
        key: 'onClickSelectBackButton',
        value: function onClickSelectBackButton() {
            this._view.location.href = './title.html';
        }
    }, {
        key: 'onClickSelectOKButton',
        value: function onClickSelectOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickSkillBackButton',
        value: function onClickSkillBackButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickSkillOKButton',
        value: function onClickSkillOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: '_activateButton',
        value: function _activateButton(buttonID, listener) {
            this._view.getElementById(buttonID).className = 'button';
            this._view.getElementById(buttonID).addEventListener('click', listener);
        }
    }, {
        key: '_deactivateButton',
        value: function _deactivateButton(buttonID) {
            this._view.getElementById(buttonID).className = 'button button-disable';
            this._removeAllEventListener(this._view.getElementById(buttonID));
        }
    }, {
        key: '_changeToBattleScene',
        value: function _changeToBattleScene() {
            this._view.getElementById('default-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'inline';
            this._view.getElementById('button-skill').addEventListener('click', this.onClickBattleSkillButton.bind(this));
            this._view.getElementById('button-change').addEventListener('click', this.onClickBattleChangeButton.bind(this));
            this._view.getElementById('button-resign').addEventListener('click', this.onClickBattleResignButton.bind(this));
        }
    }, {
        key: '_changeToChangeScene',
        value: function _changeToChangeScene() {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._deactivateButton('button-ok');
            this._activateButton('button-back', this.onClickChangeBackButton.bind(this));
        }
    }, {
        key: '_changeToConfirmScene',
        value: function _changeToConfirmScene(disableOKButton, disableCancelButton) {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            if (disableOKButton) {
                this._deactivateButton('button-ok');
            } else {
                this._activateButton('button-ok', this.onClickConfirmOKButton.bind(this));
            }
            if (disableCancelButton) {
                this._deactivateButton('button-back');
            } else {
                this._activateButton('button-back', this.onClickConfirmBackButton.bind(this));
            }
        }
    }, {
        key: '_changeToSelectScene',
        value: function _changeToSelectScene() {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._deactivateButton('button-ok');
            this._activateButton('button-back', this.onClickSelectBackButton.bind(this));

            // デバッグ用に暫定でボタンを有効化
            this._view.getElementById('button-ok').addEventListener('click', this.onClickSelectOKButton.bind(this));
        }
    }, {
        key: '_changeToSkillScene',
        value: function _changeToSkillScene() {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._deactivateButton('button-ok');
            this._activateButton('button-back', this.onClickSkillBackButton.bind(this));
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event) {
            var disableOKButton = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            var disableCancelButton = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            this._removeAllEventListener(this._view.getElementById('button-ok'));
            this._removeAllEventListener(this._view.getElementById('button-back'));
            this._removeAllEventListener(this._view.getElementById('button-skill'));
            this._removeAllEventListener(this._view.getElementById('button-change'));
            this._removeAllEventListener(this._view.getElementById('button-resign'));
            this.notifyAllObserver({ event: event, disableOKButton: disableOKButton, disableCancelButton: disableCancelButton });
        }
    }, {
        key: '_removeAllEventListener',
        value: function _removeAllEventListener(element) {
            var parent = element.parentNode;
            parent.removeChild(element);
            parent.appendChild(element.cloneNode(true));
        }
    }, {
        key: 'confirmType',
        get: function get() {
            return this._confirmType;
        }
    }]);

    return GameMenuController;
})(_utilObservable2['default']);

exports['default'] = GameMenuController;
module.exports = exports['default'];