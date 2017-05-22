/**
 * game-view-controller-loader.jsx
 * 
 * @author yuki
 */

import GameViewController from '../controller/game-view-controller';



global.window.addEventListener('DOMContentLoaded', () => {
    global.controller = new GameViewController(global.document);
    global.controller.initialize();
}, false);

