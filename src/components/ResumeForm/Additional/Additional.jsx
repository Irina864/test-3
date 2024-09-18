'use client';
import React, { useState, useEffect } from 'react';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormSelect from '@/components/UI/Form/FormSelect/FormSelect';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourse,
  deleteCourse,
  addPortfolio,
  deletePortfolio,
  addLanguage,
  deleteLanguage,
  updateLanguage,
  updateCourse,
  updatePortfolio,
} from '@/store/formDataSlice';
import { updatePage5 } from '@/store/resumeDataSlice';
import styles from './Additional.module.scss';

const Additional = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const [certificateFile, setCertificateFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);

  const languages = [
    'Русский',
    'Английский',
    'Китайский',
    'Немецкий',
    'Французский',
    'Турецкий',
    'Итальянский',
    'Португальский',
    'Арабский',
    'Корейский',
    'Японский',
  ];
  const languageLevels = [
    'Начальный',
    'Средний',
    'Продвинутый',
    'В совершенстве',
    'Родной',
  ];

  const handleAddLanguage = (e) => {
    e.preventDefault();
    dispatch(addLanguage());
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    dispatch(addCourse());
  };

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    dispatch(addPortfolio());
  };

  const handleDeleteLanguage = (index) => {
    if (formData.languages.length > 1) {
      dispatch(deleteLanguage(index));
    }
  };

  const handleChange = (e, index, key) => {
    let value = e.target.value;
    
    value = value.trim();
    
    value = value.replace(/\s{2,}/g, ' ');
  
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    
    dispatch(
      updateCourse({
        index,
        key,
        value: capitalizedValue,
      })
    );
  };
  
  

  const handleDeleteCourse = (index) => {
    if (formData.courses.length > 1) {
      dispatch(deleteCourse(index));
    }
  };

  const handleDeletePortfolio = (index) => {
    if (formData.portfolios.length > 1) {
      dispatch(deletePortfolio(index));
    }
  };

  const handleFileChange = (e, index, type) => {
    const file = e.target.files[0];
    if (file) {
        if (type === 'certificate') {
            dispatch(updateCourse({ index, key: 'certificate', value: file }));
        } else if (type === 'portfolio') {
            dispatch(updatePortfolio({ index, key: 'file', value: file }));
        }
    }
};

  const handleClickFileInput = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.click();
  };

  const handleRemoveFile = (type, index) => {
    if (type === 'certificate') {
        dispatch(updateCourse({ index, key: 'certificate', value: null }));
    } else if (type === 'portfolio') {
        dispatch(updatePortfolio({ index, key: 'file', value: null }));
    }
};

  const years = [];
  for (
    let i = new Date().getFullYear() + 10;
    i !== new Date(1970, 0, 1).getFullYear() - 1;
    i--
  ) {
    years.push(i);
  }

  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const isValid = true;

    if (isValid) {
      dispatch(updatePage5(formData));
    }
    return isValid;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page4}>
      {formData.languages.map((language, index) => (
        <div
          key={index}
          className={`${styles.box} ${
            formData.languages.length > 1 ? styles.showDelete : ''
          }`}
        >
          <div className={styles.label__wrap}>
            <label>Владение языками</label>
            <div className={styles.period__line}></div>
            {formData.languages.length > 1 && (
              <button
                className={styles.period__btnwrap}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteLanguage(index);
                }}
              >
                <img
                  className={styles.label__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            )}
          </div>
          <div className={styles.languageContainer}>
            {/* <div className={styles.language}>
              <select
                className={styles.date}
                id={`language-${index}`}
                name={`language-${index}`}
                value={language.language}
                onChange={(e) =>
                  dispatch(
                    updateLanguage({
                      index,
                      key: 'language',
                      value: e.target.value,
                    })
                  )
                }
              >
                <option value="" disabled selected>
                  Язык
                </option>
                {languages.map((languageOption, i) => (
                  <option key={i} value={languageOption}>
                    {languageOption}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.level}>
              <select
                className={styles.date}
                id={`level-${index}`}
                name={`level-${index}`}
                value={language.level}
                onChange={(e) =>
                  dispatch(
                    updateLanguage({
                      index,
                      key: 'level',
                      value: e.target.value,
                    })
                  )
                }
              >
                <option value="" disabled selected>
                  Уровень
                </option>
                {languageLevels.map((levelOption, i) => (
                  <option key={i} value={levelOption}>
                    {levelOption}
                  </option>
                ))}
              </select>
            </div> */}
            <FormSelect
              array={languages}
              label="Язык"
              className={styles.date}
              id={`language-${index}`}
              name={`language-${index}`}
              value={language.language}
              onChange={(selectedValue) =>
                dispatch(
                  updateLanguage({
                    index,
                    key: 'language',
                    value: selectedValue,
                  })
                )
              }
            />
            <FormSelect
              array={languageLevels}
              label="Уровень"
              className={styles.date}
              id={`level-${index}`}
              name={`level-${index}`}
              value={language.level}
              onChange={(selectedValue) =>
                dispatch(
                  updateLanguage({
                    index,
                    key: 'level',
                    value: selectedValue,
                  })
                )
              }
            />
          </div>
          <button
            id="addLanguageButton"
            onClick={handleAddLanguage}
            type="button"
            className={styles.addButton}
          >
            Добавить язык
          </button>
        </div>
      ))}
      {/* Повышение квалификации и курсы */}
      {formData.courses.map((course, index) => (
        <div
          key={index}
          className={`${styles.box} ${
            formData.courses.length > 1 ? styles.showDelete : ''
          }`}
        >
          <div className={styles.label__wrap}>
            <label>Повышение квалификации и курсы</label>
            <div className={styles.period__line}></div>
            {formData.courses.length > 1 && (
              <button
                className={styles.period__btnwrap}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteCourse(index);
                }}
              >
                <img
                  className={styles.label__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            )}
          </div>
          <FormInput
            id={`institute-${index}`}
            label="Учебное заведение"
            type="text"
            inputName={`institute-${index}`}
            value={course.institute}
            isCleanedInput={true}
            onChange={(e) =>
              handleChange(e, index, 'institute')
            }
          />
          <FormInput
            id={`faculty-${index}`}
            label="Факультет"
            type="text"
            inputName={`faculty-${index}`}
            value={course.faculty}
            isCleanedInput={true}
            onChange={(e) =>
              handleChange(e, index, 'faculty')
            }
          />
          <FormInput
            id={`speciality-${index}`}
            label="Специальность"
            type="text"
            inputName={`speciality-${index}`}
            value={course.speciality}
            isCleanedInput={true}
            onChange={(e) =>
              handleChange(e, index, 'speciality')
            }
          />
          <div className={styles.year}>
            <label htmlFor="year" className={styles.year__label}>
              Год окончания
            </label>
            <div className={styles.year__box}>
              {/* <select className={styles.date} id="year">
                <option value="" disabled selected></option>
                {years.map((year, index) => (
                  <option
                    key={index}
                    index={index}
                    value={year}
                    className={styles.year__item}
                  >
                    {year}
                  </option>
                ))}
              </select> */}
              <FormSelect
                array={years}
                className={styles.year__item}
                value={course.year}
                onChange={(selectedValue) =>
                  dispatch(
                    updateCourse({ index, key: 'year', value: selectedValue })
                  )
                }
              />
              <Tooltip text="Если еще учитесь, укажите примерный год окончания" />
            </div>
              {/* Прикрепить сертификат */}
<button
    onClick={(e) => handleClickFileInput(e, `certificate-upload-${index}`)}
    type="button"
    className={styles.attachmentButton}
>
    <img src="/images/form/clip.svg" alt="Attachment" />
    {formData.courses[index]?.certificate ? (
        <span className={styles.fileInfo}>
            {formData.courses[index]?.certificate.name}
            <button
                type="button"
                className={styles.removeFileButton}
                onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('certificate', index);
                }}
            >
                <img
                    className={styles.removeFileIcon}
                    src="/images/form/cleanInput.svg"
                    alt="Remove"
                />
            </button>
        </span>
    ) : (
        'Прикрепить сертификат'
    )}
