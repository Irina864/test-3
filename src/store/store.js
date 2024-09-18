'use client';
import { configureStore } from '@reduxjs/toolkit';
import modeSlice from './modeSlice';
import authorizationSlice from './authorizationSlice';
import pageSlice from './pageSlice';
import progressSlice from './progressSlice';
import modalSlice from './modalSlice';
import aboutSlice from './aboutSlice';
import formSlice from './formSlice';
import workPlaceSlice from './workPlaceSlice';
import educationPlaceSlice from './educationPlaceSlice';
import formDataSlice from './formDataSlice';
import calendarSlice from './calendarSlice';
import resumeDataSlice from './resumeDataSlice';
import vacancyDataReducer from './vacancyDataSlice';
import addressSlice from './addressSlice';
import accountApplicantDataSlice from './accountApplicantDataSlice';

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    authorization: authorizationSlice,
    page: pageSlice,
    progress: progressSlice,
    modal: modalSlice,
    about: aboutSlice,
    form: formSlice,
    workPlace: workPlaceSlice,
    educationPlace: educationPlaceSlice,
    formData: formDataSlice,
    calendar: calendarSlice,
    resumeData: resumeDataSlice,
    vacancyData: vacancyDataReducer,
    addresses: addressSlice,
    accountApplicantData: accountApplicantDataSlice,
  },
  devTools: true,
});

export default store;
