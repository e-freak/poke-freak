/**
 * image-resource.js
 * 
 * @author yuki
 */



class ImageResource {
    
    constructor() {
        this._pokemonImageTable = {};
        this._itemImageTable = {};
        this._dummyPokemonImage = this._createImageObject('../image/dummy.jpg');
        this._blankItemImage = this._createImageObject('../image/item/item-blank.png');
    }
    
    getBlankItemImage() {
        return this._blankItemImage.src;
    }
    
    getDummyPokemonImage() {
        return this._dummyPokemonImage.src;
    }
    
    getItemImage(item) {
        // TODO アイテム画像
        return this._blankItemImage.src;
    }
    
    getPokemonImage(pokemonID) {
        if (pokemonID in this._pokemonImageTable) {
            return this._pokemonImageTable[pokemonID].src;
        }
        else {
            const imagePath = `../image/pokemon/${this._trimPokemonID(pokemonID)}.png`;
            try {
                system.statSync(imagePath);
                this._pokemonImageTable[pokemonID] = this._createImageObject(imagePath);
                return this._pokemonImageTable[pokemonID].src;
            }
            catch (e) {
                return this.getDummyPokemonImage();
            }
        }
    }
    
    _createImageObject(sourceImagePath) {
        const image = new window.Image();
        image.src = sourceImagePath;
        return image;
    }
    
    _trimPokemonID(pokemonID) {
        return ('0000' + pokemonID).slice(-4);
    }
    
}

export default new ImageResource();
