/**
 * title-view-controller-loader.jsx
 * 
 * @author yuki
 */

import TitleViewController from '../controller/title-view-controller';



global.window.addEventListener('DOMContentLoaded', () => {
    global.controller = new TitleViewController(global.document);
    global.controller.initialize();
}, false);

