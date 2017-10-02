/**
 * setup-unit-test.js
 */

import jsdom from 'jsdom';



const dom = new jsdom.JSDOM();
global.document = dom.window.document;
global.window = document.defaultView;
global.window.Image = window.Image;
