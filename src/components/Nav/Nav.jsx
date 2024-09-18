import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from './Nav.module.scss';

const Nav = ({ page }) => {
  const mode = useSelector(({ mode }) => mode);
  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.nav__item} ${styles.main}`}
        href={mode ? '/vacancies' : '/resumes'}
      >
        Главная страница
      </Link>
      <span className={`${styles.nav__item} ${styles.graph}`}>
        &nbsp;/&nbsp;
      </span>
      <div className={`${styles.nav__item} ${styles.page}`}>{page}</div>
    </nav>
  );
};

export default Nav;
