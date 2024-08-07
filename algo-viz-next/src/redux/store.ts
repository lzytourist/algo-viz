import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "@/redux/services/apiSlice";
import authReducer from "@/redux/features/authSlice";
import algorithmsReducer from "@/redux/features/algorithmsSlice";

export const makeStore = () => configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        algorithms: algorithmsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
