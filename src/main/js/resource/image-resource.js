/**
 * image-resource.js
 * 
 * @author yuki
 */

import fs from 'fs';



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
        if (!(pokemonID in this._pokemonImageTable)) {
            this.preload(pokemonID);
        }
        if (!(pokemonID in this._pokemonImageTable)) {
            return this.getDummyPokemonImage();
        }
        return this._pokemonImageTable[pokemonID].src;
    }
    
    preload(pokemonID) {
        if (!(pokemonID in this._pokemonImageTable)) {
            const imagePath = `../image/pokemon/${this._trimPokemonID(pokemonID)}.png`;
            if (fs.existsSync(imagePath.replace('..', 'app'))) {
                this._pokemonImageTable[pokemonID] = this._createImageObject(imagePath);
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



class ImageResourceSingleton {
    
    constructor() {
        this._core = new ImageResource();
    }
    
    getInstance() {
        return this._core;
    }
    
}

export default new ImageResourceSingleton();
