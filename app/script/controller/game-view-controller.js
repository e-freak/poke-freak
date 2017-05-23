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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilObserver = require('../util/observer');

var _utilObserver2 = _interopRequireDefault(_utilObserver);

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var _pokemonMockGameMaster = require('../pokemon/mock-game-master');

var _pokemonMockGameMaster2 = _interopRequireDefault(_pokemonMockGameMaster);

var _selectSceneController = require('./select-scene-controller');

var _selectSceneController2 = _interopRequireDefault(_selectSceneController);

var GameViewController = (function (_Observer) {
    _inherits(GameViewController, _Observer);

    function GameViewController(view) {
        _classCallCheck(this, GameViewController);

        _get(Object.getPrototypeOf(GameViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._scene = this._createFirstSceneController(view);
        this._master = this._createGameMaster();
    }

    _createClass(GameViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._scene.addObserver(this);
            this._scene.initialize(this._master);
        }
    }, {
        key: 'update',
        value: function update(target, param) {
            switch (param.event) {
                case _eventEvent2['default'].CHANGE_VIEW:
                    this._scene = param.scene;
                    this._scene.addObserver(this);
                    this._scene.initialize(this._master);
                    break;
                case _eventEvent2['default'].CONFIRM_OK:
                    this._scene = param.scene;
                    this._scene.addObserver(this);
                    this._scene.onConfirmOK();
                    break;
                case _eventEvent2['default'].CONFIRM_CANCEL:
                    this._scene = param.scene;
                    this._scene.addObserver(this);
                    this._scene.onConfirmCancel();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_createFirstSceneController',
        value: function _createFirstSceneController(view) {
            return new _selectSceneController2['default'](view);
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