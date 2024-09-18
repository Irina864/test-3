'use client';
import Link from 'next/link';
import Icons from '../Icons/Icons';
import Filter from '../UI/Filter/Filter';
import HeaderButton from '../UI/HeaderButton/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleMode,
  switchToApplicant,
  switchToEmployer,
} from '@/store/modeSlice';
import { toggleAuthorization } from '@/store/authorizationSlice';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector(({ mode }) => mode);
  const authorization = useSelector(({ authorization }) => authorization);

  const [filter, setFilter] = useState(false);
  const [button, setButton] = useState(false);
  const [headerClass, setHeaderClass] = useState(`${styles.header}`);
  const pathname = usePathname();
  useEffect(() => {
    pathname.includes('employer')
      ? dispatch(switchToEmployer())
      : dispatch(switchToApplicant());
    const newHeaderClass = pathname.includes('employer/chat')
      ? `${styles.header} ${styles.employerChat}`
      : pathname.includes('createVacancy')
      ? `${styles.header} ${styles.createVacancy}`
      : pathname.includes('chat')
      ? `${styles.header} ${styles.chat}`
      : pathname.includes('resumes/filter')
      ? `${styles.header} ${styles.filter}`
      : pathname.includes('vacancies/filter')
      ? `${styles.header} ${styles.filter}`
      : pathname.includes('resumes')
      ? `${styles.header} ${styles.resumes}`
      : pathname.includes('vacancies')
      ? `${styles.header} ${styles.vacancies}`
      : `${styles.header}`;

    setHeaderClass(newHeaderClass);

    pathname.includes('createVacancy') ||
    pathname.includes('chat') ||
    pathname.includes('favorites') ||
    pathname.includes('filter')
      ? setFilter(true)
      : setFilter(false);
    pathname.includes('createVacancy') || pathname.includes('createResume')
      ? setButton(false)
      : setButton(true);
  }, [pathname]);

  return (
    <header className={headerClass}>
      <div className={styles.header__box}>
        <Link href="/">
          <div className={styles.header__logowrap}>
            <img
              className={styles.header__logo}
              src="/images/header/logo.svg"
              alt="Logo"
            />
          </div>
        </Link>
        {mode ? (
          <Link
            className={styles.link}
            href="/resumes"
            // onClick={() => dispatch(toggleMode())}
          >
            Работодателям
          </Link>
        ) : (
          <Link
            className={styles.link}
            href="/vacancies"
            // onClick={() => dispatch(toggleMode())}
          >
            Соискателям
          </Link>
        )}
      </div>
      {filter ? <Filter /> : null}
      <div className={styles.header__btns}>
        {button && (
          <HeaderButton selectedMode={mode} authorized={authorization} />
        )}
        {authorization ? (
          <Icons selectedMode={mode} />
        ) : (
          <button
            className={styles.header__authorized}
            onClick={() => dispatch(toggleAuthorization())}
          >
            Войти
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
