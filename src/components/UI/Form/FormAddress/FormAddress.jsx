import FormInput from '@/components/UI/Form/FormInput/FormInput';
import { addAddress, deleteAddress } from '@/store/addressSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FormAddress.module.scss';

function FormAddress({
  id,
  onChange,
  className,
  showLabel = true,
  error,
  disabled,
}) {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState('');
  const handleSelectedAddress = (value) => {
    if (value !== 'Вы еще не добавили ни одного адреса')
      setSelectedAddress(value);
    onChange(value);
  };
  //работа стрелки
  const [isOpen, setIsOpen] = useState(false);
  const [createAddress, setCreateAddress] = useState(false);
  const selectWrapperRef = useRef(null);
  const handleChange = (event) => {
    setIsOpen(false);
    // проблема с стрелкой - не вовращается пока выбран input
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
    !disabled && setIsOpen(!isOpen);
  };

  const storeData = useSelector((state) => state.addresses.addresses);
  const [newAddress, setNewAddress] = useState('');
  const addresses =
    storeData.length !== 0
      ? storeData
      : ['Вы еще не добавили ни одного адреса'];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'profession') {
      updatedValue = value.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
      if (updatedValue.length > 0) {
        updatedValue =
          updatedValue[0].toUpperCase() + updatedValue.slice(1).toLowerCase();
      }
    }
    setNewAddress(updatedValue);
  };
  const handleDeleteAddress = (item, index) => {
    dispatch(deleteAddress({ item, index }));
    if (item === selectedAddress) {
      setSelectedAddress('');
    }
  };
  useEffect(() => {
    console.log(newAddress);
  }, [newAddress]);
  return (
    <div className={styles.addressBlock}>
      {showLabel && (
        <label
          // className={styles.label}
          className={
            disabled ? `${styles.label} ${styles.disabled}` : `${styles.label} `
          }
          htmlFor="address"
        >
          Адрес
        </label>
      )}
      <div className={styles.address__selectbox}>
        <div
          className={styles.select__wrapper}
          onClick={handleSelectClick}
          ref={selectWrapperRef}
          id="address"
        >
          <div
            className={
              disabled
                ? `${styles.select} ${styles.disabled} ${className}`
                : `${styles.select} ${className}`
            }
            onClick={handleChange}
            id="currentAddress"
          >
            {selectedAddress}
          </div>
          {isOpen ? (
            <div className={styles.menu__wrap}>
              {addresses.map((item, index) => (
                <div key={index} id={index} className={styles.option}>
                  <div
                    className={styles.item}
                    onClick={() => {
                      handleSelectedAddress(item);
                    }}
                  >
                    {item}
                  </div>
                  {storeData.length !== 0 ? (
                    <button
                      className={styles.deletebtn}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAddress(item, index);
                      }}
                    >
                      <img
                        className={styles.period__deletebtn}
                        src="/images/form/trash.svg"
                        alt="Delete"
                      />
                    </button>
                  ) : null}
                </div>
              ))}
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
        {createAddress ? null : (
          <button
            disabled={disabled}
            className={styles.button}
            onClick={() => {
              !disabled && setCreateAddress(true);
            }}
          >
            Добавить адрес
          </button>
        )}
      </div>
      {createAddress ? (
        <div className={styles.input__wrap}>
          <FormInput
            id="newAddress"
            placeholder="Введиите новый адрес"
            type="text"
            inputName="address"
            onChange={handleInputChange}
          />
          <button
            className={`${styles.button} ${styles.cancel_button}`}
            onClick={() => {
              setCreateAddress(false);
            }}
          >
            Отменить
          </button>
          <button
            className={`${styles.button} ${styles.save_button}`}
            onClick={(e) => {
              e.preventDefault();
              if (newAddress.length > 0) {
                dispatch(addAddress(newAddress));
              }
              setCreateAddress(false);
            }}
          >
            Сохранить
          </button>
        </div>
      ) : null}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default FormAddress;
