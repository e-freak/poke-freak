/**
 * change-scene-controller.jsx
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

var _abstractSceneController = require('./abstract-scene-controller');

var _abstractSceneController2 = _interopRequireDefault(_abstractSceneController);

var _battleSceneController = require('./battle-scene-controller');

var _battleSceneController2 = _interopRequireDefault(_battleSceneController);

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var ChangeSceneController = (function (_AbstractSceneController) {
    _inherits(ChangeSceneController, _AbstractSceneController);

    function ChangeSceneController(view) {
        _classCallCheck(this, ChangeSceneController);

        _get(Object.getPrototypeOf(ChangeSceneController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(ChangeSceneController, [{
        key: 'initialize',
        value: function initialize(master) {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'inline';
            this._view.getElementById('select-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._view.getElementById('skill-menu').style.display = 'none';
            this._view.getElementById('change-menu').style.display = 'inline';
            this._view.getElementById('confirm-menu').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 460);
            this._changeFieldHeight(this._view.getElementById('text-message'), 100);
            this._addEvent();
        }
    }, {
        key: 'onClickBackButton',
        value: function onClickBackButton() {
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createBattleSceneController());
        }
    }, {
        key: 'onClickOKButton',
        value: function onClickOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].CHANGE_VIEW, this._createBattleSceneController());
        }
    }, {
        key: '_createBattleSceneController',
        value: function _createBattleSceneController() {
            return new _battleSceneController2['default'](this._view);
        }
    }, {
        key: '_addEvent',
        value: function _addEvent() {
            this._view.getElementById('button-change-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-change-back').addEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }]);

    return ChangeSceneController;
})(_abstractSceneController2['default']);

exports['default'] = ChangeSceneController;
module.exports = exports['default'];