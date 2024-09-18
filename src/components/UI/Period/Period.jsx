'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Period.module.scss';
import FormSelect from '@/components/UI/Form/FormSelect/FormSelect';

function Period({ disabled, disabledTime, onChange, value, className }) {
  const startYear = new Date(1970, 0, 1).getFullYear();
  const endYear = new Date().getFullYear();
  const years = [];
  for (let i = endYear; i !== startYear - 1; i--) {
    years.push(i);
  }
  const birthDate = useSelector((state) => state.resumeData.page2.birthDate);

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const [selectedStartMonth, setSelectedStartMonth] = useState(
    value?.startMonth || ''
  );
  const [selectedStartYear, setSelectedStartYear] = useState(
    value?.startYear || ''
  );
  const [selectedEndMonth, setSelectedEndMonth] = useState(
    value?.endMonth || ''
  );
  const [selectedEndYear, setSelectedEndYear] = useState(value?.endYear || '');

  useEffect(() => {
    validateAndUpdatePeriod();
  }, [
    selectedStartMonth,
    selectedStartYear,
    selectedEndMonth,
    selectedEndYear,
    disabledTime,
  ]);

  const handleStartMonthChange = (selectedValue) =>
    setSelectedStartMonth(selectedValue);
  const handleStartYearChange = (selectedValue) =>
    setSelectedStartYear(selectedValue);
  const handleEndMonthChange = (selectedValue) =>
    setSelectedEndMonth(selectedValue);
  const handleEndYearChange = (selectedValue) =>
    setSelectedEndYear(selectedValue);

  const validateAndUpdatePeriod = () => {
    const startDate =
      selectedStartYear === ''
        ? ''
        : new Date(selectedStartYear, months.indexOf(selectedStartMonth));
    let endDate;

    if (disabledTime) {
      endDate = new Date();
    } else if (selectedEndYear && selectedEndMonth) {
      endDate = new Date(selectedEndYear, months.indexOf(selectedEndMonth));
      if (startDate > endDate) {
        setSelectedEndMonth(selectedStartMonth);
        setSelectedEndYear(selectedStartYear);
        endDate = new Date(
          selectedStartYear,
          months.indexOf(selectedStartMonth)
        );
      }
    }

    if (birthDate && startDate) {
      const birthDateObj = new Date(birthDate);
      if (birthDateObj > startDate) {
        setSelectedStartMonth('');
        setSelectedStartYear('');
        return alert(
          'Дата выхода на работу не может быть раньше даты рождения'
        );
      }
    }

    onChange({
      startMonth: selectedStartMonth,
      startYear: selectedStartYear,
      endMonth: disabledTime ? '' : selectedEndMonth || '',
      endYear: disabledTime ? '' : selectedEndYear || '',
      startDate: startDate ? startDate.toISOString() : '',
      endDate: endDate ? endDate.toISOString() : '',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <FormSelect
          label="Месяц"
          array={months}
          disabled={disabled}
          onChange={handleStartMonthChange}
          value={selectedStartMonth}
          className={className}
        />
        <FormSelect
          label="Год"
          array={years}
          disabled={disabled}
          onChange={handleStartYearChange}
          value={selectedStartYear}
          className={className}
        />
      </div>
      <div> &#8212;</div>
      <div className={styles.wrap}>
        <FormSelect
          label="Месяц"
          array={months}
          disabled={disabled || disabledTime}
          onChange={handleEndMonthChange}
          value={selectedEndMonth}
          className={className}
        />
        <FormSelect
          label="Год"
          array={years}
          disabled={disabled || disabledTime}
          onChange={handleEndYearChange}
          value={selectedEndYear}
          className={className}
        />
      </div>
    </div>
  );
}

export default Period;
