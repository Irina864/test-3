'use client';
import styles from './page.module.scss';
import Account from '@/components/Account/Account';
import Nav from '@/components/Nav/Nav';
import AsideSteps from '@/components/Account/AsideSteps/AsideSteps';

export default function EmployerAccount() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Аккаунт" />
      </nav>
      <div className={styles.container}>
        <aside>
          <div className={styles.sidebarContainer}>
            <AsideSteps/>
          </div>
        </aside>
        <Account />
      </div>
    </main>
  );
}
