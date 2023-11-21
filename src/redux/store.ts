import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import userReducer from './mainSlice';
import pokemonReducer from './pokemonSlice';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    userReducer,
    pokemonReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
