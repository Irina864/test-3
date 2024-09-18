import { createSlice } from '@reduxjs/toolkit';

export const modeSlice = createSlice({
  name: 'mode',
  initialState: true,
  reducers: {
    toggleMode: (state) => {
      return !state;
    },
    switchToApplicant: (state) => {
      return true;
    },
    switchToEmployer: (state) => {
      return false;
    },
  },
});

export const { toggleMode, switchToApplicant, switchToEmployer } =
  modeSlice.actions;

export default modeSlice.reducer;
