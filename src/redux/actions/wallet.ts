import { createAction } from "@reduxjs/toolkit";
import { ActionsTypes } from '../actionsTypes'

interface Wallet {
    isLoading: boolean;
    seedPhrase: [];
}

const words = ['glide', 'slim', 'edit', 'jacket', 'suit', 'stock', 'vast', 'gym',
    'index', 'square', 'people', 'glide', 'slim', 'jacket', 'model', 'suit', 'vast',
    'answer', 'increase', 'miss', 'people', 'edit', 'model', 'stock', 'answer',
    'increase', 'gym', 'index', 'miss', 'square'];

function selectWords () {
    let phrase = [];
    for (let i = 0; i < 12; i+=1) {
        phrase.push(words[Math.floor(Math.random() * Math.floor(words.length))])
    }
    return phrase
}

export const generatePhrase = createAction(
    ActionsTypes.GENERATE_PHRASE,
    function prepare() {
    return {
        payload: {
            seedPhrase: selectWords()
        }
    };
});
