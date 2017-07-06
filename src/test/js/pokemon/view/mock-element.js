/**
 * mock-element.js
 * 
 * @author yuki
 */



export default class MockElement {
    
    constructor() {
        this.addEventListenerList = [];
    }
    
    addEventListener(type, listener) {
        this.addEventListenerList.push({ type: type, listener: listener });
    }
    
}
