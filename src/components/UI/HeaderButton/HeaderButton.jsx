import styles from './HeaderButton.module.scss';
import Link from 'next/link';

const HeaderButton = ({ selectedMode, authorized }) => {
    return selectedMode ? (
        <Link href="/applicant/createResume" className={styles.link}>
            {authorized ? (
                <button className={styles.btn}>Резюме</button>
            ) : (
                <button className={styles.btn}>Создать резюме</button>
            )}
        </Link>
    ) : (
        <Link href="/employer/createVacancy" className={styles.link}>
            <button className={styles.btn}>Новая вакансия</button>
        </Link>
    );
};
export default HeaderButton;
