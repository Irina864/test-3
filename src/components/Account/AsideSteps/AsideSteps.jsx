'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './AsideSteps.module.scss';

const AsideSteps = () => {
  const dispatch = useDispatch();
  const steps = [
    { title: 'О себе', subtitle: 'Личная информация, контакты' },
    { title: 'Уведомления', subtitle: 'Настройки email' },
    { title: 'Безопасность', subtitle: 'Смена пароля' },
    { title: 'Поддержка', subtitle: 'Вопрос или предложение' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.stepsList}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepSubtitle}>{step.subtitle}</p>
          </div>
        ))}
      </div>
      
{/* Вот эти 2 кнопки нужно будет добавить в отдельный компонент */}
      <button className={styles.goOut}>Выйти</button>
      <button className={styles.deleteAccount}>Удалить аккаунт</button>  
    
    </div>
  );
};

export default AsideSteps;
