import { WalletActionTypes } from '../actionTypes/wallet'

const words = ['glide', 'slim', 'edit', 'jacket', 'suit', 'stock', 'vast', 'gym',
    'index', 'square', 'people', 'glide', 'slim', 'jacket', 'model', 'suit', 'vast',
    'answer', 'increase', 'miss', 'people', 'edit', 'model', 'stock', 'answer',
    'increase', 'gym', 'index', 'miss', 'square', 'lorem', 'ipsum', 'dolor',
    'sit', 'amet', 'consectetur', 'adipisicing', 'elit', 'magnam',
    'nulla', 'quas', 'quos', 'unde', 'Ab', 'consectetur', 'cupiditate',
    'delectus', 'deleniti', 'dolorem', 'error', 'esse', 'libero', 'nobis',
    'placeat', 'quas', 'repellat', 'sit', 'tenetur', 'veniam'];

function selectWords () {
    let phrase = [];
    for (let i = 0; i < 12; i+=1) {
        phrase.push(words[Math.floor(Math.random() * Math.floor(words.length))])
    }
    return phrase
}

// CREATORS
const generatePhrase = (payload: any) => {
    return {
        type: WalletActionTypes.GENERATE_PHRASE,
        payload
    }
}
const addWord = (payload: any) => {
    return {
        type: WalletActionTypes.ADD_WORD,
        payload
    }
}
const removeWord = (payload: any) => {
    return {
        type: WalletActionTypes.REMOVE_WORD,
        payload
    }
}

// ACTIONS
export const doGeneratePhrase = () => async (dispatch: any) => {
    let words = selectWords()
    dispatch(generatePhrase(words));
};
export const doAddWord = (word: any, index: any) => (dispatch: any, payload: any) => {
    dispatch(addWord({word, index}));

};
export const doRemoveWord = (word: any, index: any) => async (dispatch: any, payload: any) => {
    dispatch(removeWord({word, index}));

};
