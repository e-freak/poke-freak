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

var _get = function get(_x9, _x10, _x11) { var _again = true; _function: while (_again) { var object = _x9, property = _x10, receiver = _x11; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x9 = parent; _x10 = property; _x11 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilObservable = require('../util/observable');

var _utilObservable2 = _interopRequireDefault(_utilObservable);

var _eventConfirmType = require('../event/confirm-type');

var _eventConfirmType2 = _interopRequireDefault(_eventConfirmType);

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

var _eventUserEvent = require('../event/user-event');

var _eventUserEvent2 = _interopRequireDefault(_eventUserEvent);

var GameMenuController = (function (_Observable) {
    _inherits(GameMenuController, _Observable);

    function GameMenuController(view) {
        _classCallCheck(this, GameMenuController);

        _get(Object.getPrototypeOf(GameMenuController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._confirmType = _eventConfirmType2['default'].NONE;
        this._selectedPokemonIndexList = [];
        this._selectedSkillIndex = undefined;
        this._selectedChangeIndex = undefined;
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
                    this._changeToChangeScene(disableCancelButton);
                    break;
                case _sceneType2['default'].CONFIRM:
                    this._changeToConfirmScene(disableOKButton, disableCancelButton);
                    break;
                default:
                    throw new Error('Unknown scene : ' + scene);
            }
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            for (var i = 0; i < 6; i++) {
                var frame = this._view.getElementById('image-player-pokemon-' + i);
                frame.addEventListener('click', this.onClickSelectTarget.bind(this, i));
            }
            for (var i = 0; i < 4; i++) {
                var frame = this._view.getElementById('frame-skill-' + i);
                frame.addEventListener('click', this.onClickSkillFrame.bind(this, i));
            }
            for (var i = 0; i < 3; i++) {
                var frame = this._view.getElementById('frame-pokemon-' + i);
                frame.addEventListener('click', this.onClickChangeFrame.bind(this, i));
            }
            this._view.getElementById('button-skill').addEventListener('click', this.onClickBattleSkillButton.bind(this));
            this._view.getElementById('button-change').addEventListener('click', this.onClickBattleChangeButton.bind(this));
            this._view.getElementById('button-resign').addEventListener('click', this.onClickBattleResignButton.bind(this));
        }
    }, {
        key: 'onConfirmCancel',
        value: function onConfirmCancel(confirmType) {
            switch (confirmType) {
                case _eventConfirmType2['default'].RESIGN:
                    this._confirmType = _eventConfirmType2['default'].NONE;
                    this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
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
                    this._notifyAllObserver(_eventUserEvent2['default'].SELECT_RESIGN_OK);
                    this._notifyAllObserver(_eventUserEvent2['default'].TO_CONFIRM_SCENE, undefined, false, true);
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
            this._notifyAllObserver(_eventUserEvent2['default'].TO_CHANGE_SCENE);
        }
    }, {
        key: 'onClickBattleResignButton',
        value: function onClickBattleResignButton() {
            this._confirmType = _eventConfirmType2['default'].RESIGN;
            this._notifyAllObserver(_eventUserEvent2['default'].SELECT_RESIGN_CHECK);
            this._notifyAllObserver(_eventUserEvent2['default'].TO_CONFIRM_SCENE);
        }
    }, {
        key: 'onClickBattleSkillButton',
        value: function onClickBattleSkillButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_SKILL_SCENE);
        }
    }, {
        key: 'onClickChangeBackButton',
        value: function onClickChangeBackButton() {
            this._unselectChange();
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickChangeFrame',
        value: function onClickChangeFrame(index) {
            if (this._selectedChangeIndex !== index) {
                this._unselectChange();
                this._selectChange(index);
                this._activateButton('button-ok', this.onClickChangeOKButton.bind(this));
            } else {
                this._unselectChange();
                this._deactivateButton('button-ok');
            }
        }
    }, {
        key: 'onClickChangeOKButton',
        value: function onClickChangeOKButton() {
            var index = this._unselectChange();
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
            this._notifyAllObserver(_eventUserEvent2['default'].SELECT_CHANGE, index);
        }
    }, {
        key: 'onClickConfirmBackButton',
        value: function onClickConfirmBackButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].CONFIRM_CANCEL);
        }
    }, {
        key: 'onClickConfirmOKButton',
        value: function onClickConfirmOKButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].CONFIRM_OK);
        }
    }, {
        key: 'onClickSelectBackButton',
        value: function onClickSelectBackButton() {
            this._view.location.href = './title.html';
        }
    }, {
        key: 'onClickSelectOKButton',
        value: function onClickSelectOKButton() {
            var indexList = this._resetPokemonIndexList();
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
            // this._notifyAllObserver(UserEvent.XXX, indexList);
        }
    }, {
        key: 'onClickSelectTarget',
        value: function onClickSelectTarget(index) {
            var _this = this;

            if (!this._selectedPokemonIndexList.includes(index)) {
                if (this._selectedPokemonIndexList.length < 3) {
                    this._selectedPokemonIndexList.push(index);
                    var target = this._view.getElementById('image-player-pokemon-' + index);
                    target.className = 'player-pokemon image-pokemon pokemon-selected';
                }
            } else {
                this._selectedPokemonIndexList.some(function (value, i) {
                    if (value === index) {
                        _this._selectedPokemonIndexList.splice(i, 1);
                    }
                });
                var target = this._view.getElementById('image-player-pokemon-' + index);
                target.className = 'player-pokemon image-pokemon';
            }
            if (this._selectedPokemonIndexList.length === 3) {
                this._activateButton('button-ok', this.onClickSelectOKButton.bind(this));
            } else {
                this._deactivateButton('button-ok');
            }
        }
    }, {
        key: 'onClickSkillBackButton',
        value: function onClickSkillBackButton() {
            this._unselectSkill();
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickSkillFrame',
        value: function onClickSkillFrame(index) {
            if (this._selectedSkillIndex !== index) {
                this._unselectSkill();
                this._selectSkill(index);
                this._activateButton('button-ok', this.onClickSkillOKButton.bind(this));
            } else {
                this._unselectSkill();
                this._deactivateButton('button-ok');
            }
        }
    }, {
        key: 'onClickSkillOKButton',
        value: function onClickSkillOKButton() {
            var index = this._unselectSkill();
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
            this._notifyAllObserver(_eventUserEvent2['default'].SELECT_SKILL, index);
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
        }
    }, {
        key: '_changeToChangeScene',
        value: function _changeToChangeScene() {
            var disableCancelButton = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._deactivateButton('button-ok');
            if (disableCancelButton) {
                this._deactivateButton('button-back');
            } else {
                this._activateButton('button-back', this.onClickChangeBackButton.bind(this));
            }
        }
    }, {
        key: '_changeToConfirmScene',
        value: function _changeToConfirmScene() {
            var disableOKButton = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
            var disableCancelButton = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

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
            var value = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
            var disableOKButton = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
            var disableCancelButton = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

            this._removeAllEventListener(this._view.getElementById('button-ok'));
            this._removeAllEventListener(this._view.getElementById('button-back'));
            this.notifyAllObserver({ event: event, value: value, disableOKButton: disableOKButton, disableCancelButton: disableCancelButton });
        }
    }, {
        key: '_removeAllEventListener',
        value: function _removeAllEventListener(element) {
            var parent = element.parentNode;
            parent.removeChild(element);
            parent.appendChild(element.cloneNode(true));
        }
    }, {
        key: '_resetPokemonIndexList',
        value: function _resetPokemonIndexList() {
            try {
                return this._selectedPokemonIndexList;
            } finally {
                this._selectedPokemonIndexList = [];
            }
        }
    }, {
        key: '_resetChangeIndex',
        value: function _resetChangeIndex() {
            try {
                return this._selectedChangeIndex;
            } finally {
                this._selectedChangeIndex = undefined;
            }
        }
    }, {
        key: '_resetSkillIndex',
        value: function _resetSkillIndex() {
            try {
                return this._selectedSkillIndex;
            } finally {
                this._selectedSkillIndex = undefined;
            }
        }
    }, {
        key: '_selectChange',
        value: function _selectChange(index) {
            this._selectedChangeIndex = index;
            this._view.getElementById('frame-pokemon-' + index).style.borderColor = '#0000FF';
        }
    }, {
        key: '_selectSkill',
        value: function _selectSkill(index) {
            this._selectedSkillIndex = index;
            this._view.getElementById('frame-skill-' + index).style.borderColor = '#0000FF';
        }
    }, {
        key: '_unselectChange',
        value: function _unselectChange() {
            var index = this._resetChangeIndex();
            if (index !== undefined) {
                this._view.getElementById('frame-pokemon-' + index).style.borderColor = '#D0D0D0';
            }
            return index;
        }
    }, {
        key: '_unselectSkill',
        value: function _unselectSkill() {
            var index = this._resetSkillIndex();
            if (index !== undefined) {
                this._view.getElementById('frame-skill-' + index).style.borderColor = '#D0D0D0';
            }
            return index;
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