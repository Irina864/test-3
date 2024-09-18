'use client';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import WorkPlaceItem from './WorkPlaceItem/WorkPlaceItem';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkPlace } from '@/store/workPlaceSlice';
import { updatePage3 } from '@/store/resumeDataSlice';
import styles from './Experience.module.scss';

const Experience = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.resumeData.page3);
  const [formData, setFormData] = useState({
    noExperience: storeData.noExperience || '',
    workPeriods: storeData.workPeriods || [],
  });
  const workPlace = useSelector(({ workPlace }) => workPlace);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    storeData.noExperience === '' ? setDisabled(false) : setDisabled(true);
  }, []);

  const handleDisabled = (e) => {
    setDisabled(!disabled);
    const value = e.target.checked ? 'Без опыта' : '';
    value === '' ? validateForm() : setErrors([]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      noExperience: value,
      workPeriods: value ? [] : prevFormData.workPeriods,
    }));
  };

  const handleAddWorkPlace = (e) => {
    e.preventDefault();
    dispatch(addWorkPlace());
  };

  const validateForm = () => {
    const newErrors = [];

    const regex = /^[A-Za-zА-Яа-яЁё0-9\s\-,.!@#$%^&*()_+=[\]{};:'"<>?]*$/;

    if (!formData.noExperience && formData.workPeriods.length === 0) {
      return alert(
        'Добавьте хотя бы одно место работы или выберите "Без опыта"'
      );
      // newErrors.push({
      //   id: 'experience',
      //   text: 'Добавьте хотя бы одно место работы или выберите "Без опыта"',
      // });
    }

    // Валидация каждого WorkPlaceItem
    formData.workPeriods.forEach((workPeriod, index) => {
      // company
      if (workPeriod.startDate === '') {
        newErrors.push({
          id: `timePeriod_${index}`,
          text: 'Поле не заполнено: введите дату трудоустройства',
        });
      }
      if (workPeriod.endDate === '' && !workPeriod.presenttime) {
        newErrors.push({
          id: `timePeriod_${index}`,
          text: 'Поле не заполнено: введите дату увольнения',
        });
      }
      if (!workPeriod.company_name) {
        newErrors.push({
          id: `company_name_${index}`,
          text: 'Поле не заполнено',
        });
      }
      if (
        workPeriod.company_name &&
        (workPeriod.company_name.startsWith('-') ||
          workPeriod.company_name.endsWith('-'))
      ) {
        newErrors.push({
          id: `company_name_${index}`,
          text: 'Удалите дефисы в начале и конце строки',
        });
      }
      if (workPeriod.company_name && workPeriod.company_name.length > 100) {
        newErrors.push({
          id: `company_name_${index}`,
          text: 'Введите не более 100 символов',
        });
      }
      if (
        workPeriod.company_name &&
        (!regex.test(workPeriod.company_name) ||
          !/[A-Za-zА-Яа-я]/.test(workPeriod.company_name))
      ) {
        newErrors.push({
          id: `company_name_${index}`,
          text: 'Некорректное значение в поле',
        });
      }
      // profession
      if (!workPeriod.profession) {
        newErrors.push({
          id: `profession_${index}`,
          text: 'Поле не заполнено',
        });
      }
      if (
        workPeriod.profession &&
        (!regex.test(workPeriod.profession) ||
          !/[A-Za-zА-Яа-я]/.test(workPeriod.profession))
      ) {
        newErrors.push({
          id: `profession_${index}`,
          text: 'Некорректное значение в поле',
        });
      }
      if (workPeriod.profession && workPeriod.profession.length > 100) {
        newErrors.push({
          id: `profession_${index}`,
          text: 'Введите не более 100 символов',
        });
      }
      if (
        !workPeriod.responsibilities ||
        workPeriod.responsibilities.length < 50
      ) {
        newErrors.push({
          id: `responsibilities_${index}`,
          text: 'Введите не менее 50 символов',
        });
      }
      if (
        workPeriod.responsibilities &&
        workPeriod.responsibilities.length > 1000
      ) {
        newErrors.push({
          id: `responsibilities_${index}`,
          text: 'Введите не более 1000 символов',
        });
      }
      if (
        workPeriod.responsibilities &&
        (!regex.test(workPeriod.responsibilities) ||
          !/[A-Za-zА-Яа-я]/.test(workPeriod.responsibilities))
      ) {
        newErrors.push({
          id: `responsibilities_${index}`,
          text: 'Некорректное значение в поле',
        });
      }
      if (!workPeriod.achievements || workPeriod.achievements.length < 50) {
        newErrors.push({
          id: `achievements_${index}`,
          text: 'Введите не менее 50 символов',
        });
      }
      if (workPeriod.achievements && workPeriod.achievements.length > 1000) {
        newErrors.push({
          id: `achievements_${index}`,
          text: 'Введите не более 1000 символов',
        });
      }
      if (
        workPeriod.achievements &&
        (!regex.test(workPeriod.achievements) ||
          !/[A-Za-zА-Яа-я]/.test(workPeriod.achievements))
      ) {
        newErrors.push({
          id: `achievements_${index}`,
          text: 'Некорректное значение в поле',
        });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    const isValid = true;
    // const isValid = validateForm();
    if (isValid) {
      dispatch(updatePage3(formData));
    }
    return isValid;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page3}>
      <div className={styles.formbox}>
        <div className={styles.wrapCheckbox}>
          <FormCheckbox
            array={['Без опыта']}
            nameCheckbox="experience"
            id="experience"
            onChange={handleDisabled}
            selectedValues={formData.noExperience}
          />
          {errors.find((error) => error.id === 'experience') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'experience').text}
            />
          )}
        </div>

        {workPlace.workCounts.map((count) => (
          <WorkPlaceItem
            key={count}
            count={count}
            disabled={disabled}
            multiply={workPlace.multiply}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        ))}
        <button
          id="addButton"
          onClick={handleAddWorkPlace}
          className={styles.addButton}
          disabled={disabled}
        >
          Добавить место работы
        </button>
      </div>
      <FormButton
        // добавить вызов функции проверки и записи
        onClickNext={handleNext}
      />
    </div>
  );
};

export default Experience;
