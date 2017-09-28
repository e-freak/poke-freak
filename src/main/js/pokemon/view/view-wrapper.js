/**
 * view-wrapper.js
 * 
 * @author yuki
 */

export default class ViewWrapper {
    
    constructor(view) {
        this._view = view;
    }
    
    createElementClassName(element) {
        return `pokemon-element ${element.key.toLowerCase()}`;
    }
    
    createElementTag(element) {
        return this.createSpanTag(element.label, this.createElementClassName(element));
    }
    
    createImageTag(sourceImagePath, className = undefined) {
        const tag = this._view.createElement('img');
        tag.src = sourceImagePath;
        if (className) {
            tag.className = className;
        }
        return tag;
    }
    
    createSpanTag(text, className = undefined) {
        const tag = this._view.createElement('span');
        tag.textContent = text;
        if (className) {
            tag.className = className;
        }
        return tag;
    }
    
    getAppendableField(fieldID) {
        const field = this.getElementById(fieldID);
        this.resetChildren(field);
        return field;
    }
    
    getElementById(elementID) {
        return this._view.getElementById(elementID);
    }
    
    resetChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    
    get core() {
        return this._view;
    }
    
}
