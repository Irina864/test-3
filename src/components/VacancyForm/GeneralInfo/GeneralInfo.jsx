import styles from './GeneralInfo.module.scss';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormAddress from '@/components/UI/Form/FormAddress/FormAddress';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, deleteLastDeletedAddress } from '@/store/addressSlice';
import FormSelect from '@/components/UI/Form/FormSelect/FormSelect';
import Notification from '@/components/UI/Notification/Notification';

const GeneralInfo = () => {
  const dispatch = useDispatch();
  const [disabledCity, setDisabledCity] = useState(false);
  const [disabledExperience, setDisabledExperience] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const lastDeletedAddress = useSelector(
    (state) => state.addresses.lastDeletedAddress
  );
  const storeData = useSelector((state) => state.vacancyData.page0);
  const [formData, setFormData] = useState({
    profession: storeData.profession || '',
    salaryMin: storeData.salaryMin || '',
    salaryMax: storeData.salaryMax || '',
    city: storeData.city || '',
    checkedAddress: storeData.checkedAddress || '',
    remoteWork: storeData.remoteWork || '',
    experienceMin: storeData.experienceMin || '',
    experienceMax: storeData.experienceMax || '',
    noExperience: storeData.noExperience || '',
    format: storeData.format || [],
    schedule: storeData.schedule || [],
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setShowNotification(lastDeletedAddress !== '');
  }, [lastDeletedAddress]);

  const handleCancel = () => {
    if (lastDeletedAddress) {
      dispatch(addAddress(lastDeletedAddress));
      setTimeout(() => {
        dispatch(deleteLastDeletedAddress());
      }, 1000);
    }
  };
  const handleCheckboxChange = (name, value) => {
    name === 'remoteWork' && setDisabledCity(!disabledCity);
    name === 'noexperience' && setDisabledExperience(!disabledExperience);
  };
  const handleNext = () => {
    return true;
  };

  return (
    <div className={styles.form__page_0}>
      {showNotification && (
        <div className={styles.notification}>
          <Notification
            text="Адрес удалён"
            btnName="Отменить"
            onClick={handleCancel}
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
      <div className={styles.form}>
        <div className={styles.inputWrapper}>
          <FormInput
            id="prof"
            label="Профессия"
            type="text"
            inputName="profession"
            // value={formData.profession}
            // onChange={handleInputChange}
            // className={getErrorClass('prof')}
          />
          {/* {errors.find((error) => error.id === 'prof') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'prof').text}
            />
          )} */}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.wrap}>
            <label className={styles.label}>Заработная плата</label>
            <div className={styles.box}>
              <FormInput
                limit="от"
                id="salary"
                type="text"
                inputName="salary"
                // value={formData.salary}
                // onChange={handleInputChange}
                // className={getErrorClass('salary')}
              />
              <FormInput
                id="salary"
                type="text"
                inputName="salary"
                placeholder="до, &#x20bd;"
                // value={formData.salary}
                // onChange={handleInputChange}
                // className={getErrorClass('salary')}
              />
            </div>
          </div>
          {/* {errors.find((error) => error.id === 'salary') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary').text}
            />
          )} */}
        </div>
        <div className={styles.city}>
          <div className={styles.inputWrapper}>
            <FormInput
              id="city"
              label="Город"
              type="text"
              inputName="city"
              disabled={disabledCity}
              // value={formData.city}
              // onChange={handleInputChange}
              // className={getErrorClass('city')}
            />
            {/* {errors.find((error) => error.id === 'city') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'city').text}
              />
            )} */}
          </div>
          <FormCheckbox
            array={['Можно удалённо']}
            nameCheckbox="remoteWork"
            id="remoteWork"
            // selectedValues={formData.remoteWork}
            onChange={(value) => handleCheckboxChange('remoteWork', value)}
            // className={getErrorClass('remoteWork')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormAddress disabled={disabledCity} />
          {/* {errors.find((error) => error.id === 'salary') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary').text}
            />
          )} */}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.wrap}>
            <label
              className={
                disabledExperience
                  ? `${styles.label} ${styles.disabled}`
                  : `${styles.label} `
              }
            >
              Опыт работы
            </label>
            <div className={styles.box}>
              <FormInput
                // limit="от"
                id="experience"
                type="text"
                inputName="experience"
                placeholder="от, лет"
                disabled={disabledExperience}
                // value={formData.salary}
                // onChange={handleInputChange}
                // className={getErrorClass('salary')}
              />
              <FormInput
                // limit="до"
                id="experience"
                type="text"
                inputName="experience"
                disabled={disabledExperience}
                placeholder="до, лет"
                // value={formData.salary}
                // onChange={handleInputChange}
                // className={getErrorClass('salary')}
              />
            </div>
            <FormCheckbox
              array={['Без опыта']}
              nameCheckbox="noexperience"
              id="noexperience"
              onChange={(value) => handleCheckboxChange('noexperience', value)}
              // selectedValues={formData.noExperience}
            />
          </div>
          {/* {errors.find((error) => error.id === 'salary') && (
            <ErrorMessage
              text={errors.find((error) => error.id === 'salary').text}
            />
          )} */}
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
            // selectedValues={formData.schedule}
            // onChange={(value) => handleCheckboxChange('schedule', value)}
            // className={getErrorClass('schedule')}
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
            // selectedValues={formData.format}
            // onChange={(value) => handleCheckboxChange('format', value)}
            // className={getErrorClass('format')}
          />
        </div>
      </div>{' '}
      <FormButton themeBack="none" onClickNext={handleNext} />
    </div>
  );
};

export default GeneralInfo;
