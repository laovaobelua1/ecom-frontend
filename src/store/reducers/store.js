import {configureStore} from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";

export const store = configureStore({
    reducer: {products: productReducer,
        errors: errorReducer,
    },
    preloadedState: {},
})

export default store;