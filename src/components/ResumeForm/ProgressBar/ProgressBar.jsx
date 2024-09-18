import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProgressBar.module.scss';

const ProgressBar = () => {
  const { currentStep } = useSelector(state => state.progress);

  const steps = [
    { title: 'Профессия', subtitle: 'Кем Вы хотите работать' },
    { title: 'Основная информация', subtitle: 'Ваши данные' },
    { title: 'Опыт работы', subtitle: 'Ваш релевантный опыт' },
    { title: 'Образование', subtitle: 'Где Вы учились' },
    { title: 'Дополнительно', subtitle: 'Языки, курсы, портфолио' },
    { title: 'Личная информация', subtitle: 'Расскажите о себе' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progressLine}></div>
        <div 
          className={styles.progressFill} 
          style={{ height: `${(currentStep / (steps.length - 1)) * 89}%` }}
        ></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.step} ${
              index <= currentStep ? styles.completed : ''
            } ${index === currentStep ? styles.active : ''}`}
          >
            <div className={styles.stepMarker}></div>
            <div className={styles.stepContent}>
              <h3 
                className={`${index <= currentStep ? styles.completedText : styles.notCompletedText}`}
              >
                {step.title}
              </h3>
              <p 
                className={`${index <= currentStep ? styles.completedText : styles.notCompletedText}`}
              >
                {step.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;