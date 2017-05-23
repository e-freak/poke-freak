/**
 * abstract-scene-controller.jsx
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

var _eventConfirmType = require('../event/confirm-type');

var _eventConfirmType2 = _interopRequireDefault(_eventConfirmType);

var AbstractSceneController = (function (_Observable) {
    _inherits(AbstractSceneController, _Observable);

    function AbstractSceneController() {
        _classCallCheck(this, AbstractSceneController);

        _get(Object.getPrototypeOf(AbstractSceneController.prototype), 'constructor', this).call(this);
        this._confirmType = _eventConfirmType2['default'].NONE;
    }

    _createClass(AbstractSceneController, [{
        key: 'initialize',
        value: function initialize(master) {
            throw new Error("Not implemented : initialize()");
        }
    }, {
        key: 'onConfirmCancel',
        value: function onConfirmCancel() {
            this._clearConfirm();
        }
    }, {
        key: 'onConfirmOK',
        value: function onConfirmOK() {
            this._clearConfirm();
        }
    }, {
        key: '_changeFieldHeight',
        value: function _changeFieldHeight(field, value) {
            field.style.height = value + 'px';
            field.style['max-height'] = value + 'px';
            field.style['min-height'] = value + 'px';
            field.scrollTop = field.scrollHeight;
        }
    }, {
        key: '_clearConfirm',
        value: function _clearConfirm() {
            this._confirmType = _eventConfirmType2['default'].NONE;
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event, scene) {
            this.notifyAllObserver({ event: event, scene: scene });
        }
    }]);

    return AbstractSceneController;
})(_utilObservable2['default']);

exports['default'] = AbstractSceneController;
module.exports = exports['default'];