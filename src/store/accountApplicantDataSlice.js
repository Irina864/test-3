import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние с данными для всех страниц
const initialState = {
  page0: {
    name: '',
    surname: '',
    email: '',
    phone: '',
  },
  page1: {
    notifications: true,
  },
  page2: {
    password: '',
  },
  page3: {
    message: '',
    file: '',
  },
};

const accountApplicantData = createSlice({
  name: 'accountApplicantData',
  initialState,
  reducers: {
    updatePage: (state, action) => {
      const { pageIndex, data } = action.payload;
      if (state[`page${pageIndex}`] !== undefined) {
        state[`page${pageIndex}`] = data;
      }
    },
  },
});

export const { updatePage } = accountApplicantData.actions;

export default accountApplicantData.reducer;
