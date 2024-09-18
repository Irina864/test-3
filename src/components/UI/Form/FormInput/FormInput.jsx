'use client';
import styles from './FormInput.module.scss';
import { useState, useEffect } from 'react';

function FormInput({
  value,
  limit,
  id,
  label,
  type,
  inputName,
  pattern,
  size,
  accept,
  min,
  max,
  placeholder,
  disabled,
  isCleanedInput,
  onChange,
  className,
}) {
  const [inputValue, setInputValue] = useState(value || '');
  const [isClean, setIsClean] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    const trimmedValue = newValue.trim();

    if (inputName === 'phone') {
      const phonePattern = '+7(000)000-00-00';
      const inputValue = newValue.replace(/\D/g, '');
      let formattedValue = '+7(';

      for (let i = 1; i < phonePattern.length; i++) {
        if (inputValue[i]) {
          if (i === 4) formattedValue += ')';
          else if (i === 7 || i === 9) formattedValue += '-';
          formattedValue += inputValue[i];
        } else {
          break;
        }
      }

      newValue = formattedValue;
    }

    setInputValue(newValue);
    setIsClean(trimmedValue !== '' && isCleanedInput);

    if (typeof onChange === 'function') {
      onChange({
        target: {
          name: inputName,
          value: newValue,
        },
      });
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputName === 'phone' && !inputValue) {
      setInputValue('+7(');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputName === 'phone' && inputValue === '+7(') {
      setInputValue('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const clean = () => {
    setInputValue('');
    setIsClean(false);
    if (typeof onChange === 'function') {
      onChange({ target: { name: inputName, value: '' } });
    }
  };

  const inputProps = {
    className: isClean
      ? `${styles.input} ${styles.padding} ${className}`
      : `${styles.input} ${className}`,
    id,
    type: inputName === 'phone' ? 'tel' : type,
    name: inputName,
    max,
    min,
    pattern:
      inputName === 'phone'
        ? '\\+7\\([0-9]{3}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}'
        : pattern,
    size,
    accept,
    placeholder: isFocused && inputName === 'phone' ? '' : placeholder,
    disabled,
    value: inputValue,
    onChange: handleInputChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    maxLength: inputName === 'phone' ? 16 : undefined,
    onKeyDown: handleKeyDown,
  };

  return (
    <div className={styles.box}>
      {label && (
        <label
          htmlFor={id}
          className={
            disabled ? `${styles.label} ${styles.disabled}` : styles.label
          }
        >
          {label}
        </label>
      )}
      {limit ? (
        <div className={styles.container}>
          <input
            {...inputProps}
            className={`${inputProps.className} ${styles.inputCustom}`}
          />
          <span className={styles.customPlaceholder}>{limit}</span>
          {isClean && (
            <button onClick={clean} className={styles.clean}>
              <img
                className={styles.clean__img}
                src="/images/form/clean-input.svg"
                alt="clean"
              />
            </button>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <input {...inputProps} />
          {isClean && (
            <button onClick={clean} className={styles.clean}>
              <img src="/images/form/clean-input.svg" alt="clean" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FormInput;
