import { createSlice } from '@reduxjs/toolkit';

interface mainSliceState {
    isUserAuthenticated: boolean;
}

const initialMainState: mainSliceState = {
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
