(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../event/confirm-type":7,"../event/event":8,"../util/observable":10,"./change-view-controller":2,"./confirm-view-controller":3,"./skill-view-controller":6}],2:[function(require,module,exports){
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
},{"../event/event":8,"../util/observable":10,"./battle-view-controller":1}],3:[function(require,module,exports){
/**
 * confirm-view-controller.jsx
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

var _battleViewController = require('./battle-view-controller');

var _battleViewController2 = _interopRequireDefault(_battleViewController);

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var ConfirmViewController = (function (_Observable) {
    _inherits(ConfirmViewController, _Observable);

    function ConfirmViewController(view, parent) {
        var disableOK = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var disableCancel = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        _classCallCheck(this, ConfirmViewController);

        _get(Object.getPrototypeOf(ConfirmViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._parent = parent;
        this._disableOK = disableOK;
        this._disableCancel = disableCancel;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(ConfirmViewController, [{
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
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('confirm'), function (element) {
                element.style.display = 'inline';
            });
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
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event, controller) {
            this.notifyAllObserver({ event: event, controller: controller });
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

    return ConfirmViewController;
})(_utilObservable2['default']);

exports['default'] = ConfirmViewController;
module.exports = exports['default'];
},{"../event/event":8,"../util/observable":10,"./battle-view-controller":1}],4:[function(require,module,exports){
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

var _selectViewController = require('./select-view-controller');

var _selectViewController2 = _interopRequireDefault(_selectViewController);

var GameViewController = (function (_Observer) {
    _inherits(GameViewController, _Observer);

    function GameViewController(view) {
        _classCallCheck(this, GameViewController);

        _get(Object.getPrototypeOf(GameViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._core = this._createFirstViewController(view);
    }

    _createClass(GameViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._core.addObserver(this);
            this._core.initialize();
        }
    }, {
        key: 'update',
        value: function update(target, param) {
            switch (param.event) {
                case _eventEvent2['default'].CHANGE_VIEW:
                    this._core = param.controller;
                    this._core.addObserver(this);
                    this._core.initialize();
                    break;
                case _eventEvent2['default'].CONFIRM_OK:
                    this._core = param.controller;
                    this._core.addObserver(this);
                    this._core.initialize();
                    this._core.onConfirmOK();
                    break;
                case _eventEvent2['default'].CONFIRM_CANCEL:
                    this._core = param.controller;
                    this._core.addObserver(this);
                    this._core.initialize();
                    this._core.onConfirmCancel();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_createFirstViewController',
        value: function _createFirstViewController(view) {
            return new _selectViewController2['default'](view);
        }
    }]);

    return GameViewController;
})(_utilObserver2['default']);

exports['default'] = GameViewController;
module.exports = exports['default'];
},{"../event/event":8,"../util/observer":11,"./select-view-controller":5}],5:[function(require,module,exports){
/**
 * select-view-controller.jsx
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

var SelectViewController = (function (_Observable) {
    _inherits(SelectViewController, _Observable);

    function SelectViewController(view) {
        _classCallCheck(this, SelectViewController);

        _get(Object.getPrototypeOf(SelectViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(SelectViewController, [{
        key: 'initialize',
        value: function initialize() {
            Array.prototype.forEach.call(this._view.getElementsByClassName('select'), function (element) {
                element.style.display = 'inline';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('battle'), function (element) {
                element.style.display = 'none';
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
        key: 'onClickBackButton',
        value: function onClickBackButton() {
            this._removeEvent();
            this._view.location.href = './title.html';
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
            this._view.getElementById('button-select-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-select-back').addEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }, {
        key: '_removeEvent',
        value: function _removeEvent() {
            this._view.getElementById('button-select-ok').removeEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-select-back').removeEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }]);

    return SelectViewController;
})(_utilObservable2['default']);

exports['default'] = SelectViewController;
module.exports = exports['default'];
},{"../event/event":8,"../util/observable":10,"./battle-view-controller":1}],6:[function(require,module,exports){
/**
 * skill-view-controller.jsx
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

var SkillViewController = (function (_Observable) {
    _inherits(SkillViewController, _Observable);

    function SkillViewController(view) {
        _classCallCheck(this, SkillViewController);

        _get(Object.getPrototypeOf(SkillViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(SkillViewController, [{
        key: 'initialize',
        value: function initialize() {
            Array.prototype.forEach.call(this._view.getElementsByClassName('select'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('battle'), function (element) {
                element.style.display = 'none';
            });
            Array.prototype.forEach.call(this._view.getElementsByClassName('skill'), function (element) {
                element.style.display = 'inline';
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
            this._view.getElementById('button-skill-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-skill-back').addEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }, {
        key: '_removeEvent',
        value: function _removeEvent() {
            this._view.getElementById('button-skill-ok').removeEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-skill-back').removeEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }]);

    return SkillViewController;
})(_utilObservable2['default']);

exports['default'] = SkillViewController;
module.exports = exports['default'];
},{"../event/event":8,"../util/observable":10,"./battle-view-controller":1}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
/**
 * event.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    CHANGE_VIEW: 'CHANGE_VIEW',

    CONFIRM_OK: 'CONFIRM_OK',

    CONFIRM_CANCEL: 'CONFIRM_CANCEL'

};
module.exports = exports['default'];
},{}],9:[function(require,module,exports){
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
},{"../controller/game-view-controller":4}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}]},{},[9]);
