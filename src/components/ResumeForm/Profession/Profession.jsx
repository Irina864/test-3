'use client';
import { useState, useEffect } from 'react';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage1 } from '@/store/resumeDataSlice';
import styles from './Profession.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';

const Profession = () => {
  const regexProfession = /^[A-Za-zА-Яа-я0-9\s\-,.!@#$%^&*()_+=[\]{};:'"<>?]*$/;
  const regexSalary = /^\d+$/;
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.resumeData.page1);
  const [formData, setFormData] = useState({
    profession: storeData.profession || '',
    salary: storeData.salary || '',
    schedule: storeData.schedule || [],
    format: storeData.format || [],
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrors = errors.filter((error) => error.id !== name);
    setErrors(updatedErrors);

    let updatedValue = value;
    if (name === 'profession') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    if (name === 'salary') {
      updatedValue = value.trim();
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleCheckboxChange = (name, response) => {
    const value = response.target.value;
    setFormData((prevFormData) => {
      const currentValues = Array.isArray(prevFormData[name])
        ? prevFormData[name]
        : [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prevFormData,
        [name]: updatedValues,
      };
    });
  };

  const validateForm = () => {
    let newErrors = [];

    // Профессия
    if (formData.profession.trim() === '') {
      newErrors.push({
        id: 'profession',
        text: 'Поле не заполнено',
      });
    } else if (
      !regexProfession.test(formData.profession) ||
      !/[A-Za-zА-Яа-я]/.test(formData.profession)
    ) {
      newErrors.push({
        id: 'profession',
        text: 'Некорректное значение в поле',
      });
    }
    if (formData.profession.length > 100) {
      newErrors.push({
        id: 'profession',
        text: 'Введите не более 100 символов',
      });
    }
    // зарплата
    if (formData.salary.trim() !== '') {
      if (
        !regexSalary.test(formData.salary) ||
        parseInt(formData.salary) > 2147483647 ||
        formData.salary.length > 10
        // ||         parseInt(formData.salary) < 40000
      ) {
        newErrors.push({
          id: 'salary',
          text: 'Некорректное значение в поле',
        });
      }
    }

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
      dispatch(updatePage1(formData));
    }
    return isValid;
  };

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page1}>
      <div className={styles.input}>
        <div className={styles.inputWrapper}>
          <FormInput
            id="profession"
            label="Профессия"
            pattern={regexProfession}
            type="text"
            inputName="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className={getErrorClass('profession')}
          />
          {errors.find((error) => error.id === 'profession') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'profession').text}
            />
          )}
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            limit="от"
            id="salary"
            label="Заработная плата"
            type="text"
            pattern={regexSalary}
            inputName="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className={getErrorClass('salary')}
          />
          {errors.find((error) => error.id === 'salary') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary').text}
            />
          )}
        </div>
        <div className={styles.checkbox}>
          <FormCheckbox
            label="График работы"
            array={[
              'Полный день',
              'Гибкий график',
              'Удалённая работа',
              'Сменный график',
              'Вахта',
            ]}
            nameCheckbox="schedule"
            id="schedule"
            selectedValues={formData.schedule}
            onChange={(value) => handleCheckboxChange('schedule', value)}
            className={getErrorClass('schedule')}
          />
          <FormCheckbox
            label="Формат работы"
            array={[
              'Полная занятость',
              'Частичная занятость',
              'Стажировка',
              'Проектная работа',
            ]}
            nameCheckbox="format"
            id="format"
            selectedValues={formData.format}
            onChange={(value) => handleCheckboxChange('format', value)}
            className={getErrorClass('format')}
          />
        </div>
      </div>
      <FormButton themeBack="none" onClickNext={handleNext} />
    </div>
  );
};

export default Profession;
