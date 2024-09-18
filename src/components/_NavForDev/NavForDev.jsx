import Link from 'next/link';
import styles from './Nav.module.scss';

const NavForDev = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/applicant/createResume">Создать резюме</Link>
                </li>
                <li>
                    <Link href="/employer/createVacancy">Создать вакансию</Link>
                </li>
                <li>
                    <Link href="/applicant/account">
                        Личный кабинет соискателя
                    </Link>
                </li>
                <li>
                    <Link href="/applicant/favorites">Favs</Link>
                </li>
                <li>
                    <Link href="/applicant/chat">Chat</Link>
                </li>
                <li>
                    <Link href="/employer/account">
                        Личный кабинет работодателя
                    </Link>
                </li>
                <li>
                    <Link href="/employer/chat">Chat</Link>
                </li>

                <li>
                    <Link href="/vacancies">Поиск вакансий</Link>
                </li>
                <li>
                    <Link href="/resumes">Поиск резюме</Link>
                </li>
                <li>
                    <Link href="/vacancies/filter">Фильтр вакансий</Link>
                </li>
                <li>
                    <Link href="/resumes/filter">Фильтр резюме</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavForDev;
