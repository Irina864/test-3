'use client';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import FormRadioButton from '@/components/UI/Form/FormRadioButton/FormRadioButton';
import FormDate from '@/components/UI/Form/FormDate/FormDate';
import FormAvatar from '@/components/UI/Form/FormAvatar/FormAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage2 } from '@/store/resumeDataSlice';
import { useState, useEffect } from 'react';
import styles from './MainInfo.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';

const MainInfo = () => {
  const dispatch = useDispatch();

  // достаем дату из стора для календаря
  const storeDate = useSelector((state) => {
    const dateString = state.calendar.date;
    return dateString ? new Date(dateString) : null;
  });

  // стор для записывания полученных со страницы данных
  const storeData = useSelector((state) => state.resumeData.page2);

  // состояние для отображения данных на странице и записи
  const [formData, setFormData] = useState({
    avatarFile: storeData.avatarFile || '',
    nameApplicant: storeData.nameApplicant || '',
    surnameApplicant: storeData.surnameApplicant || '',
    sex: storeData.sex || '',
    birthDate: storeData.birthDate || '',
    showOnlyYear: storeData.showOnlyYear || '',
    city: storeData.city || '',
    remoteWork: storeData.remoteWork || '',
    email: storeData.email || '',
    phone: storeData.phone || '',
  });

  // состояние для ошибок
  const [errors, setErrors] = useState([]);

  // забираем файл аватара
  const handleAvatarChange = (imageData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatarFile: imageData,
    }));
  };

  // Забираем состояние FormInput и записываем в состояние FormData
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedErrors = errors.filter((error) => error.id !== name);
    setErrors(updatedErrors);

    let updatedValue = value;
    // чистим пробелы, дефисы и делаем заглавные буквы
    if (name === 'nameApplicant' || name === 'surnameApplicant') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue = updatedValue
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      if (updatedValue.length > 0) {
        updatedValue = updatedValue
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('-');
      }
    }
    // чистим пробелы, дефисы и делаем заглавную букву
    if (name === 'city') {
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

  // Забираем состояние FormCheckbox и записываем в состояние FormData
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

  // Забираем состояние FormRadioButton и записываем в состояние FormData
  const handleRadioChange = (name, response) => {
    const value = response.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Валидация данных записанных FormData
  const validateForm = () => {
    // ошибки:
    let newErrors = [];
    // регулярные выражения для проверки
    const regexNameSurname = /^[a-zA-Zа-яА-ЯЁё\s-]*$/;
    const regexCity = /^[a-zA-Zа-яА-ЯЁё0-9\s-]*$/;
    const regexPhone =
      /^\+7\((?:[1-9][0-9]{2}|[0-9][1-9][0-9]|[0-9]{2}[1-9])\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    // const regexPhone = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    const regexEmail =
      /^(?=.{6,})[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,254}$/;
    // проверка поле Имя
    if (formData.nameApplicant.trim() === '') {
      newErrors.push({
        id: 'name',
        text: 'Поле не заполнено',
      });
    } else if (
      !regexNameSurname.test(formData.nameApplicant) ||
      !/[A-Za-zА-Яа-я]/.test(formData.nameApplicant)
    ) {
      newErrors.push({
        id: 'name',
        text: 'Некорректное значение в поле',
      });
    }
    if (
      formData.nameApplicant.startsWith('-') ||
      formData.nameApplicant.endsWith('-')
    ) {
      console.log('-');
      newErrors.push({
        id: 'name',
        text: 'Удалите дефисы в начале и конце строки',
      });
    }
    if (formData.nameApplicant.length > 30) {
      newErrors.push({
        id: 'name',
        text: 'Введите не более 30 символов',
      });
    }
    // проверка поле Фамилия
    if (formData.surnameApplicant.trim() === '') {
      newErrors.push({
        id: 'surname',
        text: 'Поле не заполнено',
      });
    } else if (
      !regexNameSurname.test(formData.surnameApplicant) ||
      !/[A-Za-zА-Яа-я]/.test(formData.surnameApplicant)
    ) {
      newErrors.push({
        id: 'surname',
        text: 'Некорректное значение в поле',
      });
    }
    if (
      formData.surnameApplicant.startsWith('-') ||
      formData.surnameApplicant.endsWith('-')
    ) {
      newErrors.push({
        id: 'surname',
        text: 'Удалите дефисы в начале и конце строки',
      });
    }
    if (formData.surnameApplicant.length > 30) {
      newErrors.push({
        id: 'surname',
        text: 'Введите не более 30 символов',
      });
    }
    // город
    if (formData.city.trim() === '') {
      newErrors.push({
        id: 'city',
        text: 'Поле не заполнено',
      });
    } else if (
      !regexCity.test(formData.city) ||
      !/[A-Za-zА-Яа-я]/.test(formData.city)
    ) {
      newErrors.push({
        id: 'city',
        text: 'Некорректное значение в поле',
      });
    }
    if (formData.city.length > 50) {
      newErrors.push({
        id: 'city',
        text: 'Введите не более 50 символов',
      });
    }
    //email
    if (formData.email.trim() === '') {
      newErrors.push({
        id: 'email',
        text: 'Поле не заполнено',
      });
    } else if (!regexEmail.test(formData.email)) {
      newErrors.push({
        id: 'email',
        text: 'Некорректное значение в поле',
      });
    }
    if (formData.email.length > 254 || formData.email.length < 6) {
      newErrors.push({
        id: 'email',
        text: 'Введите не менее 6 и не более 254 символов',
      });
    }
    //phone
    if (formData.phone.trim() === '') {
      newErrors.push({
        id: 'phone',
        text: 'Поле не может быть пустым',
      });
    } else if (!regexPhone.test(formData.phone)) {
      newErrors.push({
        id: 'phone',
        text: 'Некорректное значение индекса',
      });
    }
    if (formData.phone.length !== 16) {
      newErrors.push({
        id: 'phone',
        text: 'Заполните поле полностью',
      });
    }
    //дата
    if (storeDate !== null) {
      const differnce = Math.abs(
        new Date(new Date() - storeDate).getUTCFullYear() - 1970
      );
      if (differnce < 16) {
        newErrors.push({
          id: 'date',
          text: 'Вам меньше 16 лет',
        });
      } else {
        const birthDate = storeDate.toISOString();
        // Используем обновленное значение немедленно
        const updatedFormData = {
          ...formData,
          birthDate: birthDate,
        };
        console.log(updatedFormData.birthDate);
        setFormData(updatedFormData);
        // Продолжаем валидацию с updatedFormData, если нужно
      }
    } else {
      newErrors.push({
        id: 'date',
        text: 'Поле не заполнено',
      });
    }
    //пол
    if (formData.sex.trim() === '') {
      newErrors.push({
        id: 'sex',
        text: 'Значение не выбрано',
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  //добавляет стиль ошибки при совпадении id поля с id в ошибке
  const getErrorClass = (fieldId) => {
    return errors.some((error) => error.id === fieldId)
      ? styles.errorInput
      : '';
  };

  // инициализация валидации и отправки данных
  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // const isValid = validateForm();
    const isValid = true;

    if (isValid) {
      dispatch(updatePage2(formData));
    }
    return isValid;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.form__page2}>
      <div className={styles.box}>
        <div className={styles.imgwrap}>
          <FormAvatar
            id="applicantPhoto"
            nameFile="applicantPhoto"
            accept=".jpg, .jpeg, .png, .bmp"
            onImageChange={handleAvatarChange}
          />
        </div>
        <div className={styles.formbox}>
          {/* обертка для добавления ошибки после элемента */}
          <div className={styles.inputWrapper}>
            {/* обертка для добавления ошибки после элемента */}
            <FormInput
              id="name"
              label="Имя"
              type="text"
              inputName="nameApplicant"
              // добавить и изменить для реакции на изменения FormInput (между этими комментариями)
              value={formData.nameApplicant}
              onChange={handleInputChange}
              className={getErrorClass('name')}
              // добавить и изменить для реакции на изменения FormInput (между этими комментариями)
            />
            {/* обертка для добавления ошибки после элемента */}
            {errors.find((error) => error.id === 'name') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'name').text}
              />
            )}
          </div>
          {/* обертка для добавления ошибки после элемента */}
          <div className={styles.inputWrapper}>
            <FormInput
              id="surname"
              label="Фамилия"
              type="text"
              inputName="surnameApplicant"
              value={formData.surnameApplicant}
              onChange={handleInputChange}
              className={getErrorClass('surname')}
            />
            {errors.find((error) => error.id === 'surname') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'surname').text}
              />
            )}
          </div>
          <div className={styles.inputWrapper}>
            <FormRadioButton
              label="Пол"
              labelFirst="Женский"
              labelSecond="Мужской"
              valueFirst="female"
              valueSecond="male"
              nameRadio="sex"
              idFirst="female"
              idSecond="male"
              // добавить и изменить для реакции на изменения FormRadioButton (между этими комментариями)
              selectedValue={formData.sex}
              onChange={(value) => handleRadioChange('sex', value)}
              // добавить и изменить для реакции на изменения FormRadioButton (между этими комментариями)
            />
            {errors.find((error) => error.id === 'sex') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'sex').text}
              />
            )}
          </div>
          <div className={styles.group}>
            <div className={styles.inputWrapper}>
              <FormDate
                label="Дата рождения"
                className={getErrorClass('date')}
                selectedValue={formData.birthDate}
              />
              {errors.find((error) => error.id === 'date') && (
                <ErrorMessage
                  text={errors.find((error) => error.id === 'date').text}
                />
              )}
            </div>
            <FormCheckbox
              array={['Показывать только год рождения']}
              nameCheckbox="showOnlyYear"
              id="showOnlyYear"
              // добавить и изменить для реакции на изменения FormCheckbox (между этими комментариями)
              selectedValues={formData.showOnlyYear}
              onChange={(value) => handleCheckboxChange('showOnlyYear', value)}
              className={getErrorClass('showOnlyYear')}
              // добавить и изменить для реакции на изменения FormCheckbox (между этими комментариями)
            />
          </div>
          <div className={styles.group}>
            <div className={styles.inputWrapper}>
              <FormInput
                id="city"
                label="Город"
                type="text"
                inputName="city"
                value={formData.city}
                onChange={handleInputChange}
                className={getErrorClass('city')}
              />
              {errors.find((error) => error.id === 'city') && (
                <ErrorMessage
                  text={errors.find((error) => error.id === 'city').text}
                />
              )}
            </div>
            <FormCheckbox
              array={['Можно удалённо']}
              nameCheckbox="remoteWork"
              id="remoteWork"
              selectedValues={formData.remoteWork}
              onChange={(value) => handleCheckboxChange('remoteWork', value)}
              className={getErrorClass('remoteWork')}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FormInput
              id="email"
              label="Email"
              type="email"
              inputName="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className={getErrorClass('email')}
            />
            {errors.find((error) => error.id === 'email') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'email').text}
              />
            )}
          </div>
          <div className={styles.inputWrapper}>
            <FormInput
              id="phone"
              label="Номер телефона"
              type="phone"
              inputName="phone"
              placeholder="+7 (777) 777 77 77"
              value={formData.phone}
              onChange={handleInputChange}
              className={getErrorClass('phone')}
            />
            {errors.find((error) => error.id === 'phone') && (
              <ErrorMessage
                text={errors.find((error) => error.id === 'phone').text}
              />
            )}
          </div>
        </div>
      </div>
      <FormButton
        // добавить вызов функции проверки и записи
        onClickNext={handleNext}
      />
    </div>
  );
};

export default MainInfo;
