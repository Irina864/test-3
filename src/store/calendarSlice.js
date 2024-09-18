import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: { showCalendar: false, date: null },
  reducers: {
    showCalendar: (state) => {
      state.showCalendar = true;
    },
    hideCalendar: (state) => {
      state.showCalendar = false;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { showCalendar, hideCalendar, setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
