import styles from './FormRadioButton.module.scss';

function FormRadioButton({
  label,
  nameRadio,
  valueFirst,
  valueSecond,
  idFirst,
  idSecond,
  labelFirst,
  labelSecond,
  onChange,
  selectedValue,
}) {
  return (
    <div className={styles.container}>
      {label ? (
        <label className={styles.container__title}>{label}</label>
      ) : null}
      <div className={styles.box}>
        <input
          className={styles.input}
          name={nameRadio}
          type="radio"
          value={valueFirst}
          id={idFirst}
          checked={selectedValue === valueFirst}
          onChange={onChange}
        />
        <label className={styles.label} htmlFor={idFirst}>
          {labelFirst}
        </label>
        <input
          className={styles.input}
          name={nameRadio}
          type="radio"
          value={valueSecond}
          id={idSecond}
          checked={selectedValue === valueSecond}
          onChange={onChange}
        />
        <label className={styles.label} htmlFor={idSecond}>
          {labelSecond}
        </label>
      </div>
    </div>
  );
}

export default FormRadioButton;