</button>
<input
    id={`certificate-upload-${index}`}
    type="file"
    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
    style={{ display: 'none' }}
    onChange={(e) => {
        const file = e.target.files[0];
        if (file.size > 6 * 1024 * 1024) {
            alert('Файл должен быть не более 6МБ');
            return;
        }
        handleFileChange(e, index, 'certificate');
    }}
/>
          </div>
          <button
            id="addCourseButton"
            onClick={handleAddCourse}
            type="button"
            className={styles.addButton}
          >
            Добавить курс
          </button>
        </div>
      ))}

      {/* Портфолио */}
      {formData.portfolios.map((portfolio, index) => (
        <div
          key={index}
          className={`${styles.box} ${
            formData.portfolios.length > 1 ? styles.showDelete : ''
          }`}
        >
          <div className={styles.label__wrap}>
            <label>Портфолио</label>
            <div className={styles.period__line}></div>
            {formData.portfolios.length > 1 && (
              <button
                className={styles.period__btnwrap}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeletePortfolio(index);
                }}
              >
                <img
                  className={styles.label__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            )}
          </div>
          <FormInput
            id={`portfolio-link-${index}`}
            label="Ссылка"
            type="text"
            placeholder="Введите адрес"
            inputName={`portfolio-link-${index}`}
            value={portfolio.link}
            onChange={(e) =>
              dispatch(
                updatePortfolio({ index, key: 'link', value: e.target.value })
              )
            }
          />
          {/* Прикрепить файл */}
<button
    onClick={(e) => handleClickFileInput(e, `portfolio-upload-${index}`)}
    className={styles.attachmentButton}
    type="button"
>
    <img src="/images/form/clip.svg" alt="Attachment" />
    {formData.portfolios[index]?.file ? (
        <span className={styles.fileInfo}>
            {formData.portfolios[index]?.file.name}
            <button
                type="button"
                className={styles.removeFileButton}
                onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile('portfolio', index);
                }}
            >
                <img
                    className={styles.removeFileIcon}
                    src="/images/form/cleanInput.svg"
                    alt="Remove"
                />
            </button>
        </span>
    ) : (
        'Файл'
    )}
</button>
<input
    id={`portfolio-upload-${index}`}
    type="file"
    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
    style={{ display: 'none' }}
    onChange={(e) => {
        const file = e.target.files[0];
        if (file.size > 6 * 1024 * 1024) {
            alert('Файл должен быть не более 6МБ');
            return;
        }
        handleFileChange(e, index, 'portfolio');
    }}
/>
          <FormInput
            id={`portfolio-description-${index}`}
            label="Описание"
            type="text"
            inputName={`portfolio-description-${index}`}
            value={portfolio.description}
            onChange={(e) =>
              dispatch(
                updatePortfolio({
                  index,
                  key: 'description',
                  value: e.target.value,
                })
              )
            }
          />

          <button
            id="addPortfolioButton"
            onClick={handleAddPortfolio}
            type="button"
            className={styles.addButton}
          >
            Добавить портфолио
          </button>
        </div>
      ))}

      <div>
        <FormButton onClickNext={handleNext} />
      </div>
    </div>
  );
};

export default Additional;
