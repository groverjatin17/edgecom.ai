import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface mainSliceState {
    isUserAuthenticated: boolean;
    currentTheme: PaletteMode;
}

const initialMainState: mainSliceState = {
    isUserAuthenticated: false,
    currentTheme: 'light',
};

export const mainSlice = createSlice({
    name: 'userReducer',
    initialState: initialMainState,
    reducers: {
        toggleUserStatus: (state) => {
            state.isUserAuthenticated = !state.isUserAuthenticated;
        },
        toggleCurrentMode: (state) => {
            const isDarkMode = state.currentTheme === 'dark';
            state.currentTheme = isDarkMode ? 'light' : 'dark';
        },
    },
});

export const { toggleUserStatus, toggleCurrentMode } = mainSlice.actions;

export default mainSlice.reducer;
