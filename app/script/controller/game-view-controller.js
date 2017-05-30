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