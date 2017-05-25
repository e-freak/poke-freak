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

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

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
                    this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
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
                    this._notifyAllObserver(_eventEvent2['default'].TO_CONFIRM_SCENE, false, true);
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
            this._notifyAllObserver(_eventEvent2['default'].TO_CHANGE_SCENE);
        }
    }, {
        key: 'onClickBattleResignButton',
        value: function onClickBattleResignButton() {
            this._confirmType = _eventConfirmType2['default'].RESIGN;
            this._notifyAllObserver(_eventEvent2['default'].TO_CONFIRM_SCENE);
        }
    }, {
        key: 'onClickBattleSkillButton',
        value: function onClickBattleSkillButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_SKILL_SCENE);
        }
    }, {
        key: 'onClickChangeBackButton',
        value: function onClickChangeBackButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickChangeOKButton',
        value: function onClickChangeOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickConfirmBackButton',
        value: function onClickConfirmBackButton() {
            this._notifyAllObserver(_eventEvent2['default'].CONFIRM_CANCEL);
        }
    }, {
        key: 'onClickConfirmOKButton',
        value: function onClickConfirmOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].CONFIRM_OK);
        }
    }, {
        key: 'onClickSelectBackButton',
        value: function onClickSelectBackButton() {
            this._view.location.href = './title.html';
        }
    }, {
        key: 'onClickSelectOKButton',
        value: function onClickSelectOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickSkillBackButton',
        value: function onClickSkillBackButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
        }
    }, {
        key: 'onClickSkillOKButton',
        value: function onClickSkillOKButton() {
            this._notifyAllObserver(_eventEvent2['default'].TO_BATTLE_SCENE);
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
},{"../event/confirm-type":5,"../event/event":6,"../util/observable":9,"./scene-type":4}],2:[function(require,module,exports){
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

            // master.getParty(master.PLAYER_ID).forEach((pokemon, index) => {
            //     const imageID = `image-player-pokemon-${index}`;
            //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            // });
            // master.getParty(master.OPPONENT_ID).forEach((pokemon, index) => {
            //     const imageID = `image-opponent-pokemon-${index}`;
            //     this._view.getElementById(imageID).src = '../image/pokemon/xxxx.png';
            // });
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

var _eventEvent = require('../event/event');

var _eventEvent2 = _interopRequireDefault(_eventEvent);

var _pokemonMockGameMaster = require('../pokemon/mock-game-master');

var _pokemonMockGameMaster2 = _interopRequireDefault(_pokemonMockGameMaster);

var _gameMenuController = require('./game-menu-controller');

var _gameMenuController2 = _interopRequireDefault(_gameMenuController);

var _gameSceneController = require('./game-scene-controller');

var _gameSceneController2 = _interopRequireDefault(_gameSceneController);

var _sceneType = require('./scene-type');

var _sceneType2 = _interopRequireDefault(_sceneType);

var GameViewController = (function (_Observer) {
    _inherits(GameViewController, _Observer);

    function GameViewController(view) {
        _classCallCheck(this, GameViewController);

        _get(Object.getPrototypeOf(GameViewController.prototype), 'constructor', this).call(this);
        this._view = view;
        this._scene = this._createSceneController(view);
        this._menu = this._createMenuController(view);
        this._master = this._createGameMaster();
    }

    _createClass(GameViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._menu.addObserver(this);
            this._changeScene(_sceneType2['default'].SELECT);
        }
    }, {
        key: 'update',
        value: function update(target, param) {
            switch (param.event) {
                case _eventEvent2['default'].TO_SELECT_SCENE:
                    this._changeScene(_sceneType2['default'].SELECT);
                    break;
                case _eventEvent2['default'].TO_BATTLE_SCENE:
                    this._changeScene(_sceneType2['default'].BATTLE);
                    break;
                case _eventEvent2['default'].TO_SKILL_SCENE:
                    this._changeScene(_sceneType2['default'].SKILL);
                    break;
                case _eventEvent2['default'].TO_CHANGE_SCENE:
                    this._changeScene(_sceneType2['default'].CHANGE);
                    break;
                case _eventEvent2['default'].TO_CONFIRM_SCENE:
                    this._changeScene(_sceneType2['default'].CONFIRM, param.disableOKButton, param.disableCancelButton);
                    break;
                case _eventEvent2['default'].CONFIRM_OK:
                    this._menu.onConfirmOK(target.confirmType);
                    break;
                case _eventEvent2['default'].CONFIRM_CANCEL:
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
},{"../event/event":6,"../pokemon/mock-game-master":8,"../util/observer":10,"./game-menu-controller":1,"./game-scene-controller":2,"./scene-type":4}],4:[function(require,module,exports){
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
 * event.jsx
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
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
