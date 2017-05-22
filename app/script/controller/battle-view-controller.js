/**
 * battle-view-controller.jsx
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

var _utilObservable = require('../util/observable');

var _utilObservable2 = _interopRequireDefault(_utilObservable);

var _changeViewController = require('./change-view-controller');

var _changeViewController2 = _interopRequireDefault(_changeViewController);

var _eventConfirmType = require('../event/confirm-type');

var _eventConfirmType2 = _interopRequireDefault(_eventConfirmType);

var _confirmViewController = require('./confirm-view-controller');

var _confirmViewController2 = _interopRequireDefault(_confirmViewController);

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var _skillViewController = require('./skill-view-controller');

var _skillViewController2 = _interopRequireDefault(_skillViewController);

var BattleViewController = (function (_Observable) {
    _inherits(BattleViewController, _Observable);

    function BattleViewController(view) {
        _classCallCheck(this, BattleViewController);

        _get(Object.getPrototypeOf(BattleViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._confirmType = _eventConfirmType2['default'].NONE;
        this._listenerTable = {};
        this._listenerTable['onClickSkillButton'] = this.onClickSkillButton.bind(this);
        this._listenerTable['onClickChangeButton'] = this.onClickChangeButton.bind(this);
        this._listenerTable['onClickResignButton'] = this.onClickResignButton.bind(this);
    }

    _createClass(BattleViewController, [{
        key: 'initialize',
        value: function initialize() {
            Array.prototype.forEach.call(this._view.getElementsByClassName('select'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('battle'), function (element) {
                element.style.display = 'inline';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('skill'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('change'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('confirm'), function (element) {
                element.style.display = 'none';
            });
            this._addEvent();
        }
    }, {
        key: 'onConfirmCancel',
        value: function onConfirmCancel() {
            this._clearConfirm();
        }
    }, {
        key: 'onConfirmOK',
        value: function onConfirmOK() {
            var confirmType = this._confirmType;
            this._clearConfirm();

            switch (confirmType) {
                case _eventConfirmType2['default'].RESIGN:
                    this._confirmType = _eventConfirmType2['default'].GAME_SET;
                    this._removeEvent();
                    this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createConfirmViewController(false, true));
                    break;
                case _eventConfirmType2['default'].GAME_SET:
                    this._removeEvent();
                    this._view.location.href = './title.html';
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'onClickChangeButton',
        value: function onClickChangeButton() {
            this._removeEvent();
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createChangeViewController());
        }
    }, {
        key: 'onClickResignButton',
        value: function onClickResignButton() {
            this._confirmType = _eventConfirmType2['default'].RESIGN;
            this._removeEvent();
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createConfirmViewController());
        }
    }, {
        key: 'onClickSkillButton',
        value: function onClickSkillButton() {
            this._removeEvent();
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createSkillViewController());
        }
    }, {
        key: '_clearConfirm',
        value: function _clearConfirm() {
            this._confirmType = _eventConfirmType2['default'].NONE;
        }
    }, {
        key: '_createChangeViewController',
        value: function _createChangeViewController() {
            return new _changeViewController2['default'](this._view);
        }
    }, {
        key: '_createConfirmViewController',
        value: function _createConfirmViewController() {
            var disableOK = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
            var disableCancel = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            return new _confirmViewController2['default'](this._view, this, disableOK, disableCancel);
        }
    }, {
        key: '_createSkillViewController',
        value: function _createSkillViewController() {
            return new _skillViewController2['default'](this._view);
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event, controller) {
            this.notifyAllObserver({ event: event, controller: controller });
        }
    }, {
        key: '_addEvent',
        value: function _addEvent() {
            this._view.getElementById('button-skill').addEventListener('click', this._listenerTable['onClickSkillButton']);
            this._view.getElementById('button-change').addEventListener('click', this._listenerTable['onClickChangeButton']);
            this._view.getElementById('button-resign').addEventListener('click', this._listenerTable['onClickResignButton']);
        }
    }, {
        key: '_removeEvent',
        value: function _removeEvent() {
            this._view.getElementById('button-skill').removeEventListener('click', this._listenerTable['onClickSkillButton']);
            this._view.getElementById('button-change').removeEventListener('click', this._listenerTable['onClickChangeButton']);
            this._view.getElementById('button-resign').removeEventListener('click', this._listenerTable['onClickResignButton']);
        }
    }]);

    return BattleViewController;
})(_utilObservable2['default']);

exports['default'] = BattleViewController;
module.exports = exports['default'];