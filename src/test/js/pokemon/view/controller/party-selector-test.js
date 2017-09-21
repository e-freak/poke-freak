/**
 * party-selector-test.js
 */

import assert from 'assert';
import test from './pokemon-test-util';

import PartySelector from './party-selector';

import BrowserEvent from './event/browser-event';



describe('PartySelectorTest', () => {
    
    describe('clear()', () => {
        
        it('Clear selected.', () => {
            const selector = createSelector();
            
            selector.select(1);
            assert.strictEqual(selector.pokemonIndexList.length, 1);
            
            selector.clear();
            assert.strictEqual(selector.pokemonIndexList.length, 0);
        });
        
    });
    
    describe('isEmpty()', () => {
        
        it('Empty check.', () => {
            const selector = createSelector();
            
            assert.ok(selector.isEmpty());
            
            selector.select(1);
            assert.ok(!selector.isEmpty());
        });
        
    });
    
    describe('isLimit()', () => {
        
        it('Limit check.', () => {
            const selector = createSelector();
            
            selector.select(1);
            selector.select(2);
            assert.ok(!selector.isLimit());
            
            selector.select(3);
            assert.ok(selector.isLimit());
        });
        
    });
    
    describe('isSelected()', () => {
        
        it('Pokemon selected check.', () => {
            const selector = createSelector();
            
            selector.select(1);
            assert.ok(selector.isSelected(1));
            assert.ok(!selector.isSelected(2));
        });
        
    });
    
    describe('select()', () => {
        
        it('Select.', () => {
            const observer = test.createObserver();
            const selector = createSelector();
            selector.addObserver(observer);
            
            selector.select(5);
            selector.select(3);
            selector.select(1);
            assert.strictEqual(selector.pokemonIndexList.length, 3);
            assert.strictEqual(selector.pokemonIndexList[0], 5);
            assert.strictEqual(selector.pokemonIndexList[1], 3);
            assert.strictEqual(selector.pokemonIndexList[2], 1);
            test.checkEvent(observer, [
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 5) } ],
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 3) } ],
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 1) } ],
            ]);
        });
        
        it('Cancel.', () => {
            const observer = test.createObserver();
            const selector = createSelector();
            selector.addObserver(observer);
            
            selector.select(5);
            selector.select(3);
            selector.select(5);
            assert.strictEqual(selector.pokemonIndexList.length, 1);
            assert.strictEqual(selector.pokemonIndexList[0], 3);
            test.checkEvent(observer, [
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 5) } ],
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 3) } ],
                [ selector, BrowserEvent.UNSELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 5) } ],
            ]);
        });
        
        it('Limit.', () => {
            const observer = test.createObserver();
            const selector = createSelector();
            selector.addObserver(observer);
            
            selector.select(5);
            selector.select(3);
            selector.select(1);
            selector.select(2);
            assert.strictEqual(selector.pokemonIndexList.length, 3);
            assert.strictEqual(selector.pokemonIndexList[0], 5);
            assert.strictEqual(selector.pokemonIndexList[1], 3);
            assert.strictEqual(selector.pokemonIndexList[2], 1);
            test.checkEvent(observer, [
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 5) } ],
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 3) } ],
                [ selector, BrowserEvent.SELECT_POKEMON, undefined, (v) => { assert.strictEqual(v, 1) } ],
            ]);
        });
        
    });
    
    
    
    function createSelector() {
        return new PartySelector();
    }
    
});
