import { useState } from 'react';
import styles from './FormRadio.module.scss';

function FormRadio({
  label,
  nameRadio,
  value,
  idRadio,
  onChange,
  selectedValue,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.radio}>
        <input
          onChange={onChange}
          className={styles.input}
          name={nameRadio}
          type="radio"
          checked={selectedValue === value}
          value={value}
          id={idRadio}
        />
        <label className={styles.label} htmlFor={idRadio}></label>
      </div>
      <label className={styles.label} htmlFor={idRadio}>
        {label}
      </label>
    </div>
  );
}

export default FormRadio;
