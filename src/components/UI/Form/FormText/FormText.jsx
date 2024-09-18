'use client';
import styles from './FormText.module.scss';

function FormInput({
  id,
  label,
  inputName,
  rows,
  min,
  max,
  placeholder,
  disabled,
  onChange,
  className,
  onBlur,
  onFocus,
  value,
}) {
  return (
    <div className={styles.box}>
      {label ? (
        <label
          htmlFor={id}
          className={
            disabled ? `${styles.label} ${styles.disabled}` : styles.label
          }
        >
          {label}
        </label>
      ) : null}

      <textarea
        className={`${styles.input} ${className}`}
        id={id}
        name={inputName}
        maxLength={max}
        minLength={min}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
}

export default FormInput;
