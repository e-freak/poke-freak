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
    }]);

    return GameSceneController;
})();

exports['default'] = GameSceneController;
module.exports = exports['default'];