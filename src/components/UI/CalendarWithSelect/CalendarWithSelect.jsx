import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './CalendarWithSelect.scss';
import { setDate } from '@/store/calendarSlice';
import { useState, useEffect, useRef } from 'react';

const CalendarWithSelect = () => {
  const storeDate = useSelector((state) => {
    const dateString = state.calendar.date;
    return dateString ? new Date(dateString) : null;
  });

  const [currentYear, setCurrentYear] = useState(
    storeDate === null ? new Date().getFullYear() : storeDate.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState(
    storeDate === null ? new Date().getMonth() : storeDate.getMonth()
  );
  useEffect(() => {
    setCurrentMonth(
      storeDate === null ? new Date().getMonth() : storeDate.getMonth()
    );
    setCurrentYear(
      storeDate === null ? new Date().getFullYear() : storeDate.getFullYear()
    );
  }, [storeDate]);
  const years = [];
  for (
    let i = new Date().getFullYear();
    i !== new Date().getFullYear() - 100;
    i--
  ) {
    years.push(i);
  }
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString();
    dispatch(setDate(dateString));
  };

  const handleMonthChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(parseInt(e));
    setSelectedDate(newDate);
    dispatch(setDate(newDate));
  };

  const handleYearChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(parseInt(e));
    setSelectedDate(newDate);
    dispatch(setDate(newDate));
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);
  const selectWrapperRef = useRef(null);
  const selectWrapperRefYear = useRef(null);

  const handleChange = () => {
    setIsOpen(false);

    // проблема с стрелкой - не вовращается пока выбран input
  };
  const handleChangeYear = () => {
    setIsOpenYear(false);

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
      if (
        selectWrapperRefYear.current &&
        !selectWrapperRefYear.current.contains(event.target)
      ) {
        setIsOpenYear(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectWrapperRef]);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectClickYear = () => {
    setIsOpenYear(!isOpenYear);
  };
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);

  const handleSelectedMonth = (value) => {
    setSelectedMonth(value);
  };
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleSelectedYear = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="customcalendar">
      <div className="customcalendar__selectbox">
        <div
          ref={selectWrapperRef}
          className="select__wrapper select_month"
          onClick={handleSelectClick}
        >
          <div
            className={isOpen ? 'select active' : 'select'}
            onChange={handleChange}
          >
            {selectedMonth}
          </div>
          {isOpen ? (
            <div className="menu__wrap">
              <div className="menu">
                {months.map((item, index) => (
                  <div
                    key={index}
                    id={index}
                    index={index}
                    className="option"
                    onClick={() => {
                      handleSelectedMonth(item);
                      handleMonthChange(index);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div
            className={isOpen ? `select__arrow open` : `select__arrow`}
          ></div>
        </div>
        <div
          ref={selectWrapperRefYear}
          className="select__wrapper select_year"
          onClick={handleSelectClickYear}
        >
          <div
            className={isOpenYear ? 'select active' : 'select'}
            onChange={handleChangeYear}
          >
            {selectedYear}
          </div>
          {isOpenYear ? (
            <div className="menu__wrap">
              <div className="menu">
                {years.map((item, index) => (
                  <div
                    key={index}
                    id={index}
                    index={index}
                    className="option"
                    onClick={() => {
                      handleSelectedYear(item);
                      handleYearChange(item);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div
            className={isOpenYear ? `select__arrow open` : `select__arrow`}
          ></div>
        </div>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        locale={ru}
        inline
        dateFormat="dd.MM.yyyy"
      />
    </div>
  );
};

export default CalendarWithSelect;
// return (
//   <div className="customcalendar">
//     <div className="customcalendar__selectbox">
//       <select className="customcalendar__select" onChange={handleMonthChange}>
//         {months.map((month, index) =>
//           currentMonth === index ? (
//             <option
//               className="customcalendar__item"
//               key={index}
//               index={index}
//               value={index}
//               selected
//             >
//               {month}
//             </option>
//           ) : (
//             <option
//               className="customcalendar__item"
//               key={index}
//               index={index}
//               value={index}
//             >
//               {month}
//             </option>
//           )
//         )}
//       </select>
//       <select className="customcalendar__select" onChange={handleYearChange}>
//         {years.map((year, index) => (
//           <option
//             className="customcalendar__item"
//             key={index}
//             index={index}
//             value={year}
//           >
//             {year}
//           </option>
//         ))}
//       </select>
//     </div>
//     <DatePicker
//       selected={selectedDate}
//       onChange={handleDateChange}
//       locale={ru}
//       inline
//       dateFormat="dd.MM.yyyy"
//     />
//   </div>
// );
