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