'use client';
import Nav from '@/components/Nav/Nav';
import ResumeForm from '@/components/ResumeForm/ResumeForm';
import ProgressBar from '@/components/ResumeForm/ProgressBar/ProgressBar';
import styles from './page.module.scss';

export default function CreateResume() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Создание резюме" />
        <button className={styles.btn__download}>Загрузить с hh</button>
      </nav>
      <div className={styles.container}>
        <aside>
          <div className={styles.sidebarContainer}>
            <ProgressBar />
          </div>
        </aside>
        <ResumeForm />
      </div>
    </main>
  );
}
