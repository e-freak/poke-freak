/**
 * change-view-controller.jsx
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

var _utilObservable = require('../util/observable');

var _utilObservable2 = _interopRequireDefault(_utilObservable);

var _battleViewController = require('./battle-view-controller');

var _battleViewController2 = _interopRequireDefault(_battleViewController);

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var ChangeViewController = (function (_Observable) {
    _inherits(ChangeViewController, _Observable);

    function ChangeViewController(view) {
        _classCallCheck(this, ChangeViewController);

        _get(Object.getPrototypeOf(ChangeViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(ChangeViewController, [{
        key: 'initialize',
        value: function initialize() {
            Array.prototype.forEach.call(this._view.getElementsByClassName('select'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('battle'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('skill'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('change'), function (element) {
                element.style.display = 'inline';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('confirm'), function (element) {
                element.style.display = 'none';
            });
            this._addEvent();
        }
    }, {
        key: 'onClickBackButton',
        value: function onClickBackButton() {
            this._removeEvent();
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createBattleViewController());
        }
    }, {
        key: 'onClickOKButton',
        value: function onClickOKButton() {
            this._removeEvent();
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createBattleViewController());
        }
    }, {
        key: '_createBattleViewController',
        value: function _createBattleViewController() {
            return new _battleViewController2['default'](this._view);
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event, controller) {
            this.notifyAllObserver({ event: event, controller: controller });
        }
    }, {
        key: '_addEvent',
        value: function _addEvent() {
            this._view.getElementById('button-change-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-change-back').addEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }, {
        key: '_removeEvent',
        value: function _removeEvent() {
            this._view.getElementById('button-change-ok').removeEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-change-back').removeEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }]);

    return ChangeViewController;
})(_utilObservable2['default']);

exports['default'] = ChangeViewController;
module.exports = exports['default'];