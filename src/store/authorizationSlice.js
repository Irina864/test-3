import { createSlice } from '@reduxjs/toolkit';

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: false,
    reducers: {
        toggleAuthorization: (state) => {
            return !state;
        },
    },
});

export const { toggleAuthorization } = authorizationSlice.actions;

export default authorizationSlice.reducer;
