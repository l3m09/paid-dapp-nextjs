import { createAction } from "@reduxjs/toolkit";

interface Loader {
    isLoading: boolean;
}

export const setLoader = createAction("LOADER", function prepare(
    loader: Loader
) {
    return {
        payload: loader
    };
});
