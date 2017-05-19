/**
 * title-view-controller.jsx
 * 
 * @author yuki
 */



export default class TitleViewController {
    
    constructor(view) {
        this._view = view;
    }
    
    initialize() {
        this._view.getElementById('button-battle').addEventListener('click', this.onClickBattleButton);
        this._view.getElementById('button-edit').addEventListener('click', this.onClickEditButton);
    }
    
    onClickBattleButton() {
        this.textContent = 'coming soon..';
    }
    
    onClickEditButton() {
        this.textContent = 'coming soon..';
    }
    
}

