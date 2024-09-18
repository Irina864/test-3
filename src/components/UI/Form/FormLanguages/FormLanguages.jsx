  'use client';
import { addLanguage, deleteLanguage, updateLanguage } from '@/store/formDataSlice';
import styles from './FormLanguages.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import FormSelect from '../FormSelect/FormSelect';

function FormLanguages() {
  const dispatch = useDispatch();
  const formData = useSelector(({ formData }) => formData);
  
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
  const handleDeleteLanguage = (index) => {
   if (formData.languages.length > 1) {
     dispatch(deleteLanguage(index));
   }
  };

  return (
    <div className={styles.container}>
       <div className={styles.label__wrap}>
            <label>Владение языками</label>
         </div>
      {formData.languages.map((language, index) => (
        <div
          key={index}
          className={`${styles.box} ${
            formData.languages.length > 1 ? styles.showDelete : ''
          }`}
        >
         
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
                {languages.map((languageOption, i) => (
                  <option 
                  key={i} 
                  value={languageOption}
                  className={styles.date__option}
                  >
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
                {languageLevels.map((levelOption, i) => (
                  <option key={i} 
                  value={levelOption}
                  className={styles.date__option}
                  >
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
            {formData.languages.length > 1 && (
              <button
                className={styles.deletebtn}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteLanguage(index);
                }}
              >
                    <img
                      className={styles.deletebtn__label}
                      src="/images/form/delete.svg"
                      alt="Delete"
                    />
              </button>
            )}
          </div>
         
        </div>
      ))}
      <div className={styles.addButtonBox}>
         <button
            id="addLanguageButton"
            onClick={handleAddLanguage}
            className={styles.addButton}
         >
            Добавить язык
          </button>
      </div>

    </div>
  );
}

export default  FormLanguages;