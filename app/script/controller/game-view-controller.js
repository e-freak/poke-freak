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

var _pokemonAnnouncerMockAnnouncer = require('../pokemon/announcer/mock-announcer');

var _pokemonAnnouncerMockAnnouncer2 = _interopRequireDefault(_pokemonAnnouncerMockAnnouncer);

var _pokemonMockGameMaster = require('../pokemon/mock-game-master');

var _pokemonMockGameMaster2 = _interopRequireDefault(_pokemonMockGameMaster);

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
        this._menu.addObserver(this);
        this._menu.addObserver(this._announcer);
        this._master.addObserver(this);
        this._master.addObserver(this._announcer);
    }

    _createClass(GameViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._changeScene(_sceneType2['default'].SELECT);
            this._master.initialize('プレイヤー', '対戦相手', _pokemonDataSamplePartyList2['default'][0], _pokemonDataSamplePartyList2['default'][1]);
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
                    break;
                case _eventUserEvent2['default'].TO_SKILL_SCENE:
                    this._changeScene(_sceneType2['default'].SKILL);
                    break;
                case _eventUserEvent2['default'].TO_CHANGE_SCENE:
                    this._changeScene(_sceneType2['default'].CHANGE);
                    this._master.requestChangeMenu();
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
            return new _pokemonAnnouncerMockAnnouncer2['default'](view);
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
            return new _pokemonMockGameMaster2['default']();
        }
    }]);

    return GameViewController;
})(_utilObserver2['default']);

exports['default'] = GameViewController;
module.exports = exports['default'];