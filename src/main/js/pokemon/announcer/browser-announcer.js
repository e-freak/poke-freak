/**
 * browser-announcer.js
 * 
 * @author yuki
 */

import ConsoleAnnouncer from './console-announcer';



export default class BrowserAnnouncer extends ConsoleAnnouncer {
    
    constructor(view) {
        super();
        this._view = view;
    }
    
    _createMessageProcessor() {
        return (message) => {
            const textarea = this._view.getElementById('text-message');
            if (message) {
                if (textarea.textContent) {
                    textarea.innerHTML += `<br />${message}`;
                }
                else {
                    textarea.innerHTML = message;
                }
            }
            else {
                textarea.innerHTML = '';
            }
        };
    }
    
    _request(message) {
        this._buffer.push(`<span class="request-to-user">${message}</span>`);
    }
    
    _weatherReport(message) {
        this._buffer.push(`<span class="weather-report">${message}</span>`);
    }
    
    _writeBattleInfo(info, playerID) {
        // 何もしない
    }
    
    _writeStrong(message) {
        this._buffer.push(`<span class="strong">${message}</span>`);
    }
    
}

