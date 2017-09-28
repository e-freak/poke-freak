/**
 * game-event.js
 * 
 * @author yuki
 */



export default {
    
    // 必ず GAME_XXX の値を取ること
    
    GAME_START         : 'GAME_GAME_START',
    TURN_START         : 'GAME_TURN_START',
    TURN_READY         : 'GAME_TURN_READY',
    GAME_SET           : 'GAME_GAME_SET',
    GAME_DRAW          : 'GAME_GAME_DRAW',
    GAME_CLOSE         : 'GAME_GAME_CLOSE',
    
    CHANGE_BY_SKILL    : 'GAME_CHANGE_BY_SKILL',
    CHANGE_BY_BATON    : 'GAME_CHANGE_BY_BATON',
    CHANGE_FOR_NEXT    : 'GAME_CHANGE_FOR_NEXT',
    
};
