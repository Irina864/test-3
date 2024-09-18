import { createSlice } from '@reduxjs/toolkit';

export const resumeDataSlice = createSlice({
  name: 'resumeData',
  initialState: {
    page1: { profession: '', salary: '', schedule: [], format: [] },
    page2: {
      avatarFile: '',
      nameApplicant: '',
      surnameApplicant: '',
      sex: '',
      birthDate: '',
      showOnlyYear: '',
      city: '',
      remoteWork: '',
      email: '',
      phone: '',
    },
    page3: {
      noExperience: '',
      workPeriods: [],
    },
    page4: {
      educations: [],
    },
    page5: {},
    page6: {
      personalInfo: [],
    },
  },
  reducers: {
    updatePage1: (state, action) => {
      state.page1 = action.payload;
    },
    updatePage2: (state, action) => {
      state.page2 = action.payload;
    },
    updatePage3: (state, action) => {
      state.page3 = action.payload;
    },
    updatePage4: (state, action) => {
      state.page4 = action.payload;
    },
    updatePage5: (state, action) => {
      state.page5 = action.payload;
    },
    updatePage6: (state, action) => {
      state.page6 = action.payload;
    },
  },
});

export const {
  updatePage1,
  updatePage2,
  updatePage3,
  updatePage4,
  updatePage5,
  updatePage6,
} = resumeDataSlice.actions;

export default resumeDataSlice.reducer;
