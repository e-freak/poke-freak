/**
 * game-view-controller-loader.js
 * 
 * @author yuki
 */

import GameViewController from '../pokemon/view/controller/game-view-controller';



const GLOBAL = (this || 0).self || (typeof self !== 'undefined') ? self : global;
((global) => {
    global.window.addEventListener('DOMContentLoaded', () => {
        global.controller = new GameViewController(global.document);
        global.controller.initialize();
    }, false);
})(GLOBAL);
