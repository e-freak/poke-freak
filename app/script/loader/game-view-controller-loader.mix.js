(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * game-menu-controller.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilObservable = require('../util/observable');

var _utilObservable2 = _interopRequireDefault(_utilObservable);

var _eventConfirmType = require('../event/confirm-type');

var _eventConfirmType2 = _interopRequireDefault(_eventConfirmType);

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

var _eventUserEvent = require('../event/user-event');

var _eventUserEvent2 = _interopRequireDefault(_eventUserEvent);

var GameMenuController = (function (_Observable) {
    _inherits(GameMenuController, _Observable);

    function GameMenuController(view) {
        _classCallCheck(this, GameMenuController);

        _get(Object.getPrototypeOf(GameMenuController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._confirmType = _eventConfirmType2['default'].NONE;
    }

    _createClass(GameMenuController, [{
        key: 'changeScene',
        value: function changeScene(scene) {
            var disableOKButton = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
            var disableCancelButton = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            switch (scene) {
                case _sceneType2['default'].SELECT:
                    this._changeToSelectScene();
                    break;
                case _sceneType2['default'].BATTLE:
                    this._changeToBattleScene();
                    break;
                case _sceneType2['default'].SKILL:
                    this._changeToSkillScene();
                    break;
                case _sceneType2['default'].CHANGE:
                    this._changeToChangeScene();
                    break;
                case _sceneType2['default'].CONFIRM:
                    this._changeToConfirmScene(disableOKButton, disableCancelButton);
                    break;
                default:
                    throw new Error('Unknown scene : ' + scene);
            }
        }
    }, {
        key: 'onConfirmCancel',
        value: function onConfirmCancel(confirmType) {
            switch (confirmType) {
                case _eventConfirmType2['default'].RESIGN:
                    this._confirmType = _eventConfirmType2['default'].NONE;
                    this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
                    break;
                case _eventConfirmType2['default'].GAME_SET:
                    // do nothing
                    break;
                default:
                    throw new Error('Unknown confirm type : ' + confirmType);
            }
        }
    }, {
        key: 'onConfirmOK',
        value: function onConfirmOK(confirmType) {
            switch (confirmType) {
                case _eventConfirmType2['default'].RESIGN:
                    this._confirmType = _eventConfirmType2['default'].GAME_SET;
                    this._notifyAllObserver(_eventUserEvent2['default'].TO_CONFIRM_SCENE, false, true);
                    break;
                case _eventConfirmType2['default'].GAME_SET:
                    this._view.location.href = './title.html';
                    break;
                default:
                    throw new Error('Unknown confirm type : ' + confirmType);
            }
        }
    }, {
        key: 'onClickBattleChangeButton',
        value: function onClickBattleChangeButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_CHANGE_SCENE);
        }
    }, {
        key: 'onClickBattleResignButton',
        value: function onClickBattleResignButton() {
            this._confirmType = _eventConfirmType2['default'].RESIGN;
            this._notifyAllObserver(_eventUserEvent2['default'].TO_CONFIRM_SCENE);
        }
    }, {
        key: 'onClickBattleSkillButton',
        value: function onClickBattleSkillButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_SKILL_SCENE);
        }
    }, {
        key: 'onClickChangeBackButton',
        value: function onClickChangeBackButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickChangeOKButton',
        value: function onClickChangeOKButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickConfirmBackButton',
        value: function onClickConfirmBackButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].CONFIRM_CANCEL);
        }
    }, {
        key: 'onClickConfirmOKButton',
        value: function onClickConfirmOKButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].CONFIRM_OK);
        }
    }, {
        key: 'onClickSelectBackButton',
        value: function onClickSelectBackButton() {
            this._view.location.href = './title.html';
        }
    }, {
        key: 'onClickSelectOKButton',
        value: function onClickSelectOKButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickSkillBackButton',
        value: function onClickSkillBackButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickSkillOKButton',
        value: function onClickSkillOKButton() {
            this._notifyAllObserver(_eventUserEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: '_activateButton',
        value: function _activateButton(buttonID, listener) {
            this._view.getElementById(buttonID).className = 'button';
            this._view.getElementById(buttonID).addEventListener('click', listener);
        }
    }, {
        key: '_deactivateButton',
        value: function _deactivateButton(buttonID) {
            this._view.getElementById(buttonID).className = 'button button-disable';
            this._removeAllEventListener(this._view.getElementById(buttonID));
        }
    }, {
        key: '_changeToBattleScene',
        value: function _changeToBattleScene() {
            this._view.getElementById('default-menu').style.display = 'none';
            this._view.getElementById('battle-menu').style.display = 'inline';
            this._view.getElementById('button-skill').addEventListener('click', this.onClickBattleSkillButton.bind(this));
            this._view.getElementById('button-change').addEventListener('click', this.onClickBattleChangeButton.bind(this));
            this._view.getElementById('button-resign').addEventListener('click', this.onClickBattleResignButton.bind(this));
        }
    }, {
        key: '_changeToChangeScene',
        value: function _changeToChangeScene() {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._deactivateButton('button-ok');
            this._activateButton('button-back', this.onClickChangeBackButton.bind(this));
        }
    }, {
        key: '_changeToConfirmScene',
        value: function _changeToConfirmScene(disableOKButton, disableCancelButton) {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            if (disableOKButton) {
                this._deactivateButton('button-ok');
            } else {
                this._activateButton('button-ok', this.onClickConfirmOKButton.bind(this));
            }
            if (disableCancelButton) {
                this._deactivateButton('button-back');
            } else {
                this._activateButton('button-back', this.onClickConfirmBackButton.bind(this));
            }
        }
    }, {
        key: '_changeToSelectScene',
        value: function _changeToSelectScene() {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._deactivateButton('button-ok');
            this._activateButton('button-back', this.onClickSelectBackButton.bind(this));

            // デバッグ用に暫定でボタンを有効化
            this._view.getElementById('button-ok').addEventListener('click', this.onClickSelectOKButton.bind(this));
        }
    }, {
        key: '_changeToSkillScene',
        value: function _changeToSkillScene() {
            this._view.getElementById('default-menu').style.display = 'inline';
            this._view.getElementById('battle-menu').style.display = 'none';
            this._deactivateButton('button-ok');
            this._activateButton('button-back', this.onClickSkillBackButton.bind(this));
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event) {
            var disableOKButton = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            var disableCancelButton = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            this._removeAllEventListener(this._view.getElementById('button-ok'));
            this._removeAllEventListener(this._view.getElementById('button-back'));
            this._removeAllEventListener(this._view.getElementById('button-skill'));
            this._removeAllEventListener(this._view.getElementById('button-change'));
            this._removeAllEventListener(this._view.getElementById('button-resign'));
            this.notifyAllObserver({ event: event, disableOKButton: disableOKButton, disableCancelButton: disableCancelButton });
        }
    }, {
        key: '_removeAllEventListener',
        value: function _removeAllEventListener(element) {
            var parent = element.parentNode;
            parent.removeChild(element);
            parent.appendChild(element.cloneNode(true));
        }
    }, {
        key: 'confirmType',
        get: function get() {
            return this._confirmType;
        }
    }]);

    return GameMenuController;
})(_utilObservable2['default']);

