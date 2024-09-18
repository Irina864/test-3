import { usePathname } from 'next/navigation';
import styles from './FormSelect.module.scss';
import { useState, useEffect, useRef } from 'react';

function FormSelect({
  id,
  label,
  array,
  valueName,
  disabled,
  disabledTime,
  onChange,
  className,
  bottom,
  value,
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const selectWrapperRef = useRef(null);
  const[selectClass, setSelectClass] = useState(`${styles.select}`);

  useEffect(() => {
    const newSelectClass = pathname.includes('createVacancy')
    ? `${styles.select__wrapper_vacancy}`
    : `${styles.select__wrapper}`
  
    setSelectClass(newSelectClass);
  }, [pathname])

  const handleChange = (selectedItem) => {
    setIsOpen(false);
    onChange(selectedItem);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectWrapperRef.current &&
        !selectWrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectWrapperRef]);

  const handleSelectClick = () => {
    if (!disabled && !disabledTime) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      ref={selectWrapperRef}
      className={selectClass}
      onClick={handleSelectClick}
    >
      <div
        className={
          disabled
            ? `${styles.select} ${className} ${styles.disabled}`
            : isOpen
            ? `${styles.select} ${className} ${styles.active}`
            : `${styles.select} ${className}`
        }
        disabled={disabled || disabledTime}
        id={id}
      >
        {value ? value : <div className={styles.placeholder}>{label}</div>}
      </div>
      {isOpen ? (
        <div
          className={
            bottom
              ? `${styles.menu__wrap} ${styles.bottom}`
              : `${styles.menu__wrap} `
          }
        >
          <div className={styles.menu}>
            {array.map((item, index) => (
              <div
                key={index}
                id={index}
                className={styles.option}
                onClick={() => handleChange(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={
          isOpen
            ? `${styles.select__arrow} ${styles.open}`
            : `${styles.select__arrow}`
        }
      ></div>
    </div>
  );
}
export default FormSelect;

// return (
//   <div
//     ref={selectWrapperRef}
//     className={styles.select__wrapper}
//     onClick={handleSelectClick}
//   >
//     <select
//       className={`${styles.select} ${className}`}
//       disabled={disabled || disabledTime}
//       value={valueName}
//       onChange={handleChange}
//       id={id}
//     >
//       <option value="" disabled hidden className={styles.placeholder}>
//         {label}
//       </option>
//       {array.map((item, index) => (
//         <option key={index} value={item} className={styles.option}>
//           {item}
//         </option>
//       ))}
//     </select>
//     <div
//       className={
//         isOpen
//           ? `${styles.select__arrow} ${styles.open}`
//           : `${styles.select__arrow}`
//       }
//     ></div>
//   </div>
// );
