(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * title-view-controller.jsx
 * 
 * @author yuki
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TitleViewController = (function () {
    function TitleViewController(view) {
        _classCallCheck(this, TitleViewController);

        this._view = view;
    }

    _createClass(TitleViewController, [{
        key: 'initialize',
        value: function initialize() {
            this._view.getElementById('button-battle').addEventListener('click', this.onClickBattleButton.bind(this));
            this._view.getElementById('button-edit').addEventListener('click', this.onClickEditButton);
        }
    }, {
        key: 'onClickBattleButton',
        value: function onClickBattleButton() {
            this._view.location.href = './battle.html';
        }
    }, {
        key: 'onClickEditButton',
        value: function onClickEditButton() {
            this.textContent = 'coming soon..';
        }
    }]);

    return TitleViewController;
})();

exports['default'] = TitleViewController;
module.exports = exports['default'];
},{}],2:[function(require,module,exports){
(function (global){
/**
 * title-view-controller-loader.jsx
 * 
 * @author yuki
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _controllerTitleViewController = require('../controller/title-view-controller');

var _controllerTitleViewController2 = _interopRequireDefault(_controllerTitleViewController);

global.window.addEventListener('DOMContentLoaded', function () {
  global.controller = new _controllerTitleViewController2['default'](global.document);
  global.controller.initialize();
}, false);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../controller/title-view-controller":1}]},{},[2]);
