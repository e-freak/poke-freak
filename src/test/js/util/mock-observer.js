/**
 * mock-observer.js
 */

import Observer from './observer';



export default class MockObserver extends Observer {
    
    constructor() {
        super();
        this.targetList = [];
        this.paramList = [];
    }
    
    update(target, param) {
        this.targetList.push(target);
        this.paramList.push(param);
    }
    
}

