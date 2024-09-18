'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './FormDate.module.scss';
import CalendarWithSelect from '../../CalendarWithSelect/CalendarWithSelect';
import { useDispatch, useSelector } from 'react-redux';
import { showCalendar, hideCalendar, setDate } from '@/store/calendarSlice';

function FormDate({ label, className, selectedValue }) {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const storeDate = useSelector((state) => {
    const dateString = state.calendar.date;
    return dateString ? new Date(dateString) : null;
  });
  const [localDate, setLocalDate] = useState({ day: '', month: '', year: '' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        dispatch(hideCalendar());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCalendarBtnClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleCalendarBtnClickAll = (e) => {
    e.preventDefault();
    dispatch(showCalendar());
  };

  const handleInputChange = (field) => (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (field === 'day') {
      value = value.slice(0, 2);
      if (parseInt(value) > 31) value = '31';
    } else if (field === 'month') {
      value = value.slice(0, 2);
      if (parseInt(value) > 12) value = '12';
    } else if (field === 'year') {
      value = value.slice(0, 4);
    }
    setLocalDate((prevDate) => ({ ...prevDate, [field]: value }));
  };

  useEffect(() => {
    if (localDate.day && localDate.month && localDate.year) {
      const newDate = new Date(
        localDate.year,
        parseInt(localDate.month) - 1,
        localDate.day
      );
      if (newDate.toString() !== 'Invalid Date') {
        dispatch(setDate(newDate.toISOString()));
      }
    }
  }, [localDate]);

  const formatDay = (day) => day.toString().padStart(2, '0');
  const formatMonth = (month) => (month + 1).toString().padStart(2, '0');

  return (
    <div className={styles.container}>
      {label ? (
        <label className={styles.container__title}>{label}</label>
      ) : null}
      <div className={styles.dateInputContainer}>
        <input
          type="text"
          value={storeDate ? formatDay(storeDate.getDate()) : localDate.day}
          onChange={handleInputChange('day')}
          className={`${styles.dateInput} ${styles.day}  ${className}`}
          onClick={handleCalendarBtnClick}
          placeholder="ДД"
          maxLength="2"
        />
        <input
          type="text"
          value={
            storeDate ? formatMonth(storeDate.getMonth()) : localDate.month
          }
          onChange={handleInputChange('month')}
          className={`${styles.dateInput} ${styles.month}  ${className}`}
          onClick={handleCalendarBtnClick}
          placeholder="ММ"
          maxLength="2"
        />
        <input
          type="text"
          value={storeDate ? storeDate.getFullYear() : localDate.year}
          onChange={handleInputChange('year')}
          className={`${styles.dateInput} ${styles.year} ${className}`}
          onClick={handleCalendarBtnClick}
          placeholder="ГГГГ"
          maxLength="4"
        />
        <button
          onClick={handleCalendarBtnClickAll}
          className={`${styles.calendarBtn}`}
        >
          <img src="/images/form/calendar.svg" alt="Calendar" />
        </button>
        {isOpen && (
          <div ref={calendarRef} className={`${styles.calendarWrapper}`}>
            <CalendarWithSelect />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormDate;
