import { configureStore } from '@reduxjs/toolkit';
import userReducer from './mainSlice';
import pokemonReducer from './pokemonSlice';

const store = configureStore({
    reducer: {
        userReducer: userReducer,
        pokemonReducer: pokemonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
