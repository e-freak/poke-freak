/**
 * title-view-controller-loader.js
 * 
 * @author yuki
 */

import TitleViewController from '../controller/title-view-controller';



global.window.addEventListener('DOMContentLoaded', () => {
    global.controller = new TitleViewController(global.document);
    global.controller.initialize();
}, false);

