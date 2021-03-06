/**
 * title-view-controller-loader.js
 * 
 * @author yuki
 */

import TitleViewController from '../pokemon/view/controller/title-view-controller';



const GLOBAL = (this || 0).self || (typeof self !== 'undefined') ? self : global;
((global) => {
    global.window.addEventListener('DOMContentLoaded', () => {
        global.controller = new TitleViewController(global.document);
        global.controller.initialize();
    }, false);
})(GLOBAL);
