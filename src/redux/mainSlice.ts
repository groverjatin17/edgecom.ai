import { createSlice } from '@reduxjs/toolkit';

interface mainSliceState {
    currentPage: number;
    isUserAuthenticated: boolean;
}

const initialMainState: mainSliceState = {
    currentPage: 0,
    isUserAuthenticated: false,
};

export const mainSlice = createSlice({
    name: 'userReducer',
    initialState: initialMainState,
    reducers: {
        toggleUserStatus: (state) => {
            state.isUserAuthenticated = !state.isUserAuthenticated;
        },
    },
});

export const { toggleUserStatus } = mainSlice.actions;

export default mainSlice.reducer;
