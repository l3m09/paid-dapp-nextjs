import { createReducer } from "@reduxjs/toolkit";
import { setLoader } from "../actions/auth";

const loader = {
    isLoading: false
};

export const AuthReducer = createReducer(
    { loader },
    {
        [setLoader.type]: (state, action) => ({
            ...state,
            loader: { ...action.payload }
        }),
    }
);
