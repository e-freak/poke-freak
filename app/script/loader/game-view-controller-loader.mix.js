(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../event/confirm-type":5,"../event/user-event":6,"../util/observable":41,"./scene-type":4}],2:[function(require,module,exports){
/**
 * game-scene-controller.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

var GameSceneController = (function () {
    function GameSceneController(view) {
        _classCallCheck(this, GameSceneController);

        this._view = view;
    }

    _createClass(GameSceneController, [{
        key: 'changeScene',
        value: function changeScene(scene) {
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
                    // do nothing
                    break;
                default:
                    throw new Error('Unknown scene : ' + scene);
            }
        }
    }, {
        key: '_changeFieldHeight',
        value: function _changeFieldHeight(field, value) {
            field.style.height = value + 'px';
            field.style['max-height'] = value + 'px';
            field.style['min-height'] = value + 'px';
        }
    }, {
        key: '_changeToBattleScene',
        value: function _changeToBattleScene() {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 200);
            this._changeFieldHeight(this._view.getElementById('text-message'), 360);
        }
    }, {
        key: '_changeToChangeScene',
        value: function _changeToChangeScene() {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'inline';
            this._changeFieldHeight(this._view.getElementById('info-field'), 460);
            this._changeFieldHeight(this._view.getElementById('text-message'), 100);
        }
    }, {
        key: '_changeToSelectScene',
        value: function _changeToSelectScene() {
            this._view.getElementById('select-info').style.display = 'inline';
            this._view.getElementById('battle-info').style.display = 'none';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 380);
            this._changeFieldHeight(this._view.getElementById('text-message'), 180);
        }
    }, {
        key: '_changeToSkillScene',
        value: function _changeToSkillScene() {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'inline';
            this._view.getElementById('change-info').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 460);
            this._changeFieldHeight(this._view.getElementById('text-message'), 100);
        }
    }]);

    return GameSceneController;
})();

exports['default'] = GameSceneController;
module.exports = exports['default'];
},{"./scene-type":4}],3:[function(require,module,exports){
/**
 * game-view-controller.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilObserver = require('../util/observer');

var _utilObserver2 = _interopRequireDefault(_utilObserver);

var _pokemonAnnouncerBrowserAnnouncer = require('../pokemon/announcer/browser-announcer');

var _pokemonAnnouncerBrowserAnnouncer2 = _interopRequireDefault(_pokemonAnnouncerBrowserAnnouncer);

var _pokemonEventGameEvent = require('../pokemon/event/game-event');

var _pokemonEventGameEvent2 = _interopRequireDefault(_pokemonEventGameEvent);

var _pokemonGameMaster = require('../pokemon/game-master');

var _pokemonGameMaster2 = _interopRequireDefault(_pokemonGameMaster);

var _gameMenuController = require('./game-menu-controller');

var _gameMenuController2 = _interopRequireDefault(_gameMenuController);

var _gameSceneController = require('./game-scene-controller');

var _gameSceneController2 = _interopRequireDefault(_gameSceneController);

var _pokemonDataSamplePartyList = require('../pokemon/data/sample-party-list');

var _pokemonDataSamplePartyList2 = _interopRequireDefault(_pokemonDataSamplePartyList);

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

var _eventUserEvent = require('../event/user-event');

var _eventUserEvent2 = _interopRequireDefault(_eventUserEvent);

var _pokemonPartyFactory = require('../pokemon/party-factory');

var _pokemonPartyFactory2 = _interopRequireDefault(_pokemonPartyFactory);

var GameViewController = (function (_Observer) {
    _inherits(GameViewController, _Observer);

    function GameViewController(view) {
        _classCallCheck(this, GameViewController);

        _get(Object.getPrototypeOf(GameViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._scene = this._createSceneController(view);
        this._menu = this._createMenuController(view);
        this._announcer = this._createAnnouncer(view);
        this._master = this._createGameMaster();
        this._gameEvent = undefined;
        this._menu.addObserver(this);
        this._menu.addObserver(this._announcer);
        this._master.addObserver(this);
        this._master.addObserver(this._announcer);

        var factory = new _pokemonPartyFactory2['default']();
        this._playerParty = factory.create(this._master.PLAYER_ID, _pokemonDataSamplePartyList2['default'][0]);
        this._opponentParty = factory.create(this._master.OPPONENT_ID, _pokemonDataSamplePartyList2['default'][1]);
        this._playerParty.select([0, 1, 2]);
        this._opponentParty.select([0, 1, 2]);
        this._started = false;
        this._opponentPokemonIndex = 0;
    }

    _createClass(GameViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._menu.initialize();
            this._changeScene(_sceneType2['default'].SELECT);
            this._master.initialize('プレイヤー', '対戦相手');
            this._master.ready(this._playerParty, this._opponentParty);
        }
    }, {
        key: 'update',
        value: function update(target, param) {
            switch (param.event) {
                case _eventUserEvent2['default'].TO_SELECT_SCENE:
                    this._changeScene(_sceneType2['default'].SELECT);
                    break;
                case _eventUserEvent2['default'].TO_BATTLE_SCENE:
                    this._changeScene(_sceneType2['default'].BATTLE);
                    if (!this._started) {
                        this._started = true;
                        this._master.start();
                    }
                    break;
                case _eventUserEvent2['default'].TO_SKILL_SCENE:
                    this._changeScene(_sceneType2['default'].SKILL);
                    this._master.requestSkillMenu(this._master.PLAYER_ID);
                    break;
                case _eventUserEvent2['default'].TO_CHANGE_SCENE:
                    this._changeScene(_sceneType2['default'].CHANGE);
                    this._master.requestChangeMenu(this._master.PLAYER_ID);
                    break;
                case _eventUserEvent2['default'].TO_CONFIRM_SCENE:
                    this._changeScene(_sceneType2['default'].CONFIRM, param.disableOKButton, param.disableCancelButton);
                    break;
                case _eventUserEvent2['default'].CONFIRM_OK:
                    this._menu.onConfirmOK(target.confirmType);
                    break;
                case _eventUserEvent2['default'].CONFIRM_CANCEL:
                    this._menu.onConfirmCancel(target.confirmType);
                    break;
                case _eventUserEvent2['default'].SELECT_SKILL:
                    this._master.skill(this._master.PLAYER_ID, param.value);
                    this._master.skill(this._master.OPPONENT_ID, 0);
                    break;
                case _eventUserEvent2['default'].SELECT_CHANGE:
                    switch (this._gameEvent) {
                        case _pokemonEventGameEvent2['default'].CHANGE_FOR_NEXT:
                            this._gameEvent = undefined;
                            this._master.next(this._master.PLAYER_ID, param.value);
                            break;
                        case _pokemonEventGameEvent2['default'].RETURN_TO_HAND_BY_SKILL:
                        case _pokemonEventGameEvent2['default'].RETURN_TO_HAND_BY_EJECT_BUTTON:
                            this._gameEvent = undefined;
                            this._master.changeBySkill(this._master.PLAYER_ID, param.value);
                            break;
                        default:
                            this._master.change(this._master.PLAYER_ID, param.value);
                            this._master.skill(this._master.OPPONENT_ID, 0);
                            break;
                    }
                    break;
                case _eventUserEvent2['default'].SELECT_RESIGN_CHECK:
                    this._master.confirmResign(this._master.PLAYER_ID);
                    break;
                case _eventUserEvent2['default'].SELECT_RESIGN_OK:
                    this._master.resign(this._master.PLAYER_ID);
                    this._master.skill(this._master.OPPONENT_ID, 0);
                    break;
                case _pokemonEventGameEvent2['default'].CHANGE_FOR_NEXT:
                    if (param.playerID.value === this._master.PLAYER_ID.value) {
                        this._gameEvent = param.event;
                        this._changeScene(_sceneType2['default'].CHANGE, true, true);
                        this._master.requestChangeMenu(param.playerID, false);
                    } else {
                        this._master.next(param.playerID, this._opponentPokemonIndex + 1);
                        this._opponentPokemonIndex++;
                    }
                    break;
                case _pokemonEventGameEvent2['default'].RETURN_TO_HAND_BY_SKILL:
                case _pokemonEventGameEvent2['default'].RETURN_TO_HAND_BY_EJECT_BUTTON:
                    if (param.playerID.value === this._master.PLAYER_ID.value) {
                        this._gameEvent = param.event;
                        this._changeScene(_sceneType2['default'].CHANGE, true, true);
                        this._master.requestChangeMenu(param.playerID, false);
                    }
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_changeScene',
        value: function _changeScene(scene) {
            var disableOKButton = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
            var disableCancelButton = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            this._menu.changeScene(scene, disableOKButton, disableCancelButton);
            this._scene.changeScene(scene);
        }
    }, {
        key: '_createAnnouncer',
        value: function _createAnnouncer(view) {
            return new _pokemonAnnouncerBrowserAnnouncer2['default'](view);
        }
    }, {
        key: '_createSceneController',
        value: function _createSceneController(view) {
            return new _gameSceneController2['default'](view);
        }
    }, {
        key: '_createMenuController',
        value: function _createMenuController(view) {
            return new _gameMenuController2['default'](view);
        }
    }, {
        key: '_createGameMaster',
        value: function _createGameMaster() {
            return new _pokemonGameMaster2['default']();
        }
    }]);

    return GameViewController;
})(_utilObserver2['default']);

exports['default'] = GameViewController;
module.exports = exports['default'];
},{"../event/user-event":6,"../pokemon/announcer/browser-announcer":9,"../pokemon/data/sample-party-list":12,"../pokemon/event/game-event":15,"../pokemon/game-master":17,"../pokemon/party-factory":19,"../util/observer":42,"./game-menu-controller":1,"./game-scene-controller":2,"./scene-type":4}],4:[function(require,module,exports){
/**
 * scene-type.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    SELECT: 'SELECT',

    BATTLE: 'BATTLE',

    SKILL: 'SKILL',

    CHANGE: 'CHANGE',

    CONFIRM: 'CONFIRM'

};
module.exports = exports['default'];
},{}],5:[function(require,module,exports){
/**
 * confirm-type.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    NONE: 'NONE',

    RESIGN: 'RESIGN',

    GAME_SET: 'GAME_SET'

};
module.exports = exports['default'];
},{}],6:[function(require,module,exports){
/**
 * user-event.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    // 必ず USER_XXX の値を取ること

    TO_SELECT_SCENE: 'USER_TO_SELECT_SCENE',

    TO_BATTLE_SCENE: 'USER_TO_BATTLE_SCENE',

    TO_SKILL_SCENE: 'USER_TO_SKILL_SCENE',

    TO_CHANGE_SCENE: 'USER_TO_CHANGE_SCENE',

    TO_CONFIRM_SCENE: 'USER_TO_CONFIRM_SCENE',

    CONFIRM_OK: 'USER_CONFIRM_OK',

    CONFIRM_CANCEL: 'USER_CONFIRM_CANCEL',

    SELECT_SKILL: 'USER_SELECT_SKILL',

    SELECT_CHANGE: 'USER_SELECT_CHANGE',

    SELECT_RESIGN_CHECK: 'USER_SELECT_RESIGN_CHECK',

    SELECT_RESIGN_OK: 'USER_SELECT_RESIGN_OK'

};
module.exports = exports['default'];
},{}],7:[function(require,module,exports){
(function (global){
/**
 * game-view-controller-loader.jsx
 * 
 * @author yuki
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _controllerGameViewController = require('../controller/game-view-controller');

var _controllerGameViewController2 = _interopRequireDefault(_controllerGameViewController);

global.window.addEventListener('DOMContentLoaded', function () {
  global.controller = new _controllerGameViewController2['default'](global.document);
  global.controller.initialize();
}, false);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../controller/game-view-controller":3}],8:[function(require,module,exports){
/**
 * action.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    SKILL: 'SKILL',

    CHANGE: 'CHANGE',

    CHANGE_BY_SKILL: 'CHANGE_BY_SKILL',

    NEXT: 'NEXT',

    RESIGN: 'RESIGN'

};
module.exports = exports['default'];
},{}],9:[function(require,module,exports){
/**
 * browser-announcer.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _consoleAnnouncer = require('./console-announcer');

var _consoleAnnouncer2 = _interopRequireDefault(_consoleAnnouncer);

var _eventBrowserEvent = require('../event/browser-event');

var _eventBrowserEvent2 = _interopRequireDefault(_eventBrowserEvent);

var _utilBufferThread = require('../../util/buffer-thread');

var _utilBufferThread2 = _interopRequireDefault(_utilBufferThread);

var _ruleElement = require('../rule/element');

var _ruleElement2 = _interopRequireDefault(_ruleElement);

var _eventMessageEvent = require('../event/message-event');

var _eventMessageEvent2 = _interopRequireDefault(_eventMessageEvent);

var _rulePokemonUtil = require('../rule/pokemon-util');

var _rulePokemonUtil2 = _interopRequireDefault(_rulePokemonUtil);

var BrowserAnnouncer = (function (_ConsoleAnnouncer) {
    _inherits(BrowserAnnouncer, _ConsoleAnnouncer);

    function BrowserAnnouncer(view) {
        _classCallCheck(this, BrowserAnnouncer);

        _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), 'constructor', this).call(this);
        this._view = view;
    }

    _createClass(BrowserAnnouncer, [{
        key: 'update',
        value: function update(target, param) {
            switch (param.event) {
                case _eventBrowserEvent2['default'].UPDATE_PARTY:
                    this._onUpdateParty(param.value);
                    break;
                case _eventBrowserEvent2['default'].SELECT_POKEMON:
                    this._onSelectPokemon(target, param.value);
                    break;
                case _eventBrowserEvent2['default'].UNSELECT_POKEMON:
                    this._onUnselectPokemon(target, param.value);
                    break;
                default:
                    _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), 'update', this).call(this, target, param);
                    break;
            }
        }
    }, {
        key: '_convertPartyToString',
        value: function _convertPartyToString(party) {
            var result = ["使用するポケモンを選んでください。"];
            party.forEachSelected(function (pokemon, i) {
                result.push('　' + (i + 1) + ': ' + pokemon.name);
            });
            return result.join('<br />');
        }
    }, {
        key: '_createBufferThread',
        value: function _createBufferThread(interval) {
            var _this = this;

            return new _utilBufferThread2['default'](function (message) {
                var textarea = _this._view.getElementById('text-message');
                if (message) {
                    if (textarea.textContent) {
                        textarea.innerHTML += '<br />' + message;
                    } else {
                        textarea.innerHTML = message;
                    }
                } else {
                    textarea.innerHTML = '';
                }
            }, interval).start();
        }
    }, {
        key: '_createPPLabel',
        value: function _createPPLabel(pokemon, skillIndex) {
            return 'PP： ' + ('  ' + pokemon.getPP(skillIndex)).slice(-2);
        }
    }, {
        key: '_createElementClassName',
        value: function _createElementClassName(element) {
            return 'pokemon-element ' + element.key.toLowerCase();
        }
    }, {
        key: '_createElementTag',
        value: function _createElementTag(view, element) {
            return this._createSpanTag(view, element.label, this._createElementClassName(element));
        }
    }, {
        key: '_createImgTag',
        value: function _createImgTag(view, sourceImagePath) {
            var className = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            var tag = view.createElement('img');
            tag.src = sourceImagePath;
            if (className) {
                tag.className = className;
            }
            return tag;
        }
    }, {
        key: '_createSpanTag',
        value: function _createSpanTag(view, text) {
            var className = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            var tag = view.createElement('span');
            tag.textContent = text;
            if (className) {
                tag.className = className;
            }
            return tag;
        }
    }, {
        key: '_getAppendableField',
        value: function _getAppendableField(view, fieldID) {
            var field = view.getElementById(fieldID);
            this._resetChildren(field);
            return field;
        }
    }, {
        key: '_onGameReady',
        value: function _onGameReady(info, playerID) {
            var _this2 = this;

            this._resetMessage();
            var playerTable = info.playerTable;
            Object.keys(playerTable).forEach(function (key) {
                var player = playerTable[key];
                var targetID = player.playerID;
                var leftSide = targetID.value === playerID.value;
                var playerLabel = leftSide ? 'player' : 'opponent';
                var playerNameID = playerLabel + '-name';
                _this2._view.getElementById(playerNameID).textContent = player.name;
                info.getParty(targetID).forEach(function (pokemon, index) {
                    var imageID = 'image-' + playerLabel + '-pokemon-' + index;
                    _this2._view.getElementById(imageID).src = '../image/pokemon/' + ('0000' + pokemon.pokemonID).slice(-4) + '.png';
                    if (leftSide) {
                        // this._view.getElementById(imageID).addEventListener('click', this.onClickPokemon.bind(this, index));
                    }
                });
            });
        }
    }, {
        key: '_onGameStart',
        value: function _onGameStart(info, playerID) {
            this._onRequestBattleInfo(info, playerID);
        }
    }, {
        key: '_onRequestBattleInfo',
        value: function _onRequestBattleInfo(info, playerID) {
            var _this3 = this;

            var playerTable = info.playerTable;
            Object.keys(playerTable).forEach(function (key) {
                var targetID = playerTable[key].playerID;
                var leftSide = targetID.value === playerID.value;
                var playerLabel = leftSide ? 'player' : 'opponent';
                var activePokemon = info.getActivePokemon(targetID);
                var activePokemonIconID = 'icon-' + playerLabel + '-active-pokemon';
                var nameID = playerLabel + '-active-pokemon-name';
                var itemID = playerLabel + '-active-pokemon-item';
                var statusAilmentID = playerLabel + '-active-pokemon-status-ailment';
                var elementFieldID = playerLabel + '-active-pokemon-element';
                var partyFieldID = 'icon-' + playerLabel + '-pokemon';
                if (leftSide) {
                    var hpCountID = 'player-active-pokemon-hp-count';
                    _this3._view.getElementById(hpCountID).textContent = activePokemon.activeH;
                }
                _this3._view.getElementById(nameID).textContent = activePokemon.name;
                _this3._view.getElementById(itemID).src = '../image/item/item-blank.png';
                _this3._view.getElementById(statusAilmentID).textContent = activePokemon.statusAilment.label;
                _this3._setPokemonElement(_this3._view, elementFieldID, activePokemon);
                var partyField = _this3._getAppendableField(_this3._view, partyFieldID);
                var className = leftSide ? 'player-pokemon icon-pokemon' : 'icon-pokemon';
                info.getParty(targetID).forEachSelected(function (pokemon) {
                    partyField.appendChild(_this3._createImgTag(_this3._view, '../image/pokemon/' + ('0000' + pokemon.pokemonID).slice(-4) + '.png', className));
                });
                _this3._view.getElementById(activePokemonIconID).src = '../image/pokemon/' + ('0000' + activePokemon.pokemonID).slice(-4) + '.png';
            });
        }
    }, {
        key: '_onRequestSkillMenu',
        value: function _onRequestSkillMenu(info, playerID) {
            var _this4 = this;

            var activePokemon = info.getActivePokemon(playerID);
            activePokemon.skillList.forEach(function (skill, index) {
                var skillNameFieldID = 'skill-name-' + index;
                var skillElementFieldID = 'skill-element-' + index;
                var skillPPFieldID = 'skill-pp-' + index;
                _this4._view.getElementById(skillNameFieldID).textContent = skill.name;
                var skillElement = skill.elementList[0];
                var skillElementField = _this4._view.getElementById(skillElementFieldID);
                skillElementField.textContent = skillElement.label;
                skillElementField.className = _this4._createElementClassName(skillElement);
                _this4._view.getElementById(skillPPFieldID).textContent = _this4._createPPLabel(activePokemon, index);
            });
        }
    }, {
        key: '_onRequestChangeMenu',
        value: function _onRequestChangeMenu(info, playerID) {
            var _this5 = this;

            var setPokemonSkill = function setPokemonSkill(skillNameFieldID, skillPPFieldID, pokemon) {
                var skillNameField = _this5._getAppendableField(_this5._view, skillNameFieldID);
                var skillPPField = _this5._getAppendableField(_this5._view, skillPPFieldID);
                pokemon.skillList.forEach(function (skill, index) {
                    skillNameField.appendChild(_this5._createSpanTag(_this5._view, skill.name));
                    skillPPField.appendChild(_this5._createSpanTag(_this5._view, _this5._createPPLabel(pokemon, index)));
                });
            };
            info.getParty(playerID).forEachSelected(function (pokemon, index) {
                var imageID = 'party-icon-player-pokemon-' + index;
                var itemID = 'party-icon-player-pokemon-item-' + index;
                var statusAilmentID = 'party-player-pokemon-status-ailment-' + index;
                var elementFieldID = 'party-player-pokemon-element-' + index;
                var skillNameFieldID = 'party-player-pokemon-skill-name-' + index;
                var skillPPFieldID = 'party-player-pokemon-skill-pp-' + index;
                // TODO 画像リソース
                _this5._view.getElementById(imageID).src = '../image/pokemon/' + ('0000' + pokemon.pokemonID).slice(-4) + '.png';
                // TODO アイテム画像
                _this5._view.getElementById(itemID).src = '../image/item/item-blank.png';
                _this5._view.getElementById(statusAilmentID).textContent = pokemon.statusAilment.label;
                _this5._setPokemonElement(_this5._view, elementFieldID, pokemon);
                setPokemonSkill(skillNameFieldID, skillPPFieldID, pokemon);
            });
        }
    }, {
        key: '_onReturnToHandBySkill',
        value: function _onReturnToHandBySkill(info, playerID) {
            _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), '_onReturnToHandBySkill', this).call(this, info, playerID);
            var message = '<span class="request-to-user">交代先のポケモンを選択してください</span>';
            this._write(message);
        }
    }, {
        key: '_onReturnToHandByEjectButton',
        value: function _onReturnToHandByEjectButton(info, playerID) {
            _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), '_onReturnToHandByEjectButton', this).call(this, info, playerID);
            var message = '<span class="request-to-user">交代先のポケモンを選択してください</span>';
            this._write(message);
        }
    }, {
        key: '_onChangeForNext',
        value: function _onChangeForNext(info, playerID) {
            if (playerID.value === info.getMainPlayerID().value) {
                var message = '<span class="request-to-user">交代先のポケモンを選択してください</span>';
                this._write(message);
            }
        }
    }, {
        key: '_onPokemonDamagedBySkill',
        value: function _onPokemonDamagedBySkill(info, playerID, damage) {
            this._updateHP(this._view, info, playerID);
            _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), '_onPokemonDamagedBySkill', this).call(this, info, playerID, damage);
        }
    }, {
        key: '_onPokemonDamagedByRecoil',
        value: function _onPokemonDamagedByRecoil(info, playerID, damage) {
            this._updateHP(this._view, info, playerID);
            _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), '_onPokemonDamagedByRecoil', this).call(this, info, playerID, damage);
        }
    }, {
        key: '_onConfirmResign',
        value: function _onConfirmResign(info, playerID) {
            var message = '<span class="warning-to-user">勝負を諦めて降参しますか？</span>';
            this._write(message);
        }
    }, {
        key: '_onComeIntoPlay',
        value: function _onComeIntoPlay(info, playerID) {
            var leftSide = playerID.value === info.getMainPlayerID().value;
            var playerLabel = leftSide ? 'player' : 'opponent';
            var activePokemon = info.getActivePokemon(playerID);
            var activePokemonIconID = 'icon-' + playerLabel + '-active-pokemon';
            var nameID = playerLabel + '-active-pokemon-name';
            var itemID = playerLabel + '-active-pokemon-item';
            var statusAilmentID = playerLabel + '-active-pokemon-status-ailment';
            var elementFieldID = playerLabel + '-active-pokemon-element';
            if (leftSide) {
                var hpCountID = 'player-active-pokemon-hp-count';
                this._view.getElementById(hpCountID).textContent = activePokemon.maxH.toString();
            }
            this._view.getElementById(nameID).textContent = activePokemon.name;
            this._view.getElementById(itemID).src = '../image/item/item-blank.png';
            this._view.getElementById(statusAilmentID).textContent = activePokemon.statusAilment.label;
            this._setPokemonElement(this._view, elementFieldID, activePokemon);
            this._view.getElementById(activePokemonIconID).src = '../image/pokemon/' + ('0000' + activePokemon.pokemonID).slice(-4) + '.png';
            _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), '_onComeIntoPlay', this).call(this, info, playerID);
        }
    }, {
        key: '_onSelectPokemon',
        value: function _onSelectPokemon(target, index) {
            this._onUpdateParty(target.party);
        }
    }, {
        key: '_onUpdateParty',
        value: function _onUpdateParty(party) {
            this._write(this._convertPartyToString(party), true);
        }
    }, {
        key: '_onUnselectPokemon',
        value: function _onUnselectPokemon(target, index) {
            this._onUpdateParty(target.party);
        }
    }, {
        key: '_onTurnReady',
        value: function _onTurnReady(info, playerID) {
            var message = '<span class="request-to-user">行動を選択してください</span>';
            this._write(message);
        }
    }, {
        key: '_resetChildren',
        value: function _resetChildren(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }, {
        key: '_setPokemonElement',
        value: function _setPokemonElement(view, elementFieldID, pokemon) {
            var _this6 = this;

            var elementField = this._getAppendableField(view, elementFieldID);
            var elementList = pokemon.elementList;
            if (elementList.length === 1) {
                elementList.push(_ruleElement2['default'].NONE);
            }
            elementList.forEach(function (element) {
                elementField.appendChild(_this6._createElementTag(view, element));
            });
        }
    }, {
        key: '_updateHP',
        value: function _updateHP(view, info, playerID) {
            var activePokemon = info.getActivePokemon(playerID);
            var leftSide = playerID.value === info.getMainPlayerID().value;
            var playerLabel = leftSide ? 'player' : 'opponent';
            var percentage = Math.ceil(activePokemon.activeH / activePokemon.maxH * 100);
            view.getElementById(playerLabel + '-active-pokemon-hp').style.width = percentage + '%';
            if (leftSide) {
                view.getElementById('player-active-pokemon-hp-count').textContent = activePokemon.activeH;
            }
        }
    }]);

    return BrowserAnnouncer;
})(_consoleAnnouncer2['default']);

exports['default'] = BrowserAnnouncer;
module.exports = exports['default'];
},{"../../util/buffer-thread":39,"../event/browser-event":14,"../event/message-event":16,"../rule/element":23,"../rule/pokemon-util":31,"./console-announcer":10}],10:[function(require,module,exports){
/**
 * console-announcer.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilObserver = require('../../util/observer');

var _utilObserver2 = _interopRequireDefault(_utilObserver);

var _utilBufferThread = require('../../util/buffer-thread');

var _utilBufferThread2 = _interopRequireDefault(_utilBufferThread);

var _gameStatus = require('../game-status');

var _gameStatus2 = _interopRequireDefault(_gameStatus);

var _eventMessageEvent = require('../event/message-event');

var _eventMessageEvent2 = _interopRequireDefault(_eventMessageEvent);

var ConsoleAnnouncer = (function (_Observer) {
    _inherits(ConsoleAnnouncer, _Observer);

    function ConsoleAnnouncer() {
        _classCallCheck(this, ConsoleAnnouncer);

        _get(Object.getPrototypeOf(ConsoleAnnouncer.prototype), 'constructor', this).call(this);
        this._DEFAULT_MESSAGE_WAIT_MS = 150;
        this._buffer = this._createBufferThread(this.DEFAULT_MESSAGE_WAIT_MS);
    }

    _createClass(ConsoleAnnouncer, [{
        key: 'update',
        value: function update(target, param) {
            switch (param.event) {
                case _eventMessageEvent2['default'].GAME_READY:
                    this._onGameReady(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].GAME_START:
                    this._onGameStart(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].GAME_SET:
                    this._onGameSet(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].TURN_READY:
                    this._onTurnReady(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].TURN_START:
                    this._onTurnStart(param.info);
                    break;
                case _eventMessageEvent2['default'].GAME_ALREADY_STARTED:
                    this._onGameAlreadyStarted(param.info);
                    break;
                case _eventMessageEvent2['default'].GAME_NOT_STARTED:
                    this._onGameNotStarted(param.info);
                    break;
                case _eventMessageEvent2['default'].GAME_FORCE_QUIT:
                    this._onGameForceQuit(param.info);
                    break;
                case _eventMessageEvent2['default'].REQUEST_SKILL_MENU:
                    this._onRequestSkillMenu(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].REQUEST_BATTLE_INFO:
                    this._onRequestBattleInfo(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].REQUEST_CHANGE_MENU:
                    this._onRequestChangeMenu(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].CONFIRM_RESIGN:
                    this._onConfirmResign(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].POKEMON_ALREADY_DEAD:
                    this._onPokemonAlreadyDead(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].POKEMON_DAMAGED_BY_SKILL:
                    this._onPokemonDamagedBySkill(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].POKEMON_DAMAGED_BY_RECOIL:
                    this._onPokemonDamagedByRecoil(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].POKEMON_DEAD:
                    this._onPokemonDead(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].RESIGN:
                    this._onResign(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].SKILL:
                    this._onSkill(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].SKILL_SUPER_EFFECTIVE:
                    this._onSkillSuperEffective(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].SKILL_NOT_EFFECTIVE:
                    this._onSkillNotEffective(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].SKILL_FAILURE_BY_PP_LOST:
                    this._onSkillFailureByPPLost(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].SKILL_CANCEL_BY_ABILITY:
                    this._onSkillCancelByAbility(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].SKILL_CANCEL_BY_ELEMENT:
                    this._onSkillCancelByElement(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].SKILL_NO_DAMAGE:
                    this._onSkillNoDamage(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].ITEM_STEEL_AND_EAT:
                    this._itemSteelAndEat(param.info, param.playerID, param.value);
                    break;
                case _eventMessageEvent2['default'].COME_INTO_PLAY:
                    this._onComeIntoPlay(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].RETURN_TO_HAND:
                    this._onReturnToHand(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].RETURN_TO_HAND_BY_SKILL:
                    this._onReturnToHandBySkill(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].RETURN_TO_HAND_BY_EJECT_BUTTON:
                    this._onReturnToHandByEjectButton(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].CHANGE_FOR_NEXT:
                    this._onChangeForNext(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].CIP_INTIMIDATE:
                    this._onCIP_Intimidate(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].CIP_DROUGHT:
                    this._onCIP_Drought(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].CIP_DRIZZLE:
                    this._onCIP_Drizzle(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].CIP_SAND_STREAM:
                    this._onCIP_SandStream(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].CIP_SNOW_WARNING:
                    this._onCIP_SnowWarning(param.info, param.playerID);
                    break;
                case _eventMessageEvent2['default'].CIP_ELECTIRIC_SURGE:
                case _eventMessageEvent2['default'].CIP_MISTY_SURGE:
                case _eventMessageEvent2['default'].CIP_PSYCHIC_SURGE:
                    break;
                case _eventMessageEvent2['default'].RANKUP_A:
                    this._onRankup(param.info, param.playerID, 'A', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKUP_B:
                    this._onRankup(param.info, param.playerID, 'B', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKUP_C:
                    this._onRankup(param.info, param.playerID, 'C', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKUP_D:
                    this._onRankup(param.info, param.playerID, 'D', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKUP_S:
                    this._onRankup(param.info, param.playerID, 'S', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKDOWN_A:
                    this._onRankdown(param.info, param.playerID, 'A', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKDOWN_B:
                    this._onRankdown(param.info, param.playerID, 'B', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKDOWN_C:
                    this._onRankdown(param.info, param.playerID, 'C', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKDOWN_D:
                    this._onRankdown(param.info, param.playerID, 'D', param.value);
                    break;
                case _eventMessageEvent2['default'].RANKDOWN_S:
                    this._onRankdown(param.info, param.playerID, 'S', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKUP_A:
                    this._onNotRankup(param.info, param.playerID, 'A', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKUP_B:
                    this._onNotRankup(param.info, param.playerID, 'B', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKUP_C:
                    this._onNotRankup(param.info, param.playerID, 'C', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKUP_D:
                    this._onNotRankup(param.info, param.playerID, 'D', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKUP_S:
                    this._onNotRankup(param.info, param.playerID, 'S', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKDOWN_A:
                    this._onNotRankdown(param.info, param.playerID, 'A', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKDOWN_B:
                    this._onNotRankdown(param.info, param.playerID, 'B', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKDOWN_C:
                    this._onNotRankdown(param.info, param.playerID, 'C', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKDOWN_D:
                    this._onNotRankdown(param.info, param.playerID, 'D', param.value);
                    break;
                case _eventMessageEvent2['default'].NOT_RANKDOWN_S:
                    this._onNotRankdown(param.info, param.playerID, 'S', param.value);
                    break;
                case _eventMessageEvent2['default'].HELP_GAME:
                    this._onHelpGame(param.value);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_createBufferThread',
        value: function _createBufferThread(interval) {
            return new _utilBufferThread2['default'](function (message) {
                if (message) {
                    console.log(message);
                }
            }, interval).start();
        }
    }, {
        key: '_onGameReady',
        value: function _onGameReady(info, playerID) {
            this._resetMessage();
        }
    }, {
        key: '_onGameStart',
        value: function _onGameStart(info, playerID) {}
    }, {
        key: '_onGameSet',
        value: function _onGameSet(info, playerID) {
            var playerName = info.getPlayer(playerID).name;
            var message = playerName + 'の勝利！！';
            this._write(message);
        }
    }, {
        key: '_onTurnReady',
        value: function _onTurnReady(info, playerID) {
            var opponentID = playerID.opponentID;
            var playerName = info.getPlayer(playerID).name;
            var opponentName = info.getPlayer(opponentID).name;
            var playerActivePokemon = info.getActivePokemon(playerID);
            var opponentActivePokemon = info.getActivePokemon(opponentID);
            var playerActivePokemonH = playerActivePokemon.activeH;
            var playerActivePokemonMaxH = playerActivePokemon.maxH;
            var buffer = [];
            buffer.push("---- * ---- * ---- * ---- * ----");
            buffer.push(playerName + '： ' + playerActivePokemon.name + ' (HP：' + playerActivePokemonH + ' / ' + playerActivePokemonMaxH + ') ' + playerActivePokemon.statusAilment.label);
            buffer.push(opponentName + '： ' + opponentActivePokemon.name);
            buffer.push('行動を選択してください');
            buffer.push('skill / change / info / resign');
            this._write(buffer.join('\n'));
        }
    }, {
        key: '_onTurnStart',
        value: function _onTurnStart(info) {
            this._resetMessage();
        }
    }, {
        key: '_onGameAlreadyStarted',
        value: function _onGameAlreadyStarted(info) {
            var message = ' * ゲーム開始済みです * ';
            this._write(message);
        }
    }, {
        key: '_onGameNotStarted',
        value: function _onGameNotStarted(info) {
            var message = ' * ゲームが開始されていません * ';
            this._write(message);
        }
    }, {
        key: '_onGameForceQuit',
        value: function _onGameForceQuit(info) {
            var message = ' * ゲームを強制終了しました * ';
            this._write(message);
        }
    }, {
        key: '_onRequestBattleInfo',
        value: function _onRequestBattleInfo(info, playerID) {}
    }, {
        key: '_onRequestSkillMenu',
        value: function _onRequestSkillMenu(info, playerID, cancelable) {
            var activePokemon = info.getActivePokemon(playerID);
            var buffer = [];
            buffer.push("使用するスキルの番号を選んでください：");
            activePokemon.skillList.forEach(function (skill, index) {
                buffer.push('  ' + (index + 1) + '： ' + skill.name + '  (タイプ：' + skill.elementList[0].label + ') [PP：' + activePokemon.getPP(index) + ']');
            });
            if (cancelable) {
                buffer.push("  0： キャンセル");
            }
            this._write(buffer.join('\n'));
        }
    }, {
        key: '_onRequestChangeMenu',
        value: function _onRequestChangeMenu(info, playerID, cancelable) {
            var party = info.getParty(playerID);
            var buffer = [];
            buffer.push("交代先のポケモンの番号を選んでください：");
            party.forEachSelected(function (pokemon, index) {
                buffer.push('  ' + (index + 1) + '： ' + pokemon.name + '  (HP：' + pokemon.activeH + ' / ' + pokemon.maxH + ') ' + pokemon.statusAilment.label);
            });
            if (cancelable) {
                buffer.push("  0： キャンセル");
            }
            this._write(buffer.join('\n'));
        }
    }, {
        key: '_onConfirmResign',
        value: function _onConfirmResign(info, playerID) {}
    }, {
        key: '_onPokemonAlreadyDead',
        value: function _onPokemonAlreadyDead(info, playerID) {
            var message = 'しかし上手く決まらなかった！';
            this._write(message);
        }
    }, {
        key: '_onPokemonDamagedBySkill',
        value: function _onPokemonDamagedBySkill(info, playerID, damage) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = pokemon.name;
            var activeH = pokemon.activeH;
            var detail = playerID.value === info.getMainPlayerID().value ? ' (' + activeH + ' - ' + damage + ' -> ' + Math.max(activeH - damage, 0) + ')' : '';
            var message = pokemonName + 'はダメージを受けた！' + detail;
            this._write(message);
        }
    }, {
        key: '_onPokemonDamagedByRecoil',
        value: function _onPokemonDamagedByRecoil(info, playerID, damage) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = pokemon.name;
            var activeH = pokemon.activeH;
            var detail = playerID.value === info.getMainPlayerID().value ? ' (' + activeH + ' - ' + damage + ' -> ' + Math.max(activeH - damage, 0) + ')' : '';
            var message = pokemonName + 'は反動によるダメージを受けた！' + detail;
            this._write(message);
        }
    }, {
        key: '_onPokemonDead',
        value: function _onPokemonDead(info, playerID) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'は倒れた！！';
            this._write(message);
        }
    }, {
        key: '_onResign',
        value: function _onResign(info, playerID) {
            var message = '降参が選ばれました';
            this._write(message, true);
        }
    }, {
        key: '_onSkill',
        value: function _onSkill(info, playerID, skillName) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'の' + skillName + '！';
            this._write(message);
        }
    }, {
        key: '_onSkillSuperEffective',
        value: function _onSkillSuperEffective(info, playerID) {
            var message = '効果は抜群だ！';
            this._write(message);
        }
    }, {
        key: '_onSkillNotEffective',
        value: function _onSkillNotEffective(info, playerID) {
            var message = '効果はいまひとつのようだ…';
            this._write(message);
        }
    }, {
        key: '_onSkillFailureByPPLost',
        value: function _onSkillFailureByPPLost(info, playerID, skill) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'はPPが無いので' + skill.name + 'を使えない！';
            this._write(message);
        }
    }, {
        key: '_onSkillCancelByAbility',
        value: function _onSkillCancelByAbility(info, playerID, skill) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = info.getActivePokemon(playerID).name;
            var ability = pokemon.ability;
            var message = pokemonName + 'は' + ability + 'で' + skill.name + 'が効かなかった！！';
            this._write(message);
        }
    }, {
        key: '_onSkillCancelByElement',
        value: function _onSkillCancelByElement(info, playerID, skill) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'には効果が無いようだ…';
            this._write(message);
        }
    }, {
        key: '_onSkillNoDamage',
        value: function _onSkillNoDamage(info, playerID) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'にダメージを与えられなかった…';
            this._write(message);
        }
    }, {
        key: '_itemSteelAndEat',
        value: function _itemSteelAndEat(info, playerID, itemName) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'は' + itemName + 'を奪って食べた！';
            this._write(message);
        }
    }, {
        key: '_onComeIntoPlay',
        value: function _onComeIntoPlay(info, playerID) {
            var playerName = info.getPlayer(playerID).name;
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = playerName + 'は' + pokemonName + 'を繰り出した！';
            this._write(message);
        }
    }, {
        key: '_onReturnToHand',
        value: function _onReturnToHand(info, playerID) {
            var playerName = info.getPlayer(playerID).name;
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'は' + playerName + 'のもとに戻っていく…';
            this._write(message);
        }
    }, {
        key: '_onReturnToHandBySkill',
        value: function _onReturnToHandBySkill(info, playerID) {
            var playerName = info.getPlayer(playerID).name;
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'は' + playerName + 'のもとに戻っていく…';
            this._write(message);
        }
    }, {
        key: '_onReturnToHandByEjectButton',
        value: function _onReturnToHandByEjectButton(info, playerID) {
            var playerName = info.getPlayer(playerID).name;
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'は脱出ボタンで戻っていく！';
            this._write(message);
        }
    }, {
        key: '_onChangeForNext',
        value: function _onChangeForNext(info, playerID) {
            if (playerID.value === info.getMainPlayerID().value) {
                var message = '交代先のポケモンを選択してください';
                this._write(message);
            }
        }
    }, {
        key: '_onCIP_Intimidate',
        value: function _onCIP_Intimidate(info, playerID) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'の威嚇！';
            this._write(message);
        }
    }, {
        key: '_onCIP_Drought',
        value: function _onCIP_Drought(info, playerID) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'の日照り！ 日差しが強くなった！';
            this._write(message);
        }
    }, {
        key: '_onCIP_Drizzle',
        value: function _onCIP_Drizzle(info, playerID) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'の雨降らし！ 雨が降り始めた！';
            this._write(message);
        }
    }, {
        key: '_onCIP_SandStream',
        value: function _onCIP_SandStream(info, playerID) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'の砂起こし！ 砂嵐が吹き始めた！';
            this._write(message);
        }
    }, {
        key: '_onCIP_SnowWarning',
        value: function _onCIP_SnowWarning(info, playerID) {
            var pokemonName = info.getActivePokemon(playerID).name;
            var message = pokemonName + 'の雪降らし！ 霰が降り始めた！';
            this._write(message);
        }
    }, {
        key: '_onRankup',
        value: function _onRankup(info, playerID, key) {
            var value = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = pokemon.name;
            var statusName = this._toStatusName(key);
            var how = function how(value) {
                switch (value) {
                    case 2:
                        return 'ぐーんと';
                    case 3:
                        return 'ぐぐーんと';
                    case 12:
                        return '最大まで';
                    default:
                        return '';
                }
            };
            var rank = pokemon.getRank(key);
            var message = pokemonName + 'の' + statusName + 'が' + how(value) + '上がった！ (' + statusName + 'ランク：' + (rank > 0 ? '+' : '') + rank + ')';
            this._write(message);
        }
    }, {
        key: '_onRankdown',
        value: function _onRankdown(info, playerID, key) {
            var value = arguments.length <= 3 || arguments[3] === undefined ? -1 : arguments[3];

            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = pokemon.name;
            var statusName = this._toStatusName(key);
            var how = function how(value) {
                switch (value) {
                    case -2:
                        return 'がくっと';
                    case -3:
                        return 'がくーんと';
                    default:
                        return '';
                }
            };
            var rank = pokemon.getRank(key);
            var message = pokemonName + 'の' + statusName + 'が' + how(value) + '下がった！ (' + statusName + 'ランク：' + (rank > 0 ? '+' : '') + rank + ')';
            this._write(message);
        }
    }, {
        key: '_onNotRankup',
        value: function _onNotRankup(info, playerID, key) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = pokemon.name;
            var statusName = this._toStatusName(key);
            var rank = pokemon.getRank(key);
            var message = pokemonName + 'の' + statusName + 'はもう上がらない！ (' + statusName + 'ランク：' + (rank > 0 ? '+' : '') + rank + ')';
            this._write(message);
        }
    }, {
        key: '_onNotRankdown',
        value: function _onNotRankdown(info, playerID, key) {
            var pokemon = info.getActivePokemon(playerID);
            var pokemonName = pokemon.name;
            var statusName = this._toStatusName(key);
            var rank = pokemon.getRank(key);
            var message = pokemonName + 'の' + statusName + 'はもう下がらない！ (' + statusName + 'ランク：' + (rank > 0 ? '+' : '') + rank + ')';
            this._write(message);
        }
    }, {
        key: '_onHelpGame',
        value: function _onHelpGame(status) {
            switch (status) {
                case _gameStatus2['default'].IDLE:
                    this._write("start：ゲーム開始");
                    this._write("※頭文字のみに省略可能");
                    break;
                case _gameStatus2['default'].STANDBY:
                    this._write("end：強制終了");
                    this._write("※頭文字のみに省略可能");
                    break;
                case _gameStatus2['default'].RUN:
                    this._write("resign：降参　　end：強制終了");
                    this._write("action [1-4]：技を使用(実装途中)　　change [1-3]：交代(未実装)");
                    this._write("※全て頭文字のみに省略可能");
                    break;
                case _gameStatus2['default'].CLOSED:
                    this._write(" * closed * ");
                    break;
                default:
                    throw new Error();
            }
        }
    }, {
        key: '_toStatusName',
        value: function _toStatusName(key) {
            switch (key) {
                case 'H':
                    return 'HP';
                case 'A':
                    return '攻撃';
                case 'B':
                    return '防御';
                case 'C':
                    return '特攻';
                case 'D':
                    return '特防';
                case 'S':
                    return '素早さ';
                default:
                    throw new Error();
            }
        }
    }, {
        key: '_resetMessage',
        value: function _resetMessage() {
            this._buffer.push('');
        }
    }, {
        key: '_write',
        value: function _write(message, reset) {
            if (reset) {
                this._resetMessage();
            }
            this._buffer.push(message);
        }
    }]);

    return ConsoleAnnouncer;
})(_utilObserver2['default']);

exports['default'] = ConsoleAnnouncer;
module.exports = exports['default'];
},{"../../util/buffer-thread":39,"../../util/observer":42,"../event/message-event":16,"../game-status":18}],11:[function(require,module,exports){
/**
 * pokemon-table.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    30: {
        'ID': 30,
        'name': 'フシギバナ',
        'label': 'フシギバナ',
        'weight': 100.0,
        'elements': ['GRASS', 'POISON'],
        'H': 80,
        'A': 82,
        'B': 83,
        'C': 100,
        'D': 100,
        'S': 80
    },
    60: {
        'ID': 60,
        'name': 'リザードン',
        'label': 'リザードン',
        'weight': 90.5,
        'elements': ['FIRE', 'FLYING'],
        'H': 78,
        'A': 84,
        'B': 78,
        'C': 109,
        'D': 85,
        'S': 100
    },
    90: {
        'ID': 90,
        'name': 'カメックス',
        'label': 'カメックス',
        'weight': 85.5,
        'elements': ['WATER'],
        'H': 79,
        'A': 83,
        'B': 100,
        'C': 85,
        'D': 105,
        'S': 78
    },
    250: {
        'ID': 250,
        'name': 'ピカチュウ',
        'label': 'ピカチュウ',
        'weight': 6.0,
        'elements': ['ELECTRIC'],
        'H': 35,
        'A': 55,
        'B': 40,
        'C': 50,
        'D': 50,
        'S': 90
    },
    360: {
        'ID': 360,
        'name': 'ピクシー',
        'label': 'ピクシー',
        'weight': 40.0,
        'elements': ['FAILY'],
        'H': 95,
        'A': 70,
        'B': 73,
        'C': 95,
        'D': 90,
        'S': 60
    },
    380: {
        'ID': 380,
        'name': 'キュウコン',
        'label': 'キュウコン',
        'weight': 19.9,
        'elements': ['FIRE'],
        'H': 73,
        'A': 76,
        'B': 75,
        'C': 81,
        'D': 100,
        'S': 100
    },
    800: {
        'ID': 800,
        'name': 'ヤドラン',
        'label': 'ヤドラン',
        'weight': 78.5,
        'elements': ['WATER', 'PSYCHIC'],
        'H': 95,
        'A': 75,
        'B': 110,
        'C': 100,
        'D': 80,
        'S': 30
    },
    910: {
        'ID': 910,
        'name': 'パルシェン',
        'label': 'パルシェン',
        'weight': 132.5,
        'elements': ['WATER', 'ICE'],
        'H': 50,
        'A': 95,
        'B': 180,
        'C': 85,
        'D': 45,
        'S': 70
    },
    940: {
        'ID': 940,
        'name': 'ゲンガー',
        'label': 'ゲンガー',
        'weight': 40.5,
        'elements': ['GHOST', 'POISON'],
        'H': 60,
        'A': 65,
        'B': 60,
        'C': 130,
        'D': 75,
        'S': 110
    },
    1300: {
        'ID': 1300,
        'name': 'ギャラドス',
        'label': 'ギャラドス',
        'weight': 235.0,
        'elements': ['WATER', 'FLYING'],
        'H': 95,
        'A': 125,
        'B': 79,
        'C': 60,
        'D': 100,
        'S': 81
    },
    1310: {
        'ID': 1310,
        'name': 'ラプラス',
        'label': 'ラプラス',
        'weight': 220.0,
        'elements': ['WATER', 'ICE'],
        'H': 130,
        'A': 85,
        'B': 80,
        'C': 85,
        'D': 95,
        'S': 60
    },
    1340: {
        'ID': 1340,
        'name': 'シャワーズ',
        'label': 'シャワーズ',
        'weight': 29.0,
        'elements': ['WATER'],
        'H': 130,
        'A': 65,
        'B': 60,
        'C': 110,
        'D': 95,
        'S': 65
    },
    1350: {
        'ID': 1350,
        'name': 'サンダース',
        'label': 'サンダース',
        'weight': 24.5,
        'elements': ['ELECTRIC'],
        'H': 65,
        'A': 65,
        'B': 60,
        'C': 110,
        'D': 95,
        'S': 130
    },
    1360: {
        'ID': 1360,
        'name': 'ブースター',
        'label': 'ブースター',
        'weight': 25.0,
        'elements': ['FIRE'],
        'H': 65,
        'A': 130,
        'B': 60,
        'C': 95,
        'D': 110,
        'S': 65
    },
    1390: {
        'ID': 1390,
        'name': 'オムスター',
        'label': 'オムスター',
        'weight': 35.0,
        'elements': ['ROCK', 'WATER'],
        'H': 70,
        'A': 60,
        'B': 125,
        'C': 115,
        'D': 70,
        'S': 55
    },
    1450: {
        'ID': 1450,
        'name': 'サンダー',
        'label': 'サンダー',
        'weight': 52.6,
        'elements': ['ELECTRIC', 'FLYING'],
        'H': 90,
        'A': 90,
        'B': 85,
        'C': 125,
        'D': 90,
        'S': 100
    },
    1490: {
        'ID': 1490,
        'name': 'カイリュー',
        'label': 'カイリュー',
        'weight': 210.0,
        'elements': ['DRAGON', 'FLYING'],
        'H': 91,
        'A': 134,
        'B': 95,
        'C': 100,
        'D': 100,
        'S': 80
    },
    1840: {
        'ID': 1840,
        'name': 'マリルリ',
        'label': 'マリルリ',
        'weight': 28.5,
        'elements': ['WATER', 'FAILY'],
        'H': 100,
        'A': 50,
        'B': 80,
        'C': 60,
        'D': 80,
        'S': 50
    },
    1860: {
        'ID': 1860,
        'name': 'ニョロトノ',
        'label': 'ニョロトノ',
        'weight': 33.9,
        'elements': ['WATER'],
        'H': 90,
        'A': 75,
        'B': 75,
        'C': 90,
        'D': 100,
        'S': 70
    },
    1950: {
        'ID': 1950,
        'name': 'ヌオー',
        'label': 'ヌオー',
        'weight': 75.0,
        'elements': ['WATER', 'GROUND'],
        'H': 95,
        'A': 85,
        'B': 85,
        'C': 65,
        'D': 65,
        'S': 35
    },
    1960: {
        'ID': 1960,
        'name': 'エーフィ',
        'label': 'エーフィ',
        'weight': 26.5,
        'elements': ['PSYCHIC'],
        'H': 65,
        'A': 65,
        'B': 60,
        'C': 130,
        'D': 95,
        'S': 110
    },
    1970: {
        'ID': 1970,
        'name': 'ブラッキー',
        'label': 'ブラッキー',
        'weight': 27.0,
        'elements': ['DARK'],
        'H': 95,
        'A': 65,
        'B': 110,
        'C': 60,
        'D': 130,
        'S': 65
    },
    2120: {
        'ID': 2120,
        'name': 'ハッサム',
        'label': 'ハッサム',
        'weight': 118.0,
        'elements': ['BUG', 'STEEL'],
        'H': 70,
        'A': 130,
        'B': 100,
        'C': 55,
        'D': 80,
        'S': 65
    },
    2140: {
        'ID': 2140,
        'name': 'ヘラクロス',
        'label': 'ヘラクロス',
        'weight': 54.0,
        'elements': ['BUG', 'FIGHTING'],
        'H': 80,
        'A': 125,
        'B': 75,
        'C': 40,
        'D': 95,
        'S': 85
    },
    2170: {
        'ID': 2170,
        'name': 'リングマ',
        'label': 'リングマ',
        'weight': 125.8,
        'elements': ['NORMAL'],
        'H': 90,
        'A': 130,
        'B': 75,
        'C': 75,
        'D': 75,
        'S': 55
    },
    2300: {
        'ID': 2300,
        'name': 'キングドラ',
        'label': 'キングドラ',
        'weight': 152.0,
        'elements': ['WATER', 'DRAGON'],
        'H': 75,
        'A': 95,
        'B': 95,
        'C': 95,
        'D': 95,
        'S': 85
    },
    2430: {
        'ID': 2430,
        'name': 'ライコウ',
        'label': 'ライコウ',
        'weight': 178.0,
        'elements': ['ELECTRIC'],
        'H': 90,
        'A': 85,
        'B': 75,
        'C': 115,
        'D': 100,
        'S': 115
    },
    2440: {
        'ID': 2440,
        'name': 'エンテイ',
        'label': 'エンテイ',
        'weight': 198.0,
        'elements': ['FIRE'],
        'H': 115,
        'A': 115,
        'B': 85,
        'C': 90,
        'D': 75,
        'S': 100
    },
    2450: {
        'ID': 2450,
        'name': 'スイクン',
        'label': 'スイクン',
        'weight': 187.0,
        'elements': ['WATER'],
        'H': 100,
        'A': 75,
        'B': 115,
        'C': 90,
        'D': 115,
        'S': 85
    },
    2480: {
        'ID': 2480,
        'name': 'バンギラス',
        'label': 'バンギラス',
        'weight': 202.0,
        'elements': ['ROCK', 'DARK'],
        'H': 100,
        'A': 134,
        'B': 110,
        'C': 95,
        'D': 100,
        'S': 61
    },
    2570: {
        'ID': 2570,
        'name': 'バシャーモ',
        'label': 'バシャーモ',
        'weight': 52.0,
        'elements': ['FIRE', 'FIGHTING'],
        'H': 80,
        'A': 120,
        'B': 70,
        'C': 110,
        'D': 70,
        'S': 80
    },
    2600: {
        'ID': 2600,
        'name': 'ラグラージ',
        'label': 'ラグラージ',
        'weight': 81.9,
        'elements': ['WATER', 'GROUND'],
        'H': 100,
        'A': 110,
        'B': 90,
        'C': 85,
        'D': 90,
        'S': 60
    },
    2790: {
        'ID': 2790,
        'name': 'ペリッパー',
        'label': 'ペリッパー',
        'weight': 28.0,
        'elements': ['WATER', 'FLYING'],
        'H': 60,
        'A': 50,
        'B': 100,
        'C': 95,
        'D': 70,
        'S': 65
    },
    2820: {
        'ID': 2820,
        'name': 'サーナイト',
        'label': 'サーナイト',
        'weight': 48.4,
        'elements': ['PSYCHIC', 'FAILY'],
        'H': 68,
        'A': 65,
        'B': 65,
        'C': 125,
        'D': 115,
        'S': 80
    },
    2860: {
        'ID': 2860,
        'name': 'キノガッサ',
        'label': 'キノガッサ',
        'weight': 39.2,
        'elements': ['GRASS', 'FIGHTING'],
        'H': 60,
        'A': 130,
        'B': 80,
        'C': 60,
        'D': 60,
        'S': 70
    },
    3240: {
        'ID': 3240,
        'name': 'コータス',
        'label': 'コータス',
        'weight': 80.4,
        'elements': ['FIRE'],
        'H': 70,
        'A': 85,
        'B': 140,
        'C': 85,
        'D': 70,
        'S': 20
    },
    3500: {
        'ID': 3500,
        'name': 'ミロカロス',
        'label': 'ミロカロス',
        'weight': 162.0,
        'elements': ['WATER'],
        'H': 95,
        'A': 60,
        'B': 79,
        'C': 100,
        'D': 125,
        'S': 81
    },
    3730: {
        'ID': 3730,
        'name': 'ボーマンダ',
        'label': 'ボーマンダ',
        'weight': 102.6,
        'elements': ['DRAGON', 'FLYING'],
        'H': 95,
        'A': 135,
        'B': 80,
        'C': 110,
        'D': 80,
        'S': 100
    },
    3760: {
        'ID': 3760,
        'name': 'メタグロス',
        'label': 'メタグロス',
        'weight': 550.0,
        'elements': ['STEEL', 'PSYCHIC'],
        'H': 80,
        'A': 135,
        'B': 130,
        'C': 95,
        'D': 90,
        'S': 70
    },
    3800: {
        'ID': 3800,
        'name': 'ラティアス',
        'label': 'ラティアス',
        'weight': 40.0,
        'elements': ['DRAGON', 'PSYCHIC'],
        'H': 80,
        'A': 80,
        'B': 90,
        'C': 110,
        'D': 130,
        'S': 110
    },
    3810: {
        'ID': 3810,
        'name': 'ラティオス',
        'label': 'ラティオス',
        'weight': 60.0,
        'elements': ['DRAGON', 'PSYCHIC'],
        'H': 80,
        'A': 90,
        'B': 80,
        'C': 130,
        'D': 110,
        'S': 110
    },
    3920: {
        'ID': 3920,
        'name': 'ゴウカザル',
        'label': 'ゴウカザル',
        'weight': 55.0,
        'elements': ['FIRE', 'FIGHTING'],
        'H': 76,
        'A': 104,
        'B': 71,
        'C': 104,
        'D': 71,
        'S': 108
    },
    4450: {
        'ID': 4450,
        'name': 'ガブリアス',
        'label': 'ガブリアス',
        'weight': 95.0,
        'elements': ['DRAGON', 'GROUND'],
        'H': 108,
        'A': 130,
        'B': 95,
        'C': 80,
        'D': 85,
        'S': 102
    },
    4480: {
        'ID': 4480,
        'name': 'ルカリオ',
        'label': 'ルカリオ',
        'weight': 54.0,
        'elements': ['FIGHTING', 'STEEL'],
        'H': 70,
        'A': 110,
        'B': 70,
        'C': 115,
        'D': 70,
        'S': 90
    },
    4500: {
        'ID': 4500,
        'name': 'カバルドン',
        'label': 'カバルドン',
        'weight': 300.0,
        'elements': ['GROUND'],
        'H': 108,
        'A': 112,
        'B': 118,
        'C': 68,
        'D': 72,
        'S': 47
    },
    4600: {
        'ID': 4600,
        'name': 'ユキノオー',
        'label': 'ユキノオー',
        'weight': 135.5,
        'elements': ['GRASS', 'ICE'],
        'H': 90,
        'A': 92,
        'B': 75,
        'C': 92,
        'D': 85,
        'S': 60
    },
    4620: {
        'ID': 4620,
        'name': 'ジバコイル',
        'label': 'ジバコイル',
        'weight': 180.0,
        'elements': ['ELECTRIC', 'STEEL'],
        'H': 70,
        'A': 70,
        'B': 115,
        'C': 130,
        'D': 90,
        'S': 60
    },
    4640: {
        'ID': 4640,
        'name': 'ドサイドン',
        'label': 'ドサイドン',
        'weight': 282.8,
        'elements': ['GROUND', 'ROCK'],
        'H': 115,
        'A': 140,
        'B': 130,
        'C': 55,
        'D': 55,
        'S': 40
    },
    4700: {
        'ID': 4700,
        'name': 'リーフィア',
        'label': 'リーフィア',
        'weight': 25.5,
        'elements': ['GRASS'],
        'H': 65,
        'A': 110,
        'B': 130,
        'C': 60,
        'D': 65,
        'S': 95
    },
    4710: {
        'ID': 4710,
        'name': 'グレイシア',
        'label': 'グレイシア',
        'weight': 25.9,
        'elements': ['ICE'],
        'H': 65,
        'A': 60,
        'B': 110,
        'C': 130,
        'D': 95,
        'S': 65
    },
    4730: {
        'ID': 4730,
        'name': 'マンムー',
        'label': 'マンムー',
        'weight': 291.0,
        'elements': ['ICE', 'GROUND'],
        'H': 110,
        'A': 130,
        'B': 80,
        'C': 70,
        'D': 60,
        'S': 80
    },
    4740: {
        'ID': 4740,
        'name': 'ポリゴンZ',
        'label': 'ポリゴンZ',
        'weight': 34.0,
        'elements': ['NORMAL'],
        'H': 85,
        'A': 80,
        'B': 70,
        'C': 135,
        'D': 75,
        'S': 90
    },
    4791: {
        'ID': 4791,
        'name': 'ヒートロトム',
        'label': 'ロトム',
        'weight': 0.3,
        'elements': ['ELECTRIC', 'FIRE'],
        'H': 50,
        'A': 65,
        'B': 107,
        'C': 105,
        'D': 107,
        'S': 86
    },
    4792: {
        'ID': 4792,
        'name': 'ウォッシュロトム',
        'label': 'ロトム',
        'weight': 0.3,
        'elements': ['ELECTRIC', 'WATER'],
        'H': 50,
        'A': 65,
        'B': 107,
        'C': 105,
        'D': 107,
        'S': 86
    },
    4850: {
        'ID': 4850,
        'name': 'ヒードラン',
        'label': 'ヒードラン',
        'weight': 430.0,
        'elements': ['FIRE', 'STEEL'],
        'H': 91,
        'A': 90,
        'B': 106,
        'C': 130,
        'D': 106,
        'S': 77
    },
    4880: {
        'ID': 4880,
        'name': 'クレセリア',
        'label': 'クレセリア',
        'weight': 85.6,
        'elements': ['PSYCHIC'],
        'H': 120,
        'A': 70,
        'B': 120,
        'C': 75,
        'D': 130,
        'S': 85
    },
    4970: {
        'ID': 4970,
        'name': 'ジャローダ',
        'label': 'ジャローダ',
        'weight': 63.0,
        'elements': ['GRASS'],
        'H': 75,
        'A': 75,
        'B': 95,
        'C': 75,
        'D': 95,
        'S': 113
    },
    5300: {
        'ID': 5300,
        'name': 'ドリュウズ',
        'label': 'ドリュウズ',
        'weight': 40.4,
        'elements': ['GROUND', 'STEEL'],
        'H': 110,
        'A': 135,
        'B': 60,
        'C': 50,
        'D': 65,
        'S': 88
    },
    5340: {
        'ID': 5340,
        'name': 'ローブシン',
        'label': 'ローブシン',
        'weight': 87.0,
        'elements': ['FIGHTING'],
        'H': 105,
        'A': 140,
        'B': 95,
        'C': 55,
        'D': 65,
        'S': 45
    },
    5470: {
        'ID': 5470,
        'name': 'エルフーン',
        'label': 'エルフーン',
        'weight': 6.6,
        'elements': ['GRASS', 'FAILY'],
        'H': 60,
        'A': 67,
        'B': 85,
        'C': 77,
        'D': 75,
        'S': 116
    },
    5530: {
        'ID': 5530,
        'name': 'ワルビアル',
        'label': 'ワルビアル',
        'weight': 96.3,
        'elements': ['GROUND', 'DARK'],
        'H': 95,
        'A': 117,
        'B': 80,
        'C': 65,
        'D': 70,
        'S': 92
    },
    5840: {
        'ID': 5840,
        'name': 'バイバニラ',
        'label': 'バイバニラ',
        'weight': 57.5,
        'elements': ['ICE'],
        'H': 71,
        'A': 95,
        'B': 85,
        'C': 110,
        'D': 95,
        'S': 79
    },
    5930: {
        'ID': 5930,
        'name': 'ブルンゲル',
        'label': 'ブルンゲル',
        'weight': 135.0,
        'elements': ['WATER', 'GHOST'],
        'H': 100,
        'A': 60,
        'B': 70,
        'C': 85,
        'D': 105,
        'S': 60
    },
    5980: {
        'ID': 5980,
        'name': 'ナットレイ',
        'label': 'ナットレイ',
        'weight': 110.0,
        'elements': ['GRASS', 'STEEL'],
        'H': 74,
        'A': 94,
        'B': 131,
        'C': 54,
        'D': 116,
        'S': 20
    },
    6090: {
        'ID': 6090,
        'name': 'シャンデラ',
        'label': 'シャンデラ',
        'weight': 34.3,
        'elements': ['GHOST', 'FIRE'],
        'H': 60,
        'A': 55,
        'B': 90,
        'C': 145,
        'D': 90,
        'S': 80
    },
    6140: {
        'ID': 6140,
        'name': 'ツンベアー',
        'label': 'ツンベアー',
        'weight': 260.0,
        'elements': ['ICE'],
        'H': 95,
        'A': 130,
        'B': 80,
        'C': 70,
        'D': 80,
        'S': 50
    },
    6350: {
        'ID': 6350,
        'name': 'サザンドラ',
        'label': 'サザンドラ',
        'weight': 160.0,
        'elements': ['DARK', 'DRAGON'],
        'H': 92,
        'A': 105,
        'B': 90,
        'C': 125,
        'D': 90,
        'S': 98
    },
    6370: {
        'ID': 6370,
        'name': 'ウルガモス',
        'label': 'ウルガモス',
        'weight': 46.0,
        'elements': ['BUG', 'FIRE'],
        'H': 85,
        'A': 60,
        'B': 65,
        'C': 135,
        'D': 105,
        'S': 100
    },
    6390: {
        'ID': 6390,
        'name': 'テラキオン',
        'label': 'テラキオン',
        'weight': 260.0,
        'elements': ['ROCK', 'FIGHTING'],
        'H': 91,
        'A': 129,
        'B': 90,
        'C': 72,
        'D': 90,
        'S': 108
    },
    6420: {
        'ID': 6420,
        'name': '化身ボルトロス',
        'label': 'ボルトロス',
        'weight': 61.0,
        'elements': ['ELECTRIC', 'FLYING'],
        'H': 79,
        'A': 115,
        'B': 70,
        'C': 125,
        'D': 80,
        'S': 111
    },
    6421: {
        'ID': 6421,
        'name': '霊獣ボルトロス',
        'label': 'ボルトロス',
        'weight': 61.0,
        'elements': ['ELECTRIC', 'FLYING'],
        'H': 79,
        'A': 105,
        'B': 70,
        'C': 145,
        'D': 80,
        'S': 101
    },
    6450: {
        'ID': 6450,
        'name': '化身ランドロス',
        'label': 'ランドロス',
        'weight': 68.0,
        'elements': ['GROUND', 'FLYING'],
        'H': 89,
        'A': 125,
        'B': 90,
        'C': 115,
        'D': 80,
        'S': 101
    },
    6451: {
        'ID': 6451,
        'name': '霊獣ランドロス',
        'label': 'ランドロス',
        'weight': 68.0,
        'elements': ['GROUND', 'FLYING'],
        'H': 89,
        'A': 145,
        'B': 90,
        'C': 105,
        'D': 80,
        'S': 91
    },
    6580: {
        'ID': 6580,
        'name': 'ゲッコウガ',
        'label': 'ゲッコウガ',
        'weight': 40.0,
        'elements': ['WATER', 'DARK'],
        'H': 72,
        'A': 95,
        'B': 67,
        'C': 103,
        'D': 71,
        'S': 122
    },
    6630: {
        'ID': 6630,
        'name': 'ファイアロー',
        'label': 'ファイアロー',
        'weight': 24.5,
        'elements': ['FIRE', 'FLYING'],
        'H': 78,
        'A': 81,
        'B': 71,
        'C': 74,
        'D': 69,
        'S': 126
    },
    6810: {
        'ID': 6810,
        'name': 'シールドギルガルド',
        'label': 'ギルガルド',
        'weight': 53.0,
        'elements': ['STEEL', 'GHOST'],
        'H': 60,
        'A': 50,
        'B': 150,
        'C': 50,
        'D': 150,
        'S': 60
    },
    6811: {
        'ID': 6811,
        'name': 'ブレードギルガルド',
        'label': 'ギルガルド',
        'weight': 53.0,
        'elements': ['STEEL', 'GHOST'],
        'H': 60,
        'A': 150,
        'B': 50,
        'C': 150,
        'D': 50,
        'S': 60
    },
    7000: {
        'ID': 7000,
        'name': 'ニンフィア',
        'label': 'ニンフィア',
        'weight': 23.5,
        'elements': ['FAILY'],
        'H': 95,
        'A': 65,
        'B': 65,
        'C': 110,
        'D': 130,
        'S': 60
    },
    7780: {
        'ID': 7780,
        'name': 'ミミッキュ',
        'label': 'ミミッキュ',
        'weight': 0.7,
        'elements': ['GHOST', 'FAILY'],
        'H': 55,
        'A': 90,
        'B': 80,
        'C': 50,
        'D': 105,
        'S': 96
    },
    7850: {
        'ID': 7850,
        'name': 'カプ・コケコ',
        'label': 'カプ・コケコ',
        'weight': 20.5,
        'elements': ['ELECTRIC', 'FAILY'],
        'H': 70,
        'A': 115,
        'B': 85,
        'C': 95,
        'D': 75,
        'S': 130
    },
    7860: {
        'ID': 7860,
        'name': 'カプ・テテフ',
        'label': 'カプ・テテフ',
        'weight': 18.6,
        'elements': ['PSYCHIC', 'FAILY'],
        'H': 70,
        'A': 85,
        'B': 75,
        'C': 130,
        'D': 115,
        'S': 95
    },
    7880: {
        'ID': 7880,
        'name': 'カプ・レヒレ',
        'label': 'カプ・レヒレ',
        'weight': 21.2,
        'elements': ['WATER', 'FAILY'],
        'H': 70,
        'A': 75,
        'B': 115,
        'C': 95,
        'D': 130,
        'S': 85
    },
    7950: {
        'ID': 7950,
        'name': 'フェローチェ',
        'label': 'フェローチェ',
        'weight': 25.0,
        'elements': ['BUG', 'FIGHTING'],
        'H': 71,
        'A': 137,
        'B': 37,
        'C': 137,
        'D': 37,
        'S': 151
    },
    7970: {
        'ID': 7970,
        'name': 'テッカグヤ',
        'label': 'テッカグヤ',
        'weight': 999.9,
        'elements': ['STEEL', 'FLYING'],
        'H': 97,
        'A': 101,
        'B': 103,
        'C': 107,
        'D': 101,
        'S': 61
    }

};
module.exports = exports['default'];
},{}],12:[function(require,module,exports){
/**
 * sample-party-list.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = [

// 意地：     ADAMANT
// 控えめ：   MODEST
// 腕白：     IMPISH
// 図太い：   BOLD
// 慎重：     CAREFUL
// 穏やか：   CALM
// 陽気：     JOLLY
// 臆病：     TIMID

{
    'ウルガモス': {
        pokemonID: 6370,
        nature: 'MODEST',
        ability: '虫の知らせ',
        skillNameList: ['火炎放射', '虫のさざめき', '目覚めるパワー', '蝶の舞'],
        item: 'ラムの実',
        effortValue: { H: 4, A: 0, B: 0, C: 252, D: 0, S: 252 },
        hiddenElement: 'GROUND'
    },

    'バンギラス': {
        pokemonID: 2480,
        nature: 'ADAMANT',
        ability: '砂起こし',
        skillNameList: ['ストーンエッジ', '噛み砕く', '冷凍パンチ', '馬鹿力'],
        item: 'こだわりハチマキ',
        effortValue: { H: 252, A: 252, B: 4, C: 0, D: 0, S: 0 }
    },

    'キングドラ': {
        pokemonID: 2300,
        nature: 'MODEST',
        ability: 'すいすい',
        skillNameList: ['ハイドロポンプ', '波乗り', '流星群', '竜の波動'],
        item: 'こだわりメガネ',
        effortValue: { H: 4, A: 0, B: 0, C: 252, D: 0, S: 252 }
    },

    'ハッサム': {
        pokemonID: 2120,
        nature: 'ADAMANT',
        ability: 'テクニシャン',
        skillNameList: ['バレットパンチ', '虫食い', '電光石火', '剣の舞'],
        item: '命の珠',
        effortValue: { H: 236, A: 252, B: 20, C: 0, D: 0, S: 0 }
    },

    'ニョロトノ': {
        pokemonID: 1860,
        nature: 'BOLD',
        ability: '雨降らし',
        skillNameList: ['熱湯', '冷凍ビーム', '滅びの歌', 'アンコール'],
        item: '脱出ボタン',
        effortValue: { H: 252, A: 0, B: 252, C: 0, D: 4, S: 0 }
    },

    'ラティオス': {
        pokemonID: 3810,
        nature: 'TIMID',
        ability: '浮遊',
        skillNameList: ['流星群', 'サイコキネシス', '波乗り', '目覚めるパワー'],
        item: '白いハーブ',
        effortValue: { H: 4, A: 0, B: 0, C: 252, D: 0, S: 252 },
        hiddenElement: 'FIRE'
    }

}, {
    'ピカチュウ': {
        pokemonID: 250,
        nature: 'NAUGHTY',
        ability: '避雷針',
        skillNameList: ['ボルテッカー', 'はたき落とす', 'ほっぺすりすり', 'ボルトチェンジ'],
        item: '電気玉',
        effortValue: { H: 4, A: 252, B: 0, C: 0, D: 0, S: 252 }
    },

    'ボーマンダ': {
        pokemonID: 3730,
        nature: 'TIMID',
        ability: '威嚇',
        skillNameList: ['流星群', '大文字', 'ハイドロポンプ', '目覚めるパワー'],
        item: 'こだわりスカーフ',
        effortValue: { H: 4, A: 0, B: 0, C: 252, D: 0, S: 252 },
        hiddenElement: 'FLYING'
    },

    'ラプラス': {
        pokemonID: 1310,
        nature: 'BOLD',
        ability: '貯水',
        skillNameList: ['フリーズドライ', '波乗り', '目覚めるパワー', '氷の礫'],
        item: '突撃チョッキ',
        effortValue: { H: 252, A: 0, B: 252, C: 0, D: 4, S: 0 },
        hiddenElement: 'FIRE'
    },

    'ゴウカザル': {
        pokemonID: 3920,
        nature: 'JOLLY',
        ability: '鉄の拳',
        skillNameList: ['インファイト', 'オーバーヒート', 'アンコール', 'ステルスロック'],
        item: '気合のタスキ',
        effortValue: { H: 4, A: 252, B: 0, C: 0, D: 0, S: 252 }
    },

    '霊獣ランドロス': {
        pokemonID: 6451,
        nature: 'JOLLY',
        ability: '威嚇',
        skillNameList: ['地震', '岩なだれ', 'はたき落とす', 'とんぼ返り'],
        item: 'こだわりスカーフ',
        effortValue: { H: 4, A: 252, B: 0, C: 0, D: 0, S: 252 }
    },

    'カイリュー': {
        pokemonID: 1490,
        nature: 'ADAMANT',
        ability: 'マルチスケイル',
        skillNameList: ['逆鱗', '炎のパンチ', '神速', '竜の舞'],
        item: 'ラムの実',
        effortValue: { H: 4, A: 252, B: 0, C: 0, D: 0, S: 252 }
    }

}];
module.exports = exports['default'];
},{}],13:[function(require,module,exports){
/**
 * skill-table.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    '悪あがき': {
        'name': '悪あがき',
        'ruby': 'わるあがき',
        'elements': ['NORMAL'],
        'category': '物理',
        'power': 50,
        'accuracy': 0,
        'basePP': 1,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '電光石火': {
        'name': '電光石火',
        'ruby': 'でんこうせつか',
        'elements': ['NORMAL'],
        'category': '物理',
        'power': 40,
        'accuracy': 100,
        'basePP': 30,
        'contact': true,
        'sound': false,
        'priority': 1.0,
        'critical': 1.0,
        'additions': []
    },

    '神速': {
        'name': '神速',
        'ruby': 'しんそく',
        'elements': ['NORMAL'],
        'category': '物理',
        'power': 80,
        'accuracy': 100,
        'basePP': 5,
        'contact': true,
        'sound': false,
        'priority': 2.0,
        'critical': 1.0,
        'additions': []
    },

    '目覚めるパワー': {
        'name': '目覚めるパワー',
        'ruby': 'めざめるぱわー',
        'elements': ['NORMAL'],
        'category': '特殊',
        'power': 60,
        'accuracy': 100,
        'basePP': 15,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '馬鹿力': {
        'name': '馬鹿力',
        'ruby': 'ばかぢから',
        'elements': ['FIGHTING'],
        'category': '物理',
        'power': 120,
        'accuracy': 100,
        'basePP': 5,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    'インファイト': {
        'name': 'インファイト',
        'ruby': 'いんふあいと',
        'elements': ['FIGHTING'],
        'category': '物理',
        'power': 120,
        'accuracy': 100,
        'basePP': 5,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '跳び膝蹴り': {
        'name': '跳び膝蹴り',
        'ruby': 'とびひざげり',
        'elements': ['FIGHTING'],
        'category': '物理',
        'power': 130,
        'accuracy': 90,
        'basePP': 10,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '毒づき': {
        'name': '毒づき',
        'ruby': 'どくづき',
        'elements': ['POISON'],
        'category': '物理',
        'power': 80,
        'accuracy': 100,
        'basePP': 20,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Poison',
            'probability': 30
        }]
    },

    '地震': {
        'name': '地震',
        'ruby': 'じしん',
        'elements': ['GROUND'],
        'category': '物理',
        'power': 100,
        'accuracy': 100,
        'basePP': 10,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '岩石封じ': {
        'name': '岩石封じ',
        'ruby': 'がんせきふうじ',
        'elements': ['ROCK'],
        'category': '物理',
        'power': 60,
        'accuracy': 95,
        'basePP': 15,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'DownS1',
            'probability': 100
        }]
    },

    '岩なだれ': {
        'name': '岩なだれ',
        'ruby': 'いわなだれ',
        'elements': ['ROCK'],
        'category': '物理',
        'power': 75,
        'accuracy': 90,
        'basePP': 10,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Stun',
            'probability': 30
        }]
    },

    'ストーンエッジ': {
        'name': 'ストーンエッジ',
        'ruby': 'すとおんえつじ',
        'elements': ['ROCK'],
        'category': '物理',
        'power': 100,
        'accuracy': 80,
        'basePP': 5,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 2.0,
        'additions': []
    },

    '虫食い': {
        'name': '虫食い',
        'ruby': 'むしくい',
        'elements': ['BUG'],
        'category': '物理',
        'power': 60,
        'accuracy': 100,
        'basePP': 20,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    'とんぼ返り': {
        'name': 'とんぼ返り',
        'ruby': 'とんぼがえり',
        'elements': ['BUG'],
        'category': '物理',
        'power': 70,
        'accuracy': 100,
        'basePP': 20,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '虫のさざめき': {
        'name': '虫のさざめき',
        'ruby': 'むしのさざめき',
        'elements': ['BUG'],
        'category': '特殊',
        'power': 90,
        'accuracy': 100,
        'basePP': 10,
        'contact': false,
        'sound': true,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'DownD1',
            'probability': 10
        }]
    },

    'バレットパンチ': {
        'name': 'バレットパンチ',
        'ruby': 'ばれつとぱんち',
        'elements': ['STEEL'],
        'category': '物理',
        'power': 40,
        'accuracy': 100,
        'basePP': 30,
        'contact': true,
        'sound': false,
        'priority': 1.0,
        'critical': 1.0,
        'additions': []
    },

    '炎の牙': {
        'name': '炎の牙',
        'ruby': 'ほのおのきば',
        'elements': ['FIRE'],
        'category': '物理',
        'power': 65,
        'accuracy': 95,
        'basePP': 15,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Burn',
            'probability': 10
        }, {
            'target': 'opponent',
            'category': 'Stun',
            'probability': 10
        }]
    },

    '炎のパンチ': {
        'name': '炎のパンチ',
        'ruby': 'ほのおのぱんち',
        'elements': ['FIRE'],
        'category': '物理',
        'power': 75,
        'accuracy': 100,
        'basePP': 15,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Burn',
            'probability': 10
        }]
    },

    'フレアドライブ': {
        'name': 'フレアドライブ',
        'ruby': 'ふれあどらいぶ',
        'elements': ['FIRE'],
        'category': '物理',
        'power': 120,
        'accuracy': 100,
        'basePP': 15,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Burn',
            'probability': 10
        }]
    },

    '火炎放射': {
        'name': '火炎放射',
        'ruby': 'かえんほうしゃ',
        'elements': ['FIRE'],
        'category': '特殊',
        'power': 90,
        'accuracy': 100,
        'basePP': 15,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Burn',
            'probability': 10
        }]
    },

    '大文字': {
        'name': '大文字',
        'ruby': 'だいもんじ',
        'elements': ['FIRE'],
        'category': '特殊',
        'power': 110,
        'accuracy': 85,
        'basePP': 5,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Burn',
            'probability': 10
        }]
    },

    'オーバーヒート': {
        'name': 'オーバーヒート',
        'ruby': 'おおばあひいと',
        'elements': ['FIRE'],
        'category': '特殊',
        'power': 130,
        'accuracy': 90,
        'basePP': 5,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '熱湯': {
        'name': '熱湯',
        'ruby': 'ねつとう',
        'elements': ['WATER'],
        'category': '特殊',
        'power': 80,
        'accuracy': 100,
        'basePP': 15,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Burn',
            'probability': 30
        }]
    },

    '波乗り': {
        'name': '波乗り',
        'ruby': 'なみのり',
        'elements': ['WATER'],
        'category': '特殊',
        'power': 90,
        'accuracy': 100,
        'basePP': 15,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    'ハイドロポンプ': {
        'name': 'ハイドロポンプ',
        'ruby': 'はいどろぽんぷ',
        'elements': ['WATER'],
        'category': '特殊',
        'power': 110,
        'accuracy': 80,
        'basePP': 5,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    'ほっぺすりすり': {
        'name': 'ほっぺすりすり',
        'ruby': 'ほつぺすりすり',
        'elements': ['ELECTRIC'],
        'category': '物理',
        'power': 20,
        'accuracy': 100,
        'basePP': 20,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Paralysis',
            'probability': 100
        }]
    },

    'ボルトチェンジ': {
        'name': 'ボルトチェンジ',
        'ruby': 'ぼるとちえんじ',
        'elements': ['ELECTRIC'],
        'category': '物理',
        'power': 70,
        'accuracy': 100,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    'ボルテッカー': {
        'name': 'ボルテッカー',
        'ruby': 'ぼるてつかあ',
        'elements': ['ELECTRIC'],
        'category': '物理',
        'power': 120,
        'accuracy': 100,
        'basePP': 15,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Paralysis',
            'probability': 10
        }]
    },

    '10万ボルト': {
        'name': '10万ボルト',
        'ruby': 'じゆうまんぼると',
        'elements': ['ELECTRIC'],
        'category': '特殊',
        'power': 90,
        'accuracy': 100,
        'basePP': 15,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Paralysis',
            'probability': 10
        }]
    },

    '冷凍パンチ': {
        'name': '冷凍パンチ',
        'ruby': 'れいとうぱんち',
        'elements': ['ICE'],
        'category': '物理',
        'power': 75,
        'accuracy': 100,
        'basePP': 15,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Freeze',
            'probability': 10
        }]
    },

    '氷の礫': {
        'name': '氷の礫',
        'ruby': 'こおりのつぶて',
        'elements': ['ICE'],
        'category': '物理',
        'power': 40,
        'accuracy': 100,
        'basePP': 30,
        'contact': false,
        'sound': false,
        'priority': 1.0,
        'critical': 1.0,
        'additions': []
    },

    'フリーズドライ': {
        'name': 'フリーズドライ',
        'ruby': 'ふりいずどらい',
        'elements': ['ICE'],
        'category': '特殊',
        'power': 70,
        'accuracy': 100,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Freeze',
            'probability': 10
        }]
    },

    '冷凍ビーム': {
        'name': '冷凍ビーム',
        'ruby': 'れいとうびいむ',
        'elements': ['ICE'],
        'category': '特殊',
        'power': 90,
        'accuracy': 100,
        'basePP': 10,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'Freeze',
            'probability': 10
        }]
    },

    'サイコキネシス': {
        'name': 'サイコキネシス',
        'ruby': 'さいこきねしす',
        'elements': ['PSYCHIC'],
        'category': '特殊',
        'power': 90,
        'accuracy': 100,
        'basePP': 10,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'DownD1',
            'probability': 10
        }]
    },

    '逆鱗': {
        'name': '逆鱗',
        'ruby': 'げきりん',
        'elements': ['DRAGON'],
        'category': '物理',
        'power': 120,
        'accuracy': 100,
        'basePP': 10,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '竜の波動': {
        'name': '竜の波動',
        'ruby': 'りゆうのはどう',
        'elements': ['DRAGON'],
        'category': '特殊',
        'power': 85,
        'accuracy': 100,
        'basePP': 10,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '流星群': {
        'name': '流星群',
        'ruby': 'りゆうせいぐん',
        'elements': ['DRAGON'],
        'category': '特殊',
        'power': 130,
        'accuracy': 90,
        'basePP': 5,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    'はたき落とす': {
        'name': 'はたき落とす',
        'ruby': 'はたきおとす',
        'elements': ['DARK'],
        'category': '物理',
        'power': 65,
        'accuracy': 100,
        'basePP': 20,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': []
    },

    '噛み砕く': {
        'name': '噛み砕く',
        'ruby': 'かみくだく',
        'elements': ['DARK'],
        'category': '物理',
        'power': 80,
        'accuracy': 100,
        'basePP': 15,
        'contact': true,
        'sound': false,
        'priority': 0.0,
        'critical': 1.0,
        'additions': [{
            'target': 'opponent',
            'category': 'DownB1',
            'probability': 20
        }]
    },

    '毒々': {
        'name': '毒々',
        'ruby': 'どくどく',
        'elements': ['POISON'],
        'category': '変化',
        'power': 0,
        'accuracy': 90,
        'basePP': 10,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    '電磁波': {
        'name': '電磁波',
        'ruby': 'でんじは',
        'elements': ['ELECTRIC'],
        'category': '変化',
        'power': 0,
        'accuracy': 90,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    '滅びの歌': {
        'name': '滅びの歌',
        'ruby': 'ほろびのうた',
        'elements': ['NORMAL'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 5,
        'contact': false,
        'sound': true,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    'アンコール': {
        'name': 'アンコール',
        'ruby': 'あんこおる',
        'elements': ['NORMAL'],
        'category': '変化',
        'power': 0,
        'accuracy': 100,
        'basePP': 5,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    '吠える': {
        'name': '吠える',
        'ruby': 'ほえる',
        'elements': ['NORMAL'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 20,
        'contact': false,
        'sound': true,
        'priority': -6.0,
        'critical': 0.0,
        'additions': []
    },

    '剣の舞': {
        'name': '剣の舞',
        'ruby': 'つるぎのまい',
        'elements': ['NORMAL'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    '悪巧み': {
        'name': '悪巧み',
        'ruby': 'わるだくみ',
        'elements': ['DARK'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    '竜の舞': {
        'name': '竜の舞',
        'ruby': 'りゆうのまい',
        'elements': ['DRAGON'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    '蝶の舞': {
        'name': '蝶の舞',
        'ruby': 'ちようのまい',
        'elements': ['BUG'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    '三日月の舞': {
        'name': '三日月の舞',
        'ruby': 'みかづきのまい',
        'elements': ['PSYCHIC'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 10,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    },

    'ステルスロック': {
        'name': 'ステルスロック',
        'ruby': 'すてるすろつく',
        'elements': ['ROCK'],
        'category': '変化',
        'power': 0,
        'accuracy': 0,
        'basePP': 20,
        'contact': false,
        'sound': false,
        'priority': 0.0,
        'critical': 0.0,
        'additions': []
    }

};
module.exports = exports['default'];
},{}],14:[function(require,module,exports){
/**
 * browser-event.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    // 必ず BROWSER_XXX の値を取ること

    UPDATE_PARTY: 'BROWSER_UPDATE_PARTY',
    SELECT_POKEMON: 'BROWSER_SELECT_POKEMON',
    UNSELECT_POKEMON: 'BROWSER_UNSELECT_POKEMON'

};
module.exports = exports['default'];
},{}],15:[function(require,module,exports){
/**
 * game-event.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    // 必ず GAME_XXX の値を取ること

    GAME_READY: 'GAME_GAME_READY',
    GAME_START: 'GAME_GAME_START',
    TURN_READY: 'GAME_TURN_READY',
    GAME_SET: 'GAME_GAME_SET',
    GAME_CLOSE: 'GAME_GAME_CLOSE',

    REQUEST_BATTLE_INFO: 'GAME_REQUEST_BATTLE_INFO',
    REQUEST_SKILL_MENU: 'GAME_REQUEST_SKILL_MENU',
    REQUEST_CHANGE_MENU: 'GAME_REQUEST_CHANGE_MENU',

    RETURN_TO_HAND: 'GAME_RETURN_TO_HAND',
    RETURN_TO_HAND_BY_SKILL: 'GAME_RETURN_TO_HAND_BY_SKILL',
    RETURN_TO_HAND_BY_EJECT_BUTTON: 'GAME_RETURN_TO_HAND_BY_EJECT_BUTTON',
    CHANGE_FOR_NEXT: 'GAME_CHANGE_FOR_NEXT'

};
module.exports = exports['default'];
},{}],16:[function(require,module,exports){
/**
 * message-event.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    // 必ず MESSAGE_XXX の値を取ること

    GAME_READY: 'MESSAGE_GAME_READY',
    GAME_START: 'MESSAGE_GAME_START',
    GAME_SET: 'MESSAGE_GAME_SET',
    TURN_READY: 'MESSAGE_TURN_READY',
    TURN_START: 'MESSAGE_TURN_START',
    TURN_END: 'MESSAGE_TURN_END',
    GAME_ALREADY_STARTED: 'MESSAGE_GAME_ALREADY_STARTED',
    GAME_NOT_STARTED: 'MESSAGE_GAME_NOT_STARTED',
    GAME_FORCE_QUIT: 'MESSAGE_GAME_FORCE_QUIT',

    REQUEST_BATTLE_INFO: 'MESSAGE_REQUEST_BATTLE_INFO',
    REQUEST_SKILL_MENU: 'MESSAGE_REQUEST_SKILL_MENU',
    REQUEST_CHANGE_MENU: 'MESSAGE_REQUEST_CHANGE_MENU',

    CONFIRM_RESIGN: 'MESSAGE_CONFIRM_RESIGN',

    POKEMON_ALREADY_DEAD: 'MESSAGE_POKEMON_ALREADY_DEAD',
    POKEMON_DAMAGED_BY_SKILL: 'MESSAGE_POKEMON_DAMAGED_BY_SKILL',
    POKEMON_DAMAGED_BY_RECOIL: 'MESSAGE_POKEMON_DAMAGED_BY_RECOIL',
    POKEMON_DEAD: 'MESSAGE_POKEMON_DEAD',

    RESIGN: 'MESSAGE_RESIGN',

    SKILL: 'MESSAGE_SKILL',
    SKILL_SUPER_EFFECTIVE: 'MESSAGE_SKILL_SUPER_EFFECTIVE',
    SKILL_NOT_EFFECTIVE: 'MESSAGE_SKILL_NOT_EFFECTIVE',
    SKILL_FAILURE_BY_PP_LOST: 'MESSAGE_SKILL_FAILURE_BY_PP_LOST',
    SKILL_CANCEL_BY_ABILITY: 'MESSAGE_SKILL_CANCEL_BY_ABILITY',
    SKILL_CANCEL_BY_ELEMENT: 'MESSAGE_SKILL_CANCEL_BY_ELEMENT',
    SKILL_NO_DAMAGE: 'MESSAGE_SKILL_NO_DAMAGE',

    ITEM_STEEL_AND_EAT: 'MESSAGE_ITEM_STEEL_AND_EAT',

    COME_INTO_PLAY: 'MESSAGE_COME_INTO_PLAY',
    RETURN_TO_HAND: 'MESSAGE_RETURN_TO_HAND',
    RETURN_TO_HAND_BY_SKILL: 'MESSAGE_RETURN_TO_HAND_BY_SKILL',
    RETURN_TO_HAND_BY_EJECT_BUTTON: 'MESSAGE_RETURN_TO_HAND_BY_EJECT_BUTTON',
    CHANGE_FOR_NEXT: 'MESSAGE_CHANGE_FOR_NEXT',

    CIP_MOLD_BREAKER: 'MESSAGE_CIP_MOLD_BREAKER',
    CIP_INTIMIDATE: 'MESSAGE_CIP_INTIMIDATE',
    CIP_PRESSURE: 'MESSAGE_CIP_PRESSURE',
    CIP_DOWNLOAD: 'MESSAGE_CIP_DOWNLOAD',
    CIP_TRACE: 'MESSAGE_CIP_TRACE',
    CIP_DROUGHT: 'MESSAGE_CIP_DROUGHT',
    CIP_DRIZZLE: 'MESSAGE_CIP_DRIZZLE',
    CIP_SAND_STREAM: 'MESSAGE_CIP_SAND_STREAM',
    CIP_SNOW_WARNING: 'MESSAGE_CIP_SNOW_WARNING',
    CIP_ELECTIRIC_SURGE: 'MESSAGE_CIP_ELECTIRIC_SURGE',
    CIP_MISTY_SURGE: 'MESSAGE_CIP_MISTY_SURGE',
    CIP_PSYCHIC_SURGE: 'MESSAGE_CIP_PSYCHIC_SURGE',
    CIP_BALLOON: 'MESSAGE_CIP_BALLOON',

    RANKUP_A: 'MESSAGE_RANKUP_A',
    RANKUP_B: 'MESSAGE_RANKUP_B',
    RANKUP_C: 'MESSAGE_RANKUP_C',
    RANKUP_D: 'MESSAGE_RANKUP_D',
    RANKUP_S: 'MESSAGE_RANKUP_S',
    RANKDOWN_A: 'MESSAGE_RANKDOWN_A',
    RANKDOWN_B: 'MESSAGE_RANKDOWN_B',
    RANKDOWN_C: 'MESSAGE_RANKDOWN_C',
    RANKDOWN_D: 'MESSAGE_RANKDOWN_D',
    RANKDOWN_S: 'MESSAGE_RANKDOWN_S',
    NOT_RANKUP_A: 'MESSAGE_NOT_RANKUP_A',
    NOT_RANKUP_B: 'MESSAGE_NOT_RANKUP_B',
    NOT_RANKUP_C: 'MESSAGE_NOT_RANKUP_C',
    NOT_RANKUP_D: 'MESSAGE_NOT_RANKUP_D',
    NOT_RANKUP_S: 'MESSAGE_NOT_RANKUP_S',
    NOT_RANKDOWN_A: 'MESSAGE_NOT_RANKDOWN_A',
    NOT_RANKDOWN_B: 'MESSAGE_NOT_RANKDOWN_B',
    NOT_RANKDOWN_C: 'MESSAGE_NOT_RANKDOWN_C',
    NOT_RANKDOWN_D: 'MESSAGE_NOT_RANKDOWN_D',
    NOT_RANKDOWN_S: 'MESSAGE_NOT_RANKDOWN_S',

    HEAL: 'MESSAGE_HEAL',

    HELP_GAME: 'MESSAGE_HELP_GAME'

};
module.exports = exports['default'];
},{}],17:[function(require,module,exports){
/**
 * game-master.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilObservable = require('../util/observable');

var _utilObservable2 = _interopRequireDefault(_utilObservable);

var _action2 = require('./action');

var _action3 = _interopRequireDefault(_action2);

var _eventGameEvent = require('./event/game-event');

var _eventGameEvent2 = _interopRequireDefault(_eventGameEvent);

var _gameStatus = require('./game-status');

var _gameStatus2 = _interopRequireDefault(_gameStatus);

var _eventMessageEvent = require('./event/message-event');

var _eventMessageEvent2 = _interopRequireDefault(_eventMessageEvent);

var _rulePlayer = require('./rule/player');

var _rulePlayer2 = _interopRequireDefault(_rulePlayer);

var _rulePlayerID = require('./rule/playerID');

var _rulePlayerID2 = _interopRequireDefault(_rulePlayerID);

var _pokemonController = require('./pokemon-controller');

var _pokemonController2 = _interopRequireDefault(_pokemonController);

var _pokemonInfo = require('./pokemon-info');

var _pokemonInfo2 = _interopRequireDefault(_pokemonInfo);

var GameMaster = (function (_Observable) {
    _inherits(GameMaster, _Observable);

    function GameMaster() {
        _classCallCheck(this, GameMaster);

        _get(Object.getPrototypeOf(GameMaster.prototype), 'constructor', this).call(this);
        this.PLAYER_ID = new _rulePlayerID2['default'](1);
        this.OPPONENT_ID = new _rulePlayerID2['default'](2);
        this._status = _gameStatus2['default'].IDLE;
        this._info = new _pokemonInfo2['default']();
        this._controller = this._createController();
    }

    _createClass(GameMaster, [{
        key: 'addObserver',
        value: function addObserver(observer) {
            this._controller.addObserver(observer);
            _get(Object.getPrototypeOf(GameMaster.prototype), 'addObserver', this).call(this, observer);
        }
    }, {
        key: 'change',
        value: function change(playerID, targetPokemonIndex) {
            this._action(playerID, _action3['default'].CHANGE, targetPokemonIndex);
            this._postActionSelected();
        }
    }, {
        key: 'changeBySkill',
        value: function changeBySkill(playerID, targetPokemonIndex) {
            this._action(playerID, _action3['default'].CHANGE_BY_SKILL, targetPokemonIndex);
            this._postActionSelected(1);
        }
    }, {
        key: 'close',
        value: function close() {
            this._controller.close();
            this._status = _gameStatus2['default'].CLOSED;
        }
    }, {
        key: 'confirmResign',
        value: function confirmResign(playerID) {
            if (this._status !== _gameStatus2['default'].BATTLE) {
                this._notifyAllObserver(_eventMessageEvent2['default'].GAME_NOT_STARTED);
                throw new Error("Game not started. [confirmResign]");
            }
            this._notifyAllObserver(_eventMessageEvent2['default'].CONFIRM_RESIGN, playerID);
        }
    }, {
        key: 'end',
        value: function end(force) {
            if (this._status !== _gameStatus2['default'].IDLE) {
                if (force) {
                    this._notifyAllObserver(_eventMessageEvent2['default'].GAME_FORCE_QUIT);
                }
                this._status = _gameStatus2['default'].IDLE;
            }
        }
    }, {
        key: 'help',
        value: function help() {
            this._controller.help(this._info, this.PLAYER_ID, this._status);
        }
    }, {
        key: 'initialize',
        value: function initialize(playerName, opponentName) {
            if (this._status !== _gameStatus2['default'].IDLE) {
                this._notifyAllObserver(_eventMessageEvent2['default'].GAME_ALREADY_STARTED);
                throw new Error("Game already started. [initialize]");
            }
            this._info.clear();
            this._info.playerTable = this._createPlayerTable(playerName, opponentName);
            this._status = _gameStatus2['default'].STANDBY;
        }
    }, {
        key: 'next',
        value: function next(playerID, targetPokemonIndex) {
            this._action(playerID, _action3['default'].NEXT, targetPokemonIndex);
            this._postActionSelected(this._info.countDeadActivePokemon());
        }
    }, {
        key: 'ready',
        value: function ready(playerParty, opponentParty) {
            if (this._status !== _gameStatus2['default'].STANDBY) {
                // TODO 真面目にやる
                this._notifyAllObserver(_eventMessageEvent2['default'].GAME_ALREADY_STARTED);
                throw new Error("Game already started. [ready]");
            }
            this._info.partyTable = this._createPartyTable(playerParty, opponentParty);
            this._controller.ready(this._info, this.PLAYER_ID);
        }
    }, {
        key: 'requestChangeMenu',
        value: function requestChangeMenu(playerID) {
            var cancelable = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            if (this._status !== _gameStatus2['default'].BATTLE) {
                this._notifyAllObserver(_eventMessageEvent2['default'].GAME_NOT_STARTED);
                throw new Error("Game not started. [requestChangeMenu]");
            }
            this._notifyAllObserver(_eventMessageEvent2['default'].REQUEST_CHANGE_MENU, playerID, cancelable);
            this._notifyAllObserver(_eventGameEvent2['default'].REQUEST_CHANGE_MENU, playerID, cancelable);
        }
    }, {
        key: 'requestSkillMenu',
        value: function requestSkillMenu(playerID) {
            var cancelable = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            if (this._status !== _gameStatus2['default'].BATTLE) {
                this._notifyAllObserver(_eventMessageEvent2['default'].GAME_NOT_STARTED);
                throw new Error("Game not started. [requestSkillMenu]");
            }
            this._notifyAllObserver(_eventMessageEvent2['default'].REQUEST_SKILL_MENU, playerID, cancelable);
            this._notifyAllObserver(_eventGameEvent2['default'].REQUEST_SKILL_MENU, playerID, cancelable);
        }
    }, {
        key: 'resign',
        value: function resign(playerID) {
            this._action(playerID, _action3['default'].RESIGN);
            this._postActionSelected();
        }
    }, {
        key: 'skill',
        value: function skill(playerID, targetSkillIndex) {
            this._action(playerID, _action3['default'].SKILL, targetSkillIndex);
            this._postActionSelected();
        }
    }, {
        key: 'start',
        value: function start() {
            if (this._status !== _gameStatus2['default'].STANDBY) {
                // TODO 真面目にやる
                this._notifyAllObserver(_eventMessageEvent2['default'].GAME_ALREADY_STARTED);
                throw new Error("Game already started. [start]");
            }
            this._controller.start(this._info, this.PLAYER_ID);
            this._status = _gameStatus2['default'].BATTLE;
        }
    }, {
        key: '_action',
        value: function _action(playerID, actionType) {
            var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            if (this._status !== _gameStatus2['default'].BATTLE) {
                this._notifyAllObserver(_eventMessageEvent2['default'].GAME_NOT_STARTED);
                throw new Error('Game not started : ' + actionType);
            }
            this._info.setAction(playerID, actionType, target);
        }
    }, {
        key: '_createController',
        value: function _createController() {
            return new _pokemonController2['default']();
        }
    }, {
        key: '_createPartyTable',
        value: function _createPartyTable(playerParty, opponentParty) {
            var table = {};
            table[this.PLAYER_ID.value] = playerParty;
            table[this.OPPONENT_ID.value] = opponentParty;
            return table;
        }
    }, {
        key: '_createPlayerTable',
        value: function _createPlayerTable(playerName, opponentName) {
            var table = {};
            table[this.PLAYER_ID.value] = new _rulePlayer2['default'](this.PLAYER_ID, playerName);
            table[this.OPPONENT_ID.value] = new _rulePlayer2['default'](this.OPPONENT_ID, opponentName);
            return table;
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event) {
            var playerID = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
            var value = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            this.notifyAllObserver({ event: event, info: this._info, playerID: playerID, value: value });
        }
    }, {
        key: '_postActionSelected',
        value: function _postActionSelected() {
            var waitCount = arguments.length <= 0 || arguments[0] === undefined ? 2 : arguments[0];

            if (this._info.actionTableSize >= waitCount) {
                this._controller.turn(this._info);
            }
        }
    }, {
        key: 'info',
        get: function get() {
            return this._info.clone();
        }
    }, {
        key: 'status',
        get: function get() {
            return this._status;
        }
    }]);

    return GameMaster;
})(_utilObservable2['default']);

exports['default'] = GameMaster;
module.exports = exports['default'];
},{"../util/observable":41,"./action":8,"./event/game-event":15,"./event/message-event":16,"./game-status":18,"./pokemon-controller":20,"./pokemon-info":22,"./rule/player":29,"./rule/playerID":30}],18:[function(require,module,exports){
/**
 * game-status.jsx
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = {

    IDLE: 0x0001,

    STANDBY: 0x0002,

    BATTLE: 0x0003,

    CLOSED: 0x00FF

};
module.exports = exports["default"];
},{}],19:[function(require,module,exports){
/**
 * party-factor.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _ruleElement = require('./rule/element');

var _ruleElement2 = _interopRequireDefault(_ruleElement);

var _ruleItem = require('./rule/item');

var _ruleItem2 = _interopRequireDefault(_ruleItem);

var _ruleNature = require('./rule/nature');

var _ruleNature2 = _interopRequireDefault(_ruleNature);

var _ruleParty = require('./rule/party');

var _ruleParty2 = _interopRequireDefault(_ruleParty);

var _pokemonFactory = require('./pokemon-factory');

var _pokemonFactory2 = _interopRequireDefault(_pokemonFactory);

var _skillFactory = require('./skill-factory');

var _skillFactory2 = _interopRequireDefault(_skillFactory);

var PartyFactory = (function () {
    function PartyFactory() {
        _classCallCheck(this, PartyFactory);
    }

    _createClass(PartyFactory, [{
        key: 'create',
        value: function create(playerID, resourceTable) {
            var shuffle = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            var pokemonList = [];
            var pokemonFactory = this._createPokemonFactory();
            var skillFactory = this._createSkillFactory();
            Object.keys(resourceTable).forEach(function (key) {
                var source = resourceTable[key];
                var hiddenElement = _ruleElement2['default'][source.hiddenElement];
                var pokemon = pokemonFactory.create(source.pokemonID, playerID, _ruleNature2['default'][source.nature], source.ability, 50, 255, skillFactory.createByList(source.skillNameList, hiddenElement), new _ruleItem2['default'](source.item), { H: 31, A: 31, B: 31, C: 31, D: 31, S: 31 }, source.effortValue, hiddenElement);
                pokemon.playerID = playerID;
                pokemonList.push(pokemon);
            });
            if (shuffle) {
                return new _ruleParty2['default'](_utilCommonUtil2['default'].shuffleList(pokemonList));
            } else {
                return new _ruleParty2['default'](pokemonList);
            }
        }
    }, {
        key: '_createPokemonFactory',
        value: function _createPokemonFactory() {
            return new _pokemonFactory2['default']();
        }
    }, {
        key: '_createSkillFactory',
        value: function _createSkillFactory() {
            return new _skillFactory2['default']();
        }
    }]);

    return PartyFactory;
})();

exports['default'] = PartyFactory;
module.exports = exports['default'];
},{"../util/common-util":40,"./pokemon-factory":21,"./rule/element":23,"./rule/item":26,"./rule/nature":27,"./rule/party":28,"./skill-factory":37}],20:[function(require,module,exports){
/**
 * pokemon-controller.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilCommonUtil = require('../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _utilObservable = require('../util/observable');

var _utilObservable2 = _interopRequireDefault(_utilObservable);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _ruleFieldEffect = require('./rule/field-effect');

var _ruleFieldEffect2 = _interopRequireDefault(_ruleFieldEffect);

var _eventGameEvent = require('./event/game-event');

var _eventGameEvent2 = _interopRequireDefault(_eventGameEvent);

var _eventMessageEvent = require('./event/message-event');

var _eventMessageEvent2 = _interopRequireDefault(_eventMessageEvent);

var _rulePokemonUtil = require('./rule/pokemon-util');

var _rulePokemonUtil2 = _interopRequireDefault(_rulePokemonUtil);

var _ruleTerrain = require('./rule/terrain');

var _ruleTerrain2 = _interopRequireDefault(_ruleTerrain);

var _ruleWeather = require('./rule/weather');

var _ruleWeather2 = _interopRequireDefault(_ruleWeather);

var PokemonController = (function (_Observable) {
    _inherits(PokemonController, _Observable);

    function PokemonController() {
        _classCallCheck(this, PokemonController);

        _get(Object.getPrototypeOf(PokemonController.prototype), 'constructor', this).call(this);
    }

    _createClass(PokemonController, [{
        key: 'close',
        value: function close() {
            this._notifyAllObserver(_eventGameEvent2['default'].GAME_CLOSE);
        }
    }, {
        key: 'help',
        value: function help(info, playerID, status) {
            this._notifyAllObserver(_eventMessageEvent2['default'].HELP_GAME, info, playerID, status);
        }
    }, {
        key: 'ready',
        value: function ready(info, playerID) {
            this._notifyAllObserver(_eventMessageEvent2['default'].GAME_READY, info, playerID);
            this._notifyAllObserver(_eventGameEvent2['default'].GAME_READY, info, playerID);
        }
    }, {
        key: 'start',
        value: function start(info, playerID) {
            this._notifyAllObserver(_eventMessageEvent2['default'].GAME_START, info, playerID);
            this._notifyAllObserver(_eventGameEvent2['default'].GAME_START, info, playerID);
            var activePokemonList = info.getActivePokemonList();
            this._notifyAllObserver(_eventMessageEvent2['default'].COME_INTO_PLAY, info, playerID.opponentID);
            this._notifyAllObserver(_eventMessageEvent2['default'].COME_INTO_PLAY, info, playerID);
            this._cip(info, activePokemonList);
            this._notifyAllObserver(_eventMessageEvent2['default'].TURN_READY, info, playerID);
            this._notifyAllObserver(_eventGameEvent2['default'].TURN_READY, info, playerID);
        }
    }, {
        key: 'turn',
        value: function turn(info) {
            var _this = this;

            if (info.isTurnBreak()) {
                info.turnContinue();
            } else {
                this._notifyAllObserver(_eventMessageEvent2['default'].TURN_START, info);
            }

            var changeActionTable = {};
            var skillActionTable = {};
            var resignTable = {};
            var actionTable = info.actionTable;
            Object.keys(actionTable).forEach(function (key) {
                var action = actionTable[key];
                switch (action.type) {
                    case _action2['default'].SKILL:
                        skillActionTable[key] = action;
                        break;
                    case _action2['default'].CHANGE:
                    case _action2['default'].CHANGE_BY_SKILL:
                    case _action2['default'].NEXT:
                        changeActionTable[key] = action;
                        break;
                    case _action2['default'].RESIGN:
                        resignTable[key] = action;
                        break;
                    default:
                        throw new Error();
                }
            });

            this._resign(info, resignTable);

            if (!info.isGameOver()) {
                this._change(info, changeActionTable);
                this._skill(info, skillActionTable);
            }
            if (!info.isGameOver()) {
                info.turnInfo.downedPokemonList.forEach(function (pokemon) {
                    info.turnBreak();
                    var playerID = pokemon.playerID;
                    _this._notifyAllObserver(_eventMessageEvent2['default'].CHANGE_FOR_NEXT, info, playerID);
                    _this._notifyAllObserver(_eventGameEvent2['default'].CHANGE_FOR_NEXT, info, playerID);
                });
            }
            if (!info.isGameOver() && !info.isTurnBreak()) {
                var readyToNextTurn = !info.turnInfo.isAnyPokemonDowned();
                info.resetTurnInfo();
                if (readyToNextTurn) {
                    var playerID = info.getMainPlayerID();
                    this._notifyAllObserver(_eventMessageEvent2['default'].TURN_READY, info, playerID);
                    this._notifyAllObserver(_eventGameEvent2['default'].TURN_READY, info, playerID);
                }
            }
        }
    }, {
        key: '_calcSkillDamage',
        value: function _calcSkillDamage(attackerPokemon, defenderPokemon, skill, field, elementMatchup, critical) {
            var randomize = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];

            return _rulePokemonUtil2['default'].calcSkillDamage(attackerPokemon, defenderPokemon, skill, field, elementMatchup, critical, randomize);
        }
    }, {
        key: '_change',
        value: function _change(info, actionTable) {
            var _this2 = this;

            var core = function core(playerID, actionType, targetPokemonIndex) {
                switch (actionType) {
                    case _action2['default'].CHANGE:
                        _this2._returnToHand(info, playerID);
                        break;
                    default:
                        break;
                }
                info.setActivePokemonIndex(playerID, targetPokemonIndex);
                _this2._notifyAllObserver(_eventMessageEvent2['default'].COME_INTO_PLAY, info, playerID);
            };
            var keyList = Object.keys(actionTable);
            switch (keyList.length) {
                case 2:
                    {
                        var pokemonList = info.getActivePokemonList();
                        _rulePokemonUtil2['default'].sortByActiveS(pokemonList, info.field);
                        pokemonList.forEach(function (pokemon) {
                            var playerID = pokemon.playerID;
                            var action = actionTable[playerID.value];
                            var actionType = action.type;
                            var targetPokemonIndex = action.target;
                            core(playerID, actionType, targetPokemonIndex);
                            info.terminateAction(playerID);
                        });
                        this._cip(info, info.getActivePokemonList());
                    }
                    break;
                case 1:
                    {
                        var action = actionTable[keyList[0]];
                        var playerID = action.playerID;
                        var actionType = action.type;
                        var targetPokemonIndex = action.target;
                        core(playerID, actionType, targetPokemonIndex);
                        info.terminateAction(playerID);
                        this._cip(info, [info.getActivePokemon(playerID)]);
                    }
                    break;
                case 0:
                    break;
                default:
                    throw new Error();
            }
            return true;
        }
    }, {
        key: '_changeRank',
        value: function _changeRank(info, playerID, key, change) {
            var changed = info.changeActivePokemonRank(playerID, key, change);
            var getEvent = function getEvent(key, change) {
                switch (key) {
                    case 'A':
                        return change < 0 ? changed ? _eventMessageEvent2['default'].RANKDOWN_A : _eventMessageEvent2['default'].NOT_RANKDOWN_A : changed ? _eventMessageEvent2['default'].RANKUP_A : _eventMessageEvent2['default'].NOT_RANKUP_A;
                    case 'B':
                        return change < 0 ? changed ? _eventMessageEvent2['default'].RANKDOWN_B : _eventMessageEvent2['default'].NOT_RANKDOWN_B : changed ? _eventMessageEvent2['default'].RANKUP_B : _eventMessageEvent2['default'].NOT_RANKUP_B;
                    case 'C':
                        return change < 0 ? changed ? _eventMessageEvent2['default'].RANKDOWN_C : _eventMessageEvent2['default'].NOT_RANKDOWN_C : changed ? _eventMessageEvent2['default'].RANKUP_C : _eventMessageEvent2['default'].NOT_RANKUP_C;
                    case 'D':
                        return change < 0 ? changed ? _eventMessageEvent2['default'].RANKDOWN_D : _eventMessageEvent2['default'].NOT_RANKDOWN_D : changed ? _eventMessageEvent2['default'].RANKUP_D : _eventMessageEvent2['default'].NOT_RANKUP_D;
                    case 'S':
                        return change < 0 ? changed ? _eventMessageEvent2['default'].RANKDOWN_S : _eventMessageEvent2['default'].NOT_RANKDOWN_S : changed ? _eventMessageEvent2['default'].RANKUP_S : _eventMessageEvent2['default'].NOT_RANKUP_S;
                    default:
                        throw new Error();
                }
            };
            this._notifyAllObserver(getEvent(key, change), info, playerID, change);
        }
    }, {
        key: '_checkWinner',
        value: function _checkWinner(info) {
            var _this3 = this;

            info.turnInfo.downedPokemonList.forEach(function (pokemon) {
                var playerID = pokemon.playerID;
                if (info.isDeadAll(playerID)) {
                    var winnerID = playerID.opponentID;
                    info.gameOver();
                    _this3._notifyAllObserver(_eventGameEvent2['default'].GAME_SET, info, winnerID);
                    _this3._notifyAllObserver(_eventMessageEvent2['default'].GAME_SET, info, winnerID);
                }
            });
        }
    }, {
        key: '_cip',
        value: function _cip(info, pokemonList) {
            var _this4 = this;

            _rulePokemonUtil2['default'].sortByActiveS(pokemonList, info.field);
            pokemonList.forEach(function (pokemon) {
                switch (pokemon.ability) {
                    case '型破り':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_MOLD_BREAKER, info, pokemon.playerID);
                        break;
                    case '威嚇':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_INTIMIDATE, info, pokemon.playerID);
                        _this4._changeRank(info, pokemon.playerID.opponentID, 'A', -1);
                        break;
                    case 'プレッシャー':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_PRESSURE, info, pokemon.playerID);
                        break;
                    case 'ダウンロード':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_DOWNLOAD, info, pokemon.playerID);
                        // TODO ダウンロード実装
                        break;
                    case 'トレース':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_TRACE, info, pokemon.playerID);
                        // TODO トレース実装
                        break;
                    case '日照り':
                        if (!info.isWeather('晴れ')) {
                            _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_DROUGHT, info, pokemon.playerID);
                            var sunlight = _utilCommonUtil2['default'].deepCopy(_ruleWeather2['default'].HARSH_SUNLIGHT);
                            sunlight.count = !pokemon.item.used && pokemon.item.name == '熱い岩' ? 8 : 5;
                            info.setGlobalFieldEffect(_ruleFieldEffect2['default'].WEATHER, sunlight);
                        }
                        break;
                    case '雨降らし':
                        if (!info.isWeather('雨')) {
                            _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_DRIZZLE, info, pokemon.playerID);
                            var rain = _utilCommonUtil2['default'].deepCopy(_ruleWeather2['default'].RAIN);
                            rain.count = !pokemon.item.used && pokemon.item.name == '湿った岩' ? 8 : 5;
                            info.setGlobalFieldEffect(_ruleFieldEffect2['default'].WEATHER, rain);
                        }
                        break;
                    case '砂起こし':
                        if (!info.isWeather('砂嵐')) {
                            _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_SAND_STREAM, info, pokemon.playerID);
                            var sandstorm = _utilCommonUtil2['default'].deepCopy(_ruleWeather2['default'].SANDSTORM);
                            sandstorm.count = !pokemon.item.used && pokemon.item.name == 'さらさら岩' ? 8 : 5;
                            info.setGlobalFieldEffect(_ruleFieldEffect2['default'].WEATHER, sandstorm);
                        }
                        break;
                    case '雪降らし':
                        if (!info.isWeather('霰')) {
                            _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_SNOW_WARNING, info, pokemon.playerID);
                            var hail = _utilCommonUtil2['default'].deepCopy(_ruleWeather2['default'].HAIL);
                            hail.count = !pokemon.item.used && pokemon.item.name == '冷たい岩' ? 8 : 5;
                            info.setGlobalFieldEffect(_ruleFieldEffect2['default'].WEATHER, hail);
                        }
                        break;
                    case 'エレキメイカー':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_ELECTIRIC_SURGE, info, pokemon.playerID);
                        // TODO エレキメイカー実装
                        break;
                    case 'ミストメイカー':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_MISTY_SURGE, info, pokemon.playerID);
                        // TODO ミストメイカー実装
                        break;
                    case 'サイコメイカー':
                        _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_PSYCHIC_SURGE, info, pokemon.playerID);
                        // TODO サイコメイカー実装
                        break;
                    default:
                        break;
                }
                if (!pokemon.item.used) {
                    switch (pokemon.item.name) {
                        case '風船':
                            _this4._notifyAllObserver(_eventMessageEvent2['default'].CIP_BALLOON, info, pokemon.playerID);
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event, info, playerID, value) {
            this.notifyAllObserver({ event: event, info: info, playerID: playerID, value: value });
        }
    }, {
        key: '_resign',
        value: function _resign(info, actionTable) {
            var keyList = Object.keys(actionTable);
            switch (keyList.length) {
                case 2:
                case 1:
                    {
                        info.gameOver();
                        var action = actionTable[_utilCommonUtil2['default'].shuffleList(keyList)[0]];
                        var playerID = action.playerID;
                        var winnerID = playerID.opponentID;
                        this._notifyAllObserver(_eventMessageEvent2['default'].RESIGN, info, playerID);
                        this._notifyAllObserver(_eventMessageEvent2['default'].GAME_SET, info, winnerID);
                        this._notifyAllObserver(_eventGameEvent2['default'].GAME_SET, info, winnerID);
                    }
                    break;
                case 0:
                    break;
                default:
                    throw new Error();
            }
        }
    }, {
        key: '_returnToHand',
        value: function _returnToHand(info, playerID) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? _eventMessageEvent2['default'].RETURN_TO_HAND : arguments[2];

            info.clearActivePokemonStatusChange(playerID);
            info.clearActivePokemonRank(playerID);
            this._notifyAllObserver(message, info, playerID);
        }
    }, {
        key: '_skill',
        value: function _skill(info, actionTable) {
            var _this5 = this;

            var keyList = Object.keys(actionTable);
            switch (keyList.length) {
                case 2:
                    {
                        var pokemonList = info.getActivePokemonList();
                        _rulePokemonUtil2['default'].sortByPriority(pokemonList, actionTable, info.field);
                        pokemonList.some(function (pokemon) {
                            var playerID = pokemon.playerID;
                            var skillIndex = actionTable[playerID.value].target;
                            _this5._skillCore(info, actionTable, playerID);
                            info.terminateAction(playerID);
                            return info.isTurnBreak();
                        });
                    }
                    break;
                case 1:
                    {
                        var action = actionTable[keyList[0]];
                        var playerID = action.playerID;
                        var skillIndex = action.target;
                        this._skillCore(info, actionTable, playerID);
                        info.terminateAction(playerID);
                    }
                    break;
                case 0:
                    break;
                default:
                    throw new Error();
            }
        }
    }, {
        key: '_skillAttack',
        value: function _skillAttack(info, actionTable, playerID, skill) {
            var opponentID = playerID.opponentID;
            var attackerPokemon = info.getActivePokemon(playerID);
            var defenderPokemon = info.getActivePokemon(opponentID);
            if (defenderPokemon.isDead()) {
                // 相手ポケモンが既に倒れている
                this._notifyAllObserver(_eventMessageEvent2['default'].POKEMON_ALREADY_DEAD, info, opponentID);
                return;
            }
            var cancelByAbility = _rulePokemonUtil2['default'].isCancelByAbility(defenderPokemon, skill);
            if (cancelByAbility) {
                // 特性による無効化
                this._notifyAllObserver(_eventMessageEvent2['default'].SKILL_CANCEL_BY_ABILITY, info, opponentID, skill);
                switch (defenderPokemon.ability) {
                    case '貰い火':
                        // TODO 貰い火
                        break;
                    case '草食':
                        this._changeRank(info, opponentID, 'A', 1);
                        break;
                    case '呼び水':
                    case '避雷針':
                        this._changeRank(info, opponentID, 'C', 1);
                        break;
                    case '電気エンジン':
                        this._changeRank(info, opponentID, 'S', 1);
                        break;
                    case '貯水':
                    case '乾燥肌':
                    case '蓄電':
                        if (!defenderPokemon.isFullH()) {
                            // TODO HP25％回復
                            this._notifyAllObserver(_eventMessageEvent2['default'].HEAL, info, opponentID);
                        }
                        break;
                    case '化けの皮':
                        // TODO 化けの皮
                        break;
                    default:
                        break;
                }
                return;
            }
            // TODO 半減実発動判定
            var elementMatchup = _rulePokemonUtil2['default'].calcElementMatchupFactor(defenderPokemon, skill);
            if (elementMatchup === 0.0) {
                // タイプ相性による無効化
                this._notifyAllObserver(_eventMessageEvent2['default'].SKILL_CANCEL_BY_ELEMENT, info, opponentID, skill);
                return;
            } else if (elementMatchup > 1.0) {
                this._notifyAllObserver(_eventMessageEvent2['default'].SKILL_SUPER_EFFECTIVE, info, opponentID);
            } else if (elementMatchup < 1.0) {
                this._notifyAllObserver(_eventMessageEvent2['default'].SKILL_NOT_EFFECTIVE, info, opponentID);
            }
            // TODO 急所判定
            var critical = false;
            var damage = Math.min(this._calcSkillDamage(attackerPokemon, defenderPokemon, skill, info.field, elementMatchup, critical), defenderPokemon.activeH);
            if (damage === 0) {
                this._notifyAllObserver(_eventMessageEvent2['default'].SKILL_NO_DAMAGE, info, opponentID);
                return;
            }
            this._notifyAllObserver(_eventMessageEvent2['default'].POKEMON_DAMAGED_BY_SKILL, info, opponentID, damage);
            if (defenderPokemon.decreaseH(damage) === 0) {
                // ダメージによって倒した
                this._notifyAllObserver(_eventMessageEvent2['default'].POKEMON_DEAD, info, opponentID);
                defenderPokemon.die();
                info.addDownedPokemon(defenderPokemon);
            }
            // TODO 一般追加効果
            var skillName = skill.name;
            switch (skillName) {
                case '馬鹿力':
                    this._changeRank(info, playerID, 'A', -1);
                    this._changeRank(info, playerID, 'B', -1);
                    break;
                case 'インファイト':
                    this._changeRank(info, playerID, 'B', -1);
                    this._changeRank(info, playerID, 'D', -1);
                    break;
                case '逆鱗':
                    // TODO 状態変化：逆鱗
                    break;
                case 'オーバーヒート':
                case 'リーフストーム':
                case '流星群':
                    this._changeRank(info, playerID, 'C', -2);
                    break;
                case 'はたき落とす':
                    defenderPokemon.setItemUsed();
                    this._notifyAllObserver(_eventMessageEvent2['default'].ITEM_LOST_BY_KNOCK_OFF, info, opponentID);
                    break;
            }
            info.updateActivePokemon(playerID, attackerPokemon);
            info.updateActivePokemon(opponentID, defenderPokemon);
            // 反動計算
            switch (skillName) {
                case '捨て身タックル':
                case 'ブレイブバード':
                case 'フレアドライブ':
                case 'ボルテッカー':
                    {
                        var recoil = Math.floor(damage * 0.33);
                        this._notifyAllObserver(_eventMessageEvent2['default'].POKEMON_DAMAGED_BY_RECOIL, info, playerID, recoil);
                        if (attackerPokemon.decreaseH(recoil) === 0) {
                            // 反動で倒れた
                            this._notifyAllObserver(_eventMessageEvent2['default'].POKEMON_DEAD, info, playerID);
                            attackerPokemon.die();
                            info.addDownedPokemon(attackerPokemon);
                        }
                    }
                    break;
                case '虫食い':
                    {
                        var defenderPokemonItem = defenderPokemon.item;
                        if (!defenderPokemonItem.used && _rulePokemonUtil2['default'].isBerry(defenderPokemonItem)) {
                            defenderPokemon.setItemUsed = true;
                            this._notifyAllObserver(_eventMessageEvent2['default'].ITEM_STEEL_AND_EAT, info, playerID, defenderPokemonItem.name);
                            switch (defenderPokemonItem.name) {
                                case 'オボンの実':
                                    // TODO オボンの実
                                    break;
                                case 'ラムの実':
                                    // TODO ラムの実
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            this._checkWinner(info);

            if (!info.isGameOver()) {
                // スキルやアイテムの効果による交代
                switch (defenderPokemon.item.name) {
                    case '脱出ボタン':
                        if (!defenderPokemon.isDead() && !info.isLastPokemon(opponentID)) {
                            info.turnBreak();
                            this._returnToHand(info, opponentID, _eventMessageEvent2['default'].RETURN_TO_HAND_BY_EJECT_BUTTON);
                            this._notifyAllObserver(_eventGameEvent2['default'].RETURN_TO_HAND_BY_EJECT_BUTTON, info, opponentID);
                        }
                        break;
                    case 'レッドカード':
                        // TODO レッドカード
                        break;
                    default:
                        switch (skillName) {
                            case 'とんぼ返り':
                            case 'ボルトチェンジ':
                                // 相手が脱出した場合交代しない
                                // TODO 命の珠の反動との兼ね合い
                                if (!attackerPokemon.isDead() && !info.isLastPokemon(playerID)) {
                                    info.turnBreak();
                                    this._returnToHand(info, playerID, _eventMessageEvent2['default'].RETURN_TO_HAND_BY_SKILL);
                                    this._notifyAllObserver(_eventGameEvent2['default'].RETURN_TO_HAND_BY_SKILL, info, playerID);
                                }
                                break;
                            default:
                                break;
                        }
                        break;
                }
            }
        }
    }, {
        key: '_skillCore',
        value: function _skillCore(info, actionTable, playerID) {
            var skillIndex = actionTable[playerID.value].target;
            var pokemon = info.getActivePokemon(playerID);
            if (pokemon.isDead()) {
                return;
            }
            // TODO 追い討ち使用済みチェック
            // TODO アンコールによる強制技選択
            var skill = pokemon.getSkill(skillIndex);
            // TODO 熱湯による凍結解凍
            // TODO フレアドライブによる凍結解凍
            // TODO 状態異常による行動不能
            // TODO 挑発による技使用失敗
            // TODO 金縛りによる技使用失敗
            if (pokemon.getPP(skillIndex) === 0) {
                this._notifyAllObserver(_eventMessageEvent2['default'].SKILL_FAILURE_BY_PP_LOST, info, playerID, skill);
                return;
            }
            // TODO PP消費

            this._notifyAllObserver(_eventMessageEvent2['default'].SKILL, info, playerID, skill.name);
            switch (skill.category) {
                case '物理':
                case '特殊':
                    this._skillAttack(info, actionTable, playerID, skill);
                    break;
                case '変化':
                    this._skillSupport(info, actionTable, playerID, skill);
                    break;
                default:
                    throw new Error();
            }
        }
    }, {
        key: '_skillSupport',
        value: function _skillSupport(info, actionTable, playerID, skill) {
            var opponentID = playerID.opponentID;
            switch (skill.name) {
                case '毒々':
                    // TODO 毒々
                    break;
                case '電磁波':
                    // TODO 電磁波
                    break;
                case '滅びの歌':
                    // TODO 滅びの歌
                    break;
                case 'アンコール':
                    // TODO アンコール
                    break;
                case '吠える':
                case '吹き飛ばし':
                    // TODO 吹き飛ばし
                    break;
                case '剣の舞':
                    this._changeRank(info, playerID, 'A', 2);
                    break;
                case '悪巧み':
                    this._changeRank(info, playerID, 'C', 2);
                    break;
                case '竜の舞':
                    this._changeRank(info, playerID, 'A', 1);
                    this._changeRank(info, playerID, 'S', 1);
                    break;
                case '蝶の舞':
                    this._changeRank(info, playerID, 'C', 1);
                    this._changeRank(info, playerID, 'D', 1);
                    this._changeRank(info, playerID, 'S', 1);
                    break;
                case '三日月の舞':
                    // TODO 三日月の舞
                    break;
                case 'ステルスロック':
                    // TODO ステルスロック
                    break;
                default:
                    break;
            }
        }
    }]);

    return PokemonController;
})(_utilObservable2['default']);

exports['default'] = PokemonController;
module.exports = exports['default'];
},{"../util/common-util":40,"../util/observable":41,"./action":8,"./event/game-event":15,"./event/message-event":16,"./rule/field-effect":24,"./rule/pokemon-util":31,"./rule/terrain":35,"./rule/weather":36}],21:[function(require,module,exports){
/**
 * pokemon-factory.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _ruleElement = require('./rule/element');

var _ruleElement2 = _interopRequireDefault(_ruleElement);

var _rulePlayerID = require('./rule/playerID');

var _rulePlayerID2 = _interopRequireDefault(_rulePlayerID);

var _rulePokemon = require('./rule/pokemon');

var _rulePokemon2 = _interopRequireDefault(_rulePokemon);

var _dataPokemonTable = require('./data/pokemon-table');

var _dataPokemonTable2 = _interopRequireDefault(_dataPokemonTable);

var PokemonFactory = (function () {
    function PokemonFactory() {
        _classCallCheck(this, PokemonFactory);

        this._pokemonTable = _utilCommonUtil2['default'].deepCopy(_dataPokemonTable2['default']);
    }

    _createClass(PokemonFactory, [{
        key: 'create',
        value: function create(pokemonID, playerID, nature, ability, level, happiness, skillList, item, individualValue, effortValue) {
            var hiddenElement = arguments.length <= 10 || arguments[10] === undefined ? _ruleElement2['default'].NONE : arguments[10];

            var source = this._pokemonTable[pokemonID];
            var pokemon = new _rulePokemon2['default'](pokemonID, source.name, source.label, source.weight, this._convertElementList(source.elements), nature, ability, level, happiness, skillList, item, { H: source.H, A: source.A, B: source.B, C: source.C, D: source.D, S: source.S }, individualValue, effortValue, hiddenElement);
            pokemon.playerID = playerID ? _utilCommonUtil2['default'].deepCopy(playerID) : new _rulePlayerID2['default']();
            return pokemon;
        }
    }, {
        key: '_convertElementList',
        value: function _convertElementList(sourceList) {
            return sourceList.map(function (key) {
                return _ruleElement2['default'][key];
            });
        }
    }]);

    return PokemonFactory;
})();

exports['default'] = PokemonFactory;
module.exports = exports['default'];
},{"../util/common-util":40,"./data/pokemon-table":11,"./rule/element":23,"./rule/playerID":30,"./rule/pokemon":32}],22:[function(require,module,exports){
/**
 * pokemon-info.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _ruleField = require('./rule/field');

var _ruleField2 = _interopRequireDefault(_ruleField);

var _ruleParty = require('./rule/party');

var _ruleParty2 = _interopRequireDefault(_ruleParty);

var _rulePlayer = require('./rule/player');

var _rulePlayer2 = _interopRequireDefault(_rulePlayer);

var _turnInfo = require('./turn-info');

var _turnInfo2 = _interopRequireDefault(_turnInfo);

var PokemonInfo = (function () {
    function PokemonInfo(field, playerTable, partyTable) {
        _classCallCheck(this, PokemonInfo);

        this.field = field;
        this.playerTable = playerTable;
        this.partyTable = partyTable;
        this._gameOver = false;
        this._turnInfo = new _turnInfo2['default']();
    }

    _createClass(PokemonInfo, [{
        key: 'addDownedPokemon',
        value: function addDownedPokemon(pokemon) {
            this._turnInfo.addDownedPokemon(pokemon);
        }
    }, {
        key: 'changeActivePokemonRank',
        value: function changeActivePokemonRank(playerID, key, change) {
            var party = this._partyTable[playerID.value];
            var pokemon = party.getActivePokemon();
            try {
                return pokemon.changeRank(key, change);
            } finally {
                party.updateActivePokemon(pokemon);
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.field = null;
            this.playerTable = null;
            this.partyTable = null;
            this._gameOver = false;
            this._turnInfo = new _turnInfo2['default']();
        }
    }, {
        key: 'clearActivePokemonRank',
        value: function clearActivePokemonRank(playerID) {
            var party = this._partyTable[playerID.value];
            var pokemon = party.getActivePokemon();
            pokemon.resetRank();
            party.updateActivePokemon(pokemon);
        }
    }, {
        key: 'clearActivePokemonStatusChange',
        value: function clearActivePokemonStatusChange(playerID) {
            var party = this._partyTable[playerID.value];
            var pokemon = party.getActivePokemon();
            pokemon.resetStatusChangeTable();
            party.updateActivePokemon(pokemon);
        }
    }, {
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'countDeadActivePokemon',
        value: function countDeadActivePokemon() {
            var _this = this;

            var count = 0;
            Object.keys(this._partyTable).forEach(function (playerID) {
                if (_this._partyTable[playerID].getActivePokemon().isDead()) {
                    count++;
                }
            });
            return count;
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            this._gameOver = true;
        }
    }, {
        key: 'getActivePokemon',
        value: function getActivePokemon(playerID) {
            return this._partyTable[playerID.value].getActivePokemon();
        }
    }, {
        key: 'getActivePokemonList',
        value: function getActivePokemonList() {
            var _this2 = this;

            var pokemonList = [];
            Object.keys(this._partyTable).forEach(function (playerID) {
                pokemonList.push(_this2._partyTable[playerID].getActivePokemon());
            });
            return pokemonList;
        }
    }, {
        key: 'getGlobalFieldEffect',
        value: function getGlobalFieldEffect(key) {
            return this._field.getGlobalEffect(key);
        }
    }, {
        key: 'getMainPlayerID',
        value: function getMainPlayerID() {
            return this._playerTable[1].playerID;
        }
    }, {
        key: 'getParty',
        value: function getParty(playerID) {
            return _utilCommonUtil2['default'].deepCopy(this._partyTable[playerID.value]);
        }
    }, {
        key: 'getPlayer',
        value: function getPlayer(playerID) {
            return _utilCommonUtil2['default'].deepCopy(this._playerTable[playerID.value]);
        }
    }, {
        key: 'isActionSelected',
        value: function isActionSelected(playerID) {
            return playerID.value in this._turnInfo._actionTable;
        }
    }, {
        key: 'isDeadAll',
        value: function isDeadAll(playerID) {
            return this._partyTable[playerID.value].isDeadAllSelected();
        }
    }, {
        key: 'isGameOver',
        value: function isGameOver() {
            return _utilCommonUtil2['default'].deepCopy(this._gameOver);
        }
    }, {
        key: 'isLastPokemon',
        value: function isLastPokemon(playerID) {
            var party = this._partyTable[playerID.value];
            var activePokemonIndex = party.activePokemonIndex;
            return !party.selectedPokemonList.some(function (pokemon, index) {
                return index !== activePokemonIndex && !pokemon.isDead();
            });
        }
    }, {
        key: 'isTurnBreak',
        value: function isTurnBreak() {
            return this._turnInfo.isTurnBreak();
        }
    }, {
        key: 'isWeather',
        value: function isWeather(weatherName) {
            return this._field.isWeather(weatherName);
        }
    }, {
        key: 'resetTurnInfo',
        value: function resetTurnInfo() {
            this._turnInfo.clear();
        }
    }, {
        key: 'setAction',
        value: function setAction(playerID, actionType) {
            var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            this._turnInfo.setAction(playerID, actionType, target);
        }
    }, {
        key: 'setActivePokemonIndex',
        value: function setActivePokemonIndex(playerID, activePokemonIndex) {
            this._partyTable[playerID.value].activePokemonIndex = activePokemonIndex;
        }
    }, {
        key: 'setGlobalFieldEffect',
        value: function setGlobalFieldEffect(key, value) {
            this._field.setGlobalEffect(key, value);
        }
    }, {
        key: 'terminateAction',
        value: function terminateAction(playerID) {
            delete this._turnInfo.terminateAction(playerID);
        }
    }, {
        key: 'turnBreak',
        value: function turnBreak() {
            this._turnInfo.turnBreak();
        }
    }, {
        key: 'turnContinue',
        value: function turnContinue() {
            this._turnInfo.turnContinue();
        }
    }, {
        key: 'updateActivePokemon',
        value: function updateActivePokemon(playerID, pokemon) {
            var party = this._partyTable[playerID.value];
            party.updateActivePokemon(_utilCommonUtil2['default'].deepCopy(pokemon));
        }
    }, {
        key: 'actionTable',
        get: function get() {
            return this._turnInfo.actionTable;
        }
    }, {
        key: 'actionTableSize',
        get: function get() {
            return this._turnInfo.actionTableSize;
        }
    }, {
        key: 'field',
        get: function get() {
            return this._field.clone();
        },
        set: function set(value) {
            this._field = value ? value.clone() : new _ruleField2['default']();
        }
    }, {
        key: 'playerTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._playerTable);
        },
        set: function set(value) {
            this._playerTable = value ? _utilCommonUtil2['default'].deepCopy(value) : { 1: new _rulePlayer2['default'](), 2: new _rulePlayer2['default']() };
        }
    }, {
        key: 'partyTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._partyTable);
        },
        set: function set(value) {
            this._partyTable = value ? _utilCommonUtil2['default'].deepCopy(value) : { 1: new _ruleParty2['default'](), 2: new _ruleParty2['default']() };
        }
    }, {
        key: 'turnInfo',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._turnInfo);
        }
    }]);

    return PokemonInfo;
})();

exports['default'] = PokemonInfo;
module.exports = exports['default'];
},{"../util/common-util":40,"./rule/field":25,"./rule/party":28,"./rule/player":29,"./turn-info":38}],23:[function(require,module,exports){
/**
 * element.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    NONE: {
        key: 'NONE',
        name: '',
        label: '　',
        attackTo: function attackTo(element) {
            return 1.0;
        }
    },

    NORMAL: {
        key: 'NORMAL',
        name: '無',
        label: 'ノーマル',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '岩':
                case '鋼':
                    return 0.5;
                case '霊':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    FIGHTING: {
        key: 'FIGHTING',
        name: '闘',
        label: '格闘',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '無':
                case '岩':
                case '鋼':
                case '氷':
                case '悪':
                    return 2.0;
                case '飛':
                case '毒':
                case '虫':
                case '超':
                case '妖':
                    return 0.5;
                case '霊':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    FLYING: {
        key: 'FLYING',
        name: '飛',
        label: '飛行',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '闘':
                case '虫':
                case '草':
                    return 2.0;
                case '岩':
                case '鋼':
                case '電':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    POISON: {
        key: 'POISON',
        name: '毒',
        label: '毒',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '草':
                case '妖':
                    return 2.0;
                case '毒':
                case '地':
                case '岩':
                case '霊':
                    return 0.5;
                case '鋼':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    GROUND: {
        key: 'GROUND',
        name: '地',
        label: '地面',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '毒':
                case '岩':
                case '鋼':
                case '炎':
                case '電':
                    return 2.0;
                case '虫':
                case '草':
                    return 0.5;
                case '飛':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    ROCK: {
        key: 'ROCK',
        name: '岩',
        label: '岩',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '飛':
                case '虫':
                case '炎':
                case '氷':
                    return 2.0;
                case '闘':
                case '地':
                case '鋼':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    BUG: {
        key: 'BUG',
        name: '虫',
        label: '虫',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '草':
                case '超':
                case '悪':
                    return 2.0;
                case '闘':
                case '飛':
                case '毒':
                case '霊':
                case '鋼':
                case '炎':
                case '妖':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    GHOST: {
        key: 'GHOST',
        name: '霊',
        label: 'ゴースト',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '霊':
                case '超':
                    return 2.0;
                case '悪':
                    return 0.5;
                case '無':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    STEEL: {
        key: 'STEEL',
        name: '鋼',
        label: '鋼',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '岩':
                case '氷':
                case '妖':
                    return 2.0;
                case '鋼':
                case '炎':
                case '水':
                case '電':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    FIRE: {
        key: 'FIRE',
        name: '炎',
        label: '炎',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '虫':
                case '鋼':
                case '草':
                case '氷':
                    return 2.0;
                case '岩':
                case '炎':
                case '水':
                case '竜':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    WATER: {
        key: 'WATER',
        name: '水',
        label: '水',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '地':
                case '岩':
                case '炎':
                    return 2.0;
                case '水':
                case '草':
                case '竜':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    GRASS: {
        key: 'GRASS',
        name: '草',
        label: '草',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '地':
                case '岩':
                case '水':
                    return 2.0;
                case '飛':
                case '毒':
                case '虫':
                case '鋼':
                case '炎':
                case '草':
                case '竜':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    ELECTRIC: {
        key: 'ELECTRIC',
        name: '電',
        label: '電気',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '飛':
                case '水':
                    return 2.0;
                case '草':
                case '電':
                case '竜':
                    return 0.5;
                case '地':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    ICE: {
        key: 'ICE',
        name: '氷',
        label: '氷',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '飛':
                case '地':
                case '草':
                case '竜':
                    return 2.0;
                case '鋼':
                case '炎':
                case '水':
                case '氷':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    PSYCHIC: {
        key: 'PSYCHIC',
        name: '超',
        label: 'エスパー',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '闘':
                case '毒':
                    return 2.0;
                case '鋼':
                case '超':
                    return 0.5;
                case '悪':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    DRAGON: {
        key: 'DRAGON',
        name: '竜',
        label: 'ドラゴン',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '竜':
                    return 2.0;
                case '鋼':
                    return 0.5;
                case '妖':
                    return 0.0;
                default:
                    return 1.0;
            }
        }
    },

    DARK: {
        key: 'DARK',
        name: '悪',
        label: '悪',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '霊':
                case '超':
                    return 2.0;
                case '闘':
                case '悪':
                case '妖':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    },

    FAIRY: {
        key: 'FAIRY',
        name: '妖',
        label: 'フェアリー',
        attackTo: function attackTo(element) {
            switch (element.name) {
                case '闘':
                case '竜':
                case '悪':
                    return 2.0;
                case '毒':
                case '鋼':
                case '炎':
                    return 0.5;
                default:
                    return 1.0;
            }
        }
    }

};
module.exports = exports['default'];
},{}],24:[function(require,module,exports){
/**
 * field-effect.jsx
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = {

    WEATHER: 0x000001,
    TERRAIN: 0x000002,
    TRICK_ROOM: 0x000003,

    REFLECT: 0x010001,
    LIGHT_SCREEN: 0x010002,
    SAFEGUARD: 0x010003,
    TAILWIND: 0x010004,
    MAT_BLOCK: 0x010005,

    SPIKES: 0x020001,
    TOXIC_SPIKES: 0x020002,
    STEALTH_ROCK: 0x020003

};
module.exports = exports["default"];
},{}],25:[function(require,module,exports){
/**
 * field.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _fieldEffect = require('./field-effect');

var _fieldEffect2 = _interopRequireDefault(_fieldEffect);

var _weather = require('./weather');

var _weather2 = _interopRequireDefault(_weather);

var Field = (function () {
    function Field(globalEffectTable, playerEffectTable) {
        _classCallCheck(this, Field);

        this.globalEffectTable = globalEffectTable;
        this.playerEffectTable = playerEffectTable;
    }

    _createClass(Field, [{
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'getGlobalEffect',
        value: function getGlobalEffect(key) {
            return _utilCommonUtil2['default'].deepCopy(this._globalEffectTable[key]);
        }
    }, {
        key: 'hasGlobalEffect',
        value: function hasGlobalEffect(key) {
            return key in this._globalEffectTable;
        }
    }, {
        key: 'hasPlayerEffect',
        value: function hasPlayerEffect(playerID, key) {
            var playerEffectTable = this._playerEffectTable[playerID.value];
            return playerEffectTable && key in playerEffectTable;
        }
    }, {
        key: 'isWeather',
        value: function isWeather(weatherName) {
            var weather = this._globalEffectTable[_fieldEffect2['default'].WEATHER];
            return weather && weather.name === weatherName;
        }
    }, {
        key: 'setGlobalEffect',
        value: function setGlobalEffect(key, value) {
            this._globalEffectTable[key] = _utilCommonUtil2['default'].deepCopy(value);
        }
    }, {
        key: 'resetGlobalEffectTable',
        value: function resetGlobalEffectTable() {
            this._globalEffectTable = {};
        }
    }, {
        key: 'globalEffectTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._globalEffectTable);
        },
        set: function set(value) {
            this._globalEffectTable = value ? _utilCommonUtil2['default'].deepCopy(value) : {};
        }
    }, {
        key: 'playerEffectTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._playerEffectTable);
        },
        set: function set(value) {
            this._playerEffectTable = value ? _utilCommonUtil2['default'].deepCopy(value) : {};
        }
    }]);

    return Field;
})();

exports['default'] = Field;
module.exports = exports['default'];
},{"../../util/common-util":40,"./field-effect":24,"./weather":36}],26:[function(require,module,exports){
/**
 * item.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var Item = (function () {
    function Item(name, used) {
        _classCallCheck(this, Item);

        this.name = name;
        this.used = used;
    }

    _createClass(Item, [{
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'name',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._name);
        },
        set: function set(value) {
            this._name = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }, {
        key: 'used',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._used);
        },
        set: function set(value) {
            this._used = value ? _utilCommonUtil2['default'].deepCopy(value) : !this._name;
        }
    }]);

    return Item;
})();

exports['default'] = Item;
module.exports = exports['default'];
},{"../../util/common-util":40}],27:[function(require,module,exports){
/**
 * nature.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    DEFAULT: { key: 'DEFAULT', label: '―――――', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 1.0, S: 1.0 },

    HARDY: { key: 'HARDY', label: '頑張り屋', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 1.0, S: 1.0 },

    DOCILE: { key: 'DOCILE', label: '素直', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 1.0, S: 1.0 },

    SERIOUS: { key: 'SERIOUS', label: '真面目', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 1.0, S: 1.0 },

    BASHFUL: { key: 'BASHFUL', label: '照れ屋', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 1.0, S: 1.0 },

    QUIRKY: { key: 'QUIRKY', label: '気まぐれ', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 1.0, S: 1.0 },

    LONELY: { key: 'LONELY', label: '寂しがり', H: 1.0, A: 1.1, B: 0.9, C: 1.0, D: 1.0, S: 1.0 },

    ADAMANT: { key: 'ADAMANT', label: '意地っ張り', H: 1.0, A: 1.1, B: 1.0, C: 0.9, D: 1.0, S: 1.0 },

    NAUGHTY: { key: 'NAUGHTY', label: 'やんちゃ', H: 1.0, A: 1.1, B: 1.0, C: 1.0, D: 0.9, S: 1.0 },

    BRAVE: { key: 'BRAVE', label: '勇敢', H: 1.0, A: 1.1, B: 1.0, C: 1.0, D: 1.0, S: 0.9 },

    BOLD: { key: 'BOLD', label: '図太い', H: 1.0, A: 0.9, B: 1.1, C: 1.0, D: 1.0, S: 1.0 },

    IMPISH: { key: 'IMPISH', label: '腕白', H: 1.0, A: 1.0, B: 1.1, C: 0.9, D: 1.0, S: 1.0 },

    LAX: { key: 'LAX', label: '能天気', H: 1.0, A: 1.0, B: 1.1, C: 1.0, D: 0.9, S: 1.0 },

    RELAXED: { key: 'RELAXED', label: '呑気', H: 1.0, A: 1.0, B: 1.1, C: 1.0, D: 1.0, S: 0.9 },

    MODEST: { key: 'MODEST', label: '控えめ', H: 1.0, A: 0.9, B: 1.0, C: 1.1, D: 1.0, S: 1.0 },

    MILD: { key: 'MILD', label: 'おっとり', H: 1.0, A: 1.0, B: 0.9, C: 1.1, D: 1.0, S: 1.0 },

    RASH: { key: 'RASH', label: 'うっかり屋', H: 1.0, A: 1.0, B: 1.0, C: 1.1, D: 0.9, S: 1.0 },

    QUIET: { key: 'QUIET', label: '冷静', H: 1.0, A: 1.0, B: 1.0, C: 1.1, D: 1.0, S: 0.9 },

    CALM: { key: 'CALM', label: '穏やか', H: 1.0, A: 0.9, B: 1.0, C: 1.0, D: 1.1, S: 1.0 },

    GENTLE: { key: 'GENTLE', label: 'おとなしい', H: 1.0, A: 1.0, B: 0.9, C: 1.0, D: 1.1, S: 1.0 },

    CAREFUL: { key: 'CAREFUL', label: '慎重', H: 1.0, A: 1.0, B: 1.0, C: 0.9, D: 1.1, S: 1.0 },

    SASSY: { key: 'SASSY', label: '生意気', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 1.1, S: 0.9 },

    TIMID: { key: 'TIMID', label: '臆病', H: 1.0, A: 0.9, B: 1.0, C: 1.0, D: 1.0, S: 1.1 },

    HASTY: { key: 'HASTY', label: 'せっかち', H: 1.0, A: 1.0, B: 0.9, C: 1.0, D: 1.0, S: 1.1 },

    JOLLY: { key: 'JOLLY', label: '陽気', H: 1.0, A: 1.0, B: 1.0, C: 0.9, D: 1.0, S: 1.1 },

    NAIVE: { key: 'NAIVE', label: '無邪気', H: 1.0, A: 1.0, B: 1.0, C: 1.0, D: 0.9, S: 1.1 }

};
module.exports = exports['default'];
},{}],28:[function(require,module,exports){
/**
 * party.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var Party = (function () {
    function Party(sourcePokemonList, selectedPokemonList) {
        var activePokemonIndex = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        _classCallCheck(this, Party);

        this.sourcePokemonList = sourcePokemonList;
        this.selectedPokemonList = selectedPokemonList;
        this.activePokemonIndex = activePokemonIndex;
    }

    _createClass(Party, [{
        key: 'clear',
        value: function clear() {
            this._sourcePokemonList = [];
            this._selectedPokemonList = [];
            this._activePokemonIndex = 0;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'forEach',
        value: function forEach(lambda, baseObject) {
            this._sourcePokemonList.forEach(lambda, baseObject);
        }
    }, {
        key: 'forEachSelected',
        value: function forEachSelected(lambda, baseObject) {
            this._selectedPokemonList.forEach(lambda, baseObject);
        }
    }, {
        key: 'getActivePokemon',
        value: function getActivePokemon() {
            return _utilCommonUtil2['default'].deepCopy(this._selectedPokemonList[this._activePokemonIndex]);
        }
    }, {
        key: 'isDeadAllSelected',
        value: function isDeadAllSelected() {
            return !this._selectedPokemonList.some(function (pokemon) {
                return !pokemon.isDead();
            });
        }
    }, {
        key: 'push',
        value: function push(pokemon) {
            if (pokemon) {
                this._sourcePokemonList.push(_utilCommonUtil2['default'].deepCopy(pokemon));
            }
        }
    }, {
        key: 'resetSelect',
        value: function resetSelect() {
            this._selectedPokemonList = [];
        }
    }, {
        key: 'select',
        value: function select(pokemonIndexList) {
            var _this = this;

            try {
                this._selectedPokemonList = [];
                pokemonIndexList.forEach(function (index) {
                    _this._selectedPokemonList.push(_utilCommonUtil2['default'].deepCopy(_this._sourcePokemonList[index]));
                });
                return this;
            } finally {
                this._activePokemonIndex = 0;
            }
        }
    }, {
        key: 'updateActivePokemon',
        value: function updateActivePokemon(pokemon) {
            this._selectedPokemonList[this._activePokemonIndex] = _utilCommonUtil2['default'].deepCopy(pokemon);
        }
    }, {
        key: 'sourcePokemonList',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._sourcePokemonList);
        },
        set: function set(value) {
            this._sourcePokemonList = value ? _utilCommonUtil2['default'].deepCopy(value) : [];
        }
    }, {
        key: 'selectedPokemonList',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._selectedPokemonList);
        },
        set: function set(value) {
            this._selectedPokemonList = value ? _utilCommonUtil2['default'].deepCopy(value) : [];
        }
    }, {
        key: 'activePokemonIndex',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._activePokemonIndex);
        },
        set: function set(value) {
            this._activePokemonIndex = value ? _utilCommonUtil2['default'].deepCopy(value) : 0;
        }
    }]);

    return Party;
})();

exports['default'] = Party;
module.exports = exports['default'];
},{"../../util/common-util":40}],29:[function(require,module,exports){
/**
 * player.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _playerID = require('./playerID');

var _playerID2 = _interopRequireDefault(_playerID);

var Player = (function () {
    function Player(playerID, name) {
        _classCallCheck(this, Player);

        this.playerID = playerID;
        this.name = name;
    }

    _createClass(Player, [{
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'playerID',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._playerID);
        },
        set: function set(value) {
            this._playerID = value ? _utilCommonUtil2['default'].deepCopy(value) : new _playerID2['default']();
        }
    }, {
        key: 'name',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._name);
        },
        set: function set(value) {
            this._name = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }]);

    return Player;
})();

exports['default'] = Player;
module.exports = exports['default'];
},{"../../util/common-util":40,"./playerID":30}],30:[function(require,module,exports){
/**
 * playerID.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var PlayerID = (function () {
    function PlayerID(value) {
        _classCallCheck(this, PlayerID);

        this._value = value || 1;
    }

    _createClass(PlayerID, [{
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'value',
        get: function get() {
            return this._value;
        }
    }, {
        key: 'opponentID',
        get: function get() {
            return this._value == 1 ? new this.constructor(2) : new this.constructor(1);
        }
    }]);

    return PlayerID;
})();

exports['default'] = PlayerID;
module.exports = exports['default'];
},{"../../util/common-util":40}],31:[function(require,module,exports){
/**
 * pokemon-util.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fieldEffect = require('./field-effect');

var _fieldEffect2 = _interopRequireDefault(_fieldEffect);

var PokemonUtil = (function () {
    function PokemonUtil() {
        _classCallCheck(this, PokemonUtil);

        throw new Error("PokemonUtil is static class.");
    }

    _createClass(PokemonUtil, [{
        key: 'isBerry',
        value: function isBerry(item) {
            switch (item.name) {
                case 'オボンの実':
                case 'ラムの実':
                case 'ホズの実':
                case '半減の実：無':
                case 'ヨプの実':
                case '半減の実：闘':
                case 'バコウの実':
                case '半減の実：飛':
                case 'ビアーの実':
                case '半減の実：毒':
                case 'シュカの実':
                case '半減の実：地':
                case 'ヨロギの実':
                case '半減の実：岩':
                case 'タンガの実':
                case '半減の実：虫':
                case 'カシブの実':
                case '半減の実：霊':
                case 'リリバの実':
                case '半減の実：鋼':
                case 'オッカの実':
                case '半減の実：炎':
                case 'イトケの実':
                case '半減の実：水':
                case 'リンドの実':
                case '半減の実：草':
                case 'ソクノの実':
                case '半減の実：電':
                case 'ヤチェの実':
                case '半減の実：氷':
                case 'ウタンの実':
                case '半減の実：超':
                case 'ハバンの実':
                case '半減の実：竜':
                case 'ナモの実':
                case '半減の実：悪':
                case 'ロゼルの実':
                case '半減の実：妖':
                    return true;
                default:
                    return false;
            }
        }
    }], [{
        key: 'calcSkillDamage',
        value: function calcSkillDamage(attackerPokemon, defenderPokemon, skill, field, elementMatchup, critical) {
            var randomize = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];

            var base = Math.floor(attackerPokemon.level * 2 * 0.2) + 2;
            var skillPower = PokemonUtil.calcSkillPower(attackerPokemon, defenderPokemon, skill, field);
            var attackValue = PokemonUtil.calcAttackValue(attackerPokemon, skill, field, critical);
            var defenceValue = PokemonUtil.calcDefenceValue(defenderPokemon, skill, field, critical);
            var elementResistFactor = PokemonUtil.calcElementResistFactor(defenderPokemon, skill);
            var attackerPokemonAbility = attackerPokemon.ability;
            var attackerPokemonItem = attackerPokemon.item;
            var defenderPokemonItem = defenderPokemon.item;
            var attackerPokemonMaxH = PokemonUtil.calcActiveValue('H', attackerPokemon);
            var attackerPokemonActiveH = attackerPokemon.activeH;
            var damage = Math.floor(Math.floor(Math.floor(base * skillPower * attackValue / defenceValue) * 0.02) * elementResistFactor) + 2;
            damage = Math.floor(damage * PokemonUtil.calcWeatherFactor(skill, field));
            if (critical) {
                damage = Math.floor(damage * PokemonUtil.calcCriticalFactor(attackerPokemon));
            }
            if (randomize) {
                damage = Math.floor(damage * PokemonUtil.calcRandomFactor(skill));
            }
            damage = Math.floor(damage * PokemonUtil.calcElementReinforceFactor(attackerPokemon, skill));
            damage = Math.floor(damage * elementMatchup);
            damage = damage || 1; // 0ダメージはここで補整

            // 半減実補整
            if (!defenderPokemonItem.used) {
                switch (defenderPokemonItem.name) {
                    case 'ホズの実':
                    case '半減の実：無':
                        if (skill.hasElement('無')) {
                            damage = Math.floor(damage * 0.5);
                        }
                        break;
                    case 'ヨプの実':
                    case '半減の実：闘':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('闘')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'バコウの実':
                    case '半減の実：飛':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('飛')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ビアーの実':
                    case '半減の実：毒':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('毒')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'シュカの実':
                    case '半減の実：地':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('地')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ヨロギの実':
                    case '半減の実：岩':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('岩')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'タンガの実':
                    case '半減の実：虫':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('虫')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'カシブの実':
                    case '半減の実：霊':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('霊')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'リリバの実':
                    case '半減の実：鋼':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('鋼')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'オッカの実':
                    case '半減の実：炎':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('炎')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'イトケの実':
                    case '半減の実：水':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('水')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'リンドの実':
                    case '半減の実：草':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('草')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ソクノの実':
                    case '半減の実：電':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('電')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ヤチェの実':
                    case '半減の実：氷':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('氷')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ウタンの実':
                    case '半減の実：超':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('超')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ハバンの実':
                    case '半減の実：竜':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('竜')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ナモの実':
                    case '半減の実：悪':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('悪')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    case 'ロゼルの実':
                    case '半減の実：妖':
                        if (elementMatchup > 1.0) {
                            if (skill.hasElement('妖')) {
                                damage = Math.floor(damage * 0.5);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }

            // 特性補整
            switch (attackerPokemonAbility) {
                case '色眼鏡':
                    if (elementMatchup < 1.0) {
                        damage *= 2;
                    }
                    break;
                case 'フィルター':
                case 'ハードロック':
                    if (elementMatchup > 1.0) {
                        damage *= 0.75; // 切り捨て無し
                    }
                    break;
                case 'マルチスケイル':
                    if (attackerPokemonActiveH === attackerPokemonMaxH) {
                        damage = Math.floor(damage * 0.5);
                    }
                    break;
                default:
                    break;
            }

            // 道具補整
            if (!attackerPokemonItem.used) {
                switch (attackerPokemonItem.name) {
                    case '命の珠':
                        damage = PokemonUtil.round(damage * 1.3);
                        break;
                    case '達人の帯':
                        if (elementMatchup > 1.0) {
                            damage = PokemonUtil.round(damage * 1.2);
                        }
                        break;
                    default:
                        break;
                }
            }
            if (!critical) {
                damage = Math.floor(damage * PokemonUtil.calcWallFactor(defenderPokemon, skill, field));
            }
            return Math.floor(damage);
        }
    }, {
        key: 'calcSkillPower',
        value: function calcSkillPower(attackerPokemon, defenderPokemon, skill, field) {
            var attackerPokemonAbility = attackerPokemon.ability;
            var defenderPokemonAbility = defenderPokemon.ability;
            var attackerPokemonItem = attackerPokemon.item;
            var attackerPokemonMaxH = PokemonUtil.calcActiveValue('H', attackerPokemon);
            var attackerPokemonActiveH = attackerPokemon.activeH;
            var power = skill.power;
            switch (skill.name) {
                case 'はたき落とす':
                    if (!defenderPokemonItem.used) {
                        power = Math.floor(power * 1.5);
                    }
                    break;
                // TODO 潮吹き
                // TODO 噴火
                // TODO 追い討ち
                // TODO 雪なだれ
                // TODO しっぺ返し
                // TODO 空元気
                default:
                    break;
            }
            if (!attackerPokemonItem.used) {
                switch (attackerPokemonItem.name) {
                    case 'シルクのスカーフ':
                    case 'プレート：無':
                        if (skill.hasElement('無')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '拳のプレート':
                    case 'プレート：闘':
                        if (skill.hasElement('闘')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '青空プレート':
                    case 'プレート：飛':
                        if (skill.hasElement('飛')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '猛毒プレート':
                    case 'プレート：毒':
                        if (skill.hasElement('毒')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '大地のプレート':
                    case 'プレート：地':
                        if (skill.hasElement('地')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '岩石プレート':
                    case 'プレート：岩':
                        if (skill.hasElement('岩')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '玉虫プレート':
                    case 'プレート：虫':
                        if (skill.hasElement('虫')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '物の怪プレート':
                    case 'プレート：霊':
                        if (skill.hasElement('霊')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '鋼鉄プレート':
                    case 'プレート：鋼':
                        if (skill.hasElement('鋼')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '炎のプレート':
                    case 'プレート：炎':
                        if (skill.hasElement('炎')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '雫プレート':
                    case 'プレート：水':
                        if (skill.hasElement('水')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '緑のプレート':
                    case 'プレート：草':
                        if (skill.hasElement('草')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '雷プレート':
                    case 'プレート：電':
                        if (skill.hasElement('電')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '氷柱のプレート':
                    case 'プレート：氷':
                        if (skill.hasElement('氷')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '不思議のプレート':
                    case 'プレート：超':
                        if (skill.hasElement('超')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '竜のプレート':
                    case 'プレート：竜':
                        if (skill.hasElement('竜')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '強面プレート':
                    case 'プレート：悪':
                        if (skill.hasElement('悪')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '精霊プレート':
                    case 'プレート：妖':
                        if (skill.hasElement('妖')) {
                            power = PokemonUtil.round(power * 1.2);
                        }
                        break;
                    case '電気玉':
                        if (attackerPokemon.name === 'ピカチュウ') {
                            power *= 2;
                        }
                        break;
                    default:
                        break;
                }
            }
            switch (attackerPokemonAbility) {
                case 'テクニシャン':
                    if (power <= 60) {
                        power = Math.floor(power * 1.5);
                    }
                    break;
                case '力ずく':
                    if (skill.additions.length !== 0) {
                        power = Math.ceil(power * 1.3);
                    }
                    break;
                case '砂の力':
                    if (field.isWeather('砂嵐')) {
                        if (attackerPokemon.hasElement('地') || attackerPokemon.hasElement('岩') || attackerPokemon.hasElement('鋼')) {
                            power = Math.ceil(power * 1.3);
                        }
                    }
                    break;
                case '捨て身':
                    switch (skill.name) {
                        case 'アフロブレイク':
                        case 'ウッドハンマー':
                        case '地獄車':
                        case '捨て身タックル':
                        case '突進':
                        case '跳び蹴り':
                        case '跳び膝蹴り':
                        case '諸刃の頭突き':
                        case 'フレアドライブ':
                        case 'ブレイブバード':
                        case 'ボルテッカー':
                        case 'ワイルドボルト':
                            power = Math.ceil(power * 1.2);
                            break;
                        default:
                            break;
                    }
                    break;
                case '鉄の拳':
                    switch (skill.name) {
                        case 'アイスハンマー':
                        case 'アームハンマー':
                        case '雷パンチ':
                        case '気合パンチ':
                        case 'グロウパンチ':
                        case 'コメットパンチ':
                        case 'シャドーパンチ':
                        case 'スカイアッパー':
                        case 'ドレインパンチ':
                        case '爆裂パンチ':
                        case 'バレットパンチ':
                        case 'ピヨピヨパンチ':
                        case '炎のパンチ':
                        case 'マッハパンチ':
                        case 'メガトンパンチ':
                        case '冷凍パンチ':
                        case '連続パンチ':
                            power = Math.ceil(power * 1.2);
                            break;
                        default:
                            break;
                    }
                    break;
                case '虫の知らせ':
                    if (skill.hasElement('虫')) {
                        if (attackerPokemonActiveH <= Math.floor(attackerPokemonMaxH / 3)) {
                            power = Math.floor(power * 1.5);
                        }
                    }
                    break;
                case '猛火':
                    if (skill.hasElement('炎')) {
                        if (attackerPokemonActiveH <= Math.floor(attackerPokemonMaxH / 3)) {
                            power = Math.floor(power * 1.5);
                        }
                    }
                    break;
                case '激流':
                    if (skill.hasElement('水')) {
                        if (attackerPokemonActiveH <= Math.floor(attackerPokemonMaxH / 3)) {
                            power = Math.floor(power * 1.5);
                        }
                    }
                    break;
                case '深緑':
                    if (skill.hasElement('草')) {
                        if (attackerPokemonActiveH <= Math.floor(attackerPokemonMaxH / 3)) {
                            power = Math.floor(power * 1.5);
                        }
                    }
                    break;
                default:
                    break;
            }
            switch (defenderPokemonAbility) {
                case '乾燥肌':
                    if (skill.hasElement('炎')) {
                        power = PokemonUtil.round(power * 1.25);
                    }
                    break;
                default:
                    break;
            }
            // TODO 水遊び
            // TODO 泥遊び
            return power;
        }
    }, {
        key: 'calcAttackValue',
        value: function calcAttackValue(attackerPokemon, skill, field, critical) {
            var attackValueKey = skill.category === '物理' ? 'A' : 'C';
            var attackValueRank = Math.max(attackerPokemon.getRank(attackValueKey), critical ? 0 : -6);
            var attackerPokemonAbility = attackerPokemon.ability;
            var attackerPokemonItem = attackerPokemon.item;
            var value = PokemonUtil.calcActiveValue(attackValueKey, attackerPokemon);

            // 倍化特性補整
            switch (attackerPokemonAbility) {
                case '力持ち':
                case 'ヨガパワー':
                    if (attackValueKey === 'A') {
                        value *= 2;
                    }
                    break;
                default:
                    break;
            }

            // 火傷補整
            if (attackerPokemon.isAilment('火傷')) {
                if (attackValueKey === 'A') {
                    if (attackerPokemonAbility !== '根性') {
                        value = Math.floor(value * 0.5);
                    }
                }
            }

            // ランク補整
            value = Math.floor(value * PokemonUtil.calcRankFactor(attackValueRank));

            // 道具補整
            if (!attackerPokemonItem.used) {
                switch (attackerPokemonItem.name) {
                    case 'こだわりハチマキ':
                        if (attackValueKey === 'A') {
                            value = Math.floor(value * 1.5);
                        }
                        break;
                    case 'こだわりメガネ':
                        if (attackValueKey === 'C') {
                            value = Math.floor(value * 1.5);
                        }
                        break;
                    case '太い骨':
                        if (attackerPokemon.isName('ガラガラ') || attackerPokemon.isName('カラカラ')) {
                            if (attackValueKey === 'A') {
                                value *= 2;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }

            // 特性補整
            switch (attackerPokemonAbility) {
                case '根性':
                    if (attackerPokemon.isAilment()) {
                        if (attackValueKey === 'A') {
                            value = Math.floor(value * 1.5);
                        }
                    }
                    break;
                case 'はりきり':
                    if (attackValueKey === 'A') {
                        value = Math.floor(value * 1.5);
                    }
                    break;
                case 'サンパワー':
                    if (field.isWeather('晴れ')) {
                        if (attackValueKey === 'C') {
                            value = Math.floor(value * 1.5);
                        }
                    }
                    break;
                case '毒暴走':
                    if (attackerPokemon.isAilment('毒') || attackerPokemon.isAilment('猛毒')) {
                        if (attackValueKey === 'A') {
                            value = Math.floor(value * 1.5);
                        }
                    }
                    break;
                case '熱暴走':
                    if (attackerPokemon.isAilment('火傷')) {
                        if (attackValueKey === 'C') {
                            value = Math.floor(value * 1.5);
                        }
                    }
                    break;
                default:
                    break;
            }

            // 状態変化補整
            // TODO 貰い火
            return value;
        }
    }, {
        key: 'calcDefenceValue',
        value: function calcDefenceValue(defenderPokemon, skill, field, critical) {
            var defenceValueKey = skill.category === '物理' || skill.name === 'サイコショック' ? 'B' : 'D';
            var defenceValueRank = Math.min(defenderPokemon.getRank(defenceValueKey), critical ? 0 : 6);
            var defenderPokemonAbility = defenderPokemon.ability;
            var defenderPokemonItem = defenderPokemon.item;
            var value = PokemonUtil.calcActiveValue(defenceValueKey, defenderPokemon);

            // ランク補整
            value = Math.floor(value * PokemonUtil.calcRankFactor(defenceValueRank));

            // 道具補整
            if (!defenderPokemonItem.used) {
                switch (defenderPokemonItem.name) {
                    case '進化の輝石':
                        switch (defenderPokemon.name) {
                            case 'ピカチュウ':
                            case 'ラッキー':
                            case 'ポリゴン2':
                                value = Math.floor(value * 1.5);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }

            // 特性補整
            switch (defenderPokemonAbility) {
                case '不思議な鱗':
                    if (defenderPokemon.isAilment()) {
                        if (defenceValueKey === 'D') {
                            value = Math.floor(value * 1.5);
                        }
                    }
                    break;
                default:
                    break;
            }

            // 天候補整
            if (field.isWeather('砂嵐')) {
                if (defenderPokemon.hasElement('岩')) {
                    if (defenceValueKey === 'D') {
                        value = Math.floor(value * 1.5);
                    }
                }
            }
            return value;
        }
    }, {
        key: 'calcElementResistFactor',
        value: function calcElementResistFactor(defenderPokemon, skill) {
            switch (defenderPokemon.ability) {
                case '耐熱':
                    if (skill.hasElement('炎')) {
                        return 0.5;
                    }
                    break;
                case '厚い脂肪':
                    if (skill.hasElement('炎') || skill.hasElement('氷')) {
                        return 0.5;
                    }
                    break;
                default:
                    break;
            }
            return 1.0;
        }
    }, {
        key: 'calcWeatherFactor',
        value: function calcWeatherFactor(skill, field) {
            if (field.isWeather('晴れ')) {
                if (skill.hasElement('炎')) {
                    return 1.5;
                }
                if (skill.hasElement('水')) {
                    return 0.5;
                }
            }
            if (field.isWeather('雨')) {
                if (skill.hasElement('炎')) {
                    return 0.5;
                }
                if (skill.hasElement('水')) {
                    return 1.5;
                }
            }
            if (skill.isName('ソーラービーム')) {
                if (field.isWeather('雨') || field.isWeather('砂嵐') || field.isWeather('霰')) {
                    return 0.5;
                }
            }
            return 1.0;
        }
    }, {
        key: 'calcCriticalFactor',
        value: function calcCriticalFactor(attackerPokemon) {
            return attackerPokemon.ability === 'スナイパー' ? 2.25 : 1.5;
        }
    }, {
        key: 'calcRandomFactor',
        value: function calcRandomFactor(skill) {
            return (Math.round(Math.random() * 15) + 85) * 0.01;
        }
    }, {
        key: 'calcElementReinforceFactor',
        value: function calcElementReinforceFactor(attackerPokemon, skill) {
            var value = attackerPokemon.ability === '適応力' ? 2.0 : 1.5;
            if (skill.name === 'フライングプレス') {
                return attackerPokemon.hasElement('闘') ? value : 1.0;
            }
            var result = 1.0;
            skill.elementList.forEach(function (element) {
                if (attackerPokemon.hasElement(element.name)) {
                    result *= value;
                }
            });
            return result;
        }
    }, {
        key: 'calcActiveValue',
        value: function calcActiveValue(key, pokemon) {
            var level = pokemon.level;
            var baseValue = pokemon.baseValue[key];
            var individualValue = pokemon.individualValue[key];
            var effortValue = pokemon.effortValue[key];
            var pre = Math.floor((baseValue * 2 + individualValue + Math.floor(effortValue * 0.25)) * level * 0.01);
            switch (key) {
                case 'H':
                    return pre + 10 + level;
                default:
                    return Math.floor((pre + 5) * pokemon.nature[key]);
            }
        }
    }, {
        key: 'calcPP',
        value: function calcPP(basePP) {
            var pointUp = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

            if (basePP === 1) {
                return 1;
            }
            return basePP + Math.floor(basePP * 0.2) * pointUp;
        }
    }, {
        key: 'calcElementMatchupFactor',
        value: function calcElementMatchupFactor(defenderPokemon, skill) {
            var result = 1.0;
            skill.elementList.forEach(function (skillElement) {
                defenderPokemon.elementList.forEach(function (pokemonElement) {
                    result *= skillElement.attackTo(pokemonElement);
                });
            });
            if (skill.name === 'フリーズドライ' && defenderPokemon.hasElement('水')) {
                result *= 4.0;
            }
            return result;
        }
    }, {
        key: 'calcWallFactor',
        value: function calcWallFactor(defenderPokemon, skill, field) {
            switch (skill.category) {
                case '物理':
                    return field.hasPlayerEffect(defenderPokemon.playerID, _fieldEffect2['default'].REFLECT) ? 0.5 : 1.0;
                case '特殊':
                    return field.hasPlayerEffect(defenderPokemon.playerID, _fieldEffect2['default'].LIGHT_SCREEN) ? 0.5 : 1.0;
                default:
                    break;
            }
            return 1.0;
        }
    }, {
        key: 'clipRank',
        value: function clipRank(value) {
            return Math.min(Math.max(value, -6), 6);
        }
    }, {
        key: 'decreaseH',
        value: function decreaseH(nowH, value) {
            return Math.max(nowH - value, 0);
        }
    }, {
        key: 'decreasePP',
        value: function decreasePP(nowPP, value) {
            return Math.max(nowPP - (value || 1), 0);
        }
    }, {
        key: 'isCancelByAbility',
        value: function isCancelByAbility(defenderPokemon, skill) {
            switch (defenderPokemon.ability) {
                case '浮遊':
                    if (skill.hasElement('地')) {
                        return true;
                    }
                    break;
                case '貰い火':
                    if (skill.hasElement('炎')) {
                        return true;
                    }
                    break;
                case '貯水':
                    if (skill.hasElement('水')) {
                        return true;
                    }
                    break;
                case '呼び水':
                    if (skill.hasElement('水')) {
                        return true;
                    }
                    break;
                case '乾燥肌':
                    if (skill.hasElement('水')) {
                        return true;
                    }
                    break;
                case '草食':
                    if (skill.hasElement('草')) {
                        return true;
                    }
                    break;
                case '蓄電':
                    if (skill.hasElement('電')) {
                        return true;
                    }
                    break;
                case '電気エンジン':
                    if (skill.hasElement('電')) {
                        return true;
                    }
                    break;
                case '避雷針':
                    if (skill.hasElement('電')) {
                        return true;
                    }
                    break;
                case '不思議な守り':
                    // TODO 不思議な守り
                    break;
                case '防音':
                    // TODO 防音
                    break;
                case '化けの皮':
                    // TODO 化けの皮
                    break;
                default:
                    break;
            }
            return false;
        }
    }, {
        key: 'round',
        value: function round(x) {
            return Math.floor(x + 0.4);
        }
    }, {
        key: 'calcRankFactor',
        value: function calcRankFactor(rank) {
            return (2 + rank) * 0.5;
        }
    }, {
        key: 'sortByActiveS',
        value: function sortByActiveS(pokemonList, field) {
            var calcS = function calcS(pokemon, field) {
                var s = PokemonUtil.calcActiveValue('S', pokemon);
                s = Math.floor(s * PokemonUtil.calcWeatherFactorS(pokemon, field));
                s = Math.floor(s * PokemonUtil.calcItemFactorS(pokemon));
                s = Math.floor(s * PokemonUtil.calcRankFactor(pokemon.getRank('S')));
                return s;
            };
            pokemonList.sort(function (s, t) {
                var ss = calcS(s, field);
                var ts = calcS(t, field);
                if (ss > ts) {
                    return -1;
                }
                if (ss < ts) {
                    return 1;
                }
                return Math.round(Math.random()) ? 1 : -1;
            });
        }
    }, {
        key: 'calcWeatherFactorS',
        value: function calcWeatherFactorS(pokemon, field) {
            if (field.isWeather('晴れ')) {
                if (pokemon.ability === '葉緑素') {
                    return 2.0;
                }
            }
            if (field.isWeather('雨')) {
                if (pokemon.ability === 'すいすい') {
                    return 2.0;
                }
            }
            if (field.isWeather('砂嵐')) {
                if (pokemon.ability === '砂掻き') {
                    return 2.0;
                }
            }
            if (field.isWeather('霰')) {
                if (pokemon.ability === '雪掻き') {
                    return 2.0;
                }
            }
            return 1.0;
        }
    }, {
        key: 'calcItemFactorS',
        value: function calcItemFactorS(pokemon) {
            var item = pokemon.item;
            if (!item.used) {
                switch (item.name) {
                    case 'こだわりスカーフ':
                        return 1.5;
                    default:
                        break;
                }
            }
            return 1.0;
        }
    }, {
        key: 'sortByPriority',
        value: function sortByPriority(pokemonList, actionTable, field) {
            var skillTable = {};
            Object.keys(actionTable).forEach(function (key) {
                var action = actionTable[key];
                var pokemon = pokemonList.find(function (p) {
                    return p.playerID.value == key;
                });
                var skill = pokemon.skillList[action.target];
                skillTable[key] = skill;
            });
            var equalPriority = false;
            pokemonList.sort(function (s, t) {
                var sSkillPriority = skillTable[s.playerID.value].priority;
                var tSkillPriority = skillTable[t.playerID.value].priority;
                if (sSkillPriority > tSkillPriority) {
                    return -1;
                }
                if (sSkillPriority < tSkillPriority) {
                    return 1;
                }
                equalPriority = true;
                return -1;
            });
            if (equalPriority) {
                PokemonUtil.sortByActiveS(pokemonList, field);
            }
        }
    }]);

    return PokemonUtil;
})();

exports['default'] = PokemonUtil;
module.exports = exports['default'];
},{"./field-effect":24}],32:[function(require,module,exports){
/**
 * pokemon.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _nature = require('./nature');

var _nature2 = _interopRequireDefault(_nature);

var _pokemonUtil = require('./pokemon-util');

var _pokemonUtil2 = _interopRequireDefault(_pokemonUtil);

var _statusAilment = require('./status-ailment');

var _statusAilment2 = _interopRequireDefault(_statusAilment);

var Pokemon = (function () {
    function Pokemon(pokemonID, name, label, weight, elementList, nature, ability, level, happiness, skillList, item, baseValue, individualValue, effortValue, hiddenElement, activeH, ppTable, statusAilment, statusChangeTable, rankTable) {
        _classCallCheck(this, Pokemon);

        this.pokemonID = pokemonID;
        this.name = name;
        this.label = label;
        this.weight = weight;
        this.elementList = elementList;
        this.nature = nature;
        this.ability = ability;
        this.level = level;
        this.item = item;
        this.happiness = happiness;
        this.skillList = skillList;
        this.baseValue = baseValue;
        this.individualValue = individualValue;
        this.effortValue = effortValue;
        this.hiddenElement = hiddenElement;
        this.activeH = activeH;
        this.ppTable = ppTable;
        this.statusAilment = statusAilment;
        this.statusChangeTable = statusChangeTable;
        this.rankTable = rankTable;
        this.healMax();
        this.ppMax();
    }

    _createClass(Pokemon, [{
        key: 'changeRank',
        value: function changeRank(key, change) {
            var rank = this._rankTable[key];
            this._rankTable[key] = _pokemonUtil2['default'].clipRank(rank + change);
            return change < 0 ? rank !== -6 : rank !== 6;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'die',
        value: function die() {
            this._activeH = 0;
            this._statusAilment = _utilCommonUtil2['default'].deepCopy(_statusAilment2['default'].DEAD);
            this.resetRank();
            this.resetStatusChangeTable();
            return this;
        }
    }, {
        key: 'decreaseH',
        value: function decreaseH(value) {
            var result = _pokemonUtil2['default'].decreaseH(this._activeH, value);
            this._activeH = result;
            return this._activeH;
        }
    }, {
        key: 'decreasePP',
        value: function decreasePP(index, value) {
            var result = _pokemonUtil2['default'].decreasePP(this._ppTable[index], value);
            this._ppTable[index] = result;
            return result;
        }
    }, {
        key: 'getPP',
        value: function getPP(index) {
            return _utilCommonUtil2['default'].deepCopy(this._ppTable[index]);
        }
    }, {
        key: 'getRank',
        value: function getRank(key) {
            return _utilCommonUtil2['default'].deepCopy(this._rankTable[key]);
        }
    }, {
        key: 'getSkill',
        value: function getSkill(index) {
            return _utilCommonUtil2['default'].deepCopy(this._skillList[index]);
        }
    }, {
        key: 'hasElement',
        value: function hasElement(elementName) {
            return this._elementList.some(function (element) {
                return element.name === elementName;
            });
        }
    }, {
        key: 'healMax',
        value: function healMax() {
            this._activeH = this.maxH;
        }
    }, {
        key: 'isAilment',
        value: function isAilment(ailmentName) {
            if (ailmentName) {
                return this._statusAilment.name === ailmentName;
            } else {
                return this._statusAilment.name !== _statusAilment2['default'].NONE.name;
            }
        }
    }, {
        key: 'isDead',
        value: function isDead() {
            return this._statusAilment.name === _statusAilment2['default'].DEAD.name;
        }
    }, {
        key: 'isFullH',
        value: function isFullH() {
            return this._activeH === this.maxH;
        }
    }, {
        key: 'isName',
        value: function isName(name) {
            return this._name === name;
        }
    }, {
        key: 'ppMax',
        value: function ppMax() {
            var _this = this;

            this._ppTable = {};
            this._skillList.forEach(function (skill, index) {
                _this._ppTable[index] = _pokemonUtil2['default'].calcPP(skill.basePP, 3);
            });
        }
    }, {
        key: 'resetRank',
        value: function resetRank() {
            this.rankTable = null;
        }
    }, {
        key: 'resetStatusChangeTable',
        value: function resetStatusChangeTable() {
            this.statusChangeTable = null;
        }
    }, {
        key: 'setItemUsed',
        value: function setItemUsed() {
            this._item.used = true;
        }
    }, {
        key: 'setSkill',
        value: function setSkill(index, skill) {
            this._skillList[index] = _utilCommonUtil2['default'].deepCopy(skill);
        }
    }, {
        key: 'pokemonID',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._pokemonID);
        },
        set: function set(value) {
            this._pokemonID = value ? _utilCommonUtil2['default'].deepCopy(value) : 0;
        }
    }, {
        key: 'name',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._name);
        },
        set: function set(value) {
            this._name = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }, {
        key: 'label',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._label);
        },
        set: function set(value) {
            this._label = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }, {
        key: 'weight',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._weight);
        },
        set: function set(value) {
            this._weight = value ? _utilCommonUtil2['default'].deepCopy(value) : 0.0;
        }
    }, {
        key: 'elementList',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._elementList);
        },
        set: function set(value) {
            this._elementList = value ? _utilCommonUtil2['default'].deepCopy(value) : [];
        }
    }, {
        key: 'nature',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._nature);
        },
        set: function set(value) {
            this._nature = value ? _utilCommonUtil2['default'].deepCopy(value) : _utilCommonUtil2['default'].deepCopy(_nature2['default'].DEFAULT);
        }
    }, {
        key: 'ability',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._ability);
        },
        set: function set(value) {
            this._ability = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }, {
        key: 'level',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._level);
        },
        set: function set(value) {
            this._level = value ? _utilCommonUtil2['default'].deepCopy(value) : 50;
        }
    }, {
        key: 'happiness',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._happiness);
        },
        set: function set(value) {
            this._happiness = value ? _utilCommonUtil2['default'].deepCopy(value) : 255;
        }
    }, {
        key: 'skillList',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._skillList);
        },
        set: function set(value) {
            try {
                this._skillList = value ? _utilCommonUtil2['default'].deepCopy(value) : [];
            } finally {
                this.ppMax();
            }
        }
    }, {
        key: 'item',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._item);
        },
        set: function set(value) {
            this._item = value ? _utilCommonUtil2['default'].deepCopy(value) : new _item2['default']();
        }
    }, {
        key: 'baseValue',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._baseValue);
        },
        set: function set(value) {
            this._baseValue = value ? _utilCommonUtil2['default'].deepCopy(value) : { H: 0, A: 0, B: 0, C: 0, D: 0, S: 0 };
        }
    }, {
        key: 'individualValue',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._individualValue);
        },
        set: function set(value) {
            this._individualValue = value ? _utilCommonUtil2['default'].deepCopy(value) : { H: 31, A: 31, B: 31, C: 31, D: 31, S: 31 };
        }
    }, {
        key: 'effortValue',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._effortValue);
        },
        set: function set(value) {
            this._effortValue = value ? _utilCommonUtil2['default'].deepCopy(value) : { H: 0, A: 0, B: 0, C: 0, D: 0, S: 0 };
        }
    }, {
        key: 'hiddenElement',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._hiddenElement);
        },
        set: function set(value) {
            this._hiddenElement = value ? _utilCommonUtil2['default'].deepCopy(value) : _utilCommonUtil2['default'].deepCopy(_element2['default'].NORMAL);
        }
    }, {
        key: 'activeH',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._activeH);
        },
        set: function set(value) {
            this._activeH = value ? _utilCommonUtil2['default'].deepCopy(value) : 0;
        }
    }, {
        key: 'maxH',
        get: function get() {
            return _pokemonUtil2['default'].calcActiveValue('H', this);
        }
    }, {
        key: 'ppTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._ppTable);
        },
        set: function set(value) {
            this._ppTable = value ? _utilCommonUtil2['default'].deepCopy(value) : { 0: 0, 1: 0, 2: 0, 3: 0 };
        }
    }, {
        key: 'statusAilment',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._statusAilment);
        },
        set: function set(value) {
            this._statusAilment = value ? _utilCommonUtil2['default'].deepCopy(value) : _utilCommonUtil2['default'].deepCopy(_statusAilment2['default'].NONE);
        }
    }, {
        key: 'statusChangeTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._statusChangeTable);
        },
        set: function set(value) {
            this._statusChangeTable = value ? _utilCommonUtil2['default'].deepCopy(value) : {};
        }
    }, {
        key: 'rankTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._rankTable);
        },
        set: function set(value) {
            this._rankTable = value ? _utilCommonUtil2['default'].deepCopy(value) : { H: 0, A: 0, B: 0, C: 0, D: 0, S: 0, Evasion: 0, Accuracy: 0, Critical: 0 };
        }
    }]);

    return Pokemon;
})();

exports['default'] = Pokemon;
module.exports = exports['default'];
},{"../../util/common-util":40,"./element":23,"./item":26,"./nature":27,"./pokemon-util":31,"./status-ailment":34}],33:[function(require,module,exports){
/**
 * skill.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var Skill = (function () {
    function Skill(name, ruby, elementList, category, power, accuracy, basePP, contact, sound, priority, criticalRank, additionList) {
        _classCallCheck(this, Skill);

        this.name = name;
        this.ruby = ruby;
        this.elementList = elementList;
        this.category = category;
        this.power = power;
        this.accuracy = accuracy;
        this.basePP = basePP;
        this.contact = contact;
        this.sound = sound;
        this.priority = priority;
        this.criticalRank = criticalRank;
        this.additionList = additionList;
    }

    _createClass(Skill, [{
        key: 'clone',
        value: function clone() {
            return _utilCommonUtil2['default'].deepCopy(this);
        }
    }, {
        key: 'hasElement',
        value: function hasElement(elementName) {
            this._elementList.forEach(function (element) {
                if (element.name === elementName) {
                    return true;
                }
            });
            return false;
        }
    }, {
        key: 'isName',
        value: function isName(name) {
            return this._name === name;
        }
    }, {
        key: 'name',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._name);
        },
        set: function set(value) {
            this._name = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }, {
        key: 'ruby',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._ruby);
        },
        set: function set(value) {
            this._ruby = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }, {
        key: 'elementList',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._elementList);
        },
        set: function set(value) {
            this._elementList = value ? _utilCommonUtil2['default'].deepCopy(value) : [];
        }
    }, {
        key: 'category',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._category);
        },
        set: function set(value) {
            this._category = value ? _utilCommonUtil2['default'].deepCopy(value) : '';
        }
    }, {
        key: 'power',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._power);
        },
        set: function set(value) {
            this._power = value ? _utilCommonUtil2['default'].deepCopy(value) : 0;
        }
    }, {
        key: 'accuracy',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._accuracy);
        },
        set: function set(value) {
            this._accuracy = value ? _utilCommonUtil2['default'].deepCopy(value) : 0;
        }
    }, {
        key: 'basePP',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._basePP);
        },
        set: function set(value) {
            this._basePP = value ? _utilCommonUtil2['default'].deepCopy(value) : 0;
        }
    }, {
        key: 'contact',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._contact);
        },
        set: function set(value) {
            this._contact = value ? _utilCommonUtil2['default'].deepCopy(value) : false;
        }
    }, {
        key: 'sound',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._sound);
        },
        set: function set(value) {
            this._sound = value ? _utilCommonUtil2['default'].deepCopy(value) : false;
        }
    }, {
        key: 'priority',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._priority);
        },
        set: function set(value) {
            this._priority = value ? _utilCommonUtil2['default'].deepCopy(value) : 0.0;
        }
    }, {
        key: 'criticalRank',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._criticalRank);
        },
        set: function set(value) {
            this._criticalRank = value || value === 0.0 ? _utilCommonUtil2['default'].deepCopy(value) : 1.0;
        }
    }, {
        key: 'additionList',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._additionList);
        },
        set: function set(value) {
            this._additionList = value ? _utilCommonUtil2['default'].deepCopy(value) : [];
        }
    }]);

    return Skill;
})();

exports['default'] = Skill;
module.exports = exports['default'];
},{"../../util/common-util":40,"./element":23}],34:[function(require,module,exports){
/**
 * status-ailment.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    NONE: { name: '正常', label: '　', count: 0 },

    POISON: { name: '毒', label: '毒', count: 0 },

    DEADLY_POISON: { name: '猛毒', label: '猛毒', count: 0 },

    BURN: { name: '火傷', label: '火傷', count: 0 },

    PARALYSIS: { name: '麻痺', label: '麻痺', count: 0 },

    FREEZE: { name: '凍結', label: '凍結', count: 0 },

    ASLEEP: { name: '眠り', label: '眠り', count: 0 },

    DEAD: { name: '瀕死', label: '瀕死', count: 0 }

};
module.exports = exports['default'];
},{}],35:[function(require,module,exports){
/**
 * terrain.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    ELECTRIC: { name: 'グラスフィールド', count: 5 },

    GRASSY: { name: 'エレキフィールド', count: 5 },

    MISTY: { name: 'ミストフィールド', count: 5 },

    PSYCHIC: { name: 'サイコフィールド', count: 5 }

};
module.exports = exports['default'];
},{}],36:[function(require,module,exports){
/**
 * weather.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    HARSH_SUNLIGHT: { name: '晴れ', count: 5 },

    RAIN: { name: '雨', count: 5 },

    SANDSTORM: { name: '砂嵐', count: 5 },

    HAIL: { name: '霰', count: 5 }

};
module.exports = exports['default'];
},{}],37:[function(require,module,exports){
/**
 * skill-factory.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var _ruleElement = require('./rule/element');

var _ruleElement2 = _interopRequireDefault(_ruleElement);

var _ruleSkill = require('./rule/skill');

var _ruleSkill2 = _interopRequireDefault(_ruleSkill);

var _dataSkillTable = require('./data/skill-table');

var _dataSkillTable2 = _interopRequireDefault(_dataSkillTable);

var SkillFactory = (function () {
    function SkillFactory() {
        _classCallCheck(this, SkillFactory);

        this._skillTable = _utilCommonUtil2['default'].deepCopy(_dataSkillTable2['default']);
    }

    _createClass(SkillFactory, [{
        key: 'create',
        value: function create(skillName) {
            var hiddenElement = arguments.length <= 1 || arguments[1] === undefined ? _ruleElement2['default'].NONE : arguments[1];

            var source = this._skillTable[skillName];
            return new _ruleSkill2['default'](skillName, source.ruby, skillName === '目覚めるパワー' ? [hiddenElement] : this._convertElementList(source.elements), source.category, source.power, source.accuracy, source.basePP, source.contact, source.sound, source.priority, source.critical, source.additions);
        }
    }, {
        key: 'createByList',
        value: function createByList(skillNameList) {
            var _this = this;

            var hiddenElement = arguments.length <= 1 || arguments[1] === undefined ? _ruleElement2['default'].NONE : arguments[1];

            var resultList = [];
            skillNameList.forEach(function (skillName) {
                resultList.push(_this.create(skillName, hiddenElement));
            });
            return resultList;
        }
    }, {
        key: '_convertElementList',
        value: function _convertElementList(sourceList) {
            return sourceList.map(function (key) {
                return _ruleElement2['default'][key];
            });
        }
    }]);

    return SkillFactory;
})();

exports['default'] = SkillFactory;
module.exports = exports['default'];
},{"../util/common-util":40,"./data/skill-table":13,"./rule/element":23,"./rule/skill":33}],38:[function(require,module,exports){
/**
 * turn-info.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilCommonUtil = require('../util/common-util');

var _utilCommonUtil2 = _interopRequireDefault(_utilCommonUtil);

var TurnInfo = (function () {
    function TurnInfo() {
        _classCallCheck(this, TurnInfo);

        this._turnBreak = false;
        this._actionTable = {};
        this._downedPokemonList = [];
    }

    _createClass(TurnInfo, [{
        key: 'addDownedPokemon',
        value: function addDownedPokemon(pokemon) {
            this._downedPokemonList.push(_utilCommonUtil2['default'].deepCopy(pokemon));
        }
    }, {
        key: 'getAction',
        value: function getAction(playerID) {
            return _utilCommonUtil2['default'].deepCopy(this._actionTable[playerID.value]);
        }
    }, {
        key: 'isAnyPokemonDowned',
        value: function isAnyPokemonDowned() {
            return this._downedPokemonList.length !== 0;
        }
    }, {
        key: 'isTurnBreak',
        value: function isTurnBreak() {
            return _utilCommonUtil2['default'].deepCopy(this._turnBreak);
        }
    }, {
        key: 'setAction',
        value: function setAction(playerID, actionType) {
            var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            this._actionTable[playerID.value] = {
                playerID: _utilCommonUtil2['default'].deepCopy(playerID),
                type: _utilCommonUtil2['default'].deepCopy(actionType),
                target: _utilCommonUtil2['default'].deepCopy(target)
            };
        }
    }, {
        key: 'terminateAction',
        value: function terminateAction(playerID) {
            delete this._actionTable[playerID.value];
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._turnBreak = false;
            this._actionTable = {};
            this._downedPokemonList = [];
        }
    }, {
        key: 'turnBreak',
        value: function turnBreak() {
            this._turnBreak = true;
        }
    }, {
        key: 'turnContinue',
        value: function turnContinue() {
            this._turnBreak = false;
        }
    }, {
        key: 'actionTable',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._actionTable);
        }
    }, {
        key: 'actionTableSize',
        get: function get() {
            return Object.keys(this._actionTable).length;
        }
    }, {
        key: 'downedPokemonList',
        get: function get() {
            return _utilCommonUtil2['default'].deepCopy(this._downedPokemonList);
        }
    }]);

    return TurnInfo;
})();

exports['default'] = TurnInfo;
module.exports = exports['default'];
},{"../util/common-util":40}],39:[function(require,module,exports){
/**
 * buffer-thread.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonUtil = require('./common-util');

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _residentThread = require('./resident-thread');

var _residentThread2 = _interopRequireDefault(_residentThread);

var BufferThread = (function (_ResidentThread) {
    _inherits(BufferThread, _ResidentThread);

    function BufferThread(process) {
        var intervalMS = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];

        _classCallCheck(this, BufferThread);

        _get(Object.getPrototypeOf(BufferThread.prototype), 'constructor', this).call(this, process, intervalMS);
        this._buffer = [];
        this._defaultIntervalMS = intervalMS;
    }

    _createClass(BufferThread, [{
        key: 'clear',
        value: function clear() {
            this._buffer = [];
        }
    }, {
        key: 'push',
        value: function push(value) {
            this._buffer.push(_commonUtil2['default'].deepCopy(value));
        }
    }, {
        key: 'start',
        value: function start() {
            var self = this;
            return (function run() {
                if (!self._terminated) {
                    if (self._buffer.length !== 0) {
                        var param = self._buffer.shift();
                        try {
                            self.process(param);
                        } catch (e) {} finally {
                            if (param) {
                                self._intervalMS = self._defaultIntervalMS;
                            } else {
                                self._intervalMS = 5;
                            }
                        }
                    }
                    setTimeout(run, self._intervalMS);
                }
                return self;
            })();
        }
    }, {
        key: 'interval',
        get: function get() {
            return _commonUtil2['default'].deepCopy(this._intervalMS);
        },
        set: function set(value) {
            this._intervalMS = value ? _commonUtil2['default'].deepCopy(value) : 5;
            this._defaultIntervalMS = this._intervalMS;
        }
    }]);

    return BufferThread;
})(_residentThread2['default']);

exports['default'] = BufferThread;
module.exports = exports['default'];
},{"./common-util":40,"./resident-thread":43}],40:[function(require,module,exports){
/**
 * common-util.jsx
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonUtil = (function () {
    function CommonUtil() {
        _classCallCheck(this, CommonUtil);

        throw new Error("CommonUtil is static class.");
    }

    _createClass(CommonUtil, null, [{
        key: "deepCopy",
        value: function deepCopy(source) {
            var recursiveCopy = function recursiveCopy(source) {
                if (source === undefined || source === null || typeof source !== 'object') {
                    return source;
                }
                if (source.constructor === Boolean) {
                    return new Boolean(source);
                }
                if (source.constructor === Number) {
                    return new Number(source);
                }
                if (source.constructor === String) {
                    return new String(source);
                }
                if (source.constructor === Date) {
                    return new Date(source);
                }
                if (source.constructor === RegExp) {
                    var re = new RegExp(source);
                    re.lastIndex = recursiveCopy(source.lastIndex);
                    return re;
                }
                var result = new source.constructor();
                Object.keys(source).forEach(function (key) {
                    result[key] = recursiveCopy(source[key]);
                });
                return result;
            };
            return recursiveCopy(source);
        }
    }, {
        key: "shuffleList",
        value: function shuffleList(source) {
            var result = CommonUtil.deepCopy(source);
            var n = result.length;
            while (n) {
                var index = Math.floor(Math.random() * n--);
                CommonUtil.swap(result, n, index);
            }
            return result;
        }
    }, {
        key: "sleep",
        value: function sleep(ms) {
            var now = new Date();
            while (true) {
                if (new Date() - now > ms) {
                    break;
                }
            }
        }
    }, {
        key: "swap",
        value: function swap(targetList, sIndex, tIndex) {
            var temp = targetList[sIndex];
            targetList[sIndex] = targetList[tIndex];
            targetList[tIndex] = temp;
        }
    }]);

    return CommonUtil;
})();

exports["default"] = CommonUtil;
module.exports = exports["default"];
},{}],41:[function(require,module,exports){
/**
 * observable.jsx
 * 
 * @author yuki
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = (function () {
    function Observable() {
        _classCallCheck(this, Observable);

        this._observerList = [];
    }

    _createClass(Observable, [{
        key: "addObserver",
        value: function addObserver(observer) {
            if (observer) {
                if (!this._observerList.includes(observer)) {
                    this._observerList.push(observer);
                }
            }
        }
    }, {
        key: "notifyAllObserver",
        value: function notifyAllObserver(param) {
            var _this = this;

            this._observerList.forEach(function (observer) {
                observer.update(_this, param);
            });
        }
    }, {
        key: "removeAllObserver",
        value: function removeAllObserver() {
            this._observerList = [];
        }
    }]);

    return Observable;
})();

exports["default"] = Observable;
module.exports = exports["default"];
},{}],42:[function(require,module,exports){
/**
 * observer.jsx
 * 
 * @author yuki
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = (function () {
    function Observer() {
        _classCallCheck(this, Observer);
    }

    _createClass(Observer, [{
        key: "update",
        value: function update(target, param) {
            throw new Error("Not implemented : update()");
        }
    }]);

    return Observer;
})();

exports["default"] = Observer;
module.exports = exports["default"];
},{}],43:[function(require,module,exports){
/**
 * resident-thread.jsx
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonUtil = require('./common-util');

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var ResidentThread = (function () {
    function ResidentThread(process) {
        var intervalMS = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];

        _classCallCheck(this, ResidentThread);

        this.process = process;
        this.interval = intervalMS;
        this._terminated = false;
    }

    _createClass(ResidentThread, [{
        key: 'close',
        value: function close() {
            this._terminated = true;
        }
    }, {
        key: 'isTerminated',
        value: function isTerminated() {
            return _commonUtil2['default'].deepCopy(this._terminated);
        }
    }, {
        key: 'start',
        value: function start() {
            var self = this;
            return (function run() {
                if (!self._terminated) {
                    try {
                        self.process();
                    } catch (e) {}
                    setTimeout(run, self._intervalMS);
                }
                return self;
            })();
        }
    }, {
        key: 'process',
        get: function get() {
            return _commonUtil2['default'].deepCopy(this._process);
        },
        set: function set(value) {
            this._process = value ? _commonUtil2['default'].deepCopy(value) : function () {};
        }
    }, {
        key: 'interval',
        get: function get() {
            return _commonUtil2['default'].deepCopy(this._intervalMS);
        },
        set: function set(value) {
            this._intervalMS = value ? _commonUtil2['default'].deepCopy(value) : 5;
        }
    }]);

    return ResidentThread;
})();

exports['default'] = ResidentThread;
module.exports = exports['default'];
},{"./common-util":40}]},{},[7]);
