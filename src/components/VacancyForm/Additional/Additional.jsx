import styles from './Additional.module.scss';
import FormButton from '@/components/UI/Form/FormButton/FormButton';
import FormLanguages from '@/components/UI/Form/FormLanguages/FormLanguages';
import FormRadio from '@/components/UI/Form/FormRadio/FormRadio';
import { turnPageBack, turnPageNext } from '@/store/pageSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Additional = () => {
  const dispatch = useDispatch;
  const [isRadioSelected, setRadioSelected] = useState(false);
  const [errRadio, setErrRadio] = useState(false);
  // const lableRadio = document.getElementById("lableRadio");
  const levels = [
    "Среднее", 
    "Среднее специальное",
    "Высшее", 
    "Не требуется"
  ];
  const hendlePublic = () => {
    if(isRadioSelected) {
      setErrRadio(false)
      // lableRadio.styles = "styles.label__title_err"
      return true}
    else {
      setErrRadio(true);
      return false}
  }
  return (
    <div className={styles.rightBlock}>
      <div className={styles.rightBlock__education}>
        <label id='lableRadio' className={errRadio? styles.label__title_err : styles.label__title}>Уровень образования кандидата</label>
          {levels.map((level, index) => (
            <FormRadio
              key={`${index}`}
              label={level}
              idRadio={`education-${index}`}
              nameRadio={`education-`}
              onChange={() => setRadioSelected(true)}
              value={level}
            />
          ))}
      </div>
      <div className={styles.rightBlock__languages}>
         <FormLanguages />
      </div>
      <div className={styles.rightBlock__buttons}>
        <FormButton 
         nameButtonBack="Назад"
         nameButtonNext="Отправить"
         onClickNext={() => hendlePublic()}
        onClickBack={() => {
          dispatch(turnPageBack());
        }}
         />
      </div>
    </div>
  )
};

export default Additional;
