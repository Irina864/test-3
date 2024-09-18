import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage } from '@/store/vacancyDataSlice'; 
import { turnPageBack, turnPageNext } from '@/store/pageSlice'; 
import FormButton from '@/components/UI/Form/FormButton/FormButton'; 
import styles from './Vacancy.module.scss'; 

const Vacancy = () => {
  const dispatch = useDispatch();
  const vacancyData = useSelector((state) => state.vacancyData.page1); 

  // Локальное состояние для полей ввода
  const [formData, setFormData] = useState({
    description: vacancyData.description || '',
    requirements: vacancyData.requirements || '',
    responsibilities: vacancyData.responsibilities || '',
    conditions: vacancyData.conditions || '',
  });

  // Функция для обновления состояния полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Функция для сохранения данных и перехода на следующую страницу
  const handleNext = () => {
    // Сохраняем данные в Redux
    dispatch(updatePage(formData));
    // Переходим на следующую страницу

    return true
  };



  return (
    <div className={styles.vacancyForm}>
      {/* Поле ввода для описания вакансии */}
      <div className={styles.formGroup}>
        <label htmlFor="description">Описание вакансии</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Введите не менее 50 символов"
          className={styles.textarea}
        />
      </div>

      {/* Поле ввода для требований */}
      <div className={styles.formGroup}>
        <label htmlFor="requirements">Требования</label>
        <textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Введите не менее 50 символов"
          className={styles.textarea}
        />
      </div>

      {/* Поле ввода для обязанностей */}
      <div className={styles.formGroup}>
        <label htmlFor="responsibilities">Обязанности</label>
        <textarea
          id="responsibilities"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="Введите не менее 50 символов"
          className={styles.textarea}
        />
      </div>

      {/* Поле ввода для условий */}
      <div className={styles.formGroup}>
        <label htmlFor="conditions">Условия</label>
        <textarea
          id="conditions"
          name="conditions"
          value={formData.conditions}
          onChange={handleChange}
          placeholder="Введите не менее 50 символов"
          className={styles.textarea}
        />
      </div>

      {/* Кнопки "Назад" и "Далее" */}
      <FormButton
        // добавить вызов функции проверки и записи
        onClickNext={handleNext}
      />
    </div>
  );
};

export default Vacancy;


