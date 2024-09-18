'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Icons.module.scss';

const Icons = ({ selectedMode }) => {
  const [activeIcon, setActiveIcon] = useState({
    fav: false,
    chat: false,
    account: false,
  });

  const pathname = usePathname();
  useEffect(() => {
    setActiveIcon({
      fav: pathname.includes('favorites'),
      chat: pathname.includes('chat'),
      account: pathname.includes('account'),
    });
  }, [pathname]);

  return (
    <div className={styles.iconbox}>
      {selectedMode ? (
        <Link href="/applicant/favorites">
          <button
            className={
              activeIcon.fav
                ? `${styles.btnicon} ${styles.fav} ${styles.active}`
                : `${styles.btnicon} ${styles.fav}`
            }
          >
            <img
              className={styles.btn__item}
              src={
                activeIcon.fav
                  ? '/images/header/fav_active.svg'
                  : '/images/header/fav.svg'
              }
              alt="Favorites"
            />
          </button>
        </Link>
      ) : null}
      <Link href={selectedMode ? '/applicant/chat' : '/employer/chat'}>
        <button
          className={
            activeIcon.chat
              ? `${styles.btnicon} ${styles.active}`
              : `${styles.btnicon}`
          }
        >
          <img
            className={styles.btn__item}
            src={
              activeIcon.chat
                ? '/images/header/chat_active.svg'
                : '/images/header/chat.svg'
            }
            alt="Chat"
          />
        </button>
      </Link>
      <Link href={selectedMode ? '/applicant/account' : '/employer/account'}>
        <button
          className={
            activeIcon.account
              ? `${styles.btnicon} ${styles.active}`
              : `${styles.btnicon}`
          }
        >
          <img
            className={styles.btn__item}
            src={
              activeIcon.account
                ? '/images/header/account_active.svg'
                : '/images/header/account.svg'
            }
            alt="Account"
          />
        </button>
      </Link>
    </div>
  );
};

export default Icons;
