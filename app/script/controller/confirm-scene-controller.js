/**
 * confirm-scene-controller.jsx
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

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var ConfirmSceneController = (function (_AbstractSceneController) {
    _inherits(ConfirmSceneController, _AbstractSceneController);

    function ConfirmSceneController(view, parent) {
        var disableOK = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var disableCancel = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        _classCallCheck(this, ConfirmSceneController);

        _get(Object.getPrototypeOf(ConfirmSceneController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._parent = parent;
        this._disableOK = disableOK;
        this._disableCancel = disableCancel;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(ConfirmSceneController, [{
        key: 'initialize',
        value: function initialize(master) {
            this._view.getElementById('select-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._view.getElementById('skill-menu').style.display = 'none';
            this._view.getElementById('change-menu').style.display = 'none';
            this._view.getElementById('confirm-menu').style.display = 'inline';
            this._addEvent();
        }
    }, {
        key: 'onClickBackButton',
        value: function onClickBackButton() {
            this._removeEvent();
            this._notifyAllObserver(_eventEvent2['default'].CONFIRM_CANCEL, this._parent);
        }
    }, {
        key: 'onClickOKButton',
        value: function onClickOKButton() {
            this._removeEvent();
            this._notifyAllObserver(_eventEvent2['default'].CONFIRM_OK, this._parent);
        }
    }, {
        key: '_addEvent',
        value: function _addEvent() {
            if (this._disableOK) {
                this._view.getElementById('button-confirm-ok').className = 'button button-disable';
            } else {
                this._view.getElementById('button-confirm-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
            }
            if (this._disableCancel) {
                this._view.getElementById('button-confirm-back').className = 'button button-disable';
            } else {
                this._view.getElementById('button-confirm-back').addEventListener('click', this._listenerTable['onClickBackButton']);
            }
        }
    }, {
        key: '_removeEvent',
        value: function _removeEvent() {
            this._view.getElementById('button-confirm-ok').removeEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-confirm-back').removeEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }]);

    return ConfirmSceneController;
})(_abstractSceneController2['default']);

exports['default'] = ConfirmSceneController;
module.exports = exports['default'];