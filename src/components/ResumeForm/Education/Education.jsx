'use client';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormRadio from '@/components/UI/Form/FormRadio/FormRadio';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage4 } from '@/store/resumeDataSlice';
import {
  addEducationPlace,
  deleteEducationPlace,
} from '@/store/educationPlaceSlice';
import FormSelect from '@/components/UI/Form/FormSelect/FormSelect';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import styles from './Education.module.scss';

const Education = () => {
  const dispatch = useDispatch();
  const birthDate = useSelector((state) => state.resumeData.page2.birthDate);
  const { institutes, multiply } = useSelector(
    ({ educationPlace }) => educationPlace
  );
  const [errorStyle, setErrorStyle] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const storeData = useSelector((state) => state.resumeData.page4);
  const [formData, setFormData] = useState({
    educations: storeData.educations || institutes.map(() => ({})),
  });
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const levels = [
    'Среднее',
    'Среднее специальное',
    'Высшее',
    'Без образования',
  ];
  const years = [];
  for (
    let i = new Date().getFullYear() + 10;
    i !== new Date(1970, 0, 1).getFullYear() - 1;
    i--
  ) {
    years.push(i);
  }
  useEffect(() => {
    storeData.educations.length > 0 &&
    storeData.educations[0]['education-1'] === 'Без образования'
      ? setDisabled(true)
      : setDisabled(false);
  }, []);

  const handleAddEducationPlace = (e) => {
    e.preventDefault();
    dispatch(addEducationPlace());
    setFormData((prevFormData) => ({
      ...prevFormData,
      educations: [...prevFormData.educations, {}],
    }));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    let updatedValue = value.replace(/\s{2,}/g, ' ').trim();
    if (
      ['faculty', 'speciality', 'institute'].includes(name) &&
      updatedValue.length > 0
    ) {
      updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
    }

    setFormData((prevFormData) => {
      const newEducations = [...prevFormData.educations];
      newEducations[index] = { ...newEducations[index], [name]: updatedValue };
      return { ...prevFormData, educations: newEducations };
    });
  };

  const handleRadioChange = (name, response, index) => {
    const value = response.target.value;
    const updatedDisabled = value === 'Без образования';

    setFormData((prevFormData) => {
      const newEducations = [...prevFormData.educations];
      newEducations[index] = { ...newEducations[index], [name]: value };
      return { ...prevFormData, educations: newEducations };
    });

    setDisabled(updatedDisabled);
  };

  const handleYearChange = (value, index) => {
    const birthDateObj = new Date(birthDate);
    if (birthDateObj > value) {
      return alert(
        'Дата окончания обучения не может быть раньше даты рождения'
      );
    }
    setFormData((prevFormData) => {
      const newEducations = [...prevFormData.educations];
      newEducations[index] = {
        ...newEducations[index],
        year: value,
      };
      return { ...prevFormData, educations: newEducations };
    });
  };

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  const validateForm = () => {
    const regex = /^[A-Za-zА-Яа-яЁё0-9\s\-,.!@#$%^&*()_+=[\]{};:'"<>?]*$/;
    let newErrors = [];
    if (formData.educations.length < 1) {
      setErrorClass(styles.errorInput);
      setErrorStyle(styles.errorColor);
      newErrors.push({
        id: `education`,
        text: 'Выберите уровень образования',
      });
    } else {
      setErrorStyle('');
      setErrorClass('');
    }
    formData.educations.forEach((education, index) => {
      const count = index + 1;
      if (!education[`education-${count}`]) {
        newErrors.push({
          id: `education-${count}`,
          text: 'Выберите уровень образования',
        });
        setErrorStyle(styles.errorColor);
      } else {
        setErrorStyle('');
      }
      education[`education-${count}`] !== 'Без образования' &&
        ['institute', 'faculty', 'speciality'].forEach((field) => {
          if (!education[field]) {
            newErrors.push({
              id: `${field}-${count}`,
              text: `Поле не заполнено`,
            });
          } else if (!regex.test(education[field])) {
            newErrors.push({
              id: `${field}-${count}`,
              text: 'Некорректное значение поля',
            });
          } else if (field === 'institute' && education[field].length > 100) {
            newErrors.push({
              id: `${field}-${count}`,
              text: 'Введите не более 100 символов',
            });
          } else if (education[field].length > 50) {
            newErrors.push({
              id: `${field}-${count}`,
              text: 'Введите не более 50 символов',
            });
          }
        });

      if (
        education[`education-${count}`] !== 'Без образования' &&
        !education.year
      ) {
        newErrors.push({ id: `year-${count}`, text: 'Выберите год окончания' });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // const isValid = validateForm();
    const isValid = true;

    if (isValid) {
      dispatch(updatePage4(formData));
    }
    return isValid;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page4}>
      <div className={styles.box}>
        {institutes.map((count, index) => {
          const education = formData.educations[index] || {};
          return (
            <div className={styles.place} key={count} id={count}>
              <div className={styles.radio}>
                <div className={styles.radio__education}>
                  {' '}
                  {multiply ? (
                    <div className={styles.label__wrap}>
                      <label className={`${styles.label__title} ${errorStyle}`}>
                        Уровень образования
                      </label>
                      <div className={styles.label__line}></div>
                      <button
                        className={styles.label__btnwrap}
                        onClick={() => {
                          dispatch(deleteEducationPlace(count));
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            educations: prevFormData.educations.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                      >
                        <img
                          className={styles.label__deletebtn}
                          src="/images/form/delete.svg"
                          alt="Delete"
                        />
                      </button>
                    </div>
                  ) : (
                    <label className={`${styles.label__title} ${errorStyle}`}>
                      Уровень образования
                    </label>
                  )}
                  <div className={styles.inputWrapper}>
                    {levels.map((level, levelIndex) => (
                      <FormRadio
                        key={`${count}-${levelIndex}`}
                        label={level}
                        idRadio={`education-${count}-${levelIndex}`}
                        nameRadio={`education-${count}`}
                        value={level}
                        selectedValue={education[`education-${count}`] || ''}
                        onChange={(value) =>
                          handleRadioChange(`education-${count}`, value, index)
                        }
                      />
                    ))}
                    {/* {errors.find(
                      (error) => error.id === `education-${count}`
                    ) && (
                      <ErrorMessage
                        text={
                          errors.find(
                            (error) => error.id === `education-${count}`
                          ).text
                        }
                      />
                    )} */}
                  </div>
                </div>
              </div>
              {['institute', 'faculty', 'speciality'].map((field) => (
                <div className={styles.inputWrapper} key={field}>
                  <FormInput
                    id={`${field}-${count}`}
                    label={
                      field === 'institute'
                        ? 'Учебное заведение'
                        : field === 'faculty'
                        ? 'Факультет'
                        : 'Специальность'
                    }
                    type="text"
                    inputName={field}
                    isCleanedInput={true}
                    disabled={disabled}
                    value={education[field] || ''}
                    onChange={(e) => handleInputChange(e, index)}
                    className={
                      errorClass
                        ? `${errorClass}`
                        : getErrorClass(`${field}-${count}`)
                    }
                  />
                  {errors.find((error) => error.id === `${field}-${count}`) && (
                    <ErrorMessage
                      text={
                        errors.find((error) => error.id === `${field}-${count}`)
                          .text
                      }
                    />
                  )}
                </div>
              ))}
              <div className={styles.year}>
                <label htmlFor={`year-${count}`} className={styles.year__label}>
                  Год окончания
                </label>
                <div className={styles.year__box}>
                  <FormSelect
                    array={years}
                    id={`year-${count}`}
                    bottom={true}
                    className={
                      errorClass
                        ? `${errorClass}`
                        : getErrorClass(`year-${count}`)
                    }
                    onChange={(value) => handleYearChange(value, index)}
                    disabled={disabled}
                    value={education.year}
                    label=""
                  />
                  <Tooltip text="Если еще учитесь, укажите примерный год окончания" />
                </div>
              </div>
            </div>
          );
        })}
        <button
          id="addButton"
          onClick={handleAddEducationPlace}
          className={styles.addButton}
        >
          Добавить учебное заведение
        </button>
      </div>
      <FormButton
        // добавить вызов функции проверки и записи
        onClickNext={handleNext}
      />
    </div>
  );
};

export default Education;
