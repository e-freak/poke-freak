/**
 * title-view-controller-loader.jsx
 * 
 * @author yuki
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scriptControllerTitleViewController = require('../script/controller/title-view-controller');

var _scriptControllerTitleViewController2 = _interopRequireDefault(_scriptControllerTitleViewController);

global.window.addEventListener('DOMContentLoaded', function () {
  global.controller = new _scriptControllerTitleViewController2['default'](global.document);
  global.controller.initialize();
}, false);