/**
 * setup-unit-test.js
 * 
 * @author yuki
 */

const jsdom = require('jsdom');



const dom = new jsdom.JSDOM();
global.document = dom.window.document;
global.window = document.defaultView;
global.window.Image = window.Image;
