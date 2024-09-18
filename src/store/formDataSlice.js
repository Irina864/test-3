import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    languages: [{ language: '', level: '' }],
    courses: [{ institute: '', faculty: '', speciality: '', year: '', certificate: null }],
    portfolios: [{ link: '', description: '', file: null }],
};


const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        addLanguage: (state) => {
            state.languages.push({ language: '', level: '' });
        },
        updateLanguage: (state, action) => {
            const { index, key, value } = action.payload;
            state.languages[index][key] = value;
        },
        deleteLanguage: (state, action) => {
            state.languages.splice(action.payload, 1);
        },
        addCourse: (state) => {
            state.courses.push({ institute: '', faculty: '', speciality: '', year: '', certificate: null });
        },
        updateCourse: (state, action) => {
            const { index, key, value } = action.payload;
            state.courses[index][key] = value;
        },
        deleteCourse: (state, action) => {
            state.courses.splice(action.payload, 1);
        },
        addPortfolio: (state) => {
            state.portfolios.push({ link: '', description: '', file: null });
        },
        updatePortfolio: (state, action) => {
            const { index, key, value } = action.payload;
            state.portfolios[index][key] = value;
        },
        deletePortfolio: (state, action) => {
            state.portfolios.splice(action.payload, 1);
        },
        setCertificateFile: (state, action) => {
            const { index, file } = action.payload;
            state.courses[index].certificate = file;
        },
        setPortfolioFile: (state, action) => {
            const { index, file } = action.payload;
            state.portfolios[index].file = file;
        },
        removeCertificateFile: (state, action) => {
            const { index } = action.payload;
            state.courses[index].certificate = null;
        },
        removePortfolioFile: (state, action) => {
            const { index } = action.payload;
            state.portfolios[index].file = null;
        },
    },
});


export const {
    addLanguage,
    updateLanguage,
    deleteLanguage,
    addCourse,
    updateCourse,
    deleteCourse,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
} = formDataSlice.actions;


export default formDataSlice.reducer;

