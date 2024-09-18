import React from 'react';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage6 } from '@/store/resumeDataSlice';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import FormText from '@/components/UI/Form/FormText/FormText';
import styles from './PersonalInfo.module.scss';

const PersonalInfo = ({ about }) => {
  const dispatch = useDispatch();
  const handleFocus = (e) => {
    e.target.classList.add(styles.focused);
  };

  const handleBlur = (e) => {
    e.target.classList.remove(styles.focused);
  };

  const storeData = useSelector((state) => state.resumeData.page6);
  const [formData, setFormData] = useState({
    personalInfo: storeData.personalInfo || '',
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === 'about') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };
  const validateForm = () => {
    const newErrors = [];

    const regex = /^[A-Za-zА-Яа-я0-9\s\-,.!@#$%^&*()_+=[\]{};:'"<>?]*$/;

    if (!regex.test(formData.personalInfo)) {
      newErrors.push({
        id: 'about',
        text: 'Некорректное значение в поле',
      });
    }
    if (formData.personalInfo.length > 0 && formData.personalInfo.length < 50) {
      newErrors.push({
        id: 'about',
        text: 'Введите не менее 50 символов',
      });
    }
    if (formData.personalInfo.length > 1000) {
      newErrors.push({
        id: 'about',
        text: 'Введите не более 1000 символов',
      });
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  const handleNext = () => {
    // const isValid = true;
    const isValid = validateForm();
    if (isValid) {
      dispatch(updatePage6(formData));
    }
    return isValid;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.aboutSection}>
      <h2 className={styles.title}>О себе</h2>
      <div className={styles.inputWrapper}>
        <textarea
          className={`${styles.textarea} ${getErrorClass('about')}`}
          // value={about}
          placeholder="Введите не менее 50 символов"
          name="personalInfo"
          onFocus={handleFocus}
          onBlur={handleBlur}
          id="about"
          min={50}
          value={formData.personalInfo}
          onChange={handleInputChange}
        />
        {errors.find((error) => error.id === 'about') && (
          <ErrorMessage
            text={errors.find((error) => error.id === 'about').text}
          />
        )}
      </div>
      <FormButton onClickNext={handleNext} />
    </div>
  );
};

export default PersonalInfo;
{
  /* <FormText
          id="about"
          inputName="personalInfo"
          rows={7}
          min={50}
          placeholder="Введите не менее 50 символов"
          value={formData.personalInfo}
          onChange={handleInputChange}
          className={getErrorClass('about')}
          onFocus={handleFocus}
          onBlur={handleBlur}
        /> */
}
