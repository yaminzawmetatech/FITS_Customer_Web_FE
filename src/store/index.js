// third-party
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// project import
import reducers from "./reducers";

const middleware = [];
if (import.meta.env.DEV) {
    middleware.push(logger);
}

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
    devTools: import.meta.env.DEV,
});

const {dispatch} = store;

export {store, dispatch};
