import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProgressBarV.module.scss';

const ProgressBar = () => {
  const { currentStep } = useSelector(state => state.progress);

  const steps = [
    { title: 'Основная информация', subtitle: 'Кого и где Вы ищете' },
    { title: 'Вакансия', subtitle: 'Опишите требования и обязанности' },
    { title: 'Дополнительно', subtitle: 'Добавьте образование и языки' },

  ];

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progressLine}></div>
        <div 
          className={styles.progressFill} 
          style={{ height: `${(currentStep / (steps.length - 1)) * 72}%` }}
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