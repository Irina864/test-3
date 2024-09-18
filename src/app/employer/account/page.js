'use client';
import styles from './page.module.scss';
import Account from '@/components/Account/Account';
import Nav from '@/components/Nav/Nav';

export default function EmployerAccount() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Аккаунт" />
      </nav>
      <div className={styles.container}>
        <aside>
          <div className={styles.sidebarContainer}>
            {/* <ProgressBarV /> */}
          </div>
        </aside>
        <Account />
      </div>
    </main>
  );
}
