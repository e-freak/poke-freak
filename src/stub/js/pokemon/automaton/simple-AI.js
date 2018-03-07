/**
 * simple-AI.js
 * 
 * @author yuki
 */



/**
 * 戦況を意識しないAI
 */
export default class SimpleAI {
    
    /**
     * コンストラクタ
     */
    constructor() {
        this._playerID = 0;
        this._playerResource = [];
        this._opponentResource = [];
        this._playerSelectedPokemonTable = {};
    }
    
    /**
     * 初期化処理
     * 
     * @param playerID 自分のプレイヤーID。
     * @param playerResource 自分側のパーティー情報。
     * @param opponentResource 対戦相手側のパーティー情報。
     */
    initialize(playerID, playerResource, opponentResource) {
        this._playerID = playerID;
        this._playerResource = playerResource;
        this._opponentResource = opponentResource;
        this._playerSelectedPokemonTable = {};
    }
    
    /**
     * 行動を選択 (技の使用 or 交代)
     * 
     * @param activePokemonID アクティブなポケモンのID。
     * @return 行動。 ('SKILL' または 'CHANGE' のみ可)
     */
    selectAction(activePokemonID) {
        if (this._isLastPokemon()) {
            return 'SKILL';
        }
        else {
            return this._challenge(80) ? 'SKILL' : 'CHANGE';
        }
    }
    
    /**
     * 交代先のポケモンを選択 (バトンタッチ時)
     * 
     * @param activePokemonID アクティブなポケモンのID。
     * @return 交代先のポケモンのインデックス。 (選択した3体のリストに対応するもの)
     */
    selectBatonPokemon(activePokemonID) {
        return this.selectNextPokemon();
    }
    
    /**
     * 交代先のポケモンを選択
     * 
     * @param activePokemonID アクティブなポケモンのID。
     * @return 交代先のポケモンのインデックス。 (選択した3体のリストに対応するもの)
     */
    selectNextPokemon(activePokemonID) {
        let index = -1;
        Object.values(this._playerSelectedPokemonTable).some((pokemon) => {
            if (!pokemon.dead && (pokemon.pokemonID !== activePokemonID)) {
                index = pokemon.index;
                return true;
            }
            return false;
        });
        if (index === -1) {
            throw new Error(`Active pokemon ID : ${activePokemonID}`);
        }
        return index;
    }
    
    /**
     * 選出するポケモンを選択
     * 
     * @return 選出するポケモンのインデックスのリスト。 (initialize() で受け取るリソースリストに対応するもの)
     */
    selectParty() {
        this._playerSelectedPokemonTable = {};
        const indexList = [];
        while (indexList.length < 3) {
            const index = Math.round(Math.random() * 5);
            if (!indexList.includes(index)) {
                const pokemon = this._playerResource[index];
                pokemon.index = indexList.length;
                pokemon.dead = false;
                this._playerSelectedPokemonTable[pokemon.pokemonID] = pokemon;
                indexList.push(index);
            }
        }
        return indexList;
    }
    
    /**
     * 使用する技を選択
     * 
     * @param activePokemonID アクティブなポケモンのID。
     * @return 使用する技のインデックス。 (pokemon.skillList で受け取るスキルリストに対応するもの)
     */
    selectSkill(activePokemonID) {
        return Math.round(Math.random() * 3);
    }
    
    /**
     * バトル情報を更新
     * 
     * @param event イベント。
     * @param info 最新のバトル情報。
     */
    updateBattleInfo(event, info) {
        switch (event) {
        case 'POKEMON_DEAD':
            if (info.playerID === this._playerID) {
                this._playerSelectedPokemonTable[info.activePokemonID].dead = true;
            }
            break;
        default:
            break;
        }
    }
    
    /**
     * AIの名前を取得
     * 
     * @return AIの名前。
     */
    get name() {
        return 'SimpleAI';
    }
    
    /**
     * プレイヤーIDを取得
     * 
     * @return プレイヤーID。
     */
    get playerID() {
        return this._playerID;
    }
    
    /**
     * 確率判定
     * 
     * @param percentage trueを返す確率。[％]
     * @return 成否。
     */
    _challenge(percentage) {
        return percentage >= Math.ceil(Math.random() * 100);
    }
    
    /**
     * 最後の一体か
     * 
     * @return 判定結果。
     */
    _isLastPokemon() {
        let count = 0;
        Object.values(this._playerSelectedPokemonTable).forEach((pokemon) => {
            if (pokemon.dead) {
                count++;
            }
        });
        return count >= 2;
    }
    
}
