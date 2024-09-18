'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormText from '@/components/UI/Form/FormText/FormText';
import { deleteWorkPlace } from '@/store/workPlaceSlice';
import Period from '@/components/UI/Period/Period';
import styles from './WorkPlace.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';

const WorkPlaceItem = ({
  multiply,
  count,
  disabled,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const dispatch = useDispatch();
  const [disabledTime, setDisabledTime] = useState(false);

  const handleDisabledTime = (e) => {
    const isChecked = e.target.checked;
    setDisabledTime(isChecked);
    const currentTime = 'по настоящее время';

    setFormData((prevFormData) => {
      const updatedWorkPeriods = [...prevFormData.workPeriods];
      if (!updatedWorkPeriods[count - 1]) {
        updatedWorkPeriods[count - 1] = {};
      }
      updatedWorkPeriods[count - 1] = {
        ...updatedWorkPeriods[count - 1],
        presenttime: isChecked ? currentTime : '',
        endMonth: isChecked ? '' : updatedWorkPeriods[count - 1].endMonth,
        endYear: isChecked ? '' : updatedWorkPeriods[count - 1].endYear,
      };
      return {
        ...prevFormData,
        workPeriods: updatedWorkPeriods,
      };
    });
  };

  const handlePeriodChange = (periodData) => {
    const updatedErrors = errors.filter(
      (error) => !error.id.startsWith('timePeriod')
    );
    setErrors(updatedErrors);

    setFormData((prevFormData) => {
      const updatedWorkPeriods = [...prevFormData.workPeriods];
      if (!updatedWorkPeriods[count - 1]) {
        updatedWorkPeriods[count - 1] = {};
      }
      updatedWorkPeriods[count - 1] = {
        ...updatedWorkPeriods[count - 1],
        ...periodData,
      };
      return {
        ...prevFormData,
        workPeriods: updatedWorkPeriods,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrors = errors.filter((error) => !error.id.startsWith(name));
    setErrors(updatedErrors);

    let updatedValue = value;

    if (name === 'company_name' || name === 'profession') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    if (name === 'responsibilities' || name === 'achievements') {
      updatedValue = value.replace(/\s{2,}/g, '  ').replace(/^\s+|\s+$/g, ' ');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }

    setFormData((prevFormData) => {
      const updatedWorkPeriods = [...prevFormData.workPeriods];
      if (!updatedWorkPeriods[count - 1]) {
        updatedWorkPeriods[count - 1] = {};
      }
      updatedWorkPeriods[count - 1] = {
        ...updatedWorkPeriods[count - 1],
        [name]: updatedValue,
      };
      return {
        ...prevFormData,
        workPeriods: updatedWorkPeriods,
      };
    });
  };

  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === `${fieldId}_${count - 1}`)
      ? styles.errorInput
      : '';
  };

  return (
    <div id="workplace" className={styles.workperiod}>
      <div className={styles.period}>
        <div className={styles.inputWrapper}>
          {multiply ? (
            <div className={styles.label__wrap}>
              <label
                className={
                  disabled
                    ? `${styles.period__label} ${styles.disabled}`
                    : styles.period__label
                }
              >
                Период работы
              </label>
              <div className={styles.period__line}></div>
              <button
                className={styles.period__btnwrap}
                onClick={() => {
                  dispatch(deleteWorkPlace(count));
                }}
              >
                <img
                  className={styles.period__deletebtn}
                  src="/images/form/delete.svg"
                  alt="Delete"
                />
              </button>
            </div>
          ) : (
            <label
              className={
                disabled
                  ? `${styles.period__label} ${styles.disabled}`
                  : styles.period__label
              }
            >
              Период работы
            </label>
          )}{' '}
          <Period
            disabled={disabled}
            disabledTime={disabledTime}
            onChange={handlePeriodChange}
            value={formData.workPeriods[count - 1]}
            className={getErrorClass(`timePeriod`)}
          />
          {errors.find((error) => error.id === `timePeriod_${count - 1}`) && (
            <ErrorMessage
              text={
                errors.find((error) => error.id === `timePeriod_${count - 1}`)
                  .text
              }
            />
          )}
        </div>
        <FormCheckbox
          array={['по настоящее время']}
          nameCheckbox="presenttime"
          id="presenttime"
          disabled={disabled}
          onChange={handleDisabledTime}
          checked={disabledTime}
        />
      </div>
      <div className={styles.inputWrapper}>
        <FormInput
          id={`company_name_${count - 1}`}
          label="Название компании"
          type="text"
          inputName="company_name"
          disabled={disabled}
          value={formData.workPeriods[count - 1]?.company_name || ''}
          onChange={handleInputChange}
          className={getErrorClass(`company_name`)}
        />
        {errors.find((error) => error.id === `company_name_${count - 1}`) && (
          <ErrorMessage
            text={
              errors.find((error) => error.id === `company_name_${count - 1}`)
                .text
            }
          />
        )}
      </div>
      <div className={styles.inputWrapper}>
        <FormInput
          id={`profession_${count - 1}`}
          label="Профессия"
          type="text"
          inputName="profession"
          disabled={disabled}
          value={formData.workPeriods[count - 1]?.profession || ''}
          onChange={handleInputChange}
          className={getErrorClass(`profession`)}
        />
        {errors.find((error) => error.id === `profession_${count - 1}`) && (
          <ErrorMessage
            text={
              errors.find((error) => error.id === `profession_${count - 1}`)
                .text
            }
          />
        )}
      </div>
      <div className={styles.inputWrapper}>
        <FormText
          id={`responsibilities_${count - 1}`}
          label="Обязанности"
          inputName="responsibilities"
          rows={7}
          min={50}
          placeholder="Введите не менее 50 символов"
          disabled={disabled}
          value={formData.workPeriods[count - 1]?.responsibilities || ''}
          onChange={handleInputChange}
          className={getErrorClass('responsibilities')}
        />
        {errors.find(
          (error) => error.id === `responsibilities_${count - 1}`
        ) && (
          <ErrorMessage
            noimg={true}
            text={
              errors.find(
                (error) => error.id === `responsibilities_${count - 1}`
              ).text
            }
          />
        )}
      </div>
      <div className={styles.inputWrapper}>
        <FormText
          id={`achievements_${count - 1}`}
          label="Достижения"
          inputName="achievements"
          rows={7}
          min={50}
          placeholder="Введите не менее 50 символов"
          disabled={disabled}
          value={formData.workPeriods[count - 1]?.achievements || ''}
          onChange={handleInputChange}
          className={getErrorClass('achievements')}
        />
        {errors.find((error) => error.id === `achievements_${count - 1}`) && (
          <ErrorMessage
            noimg={true}
            text={
              errors.find((error) => error.id === `achievements_${count - 1}`)
                .text
            }
          />
        )}
      </div>
    </div>
  );
};

export default WorkPlaceItem;
