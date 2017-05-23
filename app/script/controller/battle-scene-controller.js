/**
 * battle-scene-controller.jsx
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

var _abstractSceneController = require('./abstract-scene-controller');

var _abstractSceneController2 = _interopRequireDefault(_abstractSceneController);

var _changeSceneController = require('./change-scene-controller');

var _changeSceneController2 = _interopRequireDefault(_changeSceneController);

var _eventConfirmType = require('../event/confirm-type');

var _eventConfirmType2 = _interopRequireDefault(_eventConfirmType);

var _confirmSceneController = require('./confirm-scene-controller');

var _confirmSceneController2 = _interopRequireDefault(_confirmSceneController);

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var _skillSceneController = require('./skill-scene-controller');

var _skillSceneController2 = _interopRequireDefault(_skillSceneController);

var BattleSceneController = (function (_AbstractSceneController) {
    _inherits(BattleSceneController, _AbstractSceneController);

    function BattleSceneController(view) {
        _classCallCheck(this, BattleSceneController);

        _get(Object.getPrototypeOf(BattleSceneController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickSkillButton'] = this.onClickSkillButton.bind(this);
        this._listenerTable['onClickChangeButton'] = this.onClickChangeButton.bind(this);
        this._listenerTable['onClickResignButton'] = this.onClickResignButton.bind(this);
    }

    _createClass(BattleSceneController, [{
        key: 'initialize',
        value: function initialize(master) {
            var _this = this;

            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'none';
            this._view.getElementById('select-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'inline';
            this._view.getElementById('skill-menu').style.display = 'none';
            this._view.getElementById('change-menu').style.display = 'none';
            this._view.getElementById('confirm-menu').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 200);
            this._changeFieldHeight(this._view.getElementById('text-message'), 360);
            Array.prototype.forEach.call(this._view.getElementsByClassName('icon-pokemon'), function (image) {
                image.onerror = function () {
                    image.src = '../image/dummy.jpg';
                    image.onerror = undefined;
                };
            });

            master.getSelectedPokemonList(master.PLAYER_ID).forEach(function (pokemon, index) {
                var imageID = 'icon-player-pokemon-' + index;
                _this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            });
            master.getSelectedPokemonList(master.OPPONENT_ID).forEach(function (pokemon, index) {
                var imageID = 'icon-opponent-pokemon-' + index;
                _this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            });
            this._addEvent();
        }
    }, {
        key: 'onConfirmCancel',
        value: function onConfirmCancel() {
            this._view.getElementById('select-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'inline';
            this._view.getElementById('skill-menu').style.display = 'none';
            this._view.getElementById('change-menu').style.display = 'none';
            this._view.getElementById('confirm-menu').style.display = 'none';
            this._clearConfirm();
        }
    }, {
        key: 'onConfirmOK',
        value: function onConfirmOK() {
            this._view.getElementById('select-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'inline';
            this._view.getElementById('skill-menu').style.display = 'none';
            this._view.getElementById('change-menu').style.display = 'none';
            this._view.getElementById('confirm-menu').style.display = 'none';
            var confirmType = this._confirmType;
            this._clearConfirm();

            switch (confirmType) {
                case _eventConfirmType2['default'].RESIGN:
                    this._confirmType = _eventConfirmType2['default'].GAME_SET;
                    this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createConfirmSceneController(false, true));
                    break;
                case _eventConfirmType2['default'].GAME_SET:
                    this._view.location.href = './title.html';
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'onClickChangeButton',
        value: function onClickChangeButton() {
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createChangeSceneController());
        }
    }, {
        key: 'onClickResignButton',
        value: function onClickResignButton() {
            this._confirmType = _eventConfirmType2['default'].RESIGN;
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createConfirmSceneController());
        }
    }, {
        key: 'onClickSkillButton',
        value: function onClickSkillButton() {
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createSkillSceneController());
        }
    }, {
        key: '_createChangeSceneController',
        value: function _createChangeSceneController() {
            return new _changeSceneController2['default'](this._view);
        }
    }, {
        key: '_createConfirmSceneController',
        value: function _createConfirmSceneController() {
            var disableOK = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
            var disableCancel = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            return new _confirmSceneController2['default'](this._view, this, disableOK, disableCancel);
        }
    }, {
        key: '_createSkillSceneController',
        value: function _createSkillSceneController() {
            return new _skillSceneController2['default'](this._view);
        }
    }, {
        key: '_addEvent',
        value: function _addEvent() {
            this._view.getElementById('button-skill').addEventListener('click', this._listenerTable['onClickSkillButton']);
            this._view.getElementById('button-change').addEventListener('click', this._listenerTable['onClickChangeButton']);
            this._view.getElementById('button-resign').addEventListener('click', this._listenerTable['onClickResignButton']);
        }
    }]);

    return BattleSceneController;
})(_abstractSceneController2['default']);

exports['default'] = BattleSceneController;
module.exports = exports['default'];