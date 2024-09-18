import { publishForm } from '@/store/formSlice';
import { turnPageBack, turnPageNext } from '@/store/pageSlice';
import { nextStep, prevStep } from '@/store/progressSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FormButton.module.scss';
import ModalPublishResume from '../../../ResumeForm/ModalPublish/ModalPublishResume';
import ModalPublishVacancy from '@/components/ResumeForm/ModalPublish/ModalPublishVacancy';
import { usePathname } from 'next/navigation';

const FormButton = ({ themeBack, onClickNext }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { currentStep, totalSteps } = useSelector((state) => state.progress);
  // Определяем, находимся ли мы на странице создания вакансии
  const isVacansyStep = Boolean(pathname.includes('createVacancy'));
  // Меняем значение последнего шага в зависивости от страницы
  const lastStep = isVacansyStep ? totalSteps - 4 : totalSteps - 1;
  
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления видимостью модального окна

  const handleNext = () => {
    const canProceed = onClickNext();
    console.log(canProceed);
    if (canProceed) {
      dispatch(nextStep());
      dispatch(turnPageNext());
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
    dispatch(turnPageBack());
  };

  const handlePublish = () => {
    const canProceed = onClickNext();
    if (canProceed) {
      dispatch(publishForm());
      setIsModalOpen(true);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.formBtn}>
      <button
        type="button"
        className={`${styles.btn} ${styles.back} ${themeBack}`}
        onClick={handlePrev}
        disabled={currentStep === 0}
      >
        Назад
      </button>
      {currentStep !== lastStep && (
        <button
          type="button"
          className={`${styles.btn} ${styles.next}`}
          onClick={handleNext}
        >
          Далее
        </button>
      )}
      {currentStep === lastStep && (
        <button
          type="button"
          className={`${styles.btn} ${styles.publish}`}
          onClick={handlePublish}
        >
          Опубликовать
        </button>
      )}
      {isVacansyStep ?  <ModalPublishResume open={isModalOpen} handleClose={handleCloseModal} /> :  <ModalPublishVacancy open={isModalOpen} handleClose={handleCloseModal} />}
    </div>
  );
};

export default FormButton;
