/**
 * mock-game-master.jsx
 * 
 * @author yuki
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MockGameMaster = (function () {
    function MockGameMaster() {
        _classCallCheck(this, MockGameMaster);

        this.PLAYER_ID = { value: 1 };
        this.OPPONENT_ID = { value: 2 };
    }

    _createClass(MockGameMaster, [{
        key: "getParty",
        value: function getParty(playerID) {
            return [{}, {}, {}, {}, {}, {}];
        }
    }, {
        key: "getSelectedPokemonList",
        value: function getSelectedPokemonList(playerID) {
            return [{}, {}, {}];
        }
    }]);

    return MockGameMaster;
})();

exports["default"] = MockGameMaster;
module.exports = exports["default"];