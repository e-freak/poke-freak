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