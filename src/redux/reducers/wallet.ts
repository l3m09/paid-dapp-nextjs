import { createReducer } from "@reduxjs/toolkit";
import { generatePhrase } from "../actions/wallet";

const wallet = {
    isLoading: false,
    seedPhrase: []
};

export const WalletReducer = createReducer(
    { wallet },
    {
        [generatePhrase.type]: (state, action) => ({
            ...state,
            wallet: { ...action.payload }
        }),
    }
);
