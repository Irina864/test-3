import styles from './FormCheckbox.module.scss';
import { useSelector } from 'react-redux';

function FormCheckbox({
  label,
  array,
  nameCheckbox,
  id,
  onChange,
  disabled,
  selectedValues,
}) {
  const isChecked = (item) => {
    return selectedValues && selectedValues.includes(item);
  };
  return (
    <div className={styles.box}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <div className={styles.container}>
        {array.map((item, index) => (
          <div key={`${id}-${index}`} className={styles.checkbox}>
            <div className={styles.customCheckbox}>
              <input
                id={`${id}-${index}`}
                className={styles.input_checkbox}
                type="checkbox"
                name={nameCheckbox}
                value={item}
                onChange={onChange}
                disabled={disabled}
                checked={isChecked(item)}
              />
              <label
                htmlFor={`${id}-${index}`}
                className={styles.customCheckboxLabel}
              ></label>
            </div>
            <label
              htmlFor={`${id}-${index}`}
              className={
                disabled
                  ? `${styles.labelItem} ${styles.disabled}`
                  : styles.labelItem
              }
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormCheckbox;
