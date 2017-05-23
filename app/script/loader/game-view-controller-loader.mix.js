(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../event/confirm-type":8,"../util/observable":12}],2:[function(require,module,exports){
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
},{"../event/confirm-type":8,"../event/event":9,"./abstract-scene-controller":1,"./change-scene-controller":3,"./confirm-scene-controller":4,"./skill-scene-controller":7}],3:[function(require,module,exports){
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
},{"../event/event":9,"./abstract-scene-controller":1,"./battle-scene-controller":2}],4:[function(require,module,exports){
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
},{"../event/event":9,"./abstract-scene-controller":1}],5:[function(require,module,exports){
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
},{"../event/event":9,"../pokemon/mock-game-master":11,"../util/observer":13,"./select-scene-controller":6}],6:[function(require,module,exports){
/**
 * select-scene-controller.jsx
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

var SelectSceneController = (function (_AbstractSceneController) {
    _inherits(SelectSceneController, _AbstractSceneController);

    function SelectSceneController(view) {
        _classCallCheck(this, SelectSceneController);

        _get(Object.getPrototypeOf(SelectSceneController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(SelectSceneController, [{
        key: 'initialize',
        value: function initialize(master) {
            var _this = this;

            this._view.getElementById('select-info').style.display = 'inline';
            this._view.getElementById('battle-info').style.display = 'none';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'none';
            this._view.getElementById('select-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._view.getElementById('skill-menu').style.display = 'none';
            this._view.getElementById('change-menu').style.display = 'none';
            this._view.getElementById('confirm-menu').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 380);
            this._changeFieldHeight(this._view.getElementById('text-message'), 180);
            Array.prototype.forEach.call(this._view.getElementsByClassName('image-pokemon'), function (image) {
                image.onerror = function () {
                    image.src = '../image/dummy.jpg';
                    image.onerror = undefined;
                };
            });

            master.getParty(master.PLAYER_ID).forEach(function (pokemon, index) {
                var imageID = 'image-player-pokemon-' + index;
                _this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            });
            master.getParty(master.OPPONENT_ID).forEach(function (pokemon, index) {
                var imageID = 'image-opponent-pokemon-' + index;
                _this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            });
            this._addEvent();
        }
    }, {
        key: 'onClickBackButton',
        value: function onClickBackButton() {
            this._view.location.href = './title.html';
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
            this._view.getElementById('button-select-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-select-back').addEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }]);

    return SelectSceneController;
})(_abstractSceneController2['default']);

exports['default'] = SelectSceneController;
module.exports = exports['default'];
},{"../event/event":9,"./abstract-scene-controller":1,"./battle-scene-controller":2}],7:[function(require,module,exports){
/**
 * skill-scene-controller.jsx
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

var SkillSceneController = (function (_AbstractSceneController) {
    _inherits(SkillSceneController, _AbstractSceneController);

    function SkillSceneController(view) {
        _classCallCheck(this, SkillSceneController);

        _get(Object.getPrototypeOf(SkillSceneController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._listenerTable = {};
        this._listenerTable['onClickOKButton'] = this.onClickOKButton.bind(this);
        this._listenerTable['onClickBackButton'] = this.onClickBackButton.bind(this);
    }

    _createClass(SkillSceneController, [{
        key: 'initialize',
        value: function initialize(master) {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'inline';
            this._view.getElementById('change-info').style.display = 'none';
            this._view.getElementById('select-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._view.getElementById('skill-menu').style.display = 'inline';
            this._view.getElementById('change-menu').style.display = 'none';
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
            this._view.getElementById('button-skill-ok').addEventListener('click', this._listenerTable['onClickOKButton']);
            this._view.getElementById('button-skill-back').addEventListener('click', this._listenerTable['onClickBackButton']);
        }
    }]);

    return SkillSceneController;
})(_abstractSceneController2['default']);

exports['default'] = SkillSceneController;
module.exports = exports['default'];
},{"../event/event":9,"./abstract-scene-controller":1,"./battle-scene-controller":2}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{"../controller/game-view-controller":5}],11:[function(require,module,exports){
/**
 * mock-game-master.jsx
 * 
 * @author yuki
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MockGameMaster = (function () {
    function MockGameMaster() {
        _classCallCheck(this, MockGameMaster);

        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
    }

    _createClass(MockGameMaster, [{
        key: "getParty",
        value: function getParty(playerID) {
            return [{}, {}, {}, {}, {}, {}];
        }
    }, {
        key: "getSelectedPokemonList",
        value: function getSelectedPokemonList(playerID) {
            return [{}, {}, {}];
        }
    }]);

    return MockGameMaster;
})();

exports["default"] = MockGameMaster;
module.exports = exports["default"];
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{}]},{},[10]);
