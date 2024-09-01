import { configureStore } from "@reduxjs/toolkit";
import reduxStorage from "./storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import RootReducer from "./root-reducer";

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['game']
}

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST]
        }
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export const persistor = persistStore(store);