exports['default'] = GameMenuController;
module.exports = exports['default'];
},{"../event/confirm-type":5,"../event/user-event":6,"../util/observable":11,"./scene-type":4}],2:[function(require,module,exports){
/**
 * game-scene-controller.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

var GameSceneController = (function () {
    function GameSceneController(view) {
        _classCallCheck(this, GameSceneController);

        this._view = view;
        this._initialize();
    }

    _createClass(GameSceneController, [{
        key: 'changeScene',
        value: function changeScene(scene) {
            switch (scene) {
                case _sceneType2['default'].SELECT:
                    this._changeToSelectScene();
                    break;
                case _sceneType2['default'].BATTLE:
                    this._changeToBattleScene();
                    break;
                case _sceneType2['default'].SKILL:
                    this._changeToSkillScene();
                    break;
                case _sceneType2['default'].CHANGE:
                    this._changeToChangeScene();
                    break;
                case _sceneType2['default'].CONFIRM:
                    // do nothing
                    break;
                default:
                    throw new Error('Unknown scene : ' + scene);
            }
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
        key: '_changeToBattleScene',
        value: function _changeToBattleScene() {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 200);
            this._changeFieldHeight(this._view.getElementById('text-message'), 360);

            // master.getSelectedPokemonList(master.PLAYER_ID).forEach((pokemon, index) => {
            //     const imageID = `icon-player-pokemon-${index}`;
            //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            // });
            // master.getSelectedPokemonList(master.OPPONENT_ID).forEach((pokemon, index) => {
            //     const imageID = `icon-opponent-pokemon-${index}`;
            //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            // });
        }
    }, {
        key: '_changeToChangeScene',
        value: function _changeToChangeScene() {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'inline';
            this._changeFieldHeight(this._view.getElementById('info-field'), 460);
            this._changeFieldHeight(this._view.getElementById('text-message'), 100);
        }
    }, {
        key: '_changeToSelectScene',
        value: function _changeToSelectScene() {
            this._view.getElementById('select-info').style.display = 'inline';
            this._view.getElementById('battle-info').style.display = 'none';
            this._view.getElementById('skill-info').style.display = 'none';
            this._view.getElementById('change-info').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 380);
            this._changeFieldHeight(this._view.getElementById('text-message'), 180);
        }
    }, {
        key: '_changeToSkillScene',
        value: function _changeToSkillScene() {
            this._view.getElementById('select-info').style.display = 'none';
            this._view.getElementById('battle-info').style.display = 'inline';
            this._view.getElementById('skill-info').style.display = 'inline';
            this._view.getElementById('change-info').style.display = 'none';
            this._changeFieldHeight(this._view.getElementById('info-field'), 460);
            this._changeFieldHeight(this._view.getElementById('text-message'), 100);
        }
    }, {
        key: '_initialize',
        value: function _initialize() {
            // GitHubにはポケモンの画像をアップロードしないため、その対策
            var setDummyImage = function setDummyImage(image) {
                image.onerror = function () {
                    image.src = '../image/dummy.jpg';
                    image.onerror = undefined;
                };
            };
            Array.prototype.forEach.call(this._view.getElementsByClassName('image-pokemon'), setDummyImage);
            Array.prototype.forEach.call(this._view.getElementsByClassName('icon-pokemon'), setDummyImage);
        }
    }]);

    return GameSceneController;
})();

exports['default'] = GameSceneController;
module.exports = exports['default'];
},{"./scene-type":4}],3:[function(require,module,exports){
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
},{"../event/user-event":6,"../pokemon/announcer/mock-announcer":8,"../pokemon/data/sample-party-list":9,"../pokemon/mock-game-master":10,"../util/observer":12,"./game-menu-controller":1,"./game-scene-controller":2,"./scene-type":4}],4:[function(require,module,exports){
/**
 * scene-type.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    SELECT: 'SELECT',

    BATTLE: 'BATTLE',

    SKILL: 'SKILL',

    CHANGE: 'CHANGE',

    CONFIRM: 'CONFIRM'

};
module.exports = exports['default'];
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
/**
 * user-event.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    TO_SELECT_SCENE: 'TO_SELECT_SCENE',

    TO_BATTLE_SCENE: 'TO_BATTLE_SCENE',

    TO_SKILL_SCENE: 'TO_SKILL_SCENE',

    TO_CHANGE_SCENE: 'TO_CHANGE_SCENE',

    TO_CONFIRM_SCENE: 'TO_CONFIRM_SCENE',

    CONFIRM_OK: 'CONFIRM_OK',

    CONFIRM_CANCEL: 'CONFIRM_CANCEL'

};
module.exports = exports['default'];
},{}],7:[function(require,module,exports){
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
},{"../controller/game-view-controller":3}],8:[function(require,module,exports){
/**
 * mock-announcer.jsx
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

var _utilObserver = require('../../util/observer');

var _utilObserver2 = _interopRequireDefault(_utilObserver);

var _eventUserEvent = require('../../event/user-event');

var _eventUserEvent2 = _interopRequireDefault(_eventUserEvent);

var BrowserAnnouncer = (function (_Observer) {
    _inherits(BrowserAnnouncer, _Observer);

    function BrowserAnnouncer(view) {
        _classCallCheck(this, BrowserAnnouncer);

        _get(Object.getPrototypeOf(BrowserAnnouncer.prototype), 'constructor', this).call(this);
        this._view = view;
    }

    _createClass(BrowserAnnouncer, [{
        key: 'update',
        value: function update(target, param) {
            switch (param.event) {
                case 1:
                    this._initializeSelectScene(param.info);
                    break;
                case 2:
                    this._initializeChangeScene(param.info);
                    break;
                case 3:
                    this._initializeSkillScene(param.info);
                default:
                    break;
            }
        }
    }, {
        key: '_initializeChangeScene',
        value: function _initializeChangeScene(info) {
            var _this = this;

            // ポケモン情報表示
            var setPokemonImage = function setPokemonImage(imageID, pokemon) {
                _this._view.getElementById(imageID).src = '../image/pokemon/' + ('0000' + pokemon.pokemonID).slice(-4) + '.png';
            };
            var setPokemonItemImage = function setPokemonItemImage(imageID, pokemon) {
                if (pokemon.pokemonID === 6370) {
                    _this._view.getElementById(imageID).src = '../image/item/item-berry-lum.png';
                } else {
                    _this._view.getElementById(imageID).src = '../image/item/item-blank.png';
                }
            };
            var setPokemonStatusAilment = function setPokemonStatusAilment(statusAilmentID, pokemon) {
                var statusAilment = pokemon.statusAilment || '　'; // TODO NONEが入ってる
                _this._view.getElementById(statusAilmentID).textContent = statusAilment;
            };
            var setPokemonElement = function setPokemonElement(elementFieldID, pokemon) {
                var elementField = _this._view.getElementById(elementFieldID);
                _this._resetChildren(elementField);
                // const elementList = pokemon.elementList;
                var elementList = [{
                    key: 'GHOST',
                    name: '霊',
                    label: 'ゴースト'
                }];
                if (elementList.length === 1) {
                    // elementList.push(ELement.NONE);
                    elementList.push({
                        key: 'NONE',
                        name: '',
                        label: '　'
                    });
                }
                elementList.forEach(function (element) {
                    var elementTag = _this._view.createElement('span');
                    elementTag.className = 'pokemon-element ' + element.key.toLowerCase();
                    elementTag.textContent = element.label;
                    elementField.appendChild(elementTag);
                });
            };
            var setPokemonSkill = function setPokemonSkill(skillNameFieldID, skillPPFieldID, pokemon) {
                var skillNameField = _this._view.getElementById(skillNameFieldID);
                var skillPPField = _this._view.getElementById(skillPPFieldID);
                _this._resetChildren(skillNameField);
                _this._resetChildren(skillPPField);
                var skillList = pokemon.skillNameList;
                skillList.forEach(function (skill) {
                    var skillNameTag = _this._view.createElement('span');
                    var skillPPTag = _this._view.createElement('span');
                    skillNameTag.textContent = skill;
                    skillPPTag.textContent = '99 / 99';
                    skillNameField.appendChild(skillNameTag);
                    skillPPField.appendChild(skillPPTag);
                });
            };
            Object.keys(info.playerResourceList).forEach(function (key, index) {
                if (index < 3) {
                    var imageID = 'party-icon-player-pokemon-' + index;
                    var itemID = 'party-icon-player-pokemon-item-' + index;
                    var statusAilmentID = 'party-player-pokemon-status-ailment-' + index;
                    var elementFieldID = 'party-player-pokemon-element-' + index;
                    var skillNameFieldID = 'party-player-pokemon-skill-name-' + index;
                    var skillPPFieldID = 'party-player-pokemon-skill-pp-' + index;
                    var _pokemon = info.playerResourceList[key];
                    setPokemonImage(imageID, _pokemon);
                    setPokemonItemImage(itemID, _pokemon);
                    setPokemonStatusAilment(statusAilmentID, _pokemon);
                    setPokemonElement(elementFieldID, _pokemon);
                    setPokemonSkill(skillNameFieldID, skillPPFieldID, _pokemon);
                }
            });
        }
    }, {
        key: '_initializeSelectScene',
        value: function _initializeSelectScene(info) {
            var _this2 = this;

            this._view.getElementById('player-name').textContent = info.playerName;
            this._view.getElementById('opponent-name').textContent = info.opponentName;

            var setPokemonImage = function setPokemonImage(imageID, pokemon) {
                _this2._view.getElementById(imageID).src = '../image/pokemon/' + ('0000' + pokemon.pokemonID).slice(-4) + '.png';
            };
            var setSelectListener = function setSelectListener(imageID, index) {
                //            this._view.getElementById(imageID).addEventListener('click', this.onClickPokemon.bind(this, index));
            };
            Object.keys(info.playerResourceList).forEach(function (key, index) {
                var imageID = 'image-player-pokemon-' + index;
                setPokemonImage(imageID, info.playerResourceList[key]);
                setSelectListener(imageID, index);
            });
            Object.keys(info.opponentResourceList).forEach(function (key, index) {
                var imageID = 'image-opponent-pokemon-' + index;
                setPokemonImage(imageID, info.opponentResourceList[key]);
            });
        }
    }, {
        key: '_initializeSkillScene',
        value: function _initializeSkillScene(info) {
            var _this3 = this;

            var activePokemon = info.playerResourceList[0];
            this._view.getElementById('player-active-pokemon-name').textContent = activePokemon.name;
            this._view.getElementById('player-active-pokemon-item').src = '../image/item/item-blank.png';
            this._view.getElementById('player-active-pokemon-status-ailment').textContent = pokemon.statusAilment || '　'; // TODO NONEが入ってる
            var elementField = this._view.getElementById('player-active-pokemon-element');
            // const elementList = pokemon.elementList;
            this._resetChildren(elementField);
            var elementList = [{
                key: 'GHOST',
                name: '霊',
                label: 'ゴースト'
            }];
            if (elementList.length === 1) {
                // elementList.push(ELement.NONE);
                elementList.push({
                    key: 'NONE',
                    name: '',
                    label: '　'
                });
            }
            elementList.forEach(function (element) {
                var elementTag = _this3._view.createElement('span');
                elementTag.className = 'pokemon-element ' + element.key.toLowerCase();
                elementTag.textContent = element.label;
                elementField.appendChild(elementTag);
            });
            var partyField = this._view.getElementById('icon-player-pokemon');
            this._resetChildren(partyField);
            Object.keys(info.playerResourceList).forEach(function (key, index) {
                if (index < 3) {
                    var _pokemon2 = info.playerResourceList[key];
                    var pokemonIconTag = _this3._view.createElement('img');
                    pokemonIconTag.className = 'player-pokemon icon-pokemon';
                    pokemonIconTag.src = '../image/pokemon/' + ('0000' + _pokemon2.pokemonID).slice(-4) + '.png';
                    partyField.appendChild(pokemonIconTag);
                }
            });
        }
    }, {
        key: '_resetChildren',
        value: function _resetChildren(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }]);

    return BrowserAnnouncer;
})(_utilObserver2['default']);

exports['default'] = BrowserAnnouncer;
module.exports = exports['default'];
},{"../../event/user-event":6,"../../util/observer":12}],9:[function(require,module,exports){
Object.defineProperty(exports,"__esModule",{value:!0});
exports["default"]=[{"\u30a6\u30eb\u30ac\u30e2\u30b9":{pokemonID:6370,nature:"MODEST",ability:"\u866b\u306e\u77e5\u3089\u305b",skillNameList:["\u706b\u708e\u653e\u5c04","\u866b\u306e\u3055\u3056\u3081\u304d","\u76ee\u899a\u3081\u308b\u30d1\u30ef\u30fc","\u8776\u306e\u821e"],item:"\u30e9\u30e0\u306e\u5b9f",effortValue:{H:4,A:0,B:0,C:252,D:0,S:252},hiddenElement:"GROUND"},"\u30d0\u30f3\u30ae\u30e9\u30b9":{pokemonID:2480,nature:"ADAMANT",ability:"\u7802\u8d77\u3053\u3057",skillNameList:["\u30b9\u30c8\u30fc\u30f3\u30a8\u30c3\u30b8",
"\u565b\u307f\u7815\u304f","\u51b7\u51cd\u30d1\u30f3\u30c1","\u99ac\u9e7f\u529b"],item:"\u3053\u3060\u308f\u308a\u30cf\u30c1\u30de\u30ad",effortValue:{H:252,A:252,B:4,C:0,D:0,S:0}},"\u30ad\u30f3\u30b0\u30c9\u30e9":{pokemonID:2300,nature:"MODEST",ability:"\u3059\u3044\u3059\u3044",skillNameList:["\u30cf\u30a4\u30c9\u30ed\u30dd\u30f3\u30d7","\u6ce2\u4e57\u308a","\u6d41\u661f\u7fa4","\u7adc\u306e\u6ce2\u52d5"],item:"\u3053\u3060\u308f\u308a\u30e1\u30ac\u30cd",effortValue:{H:4,A:0,B:0,C:252,D:0,S:252}},
"\u30cf\u30c3\u30b5\u30e0":{pokemonID:2120,nature:"ADAMANT",ability:"\u30c6\u30af\u30cb\u30b7\u30e3\u30f3",skillNameList:["\u30d0\u30ec\u30c3\u30c8\u30d1\u30f3\u30c1","\u866b\u98df\u3044","\u96fb\u5149\u77f3\u706b","\u5263\u306e\u821e"],item:"\u547d\u306e\u73e0",effortValue:{H:236,A:252,B:20,C:0,D:0,S:0}},"\u30cb\u30e7\u30ed\u30c8\u30ce":{pokemonID:1860,nature:"BOLD",ability:"\u96e8\u964d\u3089\u3057",skillNameList:["\u71b1\u6e6f","\u51b7\u51cd\u30d3\u30fc\u30e0","\u6ec5\u3073\u306e\u6b4c","\u30a2\u30f3\u30b3\u30fc\u30eb"],
item:"\u8131\u51fa\u30dc\u30bf\u30f3",effortValue:{H:252,A:0,B:252,C:0,D:4,S:0}},"\u30e9\u30c6\u30a3\u30aa\u30b9":{pokemonID:3810,nature:"TIMID",ability:"\u6d6e\u904a",skillNameList:["\u6d41\u661f\u7fa4","\u30b5\u30a4\u30b3\u30ad\u30cd\u30b7\u30b9","\u6ce2\u4e57\u308a","\u76ee\u899a\u3081\u308b\u30d1\u30ef\u30fc"],item:"\u767d\u3044\u30cf\u30fc\u30d6",effortValue:{H:4,A:0,B:0,C:252,D:0,S:252},hiddenElement:"FIRE"}},{"\u30d4\u30ab\u30c1\u30e5\u30a6":{pokemonID:250,nature:"NAUGHTY",ability:"\u907f\u96f7\u91dd",
skillNameList:["\u30dc\u30eb\u30c6\u30c3\u30ab\u30fc"],item:"\u96fb\u6c17\u7389",effortValue:{H:4,A:252,B:0,C:0,D:0,S:252}},"\u30dc\u30fc\u30de\u30f3\u30c0":{pokemonID:3730,nature:"TIMID",ability:"\u5a01\u5687",skillNameList:["\u6d41\u661f\u7fa4"],item:"\u3053\u3060\u308f\u308a\u30b9\u30ab\u30fc\u30d5",effortValue:{H:4,A:0,B:0,C:252,D:0,S:252}},"\u30e9\u30d7\u30e9\u30b9":{pokemonID:1310,nature:"BOLD",ability:"\u8caf\u6c34",skillNameList:["\u30d5\u30ea\u30fc\u30ba\u30c9\u30e9\u30a4"],item:"\u7a81\u6483\u30c1\u30e7\u30c3\u30ad",
effortValue:{H:252,A:0,B:252,C:0,D:4,S:0}},"\u30b4\u30a6\u30ab\u30b6\u30eb":{pokemonID:3920,nature:"JOLLY",ability:"\u9244\u306e\u62f3",skillNameList:["\u30a4\u30f3\u30d5\u30a1\u30a4\u30c8"],item:"\u6c17\u5408\u306e\u30bf\u30b9\u30ad",effortValue:{H:4,A:252,B:0,C:0,D:0,S:252}},"\u970a\u7363\u30e9\u30f3\u30c9\u30ed\u30b9":{pokemonID:6451,nature:"JOLLY",ability:"\u5a01\u5687",skillNameList:["\u5730\u9707"],item:"\u3053\u3060\u308f\u308a\u30b9\u30ab\u30fc\u30d5",effortValue:{H:4,A:252,B:0,C:0,D:0,S:252}},
"\u30ab\u30a4\u30ea\u30e5\u30fc":{pokemonID:1490,nature:"ADAMANT",ability:"\u30de\u30eb\u30c1\u30b9\u30b1\u30a4\u30eb",skillNameList:["\u9006\u9c57"],item:"\u30e9\u30e0\u306e\u5b9f",effortValue:{H:4,A:252,B:0,C:0,D:0,S:252}}}];module.exports=exports["default"];

},{}],10:[function(require,module,exports){
/**
 * mock-game-master.jsx
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

var MockGameMaster = (function (_Observable) {
    _inherits(MockGameMaster, _Observable);

    function MockGameMaster() {
        _classCallCheck(this, MockGameMaster);

        _get(Object.getPrototypeOf(MockGameMaster.prototype), 'constructor', this).call(this);
        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
        this._info = {};
    }

    _createClass(MockGameMaster, [{
        key: 'initialize',
        value: function initialize(playerName, opponentName, playerResourceList, opponentResourceList) {
            this._info = {
                playerName: playerName,
                opponentName: opponentName,
                playerResourceList: playerResourceList,
                opponentResourceList: opponentResourceList
            };
            this._notifyAllObserver(1);
        }
    }, {
        key: 'requestChangeMenu',
        value: function requestChangeMenu() {
            this._notifyAllObserver(2);
        }
    }, {
        key: 'requestSkillMenu',
        value: function requestSkillMenu() {
            this._notifyAllObserver(3);
        }
    }, {
        key: '_notifyAllObserver',
        value: function _notifyAllObserver(event) {
            this.notifyAllObserver({ event: event, info: this._info });
        }
    }]);

    return MockGameMaster;
})(_utilObservable2['default']);

exports['default'] = MockGameMaster;
module.exports = exports['default'];
},{"../util/observable":11}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}]},{},[7]);
